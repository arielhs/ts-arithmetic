import type { SomeElementExtends } from '../../util'
import type { AdditiveOperationResult, OperationResult } from '../OperationTable'
import type { MultiplicationTable } from './MultiplicationTable'
import type { AdditionTable, AddUnsignedInts } from '../Addition'
import type { Digit, DigitsPair, HeadDigitArray, SignedFloat, UnsignedFloat, NormaliseIntZeros, SafeDigitsToUnsignedFloat } from '../Digit'
import type { _Compare, MultiplySigns, Negate, SignedFloatToNum, ToSignedFloat } from '../Number'
import type { NormaliseForCrossMultiply } from './Normalise'

type MultiplyRow<X extends Digit[], B extends Digit, TCarryIn extends Digit = 0, TFinalResult extends Digit[] = []> = (
    X extends HeadDigitArray<infer XHead, infer A>
        ? MultiplicationTable[A][B] extends OperationResult<infer ATimesBCarryOut, infer ATimesB>
            ? AdditionTable[ATimesB][TCarryIn] extends AdditiveOperationResult<infer TCarryOut2, infer TResult>
                ? AdditionTable[ATimesBCarryOut][TCarryOut2] extends AdditiveOperationResult<0, infer TFinalCarryOut>
                    ? MultiplyRow<XHead, B, TFinalCarryOut, [TResult, ...TFinalResult]>
                    : never
                : never
            : never
        : [TCarryIn, ...TFinalResult]
)

type CrossMultiply<X extends Digit[], Y extends Digit[], TShift extends 0[] = [], TPrevRowResult extends Digit[] = []> = (
    Y extends HeadDigitArray<infer YHead, infer B>
        ? CrossMultiply<X, YHead, [...TShift, 0], 
                NormaliseIntZeros<
                    AddUnsignedInts<
                        TPrevRowResult,
                        [...MultiplyRow<X, B>, ...TShift]
                    >
                >
        >
        : TPrevRowResult
)

type MultiplyUnsignedFloats<X extends UnsignedFloat, Y extends UnsignedFloat> = (
    NormaliseForCrossMultiply<X, Y> extends [...DigitsPair<infer TNormalisedX, infer TNormalisedY>, infer TDecimalPlaces extends number]
        ? SafeDigitsToUnsignedFloat<CrossMultiply<TNormalisedX, TNormalisedY>, TDecimalPlaces>
        : never
)

export type MultiplySignedFloats<X extends SignedFloat, Y extends SignedFloat> = (
    X extends SignedFloat<infer XSign, infer XUnsignedFloat> ?
    Y extends SignedFloat<infer YSign, infer YUnsignedFloat> ?
        SignedFloat<MultiplySigns<XSign, YSign>, MultiplyUnsignedFloats<XUnsignedFloat, YUnsignedFloat>>
    : never
    : never
)

type MultiplyNumbers<X extends number, Y extends number> = SignedFloatToNum<MultiplySignedFloats<ToSignedFloat<X>, ToSignedFloat<Y>>>

/**
 * Multiply two numeric type literals.
 * 
 * @param X - The first operand.
 * @param Y - The second operand.
 * @returns X * Y
 * 
 * @public
*/
export type Multiply<X extends number, Y extends number> = (
    SomeElementExtends<[X, Y], never> extends 1 ? never
    : X extends 0 ? 0
    : Y extends 0 ? 0
    : X extends 1 ? Y
    : Y extends 1 ? X
    : number extends (X | Y) ? number
    : X extends -1 ? Negate<Y>
    : Y extends -1 ? Negate<X>
    : MultiplyNumbers<X, Y>
)
