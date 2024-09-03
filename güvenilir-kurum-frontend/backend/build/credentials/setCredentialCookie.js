"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.setCredentialCookie = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const config_1 = require("../config");
/**
 * Saves the challenge from the credential-request as a JSON-Web-Token on a Cookie of the browser.
 * This is necessary for the credential verification.
 *
 * The cookie is called 'credentialJWT'.
 */
function setCredentialCookie(challengeOnRequest, response) {
    // Create a Json-Web-Token:
    // set the expiration of JWT same as the Cookie
    const jwtOptions = {
        expiresIn: `${config_1.cookieOptions.maxAge} seconds`
    };
    const token = jsonwebtoken_1.default.sign({ challengeOnRequest }, config_1.JWT_SIGNER_SECRET, jwtOptions);
    // Set a Cookie in the header including the JWT and our options:
    response.cookie('credentialJWT', token, config_1.cookieOptions);
    console.log("The Challenge included on the Credential-Request is now saved on the 'credentialJWT'-Cookie.");
}
exports.setCredentialCookie = setCredentialCookie;
