import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { ArrowLeft } from 'lucide-react'
import { Dialog } from '@radix-ui/react-dialog'
import { getTokens } from 'next-firebase-auth-edge'
import { cookies } from 'next/headers'
import {
  collection,
  getDocs,
  getFirestore,
  query,
  where,
} from 'firebase/firestore'
import { getFirebaseApp } from '@/app/auth/firebase'
import { authConfig } from '@/config/server-config'
import { VoteProps } from '../../page'
import { Nominees } from './nominees'

export type CategoryProps = {
  id: string
  synopsis: string
  title: string
  slug: string
  description: string
  nominees: {
    id: string
    name: string
    imageUrl: string
  }[]
}

const db = getFirestore(getFirebaseApp())

async function getCategory({ slug }: { slug: string }) {
  const tokens = await getTokens(await cookies(), authConfig)

  if (!tokens) {
    throw new Error('Cannot get votes of unauthenticated user')
  }

  const { uid } = tokens.decodedToken

  const votesRef = collection(db, 'votes')
  const votesQuery = query(votesRef, where('id', '==', uid))
  const votesSnapshot = await getDocs(votesQuery)

  const votesResponse = votesSnapshot.docs.map((vote) => {
    return {
      ...vote.data(),
      id: vote.id,
    }
  })[0] as VoteProps

  const vote = votesResponse?.categories.filter(
    (category) => category.slug === slug,
  )[0]

  const categoriesRef = collection(db, 'categories')
  const categoriesQuery = query(categoriesRef, where('slug', '==', `${slug}`))
  const categoriesSnapshot = await getDocs(categoriesQuery)

  const categoryData = categoriesSnapshot.docs.map((doc) => {
    return {
      ...doc.data(),
      id: doc.id,
    }
  })[0]

  return {
    category: categoryData as CategoryProps,
    vote,
    userId: uid,
  }
}

export default async function Category({
  params,
}: {
  params: Promise<{ slug: string }>
}) {
  const { slug } = await params
  const { category, vote, userId } = await getCategory({ slug })

  const hasUserVoted = !!vote

  return (
    <Dialog>
      <div className="flex flex-col items-center relative py-24">
        <Link href={'/'} className="absolute top-4 left-0">
          <Button className="size-12 text-neutral-950 bg-neutral-100 border border-neutral-200 hover:bg-neutral-200">
            <ArrowLeft />
          </Button>
        </Link>

        <span className="text-xl font-bold text-neutral-800 tracking-wider">
          Categoria
        </span>
        <p className="text-5xl text-neutral-950 text-center tracking-wider">
          {category.title}
        </p>
        <span className="text-sm text-neutral-800 mt-9 italic text-center">
          {category.synopsis}
        </span>

        <Nominees
          userId={userId}
          category={category}
          nominees={category.nominees}
          hasUserVoted={hasUserVoted}
          voteId={vote?.voteId}
        />
      </div>
    </Dialog>
  )
}
