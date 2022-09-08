import type { Last } from '../../util'
import type { FirstAdditiveResultRow, AdditiveOperationResult } from '../OperationTable'

type RotateRightWithCarry<A> = (
    A extends [...infer THead, AdditiveOperationResult<any, infer R>]
        ? [AdditiveOperationResult<1, R>, ...THead]
        : never
)

type MakeSubtractionTable<T extends unknown[]> = (
    T['length'] extends 10
        ? T
        : MakeSubtractionTable<[...T, RotateRightWithCarry<Last<T>>]>
)

export type SubtractionTable = MakeSubtractionTable<[FirstAdditiveResultRow]>
