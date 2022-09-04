import type { Sign, SeparateSign, SignStr } from './Sign'
import type { Join, Trim } from '../../util'
import type { Digit } from '../Digit'

type EmptryStringAsZero<S extends string> = S extends '' ? '0' : S

type TrimLeadingZeros<S extends string> = EmptryStringAsZero<Trim<S, '0', ''>>
type TrimTrailingZeros<S extends string> = EmptryStringAsZero<Trim<S, '', '0'>>

export type NumComponents<TSign extends Sign, I extends string, F extends string> = [
    sign: (I | F) extends '0' ? '+' : TSign,
    integerPart: I,
    fractionalPart: F
]

export type DecomposeNum<S extends string | number> = (
    SeparateSign<`${S}`> extends [infer TSign extends Sign, infer M extends string] 
        ? M extends `${infer I}.${infer F}`
            ? NumComponents<TSign, TrimLeadingZeros<I>, TrimTrailingZeros<F>>
            : NumComponents<TSign, TrimLeadingZeros<M>, '0'>
        : never
)

export type ToNum<S extends string | number> = (
    DecomposeNum<S> extends NumComponents<infer TSign, infer I, infer F>
        ? F extends '0'
            ? InferNum<I, TSign>
            : InferNum<`${I}.${F}`, TSign>
        : never
)

type InferNum<S extends string, TSign extends Sign = '+'> = (
    S extends '0'
        ? 0
        : `${SignStr<TSign>}${S}` extends `${infer N extends number}`
            ? N
            : never
)

export type DigitsToNum<X extends (Digit | '.')[]> = ToNum<Join<X>>
