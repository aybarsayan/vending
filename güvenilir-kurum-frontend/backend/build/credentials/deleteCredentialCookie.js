"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteCredentialCookie = void 0;
/**
 *  This function deletes 'credentialJWT' Cookie from the browser.
 *
 * @param request
 * @param response
 */
function deleteCredentialCookie(request, response) {
    // read cookie from browser
    console.log('trying to delete the cookie via deleteCredentialCookie()');
    const credentialCookie = request.cookies.credentialJWT;
    if (!credentialCookie) {
        console.log('Cookie with the Credential-Request (as JWT) not found. Nothing to delete.');
        return;
    }
    // delete the cookie from browser
    response.clearCookie('credentialJWT');
    console.log('Cookie "credentialJWT" deleted from clients browser.\n');
}
exports.deleteCredentialCookie = deleteCredentialCookie;
