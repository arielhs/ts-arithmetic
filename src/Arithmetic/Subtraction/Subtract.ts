import type { SomeElementExtends } from '../../util'
import type { Digit, DigitsPair, DigitwiseAdditiveOp, SignedFloatFromSignedInt, SignedInt } from '../Digit'
import type { SignedFloat, UnsignedFloat, Normalise, NormaliseIntPartLengths, DigitsToUnsignedFloat, NegateSignedFloat, CompareFloatMagnitudes, SignedFloatZero } from '../Digit'
import type { Negate, SignedFloatToNum, ToSignedFloat } from '../Number'
import type { SubtractionTable } from './SubtractionTable'
import type { AddUnsignedFloats } from '../Addition'

export type SubtractUnsignedInts<X extends Digit[], Y extends Digit[]> = (
    NormaliseIntPartLengths<X, Y> extends DigitsPair<infer TNormalisedX, infer TNormalisedY>
        ? DigitwiseSubtract<TNormalisedX, TNormalisedY>
        : never
)

export type SubtractSignedInts<X extends SignedInt, Y extends SignedInt> = (
    SubtractSignedFloats<SignedFloatFromSignedInt<X>, SignedFloatFromSignedInt<Y>> extends SignedFloat<infer TSign, infer TUnsignedFloat>
        ? SignedInt<TSign, TUnsignedFloat[0]>
        : never
)

type DigitwiseSubtract<TNormalisedX extends Digit[], TNormalisedY extends Digit[]> = DigitwiseAdditiveOp<SubtractionTable, TNormalisedX, TNormalisedY>


type _SubtractUnsignedFloats<X extends UnsignedFloat, Y extends UnsignedFloat> = (
    Normalise<X, Y> extends [...DigitsPair<infer TNormalisedX, infer TNormalisedY>, infer TDecimalPlaces extends number]
        ? DigitsToUnsignedFloat<DigitwiseSubtract<TNormalisedX, TNormalisedY>, TDecimalPlaces>
        : never
)

export type SubtractUnsignedFloats<X extends UnsignedFloat, Y extends UnsignedFloat> = {
        1: SignedFloat<'+', _SubtractUnsignedFloats<X, Y>>
        0: SignedFloatZero
        [-1]: SignedFloat<'-', _SubtractUnsignedFloats<Y, X>>
}[CompareFloatMagnitudes<X, Y>]

type SubtractSignedFloats<X extends SignedFloat, Y extends SignedFloat> = (
    X extends SignedFloat<infer XSign, infer XUnsignedFloat> ?
    Y extends SignedFloat<infer YSign, infer YUnsignedFloat> ?
        {
            '-': {
                '-': NegateSignedFloat<SubtractUnsignedFloats<XUnsignedFloat, YUnsignedFloat>>
                '+': SignedFloat<'-', AddUnsignedFloats<XUnsignedFloat, YUnsignedFloat>>
            }
            '+': {
                '-': SignedFloat<'+', AddUnsignedFloats<XUnsignedFloat, YUnsignedFloat>>
                '+': SubtractUnsignedFloats<XUnsignedFloat, YUnsignedFloat>
            }
        }[XSign][YSign]
    : never
    : never
)

export type SubtractNumbers<X extends number, Y extends number> = SignedFloatToNum<SubtractSignedFloats<ToSignedFloat<X>, ToSignedFloat<Y>>>

/**
 * Perform subtraction on two numeric type literals.
 * 
 * @param X - The first operand.
 * @param Y - The second operand.
 * @returns X - Y
 * 
 * @public
*/
export type Subtract<X extends number, Y extends number> = (
    SomeElementExtends<[X, Y], never> extends 1 ? never
    : number extends (X | Y) ? number
    : X extends 0 ? Negate<Y>
    : Y extends 0 ? X
    : SubtractNumbers<X, Y>
)
