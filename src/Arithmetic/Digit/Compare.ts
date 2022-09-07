import type { NormaliseIntPartLengths } from '../Digit'
import type { Digit, DigitsPair, HeadDigitArray, OrderedDigits, TailDigitArray } from './Digit'
import type { UnsignedFloat } from './Float'
import type { Normalise } from './Normalise'

type CompareDigits<A extends Digit, B extends Digit> = (
    A extends B
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

export type CompareMagnitudes<TNormalisedX extends Digit[], TNormalisedY extends Digit[]> = (
    TNormalisedX extends TNormalisedY
        ? 0
        : [TNormalisedX, TNormalisedY] extends [TailDigitArray<infer XFirst, infer XTail>, TailDigitArray<infer YFirst, infer YTail>]
            ? CompareDigits<XFirst, YFirst> extends 0
                ? CompareMagnitudes<XTail, YTail>
                : CompareDigits<XFirst, YFirst>
            : never
)

export type CompareIntMagnitudes<X extends Digit[], Y extends Digit[]> = (
    NormaliseIntPartLengths<X, Y> extends DigitsPair<infer TNormalisedX, infer TNormalisedY>
        ? CompareMagnitudes<TNormalisedX, TNormalisedY>
        : never
)

export type CompareFloatMagnitudes<X extends UnsignedFloat, Y extends UnsignedFloat> = (
    Normalise<X, Y> extends [...DigitsPair<infer TNormalisedX, infer TNormalisedY>, number]
        ? CompareMagnitudes<TNormalisedX, TNormalisedY>
        : never
)