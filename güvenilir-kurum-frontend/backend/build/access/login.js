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
exports.handleLoginCredentialSubmission = exports.buildLoginCredentialRequest = void 0;
const cTypesToRequest_1 = require("../credentials/cTypesToRequest");
const buildCredentialRequest_1 = require("../credentials/buildCredentialRequest");
const verifySubmittedCredential_1 = require("../credentials/verifySubmittedCredential");
const setAccessCookie_1 = require("./setAccessCookie");
/** First half of the login with credentials.*/
function buildLoginCredentialRequest(request, response) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const encryptedCredentialRequest = yield (0, buildCredentialRequest_1.buildCredentialRequest)(request, response, cTypesToRequest_1.cTypesToRequest);
            // With this, the extension will know what kind of credential to share
            response.status(200).send(encryptedCredentialRequest);
        }
        catch (error) {
            console.log('Get Request Credential Error.', error);
        }
    });
}
exports.buildLoginCredentialRequest = buildLoginCredentialRequest;
/** Second half of the login with credentials. */
function handleLoginCredentialSubmission(request, response) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const verifiedCredential = yield (0, verifySubmittedCredential_1.verifySubmittedCredential)(request, response, cTypesToRequest_1.cTypesToRequest);
            // Send a little something to the frontend, so that the user interface can display who logged in.
            // The frontend can't read the encrypted credential; only the backend has the key to decrypt it.
            const claimContents = verifiedCredential.claim.contents;
            // Check if any properties have been provided. If not, send 'Anonymous User' to display on the frontend.
            // If any property exists, send object's first attribute value,
            // ensuring compatibility with any 'cType'.
            const plainUserInfo = Object.keys(claimContents).length === 0
                ? 'Anonymous User'
                : claimContents[Object.keys(claimContents)[0]];
            console.log('Decrypted User Info that we are passing to the frontend:', plainUserInfo);
            // From here on it's all like web2:
            // Please, replace/complete here with your websites method of encoding authentication tokens:
            const authenticationToken = plainUserInfo;
            (0, setAccessCookie_1.setAccessCookie)(response, authenticationToken);
            response.status(200).send(verifiedCredential);
        }
        catch (error) {
            const errorMessage = `Post Submit Credential Error. ${error}`;
            console.log(errorMessage);
            response.status(420).send(errorMessage);
        }
    });
}
exports.handleLoginCredentialSubmission = handleLoginCredentialSubmission;
