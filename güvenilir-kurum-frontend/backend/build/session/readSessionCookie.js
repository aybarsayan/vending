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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.readSessionCookie = void 0;
const Kilt = __importStar(require("@kiltprotocol/sdk-js"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
/**
 *  Mean to facilitate working with the JSON-Web-Token inside the Cookie.
 *  This function reads, decodes and verifies the 'sessionJWT' Cookie from the browser.
 *  Verification in this context means that it will check, that the JWT was signed with the dApp's secret key (more like a secret pen)..
 *
 *  Will throw an error if it fail one of it functions.
 *
 * @param request
 * @param response
 * @param secretKey The JWT secret signer (or pen).
 * @returns The decoded content of the Payload of the JWT. Here the session values.
 */
function readSessionCookie(request, response, secretKey) {
    return __awaiter(this, void 0, void 0, function* () {
        // read cookie from browser
        console.log('trying to read the cookie via readSessionCookie()\n');
        const sessionCookie = request.cookies.sessionJWT;
        if (!sessionCookie) {
            response
                .status(401)
                .send(`Could not find Cookie with session values (as JWT). Enable Cookies, restart the session and try again.`);
            throw new Error('Cookie with Session JWT not found. Enable Cookies, restart the session and try again.');
        }
        // decode the JWT and verify if it was signed with our SecretKey
        let cookieSessionJWTPayload;
        try {
            // will throw error if verification fails
            cookieSessionJWTPayload = jsonwebtoken_1.default.verify(sessionCookie, secretKey);
        }
        catch (error) {
            throw new Error(`Could not verify JWT. ${error}`);
        }
        if (typeof cookieSessionJWTPayload === 'string') {
            throw new Error(`Payload of unexpected type. Content: ${cookieSessionJWTPayload}`);
        }
        // now make sure that the payload is carrying our type of SessionValues
        // extract the session.server and session.extension Objects from payload
        const { server, extension } = cookieSessionJWTPayload;
        if (!server) {
            throw new Error('Server Session Values could not be extracted from the Cookie.');
        }
        checkSessionValuesTypes(server, extension);
        // after our check, we can cast the Object as SessionValues with a clean conscience
        const sessionObject = { server, extension };
        return sessionObject;
    });
}
exports.readSessionCookie = readSessionCookie;
/**
 * Checks that types fits the SessionValues Interface
 *
 * Will throw if any property does not matches expectation.
 * @param server -- session.server object
 * @param extension -- session.extension object (optional)
 */
function checkSessionValuesTypes(server, extension) {
    // Cheek the session.server:
    if (typeof server !== 'object' || server === null) {
        throw new Error('The server session values are not packed in an object as expected. ');
    }
    areTheyStrings(server, ['dAppName', 'challenge']);
    if ('dAppEncryptionKeyUri' in server) {
        Kilt.Did.validateUri(server.dAppEncryptionKeyUri, 'ResourceUri');
    }
    else {
        throw new Error("Property 'dAppEncryptionKeyUri' of session.server could not be found");
    }
    // if the extension session values are not there yet, stop here.
    if (!extension) {
        return;
    }
    // Check the session.extension
    if (typeof extension !== 'object' || extension === null) {
        throw new Error('The extension session values are not packed in an object as expected. ');
    }
    areTheyStrings(extension, ['encryptedChallenge', 'nonce']);
    if ('encryptionKeyUri' in extension) {
        Kilt.Did.validateUri(extension.encryptionKeyUri, 'ResourceUri');
    }
    else {
        throw new Error("Property 'encryptionKeyUri' of session.extension could not be found");
    }
}
/**
 * Generalizes the `for...in`-loops.
 *
 * @param subSession - either session.server or session.extension
 * @param keyNames - array of strings with the name of the corresponding properties.
 */
function areTheyStrings(subSession, keyNames) {
    for (const property of keyNames) {
        if (!(property in subSession)) {
            throw new Error(`Property '${property}' of session.server object could not be found.`);
        }
        if (!(typeof subSession[property] == 'string')) {
            throw new Error(`Property '${property}' of session.server object should be of type 'string'.
           Instead it is of type: ${typeof subSession[property]}`);
        }
    }
}
