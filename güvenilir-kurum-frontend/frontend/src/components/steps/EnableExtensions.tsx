import React from 'react'

import styles from './Step.module.css'

export default function EnableExtensions() {
  const kiltExtensionsApiInitialized =
    typeof (window as any).kilt?.meta !== 'undefined'

  return (
    <div className={styles.step}>
      <h2>1. Uzantıların Etkinleştirilmesi</h2>
      <p>
        Bu, uzantıların kendilerini ekleyebilmelerine izin veren işlemi ifade
        eder.
      </p>
      <p>
        Bu işlemi, web sitesi yüklendiğinde gerçekleştiriyoruz. İlgili kod
        'index.tsx' dosyasında bulunabilir.
      </p>
      {kiltExtensionsApiInitialized && '✅ Uzantılar etkinleştirildi'}
      {!kiltExtensionsApiInitialized && '❌ Uzantılar etkinleştirilmedi'}
      <p>
        Bunu doğrulamak için tarayıcınızın konsolunda 'window.kilt' komutunu
        çalıştırabilirsiniz.
      </p>
    </div>
  )
}
