import type { Digit, TailDigitArray, MakeUnsignedFloat, DivideMaxDigits } from '../Digit'
import type { _Compare } from '../Number'
import type { EuclideanDivide, EuclideanDivideResult } from './EuclideanDivide'
import type { MakeModResult } from './Modulo'

type LongDivideFraction<TDivisor extends Digit[], TNumerator extends Digit[], TQuotient extends Digit[] = []> = (
    _Compare<TQuotient['length'], DivideMaxDigits> extends 1 // bail out if we are getting too long
        ? TQuotient
        : EuclideanDivide<TNumerator, TDivisor> extends EuclideanDivideResult<infer TRemainder, infer TNextQuotientDigit> // quotient should always be < 10
            ? TRemainder extends [0]
                ? [...TQuotient, TNextQuotientDigit]
                : LongDivideFraction<TDivisor, [...TRemainder, 0], [...TQuotient, TNextQuotientDigit]>

            : never
)

export type LongDivide<TDivisor extends Digit[], TNumeratorHead extends Digit[], TNumeratorTail extends Digit[], TQuotient extends Digit[] = [], TWithRemainder extends boolean = false> = (
    EuclideanDivide<TNumeratorHead, TDivisor> extends EuclideanDivideResult<infer TRemainder, infer TNextQuotientDigit> // quotient should always be < 10
        ? [...TQuotient, TNextQuotientDigit] extends infer TNextQuotient extends Digit[]
            ? TNumeratorTail extends TailDigitArray<infer TNextDigit, infer TNextTail>
                ? LongDivide<TDivisor, [...TRemainder, TNextDigit], TNextTail, TNextQuotient, TWithRemainder>
                : TWithRemainder extends false 
                    ? MakeUnsignedFloat<
                        TNextQuotient,
                        TRemainder extends [0] ? [] : LongDivideFraction<TDivisor, [...TRemainder, 0]>
                    >
                    : MakeModResult<TRemainder, TNextQuotient>
            : never
        : never
)
