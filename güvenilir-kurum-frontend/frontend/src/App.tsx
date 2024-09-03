import React, { useEffect, useState } from 'react'

import { watchExtensions, Types } from 'kilt-extension-api'

import Card from './components/Card'
import Logo from './components/Logo'
import Page from './components/Page'

import EnableExtensions from './components/steps/EnableExtensions'
import ChooseExtension from './components/steps/ChooseExtension'
import StartSession from './components/steps/StartSession'
import SubmitCredential from './components/steps/SubmitCredentials'

import { checkAccessCookie } from './api/checkAccessCookie'
import Modal from './components/Modal'

export default function Home(): JSX.Element {
  const [extensions, setExtensions] = useState<
    Types.InjectedWindowProvider<
      Types.PubSubSessionV1 | Types.PubSubSessionV2
    >[]
  >([])

  // Name of the extension to interact with from the extensions (state) array
  const [chosenExtension, setChosenExtension] = useState<string>()

  const [extensionSession, setExtensionSession] = useState<
    Types.PubSubSessionV1 | Types.PubSubSessionV2 | null
  >(null)

  const [userMail, setUserMail] = useState<string>()

  // Controls when to pop up a modal with a message to the UI
  const [messageForModal, setMessageForModal] = useState<string | undefined>()

  async function pastChecker() {
    try {
      const oldCookieInfo = await checkAccessCookie()
      setUserMail(oldCookieInfo)
    } catch (error) {
      console.log('No user logged in yet.')
    }
  }

  useEffect(() => {
    // check if the user already has access granted
    pastChecker()

    // Directly inject the extensions that support the KILT protocol
    const stopWatching = watchExtensions((extensions) => {
      setExtensions(extensions)
    })
    // the clean-up:
    return stopWatching
  }, [])

  return (
    <Page>
      <Page.Header>
        <Logo />
      </Page.Header>
      <Page.Content>
        <Page.Section>
          <Card>
            <h1>RFID Karta Yazmak İçin Doğrulanabilir DID Seç</h1>

            <EnableExtensions />
            <ChooseExtension
              extensions={extensions}
              chosenExtension={chosenExtension}
              setChosenExtension={setChosenExtension}
              extensionSession={extensionSession}
            />
            <StartSession
              chosenExtension={chosenExtension}
              setChosenExtension={setChosenExtension}
              extensionSession={extensionSession}
              setExtensionSession={setExtensionSession}
              onError={setMessageForModal}
            />
            <SubmitCredential
              extensionSession={extensionSession}
              setExtensionSession={setExtensionSession}
              userMail={userMail}
              setUserMail={setUserMail}
              onError={setMessageForModal}
            />
            <p>
              Bu adımlar ile Merkeziyetsiz kimliğinizi içeren bir kart
              oluşturabileceksiniz
            </p>
          </Card>
          <Modal
            modalName="Error during the Step by Step Process"
            message={messageForModal}
            setMessageForModal={setMessageForModal}
          />
        </Page.Section>
      </Page.Content>
    </Page>
  )
}
