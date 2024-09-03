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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.readCredentialCookie = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
/**
 *  Mean to facilitate working with the JSON-Web-Token inside the Cookie.
 *  This function reads, decodes and verifies the 'credentialJWT' Cookie from the browser.
 *  Verification in this context means that it will check, that the JWT was signed with the dApp's secret key (more like a secret pen)..
 *
 *  Will throw an error if it fail one of it functions.
 *
 * @param request
 * @param response
 * @param secretKey The JWT secret signer (or pen).
 * @returns The decoded content of the Payload of the JWT. Here the challenge from the cType-Request.
 */
function readCredentialCookie(request, response, secretKey) {
    return __awaiter(this, void 0, void 0, function* () {
        // read cookie from browser
        console.log('trying to read the cookie via readCredentialCookie()\n');
        const credentialCookie = request.cookies.credentialJWT;
        if (!credentialCookie) {
            response
                .status(401)
                .send(`Could not find Cookie with challenge of the Credential-Request (as JWT). Enable Cookies and try again.`);
            throw new Error('Cookie with the Credential-Request (as JWT) not found. Enable Cookies and try again.');
        }
        // decode the JWT and verify if it was signed with our SecretKey
        let cookieCredentialJWTPayload;
        try {
            // will throw error if verification fails
            cookieCredentialJWTPayload = jsonwebtoken_1.default.verify(credentialCookie, secretKey);
        }
        catch (error) {
            throw new Error(`Could not verify JWT. ${error}`);
        }
        if (typeof cookieCredentialJWTPayload === 'string') {
            throw new Error(`Payload of unexpected type. Content: ${cookieCredentialJWTPayload}`);
        }
        const { challengeOnRequest } = cookieCredentialJWTPayload;
        if (!challengeOnRequest) {
            throw new Error('Challenge sent with the Credential-Request could not be extracted from the Cookie.');
        }
        return challengeOnRequest;
    });
}
exports.readCredentialCookie = readCredentialCookie;
