import type { Bit, Or } from '../Bit'
import type { AdditiveOperationResult, AdditiveOperationTable } from '../OperationTable'
import type { Digit, HeadDigitArray } from './Digit'

export type DigitwiseAdditiveOp<
    TTable extends AdditiveOperationTable,
    X extends Digit[],
    Y extends Digit[],
    TCarryIn extends Bit = 0,
    TFinalResult extends Digit[] = []
> = (
    [X, Y] extends [HeadDigitArray<infer XHead, infer A>, HeadDigitArray<infer YHead, infer B>]
        ? TTable[TCarryIn][A] extends AdditiveOperationResult<infer TCarryOut1, infer AAndCarryIn>
            ? TTable[B][AAndCarryIn] extends AdditiveOperationResult<infer TCarryOut2, infer TResult>
                ? DigitwiseAdditiveOp<TTable, XHead, YHead, Or<TCarryOut1, TCarryOut2>, [TResult, ...TFinalResult]>
                : never
            : never
        : [TCarryIn, ...TFinalResult]
)
