import {
    createContext,
    ReactNode,
    useContext,
    useState,
} from 'react'

import type { Trade } from '@/api/tradeService'


type TradesContextValue = {
  selectedTrade: Trade | null
  setSelectedTrade: (trade: Trade | null) => void
}

const TradesContext = createContext<TradesContextValue | undefined>(
  undefined
)

type TradesProviderProps = {
  children: ReactNode
}

export function useTrades() {
  const context = useContext(TradesContext)

  if (!context) {
    throw new Error(
      'useTrades debe utilizarse dentro de TradesProvider'
    )
  }

  return context
}

export function TradesProvider({
  children,
}: TradesProviderProps) {
  const [selectedTrade, setSelectedTrade] =
    useState<Trade | null>(null)

  return (
    <TradesContext.Provider
      value={{
        selectedTrade,
        setSelectedTrade,
      }}
    >
      {children}
    </TradesContext.Provider>
  )
}