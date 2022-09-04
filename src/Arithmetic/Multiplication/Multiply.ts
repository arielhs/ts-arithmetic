import type { Digit, DigitsPair, HeadDigitArray, InsertDecimalPlace } from '../Digit'
import type { AdditiveOperationResult, OperationResult } from '../OperationTable'
import type { MultiplicationTable } from './MultiplicationTable'
import type { _Add, AdditionTable, DigitwiseAdd } from '../Addition'
import type { DigitsToNum, Negate, NormaliseIntPartLengths, SignDecisionBranch, SplitAndNormalise } from '../Number'
import type { LeftTrimTuple } from '../../util'

type MultiplyRow<X extends Digit[], B extends Digit, TCarryIn extends Digit = 0> = (
    X extends HeadDigitArray<infer XHead, infer A>
        ? MultiplicationTable[A][B] extends OperationResult<infer TCarryOut1, infer TResult1>
            ? AdditionTable[TResult1][TCarryIn] extends AdditiveOperationResult<infer TCarryOut2, infer TFinalResult>
                ? AdditionTable[TCarryOut1][TCarryOut2] extends AdditiveOperationResult<0, infer TFinalCarryOut>
                    ? [
                        ...MultiplyRow<XHead, B, TFinalCarryOut>,
                        TFinalResult
                    ]
                    : never
                : never
            : never
        : [TCarryIn]
)

type CrossMultiply<X extends Digit[], Y extends Digit[], TShift extends 0[] = []> = (
    Y extends HeadDigitArray<infer YHead, infer B>
        ? NormaliseIntPartLengths<
            [...MultiplyRow<X, B>, ...TShift],
            CrossMultiply<X, YHead, [...TShift, 0]>
        > extends DigitsPair<infer TRowResult, infer TAcc> 
            ? LeftTrimTuple<DigitwiseAdd<TRowResult, TAcc>, 0>
            : never
        : []
)

type _Multiply<X extends number, Y extends number> = (
    SplitAndNormalise<X, Y> extends [...DigitsPair<infer TNormalisedX, infer TNormalisedY>, infer THalfDecimalPlaces extends number]
        ? DigitsToNum<InsertDecimalPlace<CrossMultiply<TNormalisedX, TNormalisedY>, _Add<THalfDecimalPlaces, THalfDecimalPlaces>>>
        : never
)

export type Multiply<X extends number, Y extends number> = (
    X extends X ? Y extends Y ? // forces distribution over union types
    SignDecisionBranch<X, Y, {
        '-': {
            '-': _Multiply<X, Y>
            '+': Negate<_Multiply<X, Y>>
        }
        '+': {
            '-': Negate<_Multiply<X, Y>>
            '+': _Multiply<X, Y>
        }
    }>
    : never : never
)
