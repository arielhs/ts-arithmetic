import type { Digit, MakeUnsignedFloat, SignedFloat, SignedFloatFromSignedInt, SignedInt, UnsignedFloat } from '../Digit'
import type { DivideSignedFloats, DivideUnsignedFloats } from './Divide'

export type DivideUnsignedInts<TNumerator extends Digit[], TDivisor extends Digit[]> = (
    DivideUnsignedFloats<MakeUnsignedFloat<TNumerator>, MakeUnsignedFloat<TDivisor>>
)

export type DivideUnsignedIntsAsInt<TNumerator extends Digit[], TDivisor extends Digit[]> = (
    DivideUnsignedInts<TNumerator, TDivisor> extends UnsignedFloat<infer TIntegerDigits, infer TFractionalDigits>
        ? TFractionalDigits extends []
            ? TIntegerDigits
            : never
        : never
)


export type DivideSignedInts<TNumerator extends SignedInt, TDivisor extends SignedInt> = (
    DivideSignedFloats<SignedFloatFromSignedInt<TNumerator>, SignedFloatFromSignedInt<TDivisor>>
)

export type DivideSignedIntsAsInt<TNumerator extends SignedInt, TDivisor extends SignedInt> = (
    DivideSignedInts<TNumerator, TDivisor> extends SignedFloat<infer TSign, infer TUnsignedFloat>
        ? TUnsignedFloat[1] extends []
            ? SignedInt<TSign, TUnsignedFloat[0]>
            : never
        : never
)