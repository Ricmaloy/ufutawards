import admin from 'firebase-admin'
import { authConfig } from '../config/server-config'
// import { collection, getFirestore } from 'firebase/firestore'
// import { getFirebaseApp } from './auth/firebase'
// import { getTokens } from 'next-firebase-auth-edge'

const initializeApp = () => {
  if (!authConfig.serviceAccount) {
    return admin.initializeApp()
  }

  return admin.initializeApp({
    credential: admin.credential.cert(authConfig.serviceAccount),
  })
}

export const getFirebaseAdminApp = () => {
  if (admin.apps.length > 0) {
    return admin.apps[0] as admin.app.App
  }

  // admin.firestore.setLogFunction(console.log);

  return initializeApp()
}

// export const addVote = async () => {
//   const db = getFirestore(getFirebaseApp())

//   const tokens = await getTokens(request.cookies, authConfig)

//   if (!tokens) {
//     throw new Error('Cannot vote of unauthenticated user')
//   }

//   const votesRef = collection(db, 'votes')
// }
