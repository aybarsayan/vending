import React from 'react'

import { Types } from 'kilt-extension-api'

import styles from './Step.module.css'

import RadioButtons from '../RadioButtons'

interface Props {
  extensions: Types.InjectedWindowProvider<
    Types.PubSubSessionV1 | Types.PubSubSessionV2
  >[]
  chosenExtension: string | undefined
  setChosenExtension: (name: string) => void
  extensionSession: Types.PubSubSessionV1 | Types.PubSubSessionV2 | null
}

function ChooseExtension({
  extensions,
  chosenExtension,
  setChosenExtension,
  extensionSession
}: Props) {
  return (
    <div className={styles.step}>
      <h2>2. Hangi Uzantıyı Kullanmak İstediğinizi Seçin:</h2>
      <RadioButtons
        wrapperName="List of Extensions to Select from"
        choices={extensions.map((extensionObject) => extensionObject.name)}
        selectedValue={chosenExtension}
        onChange={setChosenExtension}
        disabled={Boolean(extensionSession)}
      />
    </div>
  )
}

export default ChooseExtension
