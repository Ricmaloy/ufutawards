import { Progress } from '@/components/ui/Progress'
import { CategoryCard } from '@/components/ui/CategoryCard'
import {
  getFirestore,
  collection,
  query,
  getDocs,
  where,
} from 'firebase/firestore'
import { getFirebaseApp } from '../auth/firebase'
import { authConfig } from '@/config/server-config'
import { getTokens } from 'next-firebase-auth-edge/lib/next/tokens'
import { cookies } from 'next/headers'
// import { TriangleAlert } from 'lucide-react'
// import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert'

export type CategoryProps = {
  id: string
  title: string
  slug: string
  description: string
  voted: boolean
  side: string
  nominees: {
    id: string
    name: string
    imageUrl: string
  }[]
}

export type CategoriesProps = Array<CategoryProps>

export type VoteProps = {
  refId: string
  id: string
  categories: {
    id: string
    categoryId: string
    categoryTitle: string
    slug: string
    voteId: string
    voteTitle: string
  }[]
}

const db = getFirestore(getFirebaseApp())

async function getCategories() {
  const tokens = await getTokens(await cookies(), authConfig)

  if (!tokens) {
    throw new Error('Cannot get counter of unauthenticated user')
  }

  const { uid } = tokens.decodedToken

  const votesRef = collection(db, 'votes')
  const votesQuery = query(votesRef, where('id', '==', uid))
  const votesSnapshot = await getDocs(votesQuery)

  const votesData = votesSnapshot.docs.map((vote) => ({
    ...vote.data(),
    id: vote.id,
  }))[0] as VoteProps

  const votesCategory = votesData?.categories.map((category) => {
    return {
      id: category.categoryId,
    }
  })

  const categoriesRef = collection(db, 'categories')
  const categoriesQuery = query(categoriesRef)
  const categoriesSnapshot = await getDocs(categoriesQuery)

  const categoriesData = categoriesSnapshot.docs.map((doc) => {
    const hasUserVoted = votesCategory?.find((vote) => vote.id === doc.id)

    return {
      ...doc.data(),
      id: doc.id,
      voted: !!hasUserVoted,
    }
  })

  const openVoteCategoriesA = categoriesData.filter((data) => {
    const category = data as CategoryProps

    if (category.side === 'A') {
      return {
        ...category,
      }
    }

    return null
  })

  const openVoteCategoriesB = categoriesData.filter((data) => {
    const category = data as CategoryProps

    if (category.side === 'B') {
      return {
        ...category,
      }
    }

    return null
  })

  const categoriesSize = openVoteCategoriesA.length + openVoteCategoriesB.length
  const votesSize = votesCategory?.length || 0

  // const votesCategory = votesData.categories.map((vote) => {
  //   return (
  //     id : vote.
  //   )
  // })

  // const vote = {
  //   id: 'gtJQ5q2YIIZ2Hc428oteCQrozfg2',
  //   categories: [
  //     {
  //       id: 'gtJQ5q2YIIZ2Hc428oteCQrozfg2',
  //       categoryId: 'h9N6RNwpskwajBSnXUrD',
  //       categoryTitle: 'Melhor tamborim',
  //       voteId: 'L8avIx0aGISPuOnE4YQS',
  //       voteTitle: 'Ricardo Zamboni',
  //     },
  //     {
  //       id: 'gtJQ5q2YIIZ2Hc428oteCQrozfg2',
  //       categoryId: 'h9N6RNwpskwajBSnXUrD',
  //       categoryTitle: 'Melhor caixa',
  //       voteId: 'L8avIx0aGISPuOnE4YQS',
  //       voteTitle: 'Ricardo Zamboni',
  //     },
  //   ],
  // }
  // await addDoc(votesRef, vote)

  // await setDoc(doc(categoriesRef), cat)

  // console.log(categoriesData)

  return {
    categoriesA: categoriesData as CategoriesProps,
    categoriesB: categoriesData as CategoriesProps,
    categoriesSize,
    votesSize,
  }
}

export default async function Home() {
  const { categoriesA, categoriesB, categoriesSize, votesSize } = await getCategories()

  const sideACategories = categoriesA.filter((category) => category.side === 'A')
  const sideBCategories = categoriesB.filter((category) => category.side === 'B')

  return (
    <>
      <Progress totalCategories={categoriesSize} votedCategories={votesSize} />

      <div className="flex flex-col gap-8 mt-10 ">
        <div className="flex flex-col gap-1">
          <p className="text-neutral-950 font-bold text-xl leading-5">Lado A</p>
          <span className="text-neutral-700 text-sm leading-5 mt-2">
            É hora de celebrar os ritmistas que marcaram o ano com seu talento,
            dedicação e espírito único, enaltecendo conquistas musicais,
            técnicas e momentos memoráveis.
          </span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
          {sideACategories.map((category) => {
            return (
              <CategoryCard
                key={category.id}
                title={category.title}
                description={category.description}
                nominees={category.nominees.length}
                slug={category.slug}
                voted={category.voted}
              />
            )
          })}
        </div>
      </div>

      <div className="flex flex-col gap-8 mt-10">
        <div className="flex flex-col gap-1">
          <p className="text-neutral-950 font-bold text-xl leading-5">Lado B</p>
          <span className="text-neutral-700 text-sm leading-5 mt-2">
            A localização você ja conhece e sabe que é de lei, então eis aqui o
            puro suco da Bateria Ufuteria em todo seu louvor e muitas
            gracinhas e piadinhas
          </span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2  md:grid-cols-4 gap-4">
          {sideBCategories.map((category) => {
            return (
              <CategoryCard
                key={category.id}
                title={category.title}
                description={category.description}
                nominees={category.nominees.length}
                slug={category.slug}
                voted={category.voted}
              />
            )
          })}
        </div>
      </div>
    </>
  )
}
