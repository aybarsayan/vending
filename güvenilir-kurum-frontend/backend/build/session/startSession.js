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
exports.startSession = exports.generateSessionValues = void 0;
const Kilt = __importStar(require("@kiltprotocol/sdk-js"));
const connection_1 = require("../utils/connection");
const config_1 = require("../config");
const setSessionCookie_1 = require("./setSessionCookie");
function generateSessionValues(didDocument) {
    var _a;
    return __awaiter(this, void 0, void 0, function* () {
        // connects to the websocket of your, in '.env', specified blockchain
        yield (0, connection_1.getApi)();
        // Build the EncryptionKeyUri so that the client can encrypt messages for us:
        const dAppEncryptionKeyUri = `${didDocument.uri}${(_a = didDocument.keyAgreement) === null || _a === void 0 ? void 0 : _a[0].id}`;
        if (typeof didDocument.keyAgreement === undefined) {
            throw new Error('This DID has no Key Agreement. Cannot encrypt like this.');
        }
        // Generate a challenge to ensure all messages we receive are fresh.
        // A UUID is a universally unique identifier, a 128-bit label. Here expressed as a string of a hexadecimal number.
        // It is encourage that you personalize your challenge generation.
        const challenge = Kilt.Utils.UUID.generate();
        const sessionValues = {
            server: {
                dAppName: config_1.DAPP_NAME,
                dAppEncryptionKeyUri: dAppEncryptionKeyUri,
                challenge: challenge
            }
        };
        console.log('Session Values just generated', sessionValues);
        return sessionValues;
    });
}
exports.generateSessionValues = generateSessionValues;
/**
 * Saving the session values as a JSON-Web-Token on a Cookie of the browser
 */
function startSession(request, response) {
    return __awaiter(this, void 0, void 0, function* () {
        // we use the DID-Document from the dApp fetched on server-start to generate our Session Values:
        const serverSessionValues = yield generateSessionValues(request.app.locals.dappDidDocument);
        (0, setSessionCookie_1.setSessionCookie)(serverSessionValues, response);
        // send the Payload as plain text on the response, this facilitates the start of the extension session by the frontend.
        response.status(200).send(serverSessionValues);
    });
}
exports.startSession = startSession;
