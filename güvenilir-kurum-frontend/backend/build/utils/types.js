"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const vc_export_1 = require("@kiltprotocol/vc-export");
const DEFAULT_VERIFIABLECREDENTIAL_CONTEXT = vc_export_1.constants.DEFAULT_VERIFIABLECREDENTIAL_CONTEXT; // 'https://www.w3.org/2018/credentials/v1';
const context = [
    DEFAULT_VERIFIABLECREDENTIAL_CONTEXT,
    'https://identity.foundation/.well-known/did-configuration/v1'
];
