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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const body_parser_1 = __importDefault(require("body-parser"));
const cookie_parser_1 = __importDefault(require("cookie-parser"));
// Getting necessary environment constants:
const config_1 = require("./config");
const startSession_1 = require("./session/startSession");
const verifySession_1 = require("./session/verifySession");
const fetchDidDocument_1 = require("./utils/fetchDidDocument");
const login_1 = require("./access/login");
const logout_1 = require("./access/logout");
const checkAccessCookie_1 = require("./access/checkAccessCookie");
const connection_1 = require("./utils/connection");
const app = (0, express_1.default)();
// Activating Middleware:
// for parsing application/json
app.use(body_parser_1.default.json());
// for parsing application/x-www-form-urlencoded
app.use(body_parser_1.default.urlencoded({ extended: true }));
// Tell the browser that only these URLs should be allowed to make request to this server.
// If you host the app using a different URL, you need to add it here.
app.use((0, cors_1.default)({
    origin: [
        `http://localhost:${config_1.BACKEND_PORT}`,
        `http://127.0.0.1:${config_1.BACKEND_PORT}`,
        `http://[::1]:${config_1.BACKEND_PORT}`
    ]
}));
// Utility to handle cookies. Backing has never been easier.
app.use((0, cookie_parser_1.default)());
// Print the URL requested
app.use((req, res, next) => {
    console.log(`Trigger: ${req.url}`);
    next();
});
// Setting GET and POST functions
app.get('/api', (req, res) => {
    res.status(200).json('Welcome to the API for the KILT Web3 Login');
});
// manage Session:
// Starts the session from server side.
app.get('/api/session/start', (req, res, next) => (0, startSession_1.startSession)(req, res).catch(next));
// Process session values from the extension and verify that secure communication is stablish. (compares challenge)
app.post('/api/session/verify', (req, res, next) => (0, verifySession_1.verifySession)(req, res).catch(next));
// Manage Access:
app.get('/api/credential/login/request', (req, res, next) => (0, login_1.buildLoginCredentialRequest)(req, res).catch(next));
app.post('/api/credential/login/submit', (req, res, next) => (0, login_1.handleLoginCredentialSubmission)(req, res).catch(next));
app.get('/api/access/checkAccess', (req, res, next) => (0, checkAccessCookie_1.checkAccessCookie)(req, res).catch(next));
app.post('/api/access/logout', (req, res, next) => (0, logout_1.logout)(req, res).catch(next));
//Start the server:
(0, config_1.validateEnvironmentConstants)()
    .catch((error) => {
    throw new Error(`Trouble validating the environment constants: ${error}`);
})
    .then(
// We need the DID Document of the dApps DID (DAPP_DID_URI) before we can handle login requests.
// We therefore start the server only after the document was fetched.
fetchDidDocument_1.fetchDidDocument)
    .then((doccy) => {
    app.locals.dappDidDocument = doccy;
    app.enable('trust proxy');
    // wait for fetched document before server starts listening:
    app.listen(config_1.BACKEND_PORT, () => {
        console.log(`⚡️ Server is running at http://localhost:${config_1.BACKEND_PORT}`);
    });
})
    .catch((error) => {
    throw new Error(`\n ❌ Could not start server! ${error} \n`);
})
    .then(
// connect with the kilt api
connectToKiltWebSocket
// the server will not crash if this fails
);
function connectToKiltWebSocket() {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            // internally calls Kilt.connect(WSS_ADDRESS)
            yield (0, connection_1.getApi)();
            console.log(`🔗[websocket]: Connected to WebSocket server at ${config_1.WSS_ADDRESS}`);
        }
        catch (error) {
            console.error(`❌[websocket]: Failed to connect to WebSocket server at ${config_1.WSS_ADDRESS}`, error);
        }
    });
}
