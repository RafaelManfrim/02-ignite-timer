import { createContext, useState, ReactNode, useReducer } from 'react'
import { ActionTypes, Cycle, cyclesReducer } from '../reducers/cycles'

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
    dispatch({ type: ActionTypes.ADD_NEW_CYCLE, payload: { newCycle } })
    setAmountSecondsPassed(0)
  }

  function interruptActiveCycle() {
    dispatch({ type: ActionTypes.INTERRUPT_ACTIVE_CYCLE })
  }

  function markCurrentCycleAsFinished() {
    dispatch({
      type: ActionTypes.MARK_CURRENT_CYCLE_AS_FINISHED,
    })
  }

  function removeActiveCycleId() {
    dispatch({ type: ActionTypes.REMOVE_ACTIVE_CYCLE_ID })
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
