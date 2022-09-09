import type { SomeElementExtends } from '../../util'
import type { Bit } from '../Bit'
import type { CompareMagnitudes, DigitsPair } from '../Digit'
import type { SignDecisionBranch } from './Sign'
import type { SplitAndNormalise } from './SplitAndNormalise'

type CompareNumberMagnitudes<X extends number, Y extends number> = (
    SplitAndNormalise<X, Y> extends [...DigitsPair<infer TNormalisedX, infer TNormalisedY>, number]
        ? CompareMagnitudes<TNormalisedX, TNormalisedY>
        : never
)

export type _Compare<X extends number, Y extends number> = (
    SignDecisionBranch<X, Y, {
        '-': {
            '-': CompareNumberMagnitudes<Y, X>
            '+': -1
        }
        '+': {
            '-': 1
            '+': CompareNumberMagnitudes<X, Y>
        }
    }>
)

type ComparisonResult = -1 | 0 | 1

/**
 * Compare two numeric type literals.
 * 
 * @param X - The number on the "left".
 * @param Y - The number on the "right".
 * @returns (-1 | 0 | 1) - (-1 if X is less than Y, 1 if X is greater than Y, 0 if X === Y).
 * 
 * @public
*/
export type Compare<X extends number, Y extends number> = (
    SomeElementExtends<[X, Y], never> extends 1 ? never
    : number extends (X | Y) ? ComparisonResult
    : X extends X ? Y extends Y ? // forces distribution over union types
        _Compare<X, Y>
    : never : never  
)

type _CompareMap = {
    [K in ComparisonResult]: unknown
}

export type CompareMap<TMap extends _CompareMap> = TMap

export type CompareDecisionBranch<X extends number, Y extends number, TMap extends _CompareMap> = TMap[Compare<X, Y>]

/**
 * Perform a 'greater than' comparison on two numeric type literals.
 * 
 * @param X - The number on the "left".
 * @param Y - The number on the "right".
 * @returns Bit - (1 if X \> Y, 0 if X \<= Y).
 * 
 * @public
*/
export type Gt<X extends number, Y extends number> = (
    CompareDecisionBranch<X, Y, {
        [-1]: 0
        0: 0
        1: 1
    }>
)

/**
 * Perform a 'less than' comparison on two numeric type literals.
 * 
 * @param X - The number on the "left".
 * @param Y - The number on the "right".
 * @returns Bit - (1 if X \< Y, 0 if X \>= Y).
 * 
 * @public
*/
export type Lt<X extends number, Y extends number> = Gt<Y, X>

/**
 * Perform an equality comparison on two numeric type literals.
 * 
 * @param X - The number on the "left".
 * @param Y - The number on the "right".
 * @returns Bit - (1 if X \< Y, 0 if X \>= Y).
 * 
 * @public
*/
export type Eq<X extends number, Y extends number> = (
    SomeElementExtends<[X, Y], never> extends 1 ? never
    : number extends (X | Y) ? Bit
    : X extends Y
        ? Y extends X
            ? 1
            : 0
        : 0
)

/**
 * Perform a 'greater than or equal to' operation on two numeric type literals.
 * 
 * @param X - The number on the "left".
 * @param Y - The number on the "right".
 * @returns Bit - (1 if X \>= Y, 0 if X \< Y).
 * 
 * @public
*/
export type GtOrEq<X extends number, Y extends number> = (
    CompareDecisionBranch<X, Y, {
        [-1]: 0
        0: 1
        1: 1
    }>
)

/**
 * Perform a 'less than or equal to' operation on two numeric type literals.
 * 
 * @param X - The number on the "left".
 * @param Y - The number on the "right".
 * @returns Bit - (1 if X \<= Y, 0 if X \> Y).
 * 
 * @public
*/
export type LtOrEq<X extends number, Y extends number> = GtOrEq<Y, X>

/**
 * Get the greatest of two numeric type literals.
 * 
 * @param X - The first operand.
 * @param Y - The second operand.
 * @returns X|Y - (X if X \> Y, Y if Y \> X else X (since they would be equal)).
 * 
 * @public
*/
export type Max<X extends number, Y extends number> = (
    number extends (X | Y) ? number
    : X extends Y ? X
    : Y extends X ? Y
    : Gt<X, Y> extends 1 ? X : Y
)

/**
 * Get the smallest of two numeric type literals.
 * 
 * @param X - The first operand.
 * @param Y - The second operand.
 * @returns X|Y - (X if X \< Y, Y if Y \< X else X (since they would be equal)).
 * 
 * @public
*/
export type Min<X extends number, Y extends number> = (
    number extends (X | Y) ? number
    : X extends Y ? X
    : Y extends X ? Y
    : Lt<X, Y> extends 1 ? X : Y
)
