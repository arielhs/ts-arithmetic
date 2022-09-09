import type { Bit, BitMap, Not } from '../Bit'

/**
 * Negate a numeric literal
 * 
 * @param N - The number to negate.
 * @returns -N
 * 
 * @public
*/
export type Negate<N extends number> = (
    N extends 0 ? 0
    : number extends N ? number
    : `${N}` extends `-${infer M extends number}` ? M
    : `-${N}` extends `${infer M extends number}` ? M
    : never
)

/**
 * Get the absolute value of a numeric literal
 * 
 * @param N - The number to get the absolute value of.
 * @returns N as a positive number.
 * 
 * @public
*/
export type Abs<N extends number> = (
    N extends N ?
        `${N}` extends `-${infer M extends number}` ? M : N
    : never
)

/**
 * Check if a numeric literal is positive.
 * 
 * @param N - The number to check.
 * @returns Bit (i.e. 1 if N is positive, 0 if N is negative).
 * 
 * @public
*/
export type IsPositive<N extends number> = (
    N extends N ?
        number extends N ? Bit 
        : `${N}` extends `-${number}` ? 0 : 1
    : never
)

/**
 * Check if a numeric literal is negative.
 * 
 * @param N - The number to check.
 * @returns Bit (i.e. 1 if N is negative, 0 if N is positive).
 * 
 * @public
*/
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
