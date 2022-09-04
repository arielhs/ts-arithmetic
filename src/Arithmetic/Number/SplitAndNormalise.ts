import type { NormaliseLengths } from '../../util'
import type { DecomposeNum, NumComponents } from './ToNum'
import type { Digit, DigitsPair, SplitIntoDigits } from '../Digit'

type SplitOnDecimalPoint<N extends number> = (
    DecomposeNum<N> extends NumComponents<any, infer I, infer F>
        ? [SplitIntoDigits<I>, SplitIntoDigits<F>]
        : never
)

export type SplitAndNormalise<X extends number, Y extends number> = (
    SplitOnDecimalPoint<X> extends DigitsPair<infer XIntegerPart, infer XFractionalPart>
        ? SplitOnDecimalPoint<Y> extends DigitsPair<infer YIntegerPart, infer YFractionalPart>
            ? NormaliseIntPartLengths<XIntegerPart, YIntegerPart> extends DigitsPair<infer XIntegerPart, infer YIntegerPart>
                ? NormaliseLengths<XFractionalPart, YFractionalPart, 'R', 0> extends DigitsPair<infer XFractionalPart, infer YFractionalPart>
                    ? [
                        xDigits: [...XIntegerPart, ...XFractionalPart],
                        yDigits: [...YIntegerPart, ...YFractionalPart],
                        decimalPlaces: YFractionalPart['length']
                    ]
                    : never
                : never
            : never
        : never
)

export type NormaliseIntPartLengths<X extends Digit[], Y extends Digit[]> = NormaliseLengths<X, Y, 'L', 0>