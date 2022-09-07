import type { SomeElementExtends } from '../../util'
import type { AddUnsignedInts } from '../Addition'
import type { SubtractUnsignedInts } from '../Subtraction'
import type { CompareIntMagnitudes, Digit, DigitsPair, Normalise, SignedFloat, TailDigitArray, UnsignedFloat, MakeUnsignedFloat, NormaliseIntZeros, FloatMaxDigits, DivideMaxDigits } from '../Digit'
import type { ToSignedFloat, SignedFloatToNum, MultiplySigns, _Compare, Negate } from '../Number'

type _EuclideanDivide<TDivisor extends Digit[], TRemainder extends Digit[], TQuotient extends Digit[]> = (
    CompareIntMagnitudes<TRemainder, TDivisor> extends (1 | 0) // R >= D
        ? _EuclideanDivide<
                TDivisor,
                SubtractUnsignedInts<TRemainder, TDivisor>,
                AddUnsignedInts<TQuotient, [1]>
            >
        : [NormaliseIntZeros<TRemainder>, NormaliseIntZeros<TQuotient>]
)

type EuclideanDivideResult<TRemainder extends Digit[], TQuotient extends Digit> = DigitsPair<TRemainder, [TQuotient]>
// Assumes 0 < Divisor
// Should only be used for Numerator < 10*Divisor (otherwise will get "Type instantiation is excessively deep and possibly infinite")
type EuclideanDivide<TNumerator extends Digit[], TDivisor extends Digit[]> = (
    _EuclideanDivide<TDivisor, TNumerator, [0]>
)

type LongDivideFraction<TDivisor extends Digit[], TNumerator extends Digit[], TQuotient extends Digit[] = []> = (
    _Compare<TQuotient['length'], DivideMaxDigits> extends 1 // bail out if we are getting too long
        ? TQuotient
        : EuclideanDivide<TNumerator, TDivisor> extends EuclideanDivideResult<infer TRemainder, infer TNextQuotientDigit> // quotient should always be < 10
            ? TRemainder extends [0]
                ? [...TQuotient, TNextQuotientDigit]
                : LongDivideFraction<TDivisor, [...TRemainder, 0], [...TQuotient, TNextQuotientDigit]>

            : never
)
type _LongDivide<TDivisor extends Digit[], TNumeratorHead extends Digit[], TNumeratorTail extends Digit[], TQuotient extends Digit[] = [], TIntegerDivision extends boolean = false> = (
    EuclideanDivide<TNumeratorHead, TDivisor> extends EuclideanDivideResult<infer TRemainder, infer TNextQuotientDigit> // quotient should always be < 10
        ? [...TQuotient, TNextQuotientDigit] extends infer TNextQuotient extends Digit[]
            ? TNumeratorTail extends TailDigitArray<infer TNextDigit, infer TNextTail>
                ? _LongDivide<TDivisor, [...TRemainder, TNextDigit], TNextTail, TNextQuotient, TIntegerDivision>
                : TIntegerDivision extends false 
                    ? MakeUnsignedFloat<
                        TNextQuotient,
                        TRemainder extends [0] ? [] : LongDivideFraction<TDivisor, [...TRemainder, 0]>
                    >
                    : [NormaliseIntZeros<TRemainder>, NormaliseIntZeros<TNextQuotient>]
            : never
        : never
)

type LongDivide<TNumerator extends Digit[], TDivisor extends Digit[]> = (
    TNumerator extends TailDigitArray<infer TNumeratorHead, infer TNumeratorTail>
        ? _LongDivide<TDivisor, [TNumeratorHead], TNumeratorTail>
        : never
)

export type DivideUnsignedFloats<TNumerator extends UnsignedFloat, TDivisor extends UnsignedFloat> = (
    Normalise<TNumerator, TDivisor> extends [...DigitsPair<infer N, infer D>, number]
        ? LongDivide<N, D>
        : never
)

export type DivideSignedFloats<TNumerator extends SignedFloat, TDivisor extends SignedFloat> = (
    TNumerator extends SignedFloat<infer NSign, infer N> ?
    TDivisor extends SignedFloat<infer DSign, infer D> ?
        SignedFloat<MultiplySigns<NSign, DSign>, DivideUnsignedFloats<N, D>>
    : never
    : never
)

export type DivideSignedFloatsAndRound<TNumerator extends SignedFloat, TDivisor extends SignedFloat> = DivideSignedFloats<TNumerator, TDivisor>

type DivideNumbers<TNumerator extends number, TDivisor extends number> = SignedFloatToNum<DivideSignedFloats<ToSignedFloat<TNumerator>, ToSignedFloat<TDivisor>>>

export type Divide<TNumerator extends number, TDivisor extends number> = (
    SomeElementExtends<[TNumerator, TDivisor], never> extends 1 ? never
    : TDivisor extends 0 ? never
    : TNumerator extends 0 ? 0
    : TDivisor extends 1 ? TNumerator
    : number extends (TNumerator | TDivisor) ? number
    : TDivisor extends -1 ? Negate<TNumerator>
    : DivideNumbers<TNumerator, TDivisor>
)