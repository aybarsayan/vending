"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteSessionCookie = void 0;
/**
 *
 *  This function deletes 'sessionJWT' Cookie from the browser.
 *
 * @param request
 * @param response
 */
function deleteSessionCookie(request, response) {
    // read cookie from browser
    console.log('trying to delete the cookie via deleteSessionCookie()');
    const sessionJWT = request.cookies.sessionJWT;
    if (!sessionJWT) {
        console.log('Cookie with Session JWT not found. Nothing to delete.');
        return;
    }
    // delete the cookie from browser
    response.clearCookie('sessionJWT');
    console.log('Cookie "sessionJWT" deleted from clients browser.\n');
}
exports.deleteSessionCookie = deleteSessionCookie;
