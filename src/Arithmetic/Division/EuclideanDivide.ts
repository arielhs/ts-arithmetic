import type { AddUnsignedInts } from '../Addition'
import type { CompareIntMagnitudes, Digit } from '../Digit'
import type { SubtractUnsignedInts } from '../Subtraction'
import type { MakeModResult, ModResult } from './Modulo'

type _EuclideanDivide<TDivisor extends Digit[], TRemainder extends Digit[], TQuotient extends Digit[]> = (
    CompareIntMagnitudes<TRemainder, TDivisor> extends (1 | 0) // R >= D
        ? _EuclideanDivide<
                TDivisor,
                SubtractUnsignedInts<TRemainder, TDivisor>,
                AddUnsignedInts<TQuotient, [1]>
            >
        : MakeModResult<TRemainder, TQuotient>
)

export type EuclideanDivideResult<TRemainder extends Digit[], TQuotient extends Digit> = ModResult<TRemainder, [TQuotient]>
// Assumes 0 < Divisor
// Should only be used for Numerator < 10*Divisor (otherwise will get "Type instantiation is excessively deep and possibly infinite")
export type EuclideanDivide<TNumerator extends Digit[], TDivisor extends Digit[]> = _EuclideanDivide<TDivisor, TNumerator, [0]>
