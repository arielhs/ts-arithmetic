import type { SomeElementExtends } from '../../util'
import type { Digit, SafeDigitsToUnsignedFloat, NormaliseIntZeros, SignedFloat, UnsignedFloat } from '../Digit'
import type { Sign, SignedFloatToNum, ToSignedFloat } from '../Number'
import type { DivideUnsignedFloats } from './Divide'

export type ModResult<TRemainder extends Digit[], TQuotient extends Digit[]> = [
    remainder: TRemainder,
    quotient: TQuotient
]

export type MakeModResult<TRemainder extends Digit[], TQuotient extends Digit[]> = ModResult<NormaliseIntZeros<TRemainder>, NormaliseIntZeros<TQuotient>>

type ModUnsignedFloats<TNumerator extends UnsignedFloat, TDivisor extends UnsignedFloat> = (
    DivideUnsignedFloats<TNumerator, TDivisor, true> extends [ModResult<infer TRemainder, infer TQuotient>, infer TDecimalPlaces extends number]
        ? SafeDigitsToUnsignedFloat<TRemainder, TDecimalPlaces>
        : never
)

type ModSignedFloats<TNumerator extends SignedFloat, TDivisor extends SignedFloat> = (
    TNumerator extends SignedFloat<infer NSign, infer N> ?
    TDivisor extends SignedFloat<Sign, infer D> ?
        SignedFloat<NSign, ModUnsignedFloats<N, D>>
    : never
    : never
)

type ModNumbers<TNumerator extends number, TDivisor extends number> = SignedFloatToNum<ModSignedFloats<ToSignedFloat<TNumerator>, ToSignedFloat<TDivisor>>>

/**
 * Mod two numeric type literals. This returns the remainder as per JavaScript's Remainder (%) operator.
 * 
 * @param TNumerator - The numerator (a.k.a dividend)
 * @param TDivisor - The divisor (a.k.a denominator)
 * @returns TNumerator % TDivisor
 * 
 * @public
*/
export type Mod<TNumerator extends number, TDivisor extends number> = (
    SomeElementExtends<[TNumerator, TDivisor], never> extends 1 ? never
    : TDivisor extends 0 ? never
    : TNumerator extends 0 ? 0
    : number extends (TNumerator | TDivisor) ? number
    : ModNumbers<TNumerator, TDivisor>
)
