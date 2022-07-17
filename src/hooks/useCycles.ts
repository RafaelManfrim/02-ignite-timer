import { useContext } from 'react'
import { CyclesContext } from '../contexts/CyclesContext'

export const useCycles = () => useContext(CyclesContext)
