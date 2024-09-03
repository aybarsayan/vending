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
exports.readAccessCookie = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
/**
 *  Mean to facilitate working with the JSON-Web-Token inside the Cookie.
 *  This function reads, decodes and verifies the 'accessJWT' Cookie from the browser.
 *  Verification in this context means that it will check, that the JWT was signed with the dApp's secret key (more like a secret pen)..
 *
 *  Will throw an error if it fail one of it functions.
 *
 * @param request
 * @param response
 * @param secretKey The JWT secret signer (or pen).
 * @returns The decoded content of the Payload of the JWT. Here the user's authentication token.
 */
function readAccessCookie(request, secretKey) {
    return __awaiter(this, void 0, void 0, function* () {
        // read cookie from browser
        console.log('trying to read the cookie via readAccessCookie().\n Users with access already granted would have their authentication token here.');
        const accessCookie = request.cookies.accessJWT;
        if (!accessCookie) {
            throw new Error('Cookie with the access token (as JWT) not found.');
        }
        // decode the JWT and verify if it was signed with our SecretKey
        let cookieAccessJWTPayload;
        try {
            // will throw error if verification fails
            cookieAccessJWTPayload = jsonwebtoken_1.default.verify(accessCookie, secretKey);
        }
        catch (error) {
            throw new Error(`Could not verify JWT. ${error}`);
        }
        if (typeof cookieAccessJWTPayload === 'string') {
            throw new Error(`Payload of unexpected type. Content: ${cookieAccessJWTPayload}`);
        }
        const { authenticationToken } = cookieAccessJWTPayload;
        if (!authenticationToken) {
            throw new Error('No authentication Token found.');
        }
        return authenticationToken;
    });
}
exports.readAccessCookie = readAccessCookie;
