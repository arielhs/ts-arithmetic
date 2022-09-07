import type { BitMap, Not } from '../Bit'

export type Negate<N extends number> = (
    N extends 0 
        ? 0
        : `${N}` extends `-${infer M extends number}`
            ? M
            : `-${N}` extends `${infer M extends number}`
                ? M
                : never
)

type Abs<N extends number> = `${N}` extends `-${infer M extends number}` ? M : N

export type IsPositive<N extends number> = `${N}` extends `-${number}` ? 0 : 1
export type IsNegative<N extends number> = Not<IsPositive<N>>

type IsSignPositiveMap = SignMap<0, 1>
export type IsSignPositive<S extends Sign> = IsSignPositiveMap[S]
export type IsSignNegative<S extends Sign> = Not<IsSignPositive<S>>

type GetSign<N extends number> = BitMap<'-', '+'>[IsPositive<N>]

export type SignMap<TNegative = unknown, TPositive = unknown> = {
    '-': TNegative
    '+': TPositive
}

export type SignDecisionBranch<
    X extends number,
    Y extends number,
    TBranches extends SignMap<SignMap, SignMap>
> = TBranches[GetSign<X>][GetSign<Y>]

export type Sign = '+' | '-'

export type SeparateSign<S extends string> = (
    S extends `-${infer N}`
        ? ['-', N]
        : ['+', S]
)

export type SignStr<S extends Sign> = S extends '+' ? '' : S

export type FlipSign<S extends Sign> = SignMap<'+', '-'>[S]

type SignMultiplicationMap = SignMap<SignMap<'+', '-'>, SignMap<'-', '+'>>

export type MultiplySigns<S extends Sign, T extends Sign> = SignMultiplicationMap[S][T]
