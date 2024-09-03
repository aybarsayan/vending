import * as Kilt from '@kiltprotocol/sdk-js'
async function verifyPresentation(
    presentation: Kilt.ICredentialPresentation,
    challenge: string,
    trustedAttesterUris: Kilt.DidUri[]
  ): Promise<boolean> {
    Kilt.ConfigService.get('api')
  
    try {
      const { revoked, attester } = await Kilt.Credential.verifyPresentation(
        presentation,
        { challenge }
      )
  
      if (revoked) {
        return false
      }
      // Returns true if no trusted attester URI is provided or, if it is, if it matches the one that issued the presented credential.
      return trustedAttesterUris.includes(attester)
    } catch (err){
      console.log(err);
      return false
    }
  }

export async function verificationFlow(presentation:any) : Promise<Boolean>{
    const trustedAttesterUris = ["did:kilt:4pehddkhEanexVTTzWAtrrfo2R7xPnePpuiJLC7shQU894aY" as Kilt.DidUri]
    // The verifier checks the presentation.
    const isValid = await verifyPresentation(
      presentation as Kilt.ICredentialPresentation,
      presentation.claimerSignature.challenge,
      trustedAttesterUris
    )
    if (isValid) {
      return true
    } else {
      return false
    }
}