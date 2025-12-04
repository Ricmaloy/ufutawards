'use server'

import { getTokens } from 'next-firebase-auth-edge'
import { revalidatePath } from 'next/cache'
import { cookies } from 'next/headers'
import { authConfig } from '@/config/server-config'
import { getFirebaseApp } from '@/app/auth/firebase'
import {
  collection,
  getDocs,
  getFirestore,
  query,
  where,
  updateDoc,
  doc,
  arrayUnion,
  addDoc,
} from 'firebase/firestore'
import { toUser } from '@/app/shared/user'
// import { VoteProps } from '../page'

export type voteProps = {
  uid: string
  categoryId: string
  categoryTitle: string
  categorySlug: string
  voteTitle: string
  voteId: string
}

export async function vote({
  uid,
  categoryId,
  categorySlug,
  categoryTitle,
  voteId,
  voteTitle,
}: voteProps) {
  const tokens = await getTokens(await cookies(), authConfig)

  if (!tokens) {
    throw new Error('Cannot update counter of unauthenticated user')
  }

  const user = tokens ? toUser(tokens) : null

  const data = {
    id: uid,
    categoryId,
    categoryTitle,
    slug: categorySlug,
    voteId,
    voteTitle,
  }

  const db = getFirestore(getFirebaseApp())
  const votesRef = collection(db, 'votes')
  const votesQuery = query(votesRef, where('id', '==', uid))
  const votesSnapshot = await getDocs(votesQuery)

  const hasVoteDoc = !votesSnapshot.empty

  if (hasVoteDoc) {
    const votesIndex = votesSnapshot.docs[0].id

    const votesDocRef = doc(db, 'votes', votesIndex)

    await updateDoc(votesDocRef, {
      categories: arrayUnion(data),
    })
  } else {
    const votesDocRef = collection(db, 'votes')

    await addDoc(votesDocRef, {
      id: uid,
      name: user?.displayName,
      imageUrl: user?.photoURL,
      categories: [data],
    })
  }

  revalidatePath(`/category/${categorySlug}`)
  revalidatePath('/')
}
