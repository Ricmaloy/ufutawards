import {
  ComponentProps,
  createContext,
  useCallback,
  useContext,
  useEffect,
  useState,
} from 'react'

export type RootProps = ComponentProps<'div'>

type CarrouselContextType = {
  activeItem: number
  carrouselAutoChange: () => void
  carrouselClickChange: () => void
}

const CarrouselContext = createContext({} as CarrouselContextType)

export function Root({ ...props }: RootProps) {
  const [activeItem, setActiveItem] = useState(1)

  const carrouselAutoChange = useCallback(() => {
    if (activeItem === 2) {
      return setActiveItem(1)
    }

    setActiveItem(2)
  }, [activeItem])

  const carrouselClickChange = useCallback(() => {
    setActiveItem((prevState) => (prevState % 2) + 1)
  }, [])

  useEffect(() => {
    const intervalID = setInterval(() => {
      carrouselAutoChange()
    }, 3000)

    return () => clearInterval(intervalID)
  }, [carrouselAutoChange])

  return (
    <CarrouselContext.Provider
      value={{ activeItem, carrouselAutoChange, carrouselClickChange }}
    >
      <div
        className="flex w-full max-w-[552px] flex-col bg-dark-200 py-11"
        {...props}
      />
    </CarrouselContext.Provider>
  )
}

export const useCarrousel = () => useContext(CarrouselContext)
