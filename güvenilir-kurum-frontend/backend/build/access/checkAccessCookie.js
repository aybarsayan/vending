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
exports.checkAccessCookie = void 0;
const config_1 = require("../config");
const readAccessCookie_1 = require("./readAccessCookie");
/** Check if the user already logged in.
 *
 * Check if the browser already has a valid credential-JWT save on the cookies.
 *
 * @param request
 * @param response
 */
function checkAccessCookie(request, response) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            // "readAccessCookie" will throw if something is fishy
            const authenticationToken = yield (0, readAccessCookie_1.readAccessCookie)(request, config_1.JWT_SIGNER_SECRET);
            // decode the authenticationToken here and wrap the info that the frontend should get
            const plainUserInfo = authenticationToken;
            console.log('Plain User Info that we are passing to the frontend, after access verification: ', plainUserInfo);
            response.status(200).send(plainUserInfo);
        }
        catch (error) {
            const failMessage = `No user is logged in yet. ${error}`;
            console.log(failMessage);
            // The 204 (No Content) HTTP Status Code response should exclude a message-body
            response.status(204).send();
        }
    });
}
exports.checkAccessCookie = checkAccessCookie;
