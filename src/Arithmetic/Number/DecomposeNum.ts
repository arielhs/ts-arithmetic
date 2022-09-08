import type { Sign, SeparateSign } from './Sign'
import type { ArrayOf, Join, Trim } from '../../util'
import type { _Compare } from './Compare'

type EmptryStringAsZero<S extends string> = S extends '' ? '0' : S

type TrimLeadingZeros<S extends string> = EmptryStringAsZero<Trim<S, '0', ''>>
type TrimTrailingZeros<S extends string> = Trim<S, '', '0'>

// integer part = '' | '0' | '00' etc... will be normalised to '0'
// fractional part = '' | '0' | '00' etc... will be normalised to ''
export type NumComponents<TSign extends Sign, I extends string, F extends string> = [
    sign: EmptryStringAsZero<I | F> extends '0' ? '+' : TSign,
    integerPart: I,
    fractionalPart: F
]

export type DecomposeNum<S extends string | number> = (
    SeparateSign<`${S}`> extends [infer TSign extends Sign, infer M extends string] 
        ? SplitIntAndFractionParts<ScientificNotationAsDecimal<M>> extends NumComponents<never, infer I, infer F>
            ? NumComponents<TSign, TrimLeadingZeros<I>, TrimTrailingZeros<F>>
            : never
        : never
)


type ScientificNotationAsDecimal<N extends string | number> = (
    `${N}` extends `${infer TSignificand extends number}e-${infer TExp extends number}`
        ? SplitIntAndFractionParts<TSignificand> extends NumComponents<never, infer I, infer F>
            ? ArrayOf<TExp, 0> extends [infer TIntZero extends 0, ...infer TFractionZeros extends 0[]]
                ? Join<[TIntZero, '.', ...TFractionZeros, I, F]>
                : never
            : never
        : `${N}`
)

type SplitIntAndFractionParts<S extends string | number> = (
    `${S}` extends `${infer I}.${infer F}`
        ? NumComponents<never, I, F>
        : NumComponents<never, `${S}`, ''>
)
