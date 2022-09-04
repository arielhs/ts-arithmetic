import type { NumsUpto } from '../../util'

export type OrderedDigits = NumsUpto<10>
export type Digit = OrderedDigits[number]

export type HeadDigitArray<THead extends Digit[], TLast extends Digit> = [...THead, TLast]
export type TailDigitArray<TFirst extends Digit, TTail extends Digit[]> = [TFirst, ...TTail]

export type DigitsPair<TDigits1 extends Digit[], TDigits2 extends Digit[]> = [TDigits1, TDigits2]