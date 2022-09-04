import type { BitMap } from '../Bit'
import type { ToNum } from './ToNum'

export type Negate<N extends number> = (
    N extends 0 
        ? 0
        : `${N}` extends `-${infer M extends number}`
            ? M
            : ToNum<`-${N}`>
)

type Abs<N extends number> = `${N}` extends `-${infer M extends number}` ? M : N

type IsPositive<N extends number> = `${N}` extends `-${number}` ? 0 : 1

type GetSign<N extends number> = BitMap<'-', '+'>[IsPositive<N>]

type SignMap<TNegative = unknown, TPositive = unknown> = {
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