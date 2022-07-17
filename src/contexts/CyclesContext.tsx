import { createContext, useState, ReactNode, useReducer } from 'react'
import {
  addNewCycleAction,
  interruptActiveCycleAction,
  markCurrentCycleAsFinishedAction,
  removeActiveCycleIdAction,
} from '../reducers/cycles/actions'
import { Cycle, cyclesReducer } from '../reducers/cycles/reducer'

interface CreateCycleData {
  task: string
  minutesAmount: number
}

interface CyclesContextData {
  cycles: Cycle[]
  activeCycleId: string | null
  activeCycle: Cycle | undefined
  amountSecondsPassed: number
  markCurrentCycleAsFinished: () => void
  removeActiveCycleId: () => void
  setSecondsPassed: (seconds: number) => void
  createNewCycle: (data: CreateCycleData) => void
  interruptActiveCycle: () => void
}

export const CyclesContext = createContext({} as CyclesContextData)

interface CyclesProviderProps {
  children: ReactNode
}

export function CyclesProvider({ children }: CyclesProviderProps) {
  const [cyclesState, dispatch] = useReducer(cyclesReducer, {
    cycles: [],
    activeCycleId: null,
  })

  const [amountSecondsPassed, setAmountSecondsPassed] = useState(0)

  const { cycles, activeCycleId } = cyclesState

  const activeCycle = cycles.find((cycle) => cycle.id === activeCycleId)

  function setSecondsPassed(seconds: number) {
    setAmountSecondsPassed(seconds)
  }

  function createNewCycle(data: CreateCycleData) {
    const newCycle: Cycle = {
      id: String(new Date().getTime()),
      task: data.task,
      minutesAmount: data.minutesAmount,
      startDate: new Date(),
    }
    dispatch(addNewCycleAction(newCycle))
    setAmountSecondsPassed(0)
  }

  function interruptActiveCycle() {
    dispatch(interruptActiveCycleAction())
  }

  function markCurrentCycleAsFinished() {
    dispatch(markCurrentCycleAsFinishedAction())
  }

  function removeActiveCycleId() {
    dispatch(removeActiveCycleIdAction())
  }

  const providerValue: CyclesContextData = {
    cycles,
    activeCycleId,
    activeCycle,
    amountSecondsPassed,
    markCurrentCycleAsFinished,
    removeActiveCycleId,
    setSecondsPassed,
    createNewCycle,
    interruptActiveCycle,
  }

  return (
    <CyclesContext.Provider value={providerValue}>
      {children}
    </CyclesContext.Provider>
  )
}
