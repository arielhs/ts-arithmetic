import type { Digit, DigitsPair, DigitwiseAdditiveOp, InsertDecimalPlace } from '../Digit'
import type { DigitsToNum, Negate, SignDecisionBranch, SplitAndNormalise } from '../Number'
import type { _Subtract } from '../Subtraction'
import type { AdditionTable } from './AdditionTable'

export type DigitwiseAdd<X extends Digit[], Y extends Digit[]> = DigitwiseAdditiveOp<AdditionTable, X, Y, 0>

export type _Add<X extends number, Y extends number> = (
    SplitAndNormalise<X, Y> extends [...DigitsPair<infer TNormalisedX, infer TNormalisedY>, infer TDecimalPlaces extends number]
        ? DigitsToNum<InsertDecimalPlace<DigitwiseAdd<TNormalisedX, TNormalisedY>, TDecimalPlaces>>
        : never
)

export type Add<X extends number, Y extends number> = (
    X extends X ? Y extends Y ? // forces distribution over union types
    SignDecisionBranch<X, Y, {
        '-': {
            '-': Negate<_Add<X, Y>>
            '+': Negate<_Subtract<X, Y>>
        }
        '+': {
            '-': _Subtract<X, Y>
            '+': _Add<X, Y>
        }
    }>
    : never : never
)