"use strict";
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
exports.decryptionCallback = void 0;
const util_crypto_1 = require("@polkadot/util-crypto");
function decryptionCallback(keyAgreement) {
    return function decryptCallback({ data, nonce, peerPublicKey }) {
        return __awaiter(this, void 0, void 0, function* () {
            const decrypted = (0, util_crypto_1.naclOpen)(data, nonce, peerPublicKey, keyAgreement.secretKey);
            if (!decrypted) {
                throw new Error('Failed to decrypt with given key');
            }
            return {
                data: decrypted
            };
        });
    };
}
exports.decryptionCallback = decryptionCallback;
