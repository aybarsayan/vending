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
exports.verifySession = void 0;
const Kilt = __importStar(require("@kiltprotocol/sdk-js"));
const config_1 = require("../config");
const connection_1 = require("../utils/connection");
const generateKeyPairs_1 = require("../utils/generateKeyPairs");
const extractEncryptionKeyUri_1 = require("../utils/extractEncryptionKeyUri");
const readSessionCookie_1 = require("./readSessionCookie");
const setSessionCookie_1 = require("./setSessionCookie");
function verifySession(request, response) {
    return __awaiter(this, void 0, void 0, function* () {
        yield (0, connection_1.getApi)();
        // read cookie from browser
        const cookiePayload = yield (0, readSessionCookie_1.readSessionCookie)(request, response, config_1.JWT_SIGNER_SECRET);
        const serverSession = cookiePayload.server;
        // Important/Real Verification:
        const { extensionSession } = request.body;
        const { encryptedChallenge, nonce } = extensionSession;
        // This variable has different name depending on the session version that the extension uses
        const extensionEncryptionKeyUri = (0, extractEncryptionKeyUri_1.extractEncryptionKeyUri)(extensionSession);
        const encryptionKey = yield Kilt.Did.resolveKey(extensionEncryptionKeyUri);
        if (!encryptionKey) {
            throw new Error('an encryption key is required');
        }
        const { keyAgreement } = (0, generateKeyPairs_1.generateKeyPairs)(config_1.DAPP_DID_MNEMONIC);
        const decryptedBytes = Kilt.Utils.Crypto.decryptAsymmetric({ box: encryptedChallenge, nonce }, 
        // resolved from extension-URI
        encryptionKey.publicKey, 
        // derived from your seed phrase:
        keyAgreement.secretKey);
        // If it fails to decrypt, throw.
        if (!decryptedBytes) {
            throw new Error('Could not decode/decrypt the challenge from the extension');
        }
        const decryptedChallenge = Kilt.Utils.Crypto.u8aToHex(decryptedBytes);
        const originalChallenge = serverSession.challenge;
        // Compare the decrypted challenge to the challenge you stored earlier.
        console.log('\n', `(from server) original Challenge: ${originalChallenge} \n`, `(from extension) decrypted Challenge: ${decryptedChallenge} \n`);
        if (decryptedChallenge !== originalChallenge) {
            response
                .status(401)
                .send("Session verification failed. The challenges don't match.");
            throw new Error('Invalid challenge');
        }
        console.log('Session successfully verified.\n', 'Cookie is being updated to include the extension session values.\n');
        // update the cookie so that it also includes the extensionSession-Values
        const completeSessionValues = {
            server: {
                dAppName: serverSession.dAppName,
                dAppEncryptionKeyUri: serverSession.dAppEncryptionKeyUri,
                challenge: serverSession.challenge
            },
            extension: {
                encryptedChallenge: extensionSession.encryptedChallenge,
                encryptionKeyUri: extensionEncryptionKeyUri,
                nonce: extensionSession.nonce
            }
        };
        (0, setSessionCookie_1.setSessionCookie)(completeSessionValues, response);
        response
            .status(200)
            .send('Session successfully verified. Extension and dApp understand each other. Server and Extension Session Values now on the Cookie.');
    });
}
exports.verifySession = verifySession;
