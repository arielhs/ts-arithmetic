import type { Last } from '../../util'
import type { Add } from '../Addition'
import type { Digit, OrderedDigits, TailDigitArray } from '../Digit'
import type { OperationResultFromNum } from '../OperationTable'

type MakeMultiplicationTable<TTable extends unknown[], X extends Digit[]> = (
    TTable['length'] extends 10
        ? TTable
        : X extends TailDigitArray<infer N, infer XTail>
            ? MakeMultiplicationTable<[...TTable, MapToOperationResult<MakeMultiplicationRow<N>>], XTail>
            : never
)

type MapToOperationResult<TRow extends number[]> = {
    [K in keyof TRow]: OperationResultFromNum<TRow[K]>
}

type MakeMultiplicationRow<N extends Digit, TRow extends number[] = [0]> = (
    TRow['length'] extends 10
        ? TRow
        : Last<TRow> extends infer TPrev extends number
            ? MakeMultiplicationRow<N, [...TRow, Add<TPrev, N>]>
            : never
)

export type MultiplicationTable = MakeMultiplicationTable<[], OrderedDigits>
