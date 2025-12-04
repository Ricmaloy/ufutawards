'use client'

import { getFirebaseApp } from '@/app/auth/firebase'
import { addDoc, collection, getFirestore } from 'firebase/firestore'

const db = getFirestore(getFirebaseApp())

export function DataButton() {
  async function addDataToFirestore() {
    const categoriesRef = collection(db, 'categories')

    const cat = {
      title: 'Inimigo da Moda',
      slug: 'inimigo-da-moda',
      synopsis:
        'Esta categoria, reconhece o ritmista que mais ousou e descuidou em suas combinações de roupa ao longo do ano. Seja misturando estampas impossíveis, escolhendo peças totalmente incompatíveis ou parecendo que se vestiu no escuro, este ritmista se destacou por seu estilo único, que desafiou todas as regras da moda. Suas escolhas questionáveis poderiam muito bem causar uma prisão em flagrante caso a polícia da moda o abordasse',
      description:
        'Homenagem ao ritmista que mais desafiou as regras da moda com combinações inusitadas e questionáveis',
      side: 'B',
      nominees: [
        {
          id: 'inimigo-da-moda-joaozinho',
          name: 'Joãozinho',
          imageUrl: 'https://i.imgur.com/LtjaURQ.jpeg',
        },
        {
          id: 'inimigo-da-moda-mclove',
          name: 'McLove',
          imageUrl: 'https://i.imgur.com/AKnmB60.jpeg',
        },
        {
          id: 'inimigo-da-moda-andre',
          name: 'Andre Noro',
          imageUrl: 'https://i.imgur.com/k8GaNth.jpeg',
        },
        {
          id: 'inimigo-da-moda-rodrigo',
          name: 'Digão',
          imageUrl: '#',
        },
      ],
    }

    await addDoc(categoriesRef, cat)
  }

  return (
    <button
      onClick={addDataToFirestore}
      className="border border-white rounded  bg-yellow-400 text-white"
    >
      Adicionar
    </button>
  )
}
