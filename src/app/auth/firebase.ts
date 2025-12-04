import { getApp, getApps, initializeApp } from 'firebase/app'
import {
  connectAuthEmulator,
  getAuth,
  inMemoryPersistence,
  setPersistence,
} from 'firebase/auth'
import { clientConfig } from '../../config/client-config'
import { getStorage } from 'firebase/storage'

export const getFirebaseApp = () => {
  if (getApps().length) {
    return getApp()
  }

  const app = initializeApp(clientConfig)

  return app
}

export function getFirebaseAuth() {
  const auth = getAuth(getFirebaseApp())

  // App relies only on server token. We make sure Firebase does not store credentials in the browser.
  // See: https://github.com/awinogrodzki/next-firebase-auth-edge/issues/143
  setPersistence(auth, inMemoryPersistence)

  if (process.env.NEXT_PUBLIC_EMULATOR_HOST) {
    // https://stackoverflow.com/questions/73605307/firebase-auth-emulator-fails-intermittently-with-auth-emulator-config-failed
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    ;(auth as unknown as any)._canInitEmulator = true
    connectAuthEmulator(auth, process.env.NEXT_PUBLIC_EMULATOR_HOST, {
      disableWarnings: true,
    })
  }

  return auth
}

export function getFirebaseStorage() {
  const app = getFirebaseApp()

  // Log configuration for debugging
  console.log('🔧 Firebase Config:', {
    projectId: app.options.projectId,
    storageBucket: app.options.storageBucket,
  })

  const storage = getStorage(app)

  console.log('📦 Storage bucket URL:', storage.app.options.storageBucket)

  return storage
}
