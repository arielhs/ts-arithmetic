import type { Not } from '../Bit'

/**
 * Checks if a numeric type literal is an Integer.
 * 
 * @param N - The number to check.
 * @returns Bit - (i.e. 1 if N is an Integer, 0 if N has a non-zero fractional component).
 * 
 * @public
*/
export type IsInt<N extends number> = (
    `${N}` extends `${string}.${string}`
        ? 0
        : 1
)

/**
 * Checks if a numeric type literal is not an Integer.
 * 
 * @param N - The number to check.
 * @returns Bit - (i.e. 1 if N has a non-zero fractional component, 0 if N is an Integer).
 * 
 * @public
*/
export type IsNotInt<N extends number> = Not<IsInt<N>>

export type IntConstraint<N extends number> = IsInt<N> extends 1 ? number : never
