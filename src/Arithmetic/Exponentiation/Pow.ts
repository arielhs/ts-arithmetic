import type { SomeElementExtends } from '../../util'
import type { Divide } from '../Division'
import type { Multiply } from '../Multiplication'
import type { IntConstraint, IsEven, IsInt, IsNegative, Negate } from '../Number'
import type { Subtract } from '../Subtraction'

type Exponentiate<X extends number, N extends number> = (
    N extends 0 ? 1
    : IsNegative<N> extends 1 ? Exponentiate<Divide<1, X>, Negate<N>>
    : IsEven<N> extends 1 ? Exponentiate<Multiply<X, X>, Divide<N, 2>>
    : Exponentiate<Multiply<X, X>, Divide<Subtract<N, 1>, 2>> extends infer XX extends number
        ? Multiply<X, XX>
        : never
)

/**
 * Raise a numeric literal to the power of another.
 * 
 * @param X - The base.
 * @param N - The exponent (a.k.a power). Must be an Integer.
 * @returns X^N
 * 
 * @public
*/
export type Pow<X extends number, N extends IntConstraint<N>> = (
    SomeElementExtends<[X, N], never> extends 1 ? never
    : IsInt<N> extends 0 ? never
    : N extends 0 ? 1
    : X extends 1 ? 1
    : X extends 0
        ? IsNegative<N> extends 1
            ? never
            : number extends N
                ? never
                : 0
    : number extends (X | N) ? number
    : Exponentiate<X, N>
)
