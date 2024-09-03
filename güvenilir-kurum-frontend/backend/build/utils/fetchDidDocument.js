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
exports.fetchDidDocument = void 0;
const Kilt = __importStar(require("@kiltprotocol/sdk-js"));
const config_1 = require("../config");
const connection_1 = require("../utils/connection");
/**
 * This function is to fetch the the DID-Document of your dApp from the Blockchain once.
 *
 * It is meant to be used before starting the server so that the document is available to use.
 *
 * @returns didDocument Kilt.DidDocument
 */
function fetchDidDocument() {
    return __awaiter(this, void 0, void 0, function* () {
        // connects to the websocket of your, in '.env', specified blockchain
        yield (0, connection_1.getApi)();
        if (!config_1.DAPP_DID_URI) {
            throw new Error("enter your dApp's DID URI on the .env-file first");
        }
        // fetch the DID document from the blockchain
        const resolved = yield Kilt.Did.resolve(config_1.DAPP_DID_URI);
        // Assure this did has a document on chain
        if (resolved === null) {
            throw new Error('DID could not be resolved');
        }
        if (!resolved.document) {
            throw new Error('No DID document could be fetched from your given dApps URI');
        }
        const didDocument = resolved.document;
        // We require a key agreement key to receive encrypted messages
        if (!didDocument.keyAgreement || !didDocument.keyAgreement[0]) {
            throw new Error('The DID of your dApp needs to have an Key Agreement to communicate. Info to get one: https://docs.kilt.io/docs/develop/sdk/cookbook/dids/full-did-update');
        }
        if (!didDocument.authentication || !didDocument.authentication[0]) {
            throw new Error('The DID of your dApp needs to have an authentication Key to sign stuff. Info to get one: https://docs.kilt.io/docs/develop/sdk/cookbook/dids/full-did-update');
        }
        return didDocument;
    });
}
exports.fetchDidDocument = fetchDidDocument;
