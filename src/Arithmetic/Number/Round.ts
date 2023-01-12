import type { Abs, IsNegative, Negate } from './Sign'
import type { Gt, GtOrEq } from './Compare'
import type { Multiply } from '../Multiplication/Multiply'
import type { Subtract } from '../Subtraction/Subtract'
import type { IsInt } from './IsInt'
import type { Mod } from '../../Arithmetic/Division'
import type { Add } from '../../Arithmetic/Addition'

type TakeIntegerComponent<N extends number> = (
    `${N}` extends `${infer I extends number}.${string}` ? I : N
)

/**
 * Round the number to the nearest integer, rounding up if it equidistant.
 *
 * @param N - The number to round.
 * @returns round(N) - The closest integer to the given number, rounding up if it is equidistant.
 *
 * @public
*/
export type Round<N extends number> = (
    IsInt<N> extends 1 ? N : 
        IsNegative<N> extends 1
            ? Negate<Subtract<Gt<Multiply<Mod<Abs<N>, 1>, 10>, 5>, TakeIntegerComponent<N>>>
            : Add<GtOrEq        <Multiply<Mod<    N , 1>, 10>, 5>, TakeIntegerComponent<N>>
)

/**
 * Round the number to the closest integer less than or equal to the given number.
 * 
 * @param N - The number to round.
 * @returns floor(N) - The closest integer less than or equal to the given number.
 * 
 * @public
*/
export type Floor<N extends number> = (
    IsInt<N> extends 1 ? N : Negate<Subtract<IsNegative<N>, TakeIntegerComponent<N>>>
)

/**
 * Round the number to the closest integer greater than or equal to the given number.
 * 
 * @param N - The number to round.
 * @returns ceil(N) - The closest integer greater than or equal to the given number.
 * 
 * @public
*/
export type Ceil<N extends number> = (
    IsInt<N> extends 1 ? N : Add<Floor<N>, 1>
)
