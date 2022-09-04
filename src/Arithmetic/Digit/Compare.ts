import type { Digit, HeadDigitArray, OrderedDigits, TailDigitArray } from './Digit'

type CompareDigits<A extends Digit, B extends Digit> = (
    [A] extends [B]
        ? 0
        : _CompareDigits<A, B>
)

type _CompareDigits<A extends Digit, B extends Digit, TOrderedDigits extends Digit[] = OrderedDigits> = (
    TOrderedDigits extends HeadDigitArray<infer THeadDigits, infer TLastDigit>
        ? A extends TLastDigit
            ? 1
            : B extends TLastDigit
                ? -1
                : _CompareDigits<A, B, THeadDigits>
        : never
)

export type CompareMagnitudes<X extends Digit[], Y extends Digit[]> = (
    [X] extends [Y]
        ? 0
        : [X, Y] extends [TailDigitArray<infer XFirst, infer XTail>, TailDigitArray<infer YFirst, infer YTail>]
            ? CompareDigits<XFirst, YFirst> extends 0
                ? CompareMagnitudes<XTail, YTail>
                : CompareDigits<XFirst, YFirst>
            : never
)