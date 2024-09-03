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
var _a, _b, _c;
Object.defineProperty(exports, "__esModule", { value: true });
exports.cookieOptions = exports.validateOurKeys = exports.validateEnvironmentConstants = exports.DAPP_ACCOUNT_ADDRESS = exports.REQUIRED_PROPERTIES = exports.TRUSTED_ATTESTERS = exports.CTYPE_HASH = exports.JWT_SIGNER_SECRET = exports.DAPP_NAME = exports.DAPP_DID_URI = exports.DAPP_DID_MNEMONIC = exports.DAPP_ACCOUNT_MNEMONIC = exports.BACKEND_PORT = exports.WSS_ADDRESS = void 0;
const path_1 = __importDefault(require("path"));
const dotenv_1 = __importDefault(require("dotenv"));
const Kilt = __importStar(require("@kiltprotocol/sdk-js"));
const util_1 = require("@polkadot/util");
const generateAccount_1 = require("./utils/generateAccount");
const generateKeyPairs_1 = require("./utils/generateKeyPairs");
const fetchDidDocument_1 = require("./utils/fetchDidDocument");
const connection_1 = require("./utils/connection");
// Letting the server know where the environment variables are.
// Since we are inside a monorepo, the `.env` file is not part of this package, but of the parent directory of this package; the root's directory.
const envPath = path_1.default.resolve(__dirname, '../..', '.env');
dotenv_1.default.config({ path: envPath });
exports.WSS_ADDRESS = (_a = process.env.WSS_ADDRESS) !== null && _a !== void 0 ? _a : 'wss://peregrine.kilt.io';
exports.BACKEND_PORT = (_b = process.env.BACKEND_PORT) !== null && _b !== void 0 ? _b : 2525;
exports.DAPP_ACCOUNT_MNEMONIC = loadEnv('DAPP_ACCOUNT_MNEMONIC');
exports.DAPP_DID_MNEMONIC = loadEnv('DAPP_DID_MNEMONIC');
exports.DAPP_DID_URI = loadEnv('DAPP_DID_URI');
exports.DAPP_NAME = (_c = process.env.DAPP_NAME) !== null && _c !== void 0 ? _c : 'Web3-Login-Demo';
exports.JWT_SIGNER_SECRET = loadEnv('JWT_SIGNER_SECRET');
// Configurable Credential types
exports.CTYPE_HASH = loadEnv('CTYPE_HASH');
exports.TRUSTED_ATTESTERS = loadEnv('TRUSTED_ATTESTERS');
exports.REQUIRED_PROPERTIES = loadEnv('REQUIRED_PROPERTIES');
function loadEnv(name) {
    const envValue = process.env[name];
    if (!envValue) {
        throw new Error(`Environment constant '${name}' is missing. Define it on the project's root directory '.env'-file. \n`);
    }
    return envValue;
}
function validateEnvironmentConstants() {
    return __awaiter(this, void 0, void 0, function* () {
        yield (0, connection_1.getApi)();
        exports.DAPP_ACCOUNT_ADDRESS = yield deduceAccountAddress();
        Kilt.Did.validateUri(exports.DAPP_DID_URI, 'Did');
        const ourDidDocumentOnChain = yield (0, fetchDidDocument_1.fetchDidDocument)();
        yield validateOurKeys(ourDidDocumentOnChain);
    });
}
exports.validateEnvironmentConstants = validateEnvironmentConstants;
/**  To avoid the possibility of having a mnemonic and account that don't match, the address is generated from the mnemonic each time.
 * @returns DAPP_ACCOUNT_ADDRESS
 */
function deduceAccountAddress() {
    return __awaiter(this, void 0, void 0, function* () {
        const dAppAccount = (0, generateAccount_1.generateAccount)(exports.DAPP_ACCOUNT_MNEMONIC);
        return dAppAccount.address;
    });
}
/**
 * This function checks that the public keys linked to our DID on chain match the ones we generate now.
 *
 * This would fail if the keys derivation path has changed.
 *
 * If this fails, it means you can not sign or encrypt anything that could be verified or decrypted by your counterpart.
 *
 * @param didDocument
 */
function validateOurKeys(didDocument) {
    var _a, _b;
    return __awaiter(this, void 0, void 0, function* () {
        const localKeyPairs = (0, generateKeyPairs_1.generateKeyPairs)(exports.DAPP_DID_MNEMONIC);
        // A DID can have several keys of type 'keyAgreement', but only up to one key of each of the other types.
        // All DIDs need to have an 'authentication' key, so this first assertion should never fail
        const necessaryTypesOfKeys = [
            'authentication',
            'assertionMethod',
            'keyAgreement'
        ];
        for (const keyName of necessaryTypesOfKeys) {
            yield compareKey((_a = didDocument[keyName]) === null || _a === void 0 ? void 0 : _a[0], localKeyPairs[keyName], keyName);
        }
        // don't throw if 'capabilityDelegation' key is missing because it is not really necessary for this project
        const trivialKey = 'capabilityDelegation';
        try {
            yield compareKey((_b = didDocument[trivialKey]) === null || _b === void 0 ? void 0 : _b[0], localKeyPairs[trivialKey], trivialKey);
        }
        catch (warning) {
            console.log(`Non-essential Key "${trivialKey}" not available. Reason: "${warning}" `);
        }
    });
}
exports.validateOurKeys = validateOurKeys;
function compareKey(resolved, derived, relationship) {
    return __awaiter(this, void 0, void 0, function* () {
        if (!resolved) {
            throw new Error(`No "${relationship}" Key for your DID found on chain.`);
        }
        if (!(0, util_1.u8aEq)(derived.publicKey, resolved.publicKey)) {
            throw new Error(`Public "${relationship}" Key on chain does not match what we are generating.`);
        }
    });
}
// Set Cookie Options: (list of ingredients)
exports.cookieOptions = {
    // Indicates the number of milliseconds until the Cookie expires.
    // On this demo the cookies have a lifetime of 1 hour. The shorter the securest.
    maxAge: 60 * 60 * 1000,
    // only send over HTTPS
    secure: true,
    // prevent cross-site request forgery attacks
    sameSite: 'strict',
    // restricts URL that can request the Cookie from the browser. '/' works for the entire domain.
    path: '/',
    // Forbids JavaScript from accessing the cookie
    httpOnly: true
};
