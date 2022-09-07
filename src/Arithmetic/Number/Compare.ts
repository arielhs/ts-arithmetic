import type { SomeElementExtends } from '../../util'
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

export type Compare<X extends number, Y extends number> = (
    SomeElementExtends<[X, Y], never> extends 0
        ? number extends (X | Y)
            ? ComparisonResult
            : X extends X ? Y extends Y ? // forces distribution over union types
                _Compare<X, Y>
            : never : never
        : never   
)
