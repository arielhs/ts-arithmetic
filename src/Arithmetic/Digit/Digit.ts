import type { NumsUpto } from '../../util'
import type { FlipSign, IsSignNegative, IsSignPositive, Sign } from '../Number'

export type OrderedDigits = NumsUpto<10>
export type Digit = OrderedDigits[number]

export type HeadDigitArray<THead extends Digit[], TLast extends Digit> = [...THead, TLast]
export type TailDigitArray<TFirst extends Digit, TTail extends Digit[]> = [TFirst, ...TTail]

export type DigitsPair<TDigits1 extends Digit[], TDigits2 extends Digit[]> = [TDigits1, TDigits2]

export type SignedInt<TSign extends Sign = Sign, TUnsignedInt extends Digit[] = Digit[]> = [
    sign: TSign,
    unsignedInt: TUnsignedInt
]

export type IsIntPositive<X extends SignedInt> = IsSignPositive<X[0]>
export type IsIntNegative<X extends SignedInt> = IsSignNegative<X[0]>


export type NegateSignedInt<X extends SignedInt> = (
    X extends SignedInt<infer TSign, infer TUnsignedInt>
        ? SignedInt<FlipSign<TSign>, TUnsignedInt>
        : never
)

