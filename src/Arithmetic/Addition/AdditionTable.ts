import type { Last } from '../../util'
import type { FirstAdditiveResultRow, AdditiveOperationResult } from '../OperationTable'

type RotateLeftWithCarry<A> = (
    A extends [AdditiveOperationResult<any, infer R>, ...infer TTail]
        ? [...TTail, AdditiveOperationResult<1, R>]
        : never
)

type MakeAdditionTable<T extends unknown[]> = (
    T['length'] extends 10
        ? T
        : MakeAdditionTable<[...T, RotateLeftWithCarry<Last<T>>]>
)

export type AdditionTable = MakeAdditionTable<[FirstAdditiveResultRow]>