import type { SomeElementExtends } from '../../util'
import type { Digit, DigitsPair, DigitwiseAdditiveOp } from '../Digit'
import type { SignedFloat, UnsignedFloat, Normalise, DigitsToUnsignedFloat, NegateSignedFloat, NormaliseIntPartLengths } from '../Digit'
import type { ToSignedFloat, SignedFloatToNum } from '../Number'
import type { SubtractUnsignedFloats } from '../Subtraction'
import type { AdditionTable } from './AdditionTable'

export type AddUnsignedInts<X extends Digit[], Y extends Digit[]> = (
    NormaliseIntPartLengths<X, Y> extends DigitsPair<infer TNormalisedX, infer TNormalisedY>
        ? DigitwiseAdd<TNormalisedX, TNormalisedY>
        : never
)

type DigitwiseAdd<TNormalisedX extends Digit[], TNormalisedY extends Digit[]> = DigitwiseAdditiveOp<AdditionTable, TNormalisedX, TNormalisedY, 0>

export type AddUnsignedFloats<X extends UnsignedFloat, Y extends UnsignedFloat> = (
    Normalise<X, Y> extends [...DigitsPair<infer TNormalisedX, infer TNormalisedY>, infer TDecimalPlaces extends number]
        ? DigitsToUnsignedFloat<DigitwiseAdd<TNormalisedX, TNormalisedY>, TDecimalPlaces>
        : never
)

type AddSignedFloats<X extends SignedFloat, Y extends SignedFloat> = (
    X extends SignedFloat<infer XSign, infer XUnsignedFloat> ?
    Y extends SignedFloat<infer YSign, infer YUnsignedFloat> ?
        {
            '-': {
                '-': SignedFloat<'-', AddUnsignedFloats<XUnsignedFloat, YUnsignedFloat>>
                '+': NegateSignedFloat<SubtractUnsignedFloats<XUnsignedFloat, YUnsignedFloat>>
            }
            '+': {
                '-': SubtractUnsignedFloats<XUnsignedFloat, YUnsignedFloat>
                '+': SignedFloat<'+', AddUnsignedFloats<XUnsignedFloat, YUnsignedFloat>>
            }
        }[XSign][YSign]
    : never
    : never
)

/**
 * Add two numeric type literals
 * 
 * @internal
*/
export type AddNumbers<X extends number, Y extends number> = SignedFloatToNum<AddSignedFloats<ToSignedFloat<X>, ToSignedFloat<Y>>>

/**
 * Add two numeric type literals
 * 
 * @public
*/
export type Add<X extends number, Y extends number> = (
    SomeElementExtends<[X, Y], never> extends 1 ? never
    : X extends 0 ? Y
    : Y extends 0 ? X
    : number extends (X | Y) ? number
    : AddNumbers<X, Y>
)
