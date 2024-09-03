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
Object.defineProperty(exports, "__esModule", { value: true });
exports.generateKeyPairs = void 0;
const Kilt = __importStar(require("@kiltprotocol/sdk-js"));
const signingKeyPairType = 'ed25519';
function generateKeyPairs(mnemonic) {
    const authentication = Kilt.Utils.Crypto.makeKeypairFromUri(mnemonic, signingKeyPairType);
    const assertionMethod = Kilt.Utils.Crypto.makeKeypairFromUri(mnemonic, signingKeyPairType);
    const keyAgreement = Kilt.Utils.Crypto.makeEncryptionKeypairFromSeed(Kilt.Utils.Crypto.mnemonicToMiniSecret(mnemonic));
    // This key is not necessary for this project.
    // for the sake of completeness, your dApp's DID also gets one
    const capabilityDelegation = Kilt.Utils.Crypto.makeKeypairFromUri(mnemonic, signingKeyPairType);
    return {
        authentication,
        assertionMethod,
        keyAgreement,
        capabilityDelegation
    };
}
exports.generateKeyPairs = generateKeyPairs;
