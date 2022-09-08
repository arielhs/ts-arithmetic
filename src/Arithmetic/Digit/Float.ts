import type { LeftPad } from '../../util'
import type { FlipSign, IsSignNegative, IsSignPositive, Sign, ToUnsignedFloat, _Compare } from '../Number'
import type { Digit, HeadDigitArray, SignedInt } from './Digit'
import type { NormaliseFractionalZeros, NormaliseIntZeros } from './Normalise'

export type DivideMaxDigits = 13 // something weird with divide
export type FloatMaxDigits = 16
export type FloatMaxDigitsAsUnsignedFloat = ToUnsignedFloat<FloatMaxDigits>

export type UnsignedFloat<TIntegerDigits extends Digit[] = Digit[], TFractionalDigits extends Digit[] = Digit[]> = [
    integerDigits: TIntegerDigits,
    fractionalDigits: TFractionalDigits
]
export type MakeUnsignedFloat<TIntegerDigits extends Digit[], TFractionalDigits extends Digit[] = []> = (
    UnsignedFloat<NormaliseIntZeros<TIntegerDigits>, NormaliseFractionalZeros<TFractionalDigits>>
)

type UnsignedFloatZero = MakeUnsignedFloat<[0]>
export type SignedFloatZero = SignedFloat<'+', UnsignedFloatZero>

type UnsignedFloatOne = MakeUnsignedFloat<[1]>
export type SignedFloatOne = SignedFloat<'+', UnsignedFloatOne>

export type SignedFloat<TSign extends Sign = Sign, TUnsignedFloat extends UnsignedFloat = UnsignedFloat> = [
    sign: TSign,
    unsignedFloat: TUnsignedFloat
]

export type MakeSignedFloat<TSign extends Sign, TUnsignedFloat extends UnsignedFloat> = (
    MakeUnsignedFloat<TUnsignedFloat[0], TUnsignedFloat[1]> extends infer TActualUnsignedFloat extends UnsignedFloat
        ? TActualUnsignedFloat extends UnsignedFloatZero
            ? SignedFloatZero
            : SignedFloat<TSign, TActualUnsignedFloat>
        : never
)

export type SignedFloatFromInt<TSign extends Sign, TUnsignedInt extends Digit[]> = (
    MakeSignedFloat<TSign, UnsignedFloat<TUnsignedInt, []>>
)

export type SignedFloatFromSignedInt<TSignedInt extends SignedInt> = (
    SignedFloatFromInt<TSignedInt[0], TSignedInt[1]>
)

export type FloatDigitCount<TUnsignedFloat extends UnsignedFloat> = (
    [...TUnsignedFloat[0], ...TUnsignedFloat[1]] extends infer TDigits extends Digit[]
        ? TDigits['length']
        : never
)

export type DigitsToUnsignedFloat<X extends Digit[], TDecimalPlaces extends number, TFractionalDigits extends Digit[] = []> = (
    TFractionalDigits['length'] extends TDecimalPlaces
        ? MakeUnsignedFloat<X, TFractionalDigits>
        : X extends HeadDigitArray<infer XHead, infer XLast>
            ? DigitsToUnsignedFloat<XHead, TDecimalPlaces, [XLast, ...TFractionalDigits]>
            : never
)

export type SafeDigitsToUnsignedFloat<X extends Digit[], TDecimalPlaces extends number, TFractionalDigits extends Digit[] = []> = (
    _Compare<X['length'], TDecimalPlaces> extends -1
        ? DigitsToUnsignedFloat<LeftPad<X, 0, TDecimalPlaces>, TDecimalPlaces>
        : DigitsToUnsignedFloat<X, TDecimalPlaces>
)

export type NegateSignedFloat<X extends SignedFloat> = (
    X extends SignedFloat<infer TSign, infer TUnsignedFloat>
        ? SignedFloat<FlipSign<TSign>, TUnsignedFloat>
        : never
)

export type IsFloatPositive<X extends SignedFloat> = IsSignPositive<X[0]>
export type IsFloatNegative<X extends SignedFloat> = IsSignNegative<X[0]>
