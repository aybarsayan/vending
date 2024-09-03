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
exports.logout = void 0;
const deleteCredentialCookie_1 = require("../credentials/deleteCredentialCookie");
const deleteSessionCookie_1 = require("../session/deleteSessionCookie");
const deleteAccessCookie_1 = require("./deleteAccessCookie");
function logout(request, response) {
    return __awaiter(this, void 0, void 0, function* () {
        // Activate whatever custom action your dApp's backend should do on users logout here.
        (0, deleteCredentialCookie_1.deleteCredentialCookie)(request, response);
        (0, deleteSessionCookie_1.deleteSessionCookie)(request, response);
        (0, deleteAccessCookie_1.deleteAccessCookie)(request, response);
        response.status(200).send('User has been logged out.');
    });
}
exports.logout = logout;
