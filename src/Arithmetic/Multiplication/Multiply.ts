import type { LeftPad, SomeElementExtends } from '../../util'
import type { AdditiveOperationResult, OperationResult } from '../OperationTable'
import type { MultiplicationTable } from './MultiplicationTable'
import type { AdditionTable, AddUnsignedInts } from '../Addition'
import type { Digit, DigitsPair, HeadDigitArray, SignedFloat, UnsignedFloat, DigitsToUnsignedFloat, NormaliseIntZeros } from '../Digit'
import type { _Compare, MultiplySigns, Negate, RoundFloat, SignedFloatToNum, ToSignedFloat } from '../Number'
import type { NormaliseForCrossMultiply } from './Normalise'

type MultiplyRow<X extends Digit[], B extends Digit, TCarryIn extends Digit = 0> = (
    X extends HeadDigitArray<infer XHead, infer A>
        ? MultiplicationTable[A][B] extends OperationResult<infer TCarryOut1, infer TResult1>
            ? AdditionTable[TResult1][TCarryIn] extends AdditiveOperationResult<infer TCarryOut2, infer TFinalResult>
                ? AdditionTable[TCarryOut1][TCarryOut2] extends AdditiveOperationResult<0, infer TFinalCarryOut>
                    ? [
                        ...MultiplyRow<XHead, B, TFinalCarryOut>,
                        TFinalResult
                    ]
                    : never
                : never
            : never
        : [TCarryIn]
)

type CrossMultiply<X extends Digit[], Y extends Digit[], TShift extends 0[] = []> = (
    Y extends HeadDigitArray<infer YHead, infer B>
        ? NormaliseIntZeros<
            AddUnsignedInts<
                [...MultiplyRow<X, B>, ...TShift],
                CrossMultiply<X, YHead, [...TShift, 0]>
            >
            >
        : []
)

type MultiplyUnsignedFloats<X extends UnsignedFloat, Y extends UnsignedFloat> = (
    NormaliseForCrossMultiply<X, Y> extends [...DigitsPair<infer TNormalisedX, infer TNormalisedY>, infer TDecimalPlaces extends number]
        ? CrossMultiply<TNormalisedX, TNormalisedY> extends infer TResult extends Digit[]
            ? _Compare<TResult['length'], TDecimalPlaces> extends -1
                ? DigitsToUnsignedFloat<LeftPad<TResult, 0, TDecimalPlaces>, TDecimalPlaces>
                : DigitsToUnsignedFloat<TResult, TDecimalPlaces>
            : never
        : never
)

export type MultiplySignedFloats<X extends SignedFloat, Y extends SignedFloat> = (
    X extends SignedFloat<infer XSign, infer XUnsignedFloat> ?
    Y extends SignedFloat<infer YSign, infer YUnsignedFloat> ?
        SignedFloat<MultiplySigns<XSign, YSign>, MultiplyUnsignedFloats<XUnsignedFloat, YUnsignedFloat>>
    : never
    : never
)

export type MultiplySignedFloatsAndRound<X extends SignedFloat, Y extends SignedFloat> = RoundFloat<MultiplySignedFloats<X, Y>>

type MultiplyNumbers<X extends number, Y extends number> = SignedFloatToNum<MultiplySignedFloats<ToSignedFloat<X>, ToSignedFloat<Y>>>

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
