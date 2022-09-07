import type { AddNumbers } from '../Addition'
import type { NormaliseIntZeros, UnsignedFloat } from '../Digit'

export type NormaliseForCrossMultiply<X extends UnsignedFloat, Y extends UnsignedFloat> = (
    X extends UnsignedFloat<infer XIntegerPart, infer XFractionalPart>
        ? Y extends UnsignedFloat<infer YIntegerPart, infer YFractionalPart>
            ? [
                xDigits: NormaliseIntZeros<[...XIntegerPart, ...XFractionalPart]>,
                yDigits: NormaliseIntZeros<[...YIntegerPart, ...YFractionalPart]>,
                decimalPlaces: AddNumbers<XFractionalPart['length'], YFractionalPart['length']>
            ]
        : never
    : never
)
