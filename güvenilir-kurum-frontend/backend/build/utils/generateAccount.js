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
exports.generateAccount = void 0;
const util_crypto_1 = require("@polkadot/util-crypto");
const Kilt = __importStar(require("@kiltprotocol/sdk-js"));
/**
 * Generates a KiltKeyringPair from a mnemonic.
 *
 * The WASM needs to be loaded before.
 * For that, use either 'Kilt.init()', 'Kilt.connect()' or 'getApi()'.
 *
 * @param mnemonic
 * @returns
 */
function generateAccount(mnemonic) {
    const mnemonicToU8A = (0, util_crypto_1.mnemonicToMiniSecret)(mnemonic);
    const account = Kilt.Utils.Crypto.makeKeypairFromSeed(mnemonicToU8A, 'ed25519');
    return account;
}
exports.generateAccount = generateAccount;
