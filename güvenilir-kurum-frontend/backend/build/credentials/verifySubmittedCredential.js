"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.verifySubmittedCredential = void 0;
const Kilt = __importStar(require("@kiltprotocol/sdk-js"));
const config_1 = require("../config");
const generateKeyPairs_1 = require("../utils/generateKeyPairs");
const decryptionCallback_1 = require("../utils/decryptionCallback");
const connection_1 = require("../utils/connection");
const readCredentialCookie_1 = require("./readCredentialCookie");
function verifySubmittedCredential(request, response, cTypesRequested) {
    return __awaiter(this, void 0, void 0, function* () {
        const encryptedMessage = request.body;
        console.log(`encrypted Message that the server obtained ${JSON.stringify(encryptedMessage, null, 2)}`);
        yield (0, connection_1.getApi)();
        const { keyAgreement } = (0, generateKeyPairs_1.generateKeyPairs)(config_1.DAPP_DID_MNEMONIC);
        const decryptedMessage = yield Kilt.Message.decrypt(encryptedMessage, (0, decryptionCallback_1.decryptionCallback)(keyAgreement));
        // Verifying this is a properly-formatted message
        Kilt.Message.verify(decryptedMessage);
        // Here a 400 could be sent, if this fails and you really appreciate Http Status Codes
        if (decryptedMessage.body.type !== 'submit-credential') {
            throw new Error(`Unexpected message type: ${decryptedMessage.body.type}`);
        }
        // TODO:  maybe allow for several credentials in the future
        const credential = decryptedMessage.body.content[0];
        //console.log('Decrypted Credential being verify: \n', credential)
        const chosenCType = cTypesRequested.cTypes.find((ctype) => ctype.cTypeHash === credential.claim.cTypeHash);
        if (!chosenCType) {
            throw new Error("The User did not complied to the Credential Request. The Server does not accept the submitted Credential's Type.");
        }
        // Know against to what structure you want to compare to:
        const requestedCTypeHash = chosenCType.cTypeHash;
        const { cType: requestedCType } = yield Kilt.CType.fetchFromChain(`kilt:ctype:${requestedCTypeHash}`);
        const challengeOnRequest = yield (0, readCredentialCookie_1.readCredentialCookie)(request, response, config_1.JWT_SIGNER_SECRET);
        const verifiedCredential = yield Kilt.Credential.verifyPresentation(credential, {
            challenge: challengeOnRequest,
            ctype: requestedCType
        });
        if (verifiedCredential.revoked) {
            throw new Error("Credential has been revoked and hence it's not valid.");
        }
        // Check if the credentials was issued by one of our "trusted attesters"
        const ourTrustedAttesters = chosenCType.trustedAttesters;
        // If you don't include a list of trusted attester on the credential-request, this check would be skipped
        if (ourTrustedAttesters) {
            if (!ourTrustedAttesters.includes(verifiedCredential.attester)) {
                throw new Error(`The Credential was not issued by any of the trusted Attesters that the dApp relies on. \n List of trusted attesters: ${ourTrustedAttesters}`);
            }
        }
        console.log('Credential Successfully Verified!');
        return credential;
    });
}
exports.verifySubmittedCredential = verifySubmittedCredential;
