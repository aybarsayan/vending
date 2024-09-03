"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.setAccessCookie = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const config_1 = require("../config");
/**
 * Saves the authenticationToken as a JSON-Web-Token on a Cookie of the browser.
 * This allows us to keep track of who has already been granted access, after completing their login with credentials.
 *
 * Prevents needing to login on each site refresh.
 *
 * The cookie is called 'accessJWT'.
 */
function setAccessCookie(response, authenticationToken) {
    // Create a Json-Web-Token:
    // set the expiration of JWT same as the Cookie
    const jwtOptions = {
        expiresIn: `${config_1.cookieOptions.maxAge} seconds`
    };
    const token = jsonwebtoken_1.default.sign({ authenticationToken }, config_1.JWT_SIGNER_SECRET, jwtOptions);
    // Set a Cookie in the header including the JWT and our options:
    response.cookie('accessJWT', token, config_1.cookieOptions);
    console.log("The user's authentication token has been saved on the 'accessJWT'-Cookie.\n");
    // After saving 'accessJWT' we could actually delete the other cookies.
    // On this demo-App we leave them there to easier the understanding.
}
exports.setAccessCookie = setAccessCookie;
