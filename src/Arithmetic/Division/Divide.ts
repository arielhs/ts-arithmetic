import type { SomeElementExtends } from '../../util'
import type { DigitsPair, Normalise, SignedFloat, TailDigitArray, UnsignedFloat } from '../Digit'
import type { ToSignedFloat, SignedFloatToNum, MultiplySigns, _Compare, Negate } from '../Number'
import type { LongDivide } from './LongDivide'

export type DivideUnsignedFloats<TNumerator extends UnsignedFloat, TDivisor extends UnsignedFloat, TWithRemainder extends boolean = false> = (
    Normalise<TNumerator, TDivisor> extends [...DigitsPair<infer N, infer D>, infer TDecimalPlaces]
        ? N extends TailDigitArray<infer TNumeratorHead, infer TNumeratorTail>
            ? [
                LongDivide<D, [TNumeratorHead], TNumeratorTail, [], TWithRemainder>,
                TDecimalPlaces // used for mod division, ignored below
            ]
            : never
        : never
)

export type DivideSignedFloats<TNumerator extends SignedFloat, TDivisor extends SignedFloat> = (
    TNumerator extends SignedFloat<infer NSign, infer N> ?
    TDivisor extends SignedFloat<infer DSign, infer D> ?
        SignedFloat<MultiplySigns<NSign, DSign>, DivideUnsignedFloats<N, D>[0]>
    : never
    : never
)

type DivideNumbers<TNumerator extends number, TDivisor extends number> = SignedFloatToNum<DivideSignedFloats<ToSignedFloat<TNumerator>, ToSignedFloat<TDivisor>>>

/**
 * Divide two numeric type literals.
 * 
 * @param TNumerator - The numerator (a.k.a dividend)
 * @param TDivisor - The divisor (a.k.a denominator)
 * @returns TNumerator / TDivisor
 * 
 * @public
*/
export type Divide<TNumerator extends number, TDivisor extends number> = (
    SomeElementExtends<[TNumerator, TDivisor], never> extends 1 ? never
    : TDivisor extends 0 ? never
    : TNumerator extends 0 ? 0
    : TDivisor extends 1 ? TNumerator
    : number extends (TNumerator | TDivisor) ? number
    : TDivisor extends -1 ? Negate<TNumerator>
    : DivideNumbers<TNumerator, TDivisor>
)
