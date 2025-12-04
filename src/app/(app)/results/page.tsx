import Link from 'next/link'
import { getFirebaseApp } from '@/app/auth/firebase'
import { Button } from '@/components/ui/button'
import { CategoryPieChart } from '@/components/ui/CatergoryPieChart'
import { CountUpCard } from '@/components/ui/CountUpCard'
import { VisitorsAreaChart } from '@/components/VisitorsAreaChart'
import { VotesRadialChart } from '@/components/VotesRadialChart'
import { authConfig } from '@/config/server-config'
import { collection, getDocs, getFirestore } from 'firebase/firestore'
import { ArrowLeft, CalendarArrowDown, Clock, PawPrint, Trophy } from 'lucide-react'
import { getTokens } from 'next-firebase-auth-edge'
import { cookies } from 'next/headers'

const db = getFirestore(getFirebaseApp())

export type VoteProps = {
  refId: string
  id: string
  slug: string
  imageUrl: string
  name: string
  categories: {
    id: string
    categoryId: string
    categoryTitle: string
    slug: string
    voteId: string
    voteTitle: string
  }[]
}

const colors = [
  // '#172554', // chart-1
  // '#1e3a8a', // chart-2
  // '#1e40af', // chart-3
  '#1d4ed8', // chart-4
  // '#2563eb', // chart-5
  '#3b82f6', // chart-6
  '#60a5fa', // chart-7
  '#bfdbfe', // chart-8
  '#dbeafe', // chart-9
  '#eff6ff', // chart-10
]

// function getRandomHexColor(): string {
//   return `#${Math.floor(Math.random() * 16777215)
//     .toString(16)
//     .padStart(6, '0')}`
// }

async function getVotes() {
  const tokens = await getTokens(await cookies(), authConfig)

  if (!tokens) {
    throw new Error('Cannot get votes of unauthenticated user')
  }

  const categoriesRef = collection(db, 'categories')
  const categoriesSnapshot = await getDocs(categoriesRef)

  const votesRef = collection(db, 'votes')
  const votesSnapshot = await getDocs(votesRef)

  const votesResponse = votesSnapshot.docs.map((vote) => {
    return {
      ...vote.data(),
      id: vote.id,
    }
  }) as VoteProps[]

  const allVotes = votesResponse
    .map((vote) => {
      return {
        votes: vote.categories,
      }
    })
    .flatMap((item) => item.votes)

  const categories = categoriesSnapshot.docs.map((doc) => {
    const categoryVotes = allVotes
      .filter((votes) => votes.slug === doc.data().slug)
      .map((vote) => {
        return {
          name: vote.voteTitle,
        }
      })

    const categoryNominees = Object.entries(
      categoryVotes.reduce<Record<string, number>>((acc, { name }) => {
        acc[name] = (acc[name] || 0) + 1

        return acc
      }, {}),
    ).map(([name, count], index) => ({
      name,
      count,
      fill: colors[index % colors.length],
    }))

    return {
      votes: categoryNominees,
      id: doc.id,
      slug: doc.data().slug,
      title: doc.data().title,
      description: doc.data().description,
    }
  })

  return {
    votes: votesResponse,
    categories,
  }
}

export default async function Results() {
  const { categories, votes } = await getVotes()

  return (
    <div className="flex flex-col relative gap-4">
      <Link
        href={'/'}
        className="mt-4 md:absolute md:top-4 md:-left-16 md:mt-0"
      >
        <Button className="size-12 text-neutral-950 bg-neutral-100 border border-neutral-200 hover:bg-neutral-200">
          <ArrowLeft />
        </Button>
      </Link>

      <div className="flex flex-col gap-2 md:mt-6">
        <h1 className="text-neutral-950 text-xl font-bold">Resultados Gerais</h1>
        <span className="text-neutral-700 italic">
          Aqui as estatísticas como um todo da plataforma, contabilizando
          acessos, votos e visualizações para um melhor insight da ferramenta
        </span>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <CountUpCard
          title="Categorias ativas"
          description="Categorias de voto aberto"
          count={categories.length}
        >
          <Trophy className="size-6 text-neutral-600" />
        </CountUpCard>
        <CountUpCard
          title="Dias restantes"
          description="Não deixe para votar no final"
          count={11}
        >
          <CalendarArrowDown className="size-6 text-neutral-600" />
        </CountUpCard>
        <CountUpCard
          title="Minutos de Palestra"
          description="Um minutinho pessoal! Vou ser breve!!"
          count={118}
        >
          <Clock className="size-6 text-neutral-600" />
        </CountUpCard>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <VisitorsAreaChart />

        <VotesRadialChart votes={votes} />
      </div>

      <div className="flex flex-col gap-2 mt-6">
        <h1 className="text-neutral-950 text-xl font-bold">Resultados Individuais</h1>
        <span className="text-neutral-700 italic">
          Aqui estão os vencedores de cada categoria, dispostos em gráficos para
          que facilite a visualização.
        </span>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
        {categories.map((category) => {
          return (
            <CategoryPieChart
              key={category.id}
              slug={category.slug}
              title={category.title}
              description={category.description}
              votes={category.votes}
            />
          )
        })}
      </div>
    </div>
  )
}
