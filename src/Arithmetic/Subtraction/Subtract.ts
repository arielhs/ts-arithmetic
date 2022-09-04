import type { CompareMagnitudes, Digit, DigitsPair, DigitwiseAdditiveOp, InsertDecimalPlace } from '../Digit'
import type { DigitsToNum, Negate, SignDecisionBranch, SplitAndNormalise } from '../Number'
import type { _Add } from '../Addition/Add'
import type { SubtractionTable } from './SubtractionTable'

type DigitwiseSubtract<X extends Digit[], Y extends Digit[], TDecimalPlaces extends number> = (
    InsertDecimalPlace<DigitwiseAdditiveOp<SubtractionTable, X, Y, 0>, TDecimalPlaces>
)

export type _Subtract<X extends number, Y extends number> = (
    SplitAndNormalise<X, Y> extends [...DigitsPair<infer TNormalisedX, infer TNormalisedY>, infer TDecimalPlaces extends number]
        ? {
            1: DigitsToNum<DigitwiseSubtract<TNormalisedX, TNormalisedY, TDecimalPlaces>>
            0: 0
            [-1]: Negate<DigitsToNum<DigitwiseSubtract<TNormalisedY, TNormalisedX, TDecimalPlaces>>>
        }[CompareMagnitudes<TNormalisedX, TNormalisedY>]
        : never
)

export type Subtract<X extends number, Y extends number> = (
    X extends X ? Y extends Y ? // forces distribution over union types
    SignDecisionBranch<X, Y, {
        '-': {
            '-': Negate<_Subtract<X, Y>>
            '+': Negate<_Add<X, Y>>
        }
        '+': {
            '-': _Add<X, Y>
            '+': _Subtract<X, Y>
        }
    }>
    : never : never
)
