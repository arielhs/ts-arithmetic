import type { Bit, Not } from '../Bit'

/**
 * Checks if a numeric type literal is an Integer.
 * 
 * @param N - The number to check.
 * @returns Bit - (i.e. 1 if N is an Integer, 0 if N has a non-zero fractional component).
 * 
 * @public
*/
export type IsInt<N extends number> = (
    number extends N ? Bit
    : N extends N ?
    `${N}` extends `${string}.${string}`
        ? 0
        : 1
    : never
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
