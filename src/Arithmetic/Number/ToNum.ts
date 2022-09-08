import type { Sign, SignStr, SignMap } from './Sign'
import type { ArrayOf, Join, SplitLeadingElements } from '../../util'
import type { Digit, FloatDigitCount, FloatMaxDigits, FloatMaxDigitsAsUnsignedFloat, HeadDigitArray, MakeSignedFloat, SignedFloat, TailDigitArray, UnsignedFloat } from '../Digit'
import type { _Compare } from './Compare'
import type { ToUnsignedFloat } from './ToFloat'
import type { SubtractUnsignedFloats } from '../Subtraction'
import type { AddUnsignedInts } from '../Addition'

type InferNum<S extends string, TSign extends Sign> = (
    S extends '0'
        ? 0
        : `${SignStr<TSign>}${S}` extends `${infer N extends number}`
            ? N
            : never
)

type UnsignedFloatToNum<TUnsignedFloat extends UnsignedFloat, TSign extends Sign> = (
    TUnsignedFloat extends UnsignedFloat<infer TIntegerDigits, infer TFractionalDigits>
        ? TIntegerDigits extends [0]
            ? InferNum<ToSmallFractionString<TFractionalDigits>, TSign>
            : InferNum<ToDecimalString<TIntegerDigits, TFractionalDigits>, TSign>
        : never
)

type SmallEnoughForScientificNotation<TFractionalDigits extends Digit[]> = (
    TFractionalDigits extends [0,0,0,0,0,0, ...Digit[]]
        ? 1
        : 0
)

type ToSmallFractionString<TFractionalDigits extends Digit[]> = (
    SmallEnoughForScientificNotation<TFractionalDigits> extends 1
        ? SplitLeadingElements<TFractionalDigits, 0> extends [infer TFractionalZeros extends 0[], infer TSignificand extends Digit[]]
            ? TSignificand extends TailDigitArray<infer TSignificandInt, infer TSignificandFraction>
                ? [0, ...TFractionalZeros]['length'] extends infer TExp extends number
                    ? `${SignedFloatToNum<RoundFloat<SignedFloat<'+', [[TSignificandInt], TSignificandFraction]>>>}e-${TExp}`
                    : never
                : never
            : never
        : ToDecimalString<[0], TFractionalDigits>
)

type ToDecimalString<TIntegerDigits extends Digit[], TFractionalDigits extends Digit[]> = (
    TFractionalDigits extends []
        ? Join<TIntegerDigits>
        : `${Join<TIntegerDigits>}.${Join<TFractionalDigits>}`
)

export type SignedFloatToNum<TSignedFloat extends SignedFloat> = (
    RoundFloat<TSignedFloat> extends SignedFloat<infer TSign, infer TUnsignedFloat>
        ? UnsignedFloatToNum<TUnsignedFloat, TSign>
        : never
)

export type RoundFloat<F extends SignedFloat> = (
    SmallEnoughForScientificNotation<F[1][1]> extends 1 ? F : // dont round if going to be scientific notation anyway
    F extends SignedFloat<infer TSign, infer FUnsignedFloat>
        ? _Compare<FloatDigitCount<FUnsignedFloat>, FloatMaxDigits> extends (-1 | 0)
            ? F
            : SubtractUnsignedFloats<FloatMaxDigitsAsUnsignedFloat, ToUnsignedFloat<FUnsignedFloat[0]['length']>> extends SignedFloat<infer TTargetFractionLengthSign, infer TTargetFractionLength>
                ? TTargetFractionLengthSign extends '-'
                    ? F // number is too big, too bad
                    : RoundFractionalDigits<FUnsignedFloat[1], RoundingCarryMap[TSign], UnsignedFloatToNum<TTargetFractionLength, '+'>> extends [infer TCarryOut extends Digit, ...infer TRoundedFraction extends Digit[]]
                        ? MakeSignedFloat<TSign, UnsignedFloat<AddUnsignedInts<FUnsignedFloat[0], [TCarryOut]>, TRoundedFraction>>
                        : never
            : never
        : never
)

type RoundFractionalDigits<F extends Digit[], TRoundingMap extends Digit[], TTargetFractionLength extends number> = (
    F extends HeadDigitArray<infer FHead, infer D>
        ? FHead['length'] extends TTargetFractionLength
            ? TTargetFractionLength extends 0
                ? [TRoundingMap[D]]
                : AddUnsignedInts<FHead, [TRoundingMap[D]]>
            : RoundFractionalDigits<FHead, TRoundingMap, TTargetFractionLength>
        : never
)

type RoundingCarryMap = SignMap<
    [...ArrayOf<6, 0>, ...ArrayOf<4, 1>],
    [...ArrayOf<5, 0>, ...ArrayOf<5, 1>]
>
