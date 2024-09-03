"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.cTypesToRequest = void 0;
const Kilt = __importStar(require("@kiltprotocol/sdk-js"));
const config_1 = require("../config");
/** Establish the types of credentials (cTypes) that our dApp will request from users to log in,
 * identify which properties are necessary, and specify which attesters we trust.
 *
 * These settings are defined by the constants imported from the config file.
 * Modify the `env` file to adapt it to your preferences.
 */
const cTypeHashes = config_1.CTYPE_HASH.split('/').map((s) => s.trim());
const trustedAttesterList = config_1.TRUSTED_ATTESTERS.split('/').map((s) => s.trim());
const requiredPropertiesList = config_1.REQUIRED_PROPERTIES.split('/').map((s) => s.trim());
const cTypes = [];
for (let i = 0; i < cTypeHashes.length; i++) {
    const trustedAttesters = trustedAttesterList[i].split(',').map((s) => {
        const trimmed = s.trim();
        Kilt.Did.validateUri(trimmed);
        return trimmed;
    });
    const requiredProperties = requiredPropertiesList[i]
        .split(',')
        .map((s) => s.trim());
    const cType = {
        cTypeHash: cTypeHashes[i],
        trustedAttesters,
        requiredProperties
    };
    cTypes.push(cType);
}
exports.cTypesToRequest = {
    cTypes
};
