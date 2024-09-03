"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.extractEncryptionKeyUri = void 0;
/**
 * The EncryptionKeyURI has different names depending on the Credential API version that the extension uses.
 *
 * @param extensionSession either PubSubSessionV1 or PubSubSessionV2
 * @returns encryptionKeyUri as Kilt.DidResourceUri
 */
function extractEncryptionKeyUri(extensionSession) {
    if (typeof extensionSession !== 'object' || !extensionSession) {
        throw new Error(`Not the type of variable expected. This function can only handle either "PubSubSessionV1" or "PubSubSessionV2"`);
    }
    let encryptionKeyUri;
    // if session is type PubSubSessionV1
    if ('encryptionKeyId' in extensionSession) {
        encryptionKeyUri = extensionSession.encryptionKeyId;
        // Version 1 had a misleading name for this variable
    }
    else if ('encryptionKeyUri' in extensionSession) {
        // if session is type PubSubSessionV2
        encryptionKeyUri = extensionSession.encryptionKeyUri;
    }
    else {
        throw new Error(`encryptionKeyUri or encryptionKeyId not found`);
    }
    return encryptionKeyUri;
}
exports.extractEncryptionKeyUri = extractEncryptionKeyUri;
