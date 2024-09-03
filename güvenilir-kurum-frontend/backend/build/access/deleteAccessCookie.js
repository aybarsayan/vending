"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteAccessCookie = void 0;
/**
 *  This function deletes 'accessJWT' Cookie from the browser.
 *
 * @param request
 * @param response
 */
function deleteAccessCookie(request, response) {
    // read cookie from browser
    console.log('trying to delete the cookie via deleteAccessCookie()');
    const accessCookie = request.cookies.accessJWT;
    if (!accessCookie) {
        console.log('Cookie with authentication token (as JWT) not found. Nothing to delete.');
        return;
    }
    // delete the cookie from browser
    response.clearCookie('accessJWT');
    console.log('Cookie "accessJWT" deleted from clients browser.\n');
}
exports.deleteAccessCookie = deleteAccessCookie;
