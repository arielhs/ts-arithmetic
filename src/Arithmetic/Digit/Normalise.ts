import type { LeftTrimTuple, NormaliseLengths, RightTrimTuple } from '../../util'
import type { Digit, DigitsPair } from './Digit'
import type { UnsignedFloat } from './Float'

export type NormaliseIntZeros<X extends Digit[]> = (
    LeftTrimTuple<X, 0> extends infer TTrimmedX extends Digit[]
        ? TTrimmedX extends []
            ? [0]
            : TTrimmedX
        : never
)

export type NormaliseFractionalZeros<X extends Digit[]> = RightTrimTuple<X, 0>

export type Normalise<X extends UnsignedFloat, Y extends UnsignedFloat> = (
    NormaliseIntPartLengths<X[0], Y[0]> extends DigitsPair<infer XIntegerPart, infer YIntegerPart>
        ? NormaliseLengths<X[1], Y[1], 'R', 0> extends DigitsPair<infer XFractionalPart, infer YFractionalPart>
            ? [
                xDigits: [...XIntegerPart, ...XFractionalPart],
                yDigits: [...YIntegerPart, ...YFractionalPart],
                decimalPlaces: YFractionalPart['length']
            ]
        : never
    : never
)

export type NormaliseIntPartLengths<X extends Digit[], Y extends Digit[]> = NormaliseLengths<X, Y, 'L', 0>
