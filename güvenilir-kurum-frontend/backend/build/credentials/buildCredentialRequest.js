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
exports.buildCredentialRequest = void 0;
const Kilt = __importStar(require("@kiltprotocol/sdk-js"));
const util_crypto_1 = require("@polkadot/util-crypto");
const config_1 = require("../config");
const encryptionCallback_1 = require("../utils/encryptionCallback");
const generateKeyPairs_1 = require("../utils/generateKeyPairs");
const readSessionCookie_1 = require("../session/readSessionCookie");
const setCredentialCookie_1 = require("./setCredentialCookie");
function buildCredentialRequest(request, response, cTypeRequest) {
    return __awaiter(this, void 0, void 0, function* () {
        // read cookie from browser
        const sessionValues = yield (0, readSessionCookie_1.readSessionCookie)(request, response, config_1.JWT_SIGNER_SECRET);
        if (!sessionValues.extension) {
            throw new Error('Extension Session Values not found. Try restarting and verifying the server-extension-session.');
        }
        // We need the encryptionKeyUri from the Extension
        const { did: claimerSessionDidUri } = Kilt.Did.parse(sessionValues.extension.encryptionKeyUri);
        // It is encouraged that you customize your challenge creation
        const challenge = (0, util_crypto_1.randomAsHex)();
        const message = requestWrapper(cTypeRequest, challenge, claimerSessionDidUri);
        console.log('the message with the Credential-Request before encryption: ', JSON.stringify(message, null, 2));
        (0, setCredentialCookie_1.setCredentialCookie)(challenge, response);
        return yield encryptMessage(message, sessionValues);
    });
}
exports.buildCredentialRequest = buildCredentialRequest;
/** Turns the Credential Request into a Kilt.Message.
 *  It also adds a challenge to the message for the claimer to signed.
 *  In this way, we make sure that the answer comes from who we asked.
 */
function requestWrapper(credentialRequest, challenge, receiverDidUri) {
    const messageBody = {
        content: Object.assign(Object.assign({}, credentialRequest), { challenge }),
        type: 'request-credential'
    };
    const message = Kilt.Message.fromBody(messageBody, config_1.DAPP_DID_URI, receiverDidUri);
    return message;
}
/**
 * Protects from undesired readers.
 */
function encryptMessage(message, sessionObject) {
    return __awaiter(this, void 0, void 0, function* () {
        const { keyAgreement: ourKeyAgreementKeyPair } = (0, generateKeyPairs_1.generateKeyPairs)(config_1.DAPP_DID_MNEMONIC);
        if (!sessionObject.extension) {
            throw new Error('Receivers Encryption Key needed in order to encrypt a message');
        }
        const ourKeyIdentifier = sessionObject.server.dAppEncryptionKeyUri;
        const theirKeyIdentifier = sessionObject.extension.encryptionKeyUri;
        const cypheredMessage = yield Kilt.Message.encrypt(message, (0, encryptionCallback_1.encryptionCallback)({
            keyAgreement: ourKeyAgreementKeyPair,
            keyAgreementUri: ourKeyIdentifier
        }), theirKeyIdentifier);
        return cypheredMessage;
    });
}
