import type { Not } from '../Bit'
import type { IsUnsignedFloatEven } from '../Digit'
import type { ToUnsignedFloat } from './ToFloat'

/**
 * Checks if a numeric type literal is Even.
 * 
 * @param N - The number to check.
 * @returns Bit - (i.e. 1 if N is Even, 0 if N is Odd. Returns never if N is has a non-zero fractional component).
 * 
 * @public
*/
export type IsEven<N extends number> = IsUnsignedFloatEven<ToUnsignedFloat<N>>

/**
 * Checks if a numeric type literal is Odd.
 * 
 * @param N - The number to check.
 * @returns Bit - (i.e. 1 if N is Odd, 0 if N is Even. Returns never if N is has a non-zero fractional component).
 * 
 * @public
*/
export type IsOdd<N extends number> = Not<IsEven<N>>
