import type { Digit, HeadDigitArray } from './Digit'

export type InsertDecimalPlace<X extends Digit[], P extends number> = (
    P extends 0
        ? X
        : _InsertDecimalPlace<X, P, []>
)
type _InsertDecimalPlace<X extends Digit[], P extends number, A extends Digit[]> = (
    A['length'] extends P
        ? [...X, '.', ...A]
        : X extends HeadDigitArray<infer XHead, infer XLast>
            ? _InsertDecimalPlace<XHead, P, [XLast, ...A]>
            : never
)