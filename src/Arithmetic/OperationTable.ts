import type { Bit } from './Bit'
import type { Digit } from './Digit'

export type OperationResult<C extends Digit = Digit, R extends Digit = Digit> = [carry: C, result: R]

// for subtraction "carry" really means "borrow"
export type AdditiveOperationResult<C extends Bit = Bit, R extends Digit = Digit> = OperationResult<C, R>

type MakeFirstRow<A extends AdditiveOperationResult[]> = (
    A['length'] extends Digit
        ? MakeFirstRow<[...A, AdditiveOperationResult<0, A['length']>]>
        : A
)

export type FirstAdditiveResultRow = MakeFirstRow<[]>

export type AdditiveOperationTable = AdditiveOperationResult[][]

export type OperationResultFromNum<N extends number> = (
    `${N}` extends `${infer C extends Digit}${infer R extends Digit}`
        ? OperationResult<C, R>
        : `${N}` extends `${infer R extends Digit}`
            ? OperationResult<0, R>
            : never
)
