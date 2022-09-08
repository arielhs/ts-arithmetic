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


export type Gt<X extends number, Y extends number> = (
    CompareDecisionBranch<X, Y, {
        [-1]: 0
        0: 0
        1: 1
    }>
)

export type Lt<X extends number, Y extends number> = Gt<Y, X>

export type Eq<X extends number, Y extends number> = (
    SomeElementExtends<[X, Y], never> extends 1 ? never
    : number extends (X | Y) ? Bit
    : X extends Y
        ? Y extends X
            ? 1
            : 0
        : 0
)

export type GtOrEq<X extends number, Y extends number> = (
    CompareDecisionBranch<X, Y, {
        [-1]: 0
        0: 1
        1: 1
    }>
)

export type LtOrEq<X extends number, Y extends number> = GtOrEq<Y, X>

export type Max<X extends number, Y extends number> = (
    X extends Y ? X
    : Y extends X ? Y
    : Gt<X, Y> extends 1 ? X : Y
)

export type Min<X extends number, Y extends number> = (
    X extends Y ? X
    : Y extends X ? Y
    : Lt<X, Y> extends 1 ? X : Y
)
