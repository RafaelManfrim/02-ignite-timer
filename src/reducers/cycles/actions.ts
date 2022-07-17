import { Cycle } from './reducer'

export enum ActionTypes {
  ADD_NEW_CYCLE = 'ADD_NEW_CYCLE',
  INTERRUPT_ACTIVE_CYCLE = 'INTERRUPT_ACTIVE_CYCLE',
  MARK_CURRENT_CYCLE_AS_FINISHED = 'MARK_CURRENT_CYCLE_AS_FINISHED',
  REMOVE_ACTIVE_CYCLE_ID = 'REMOVE_ACTIVE_CYCLE_ID',
}

export function addNewCycleAction(newCycle: Cycle) {
  return { type: ActionTypes.ADD_NEW_CYCLE, payload: { newCycle } }
}

export function interruptActiveCycleAction() {
  return { type: ActionTypes.INTERRUPT_ACTIVE_CYCLE }
}

export function markCurrentCycleAsFinishedAction() {
  return { type: ActionTypes.MARK_CURRENT_CYCLE_AS_FINISHED }
}

export function removeActiveCycleIdAction() {
  return { type: ActionTypes.REMOVE_ACTIVE_CYCLE_ID }
}
