import type { DecomposeNum, NumComponents } from './DecomposeNum'
import type { SignedFloat, UnsignedFloat, SplitIntoDigits } from '../Digit'

export type ToSignedFloat<N extends number> = (
    DecomposeNum<N> extends NumComponents<infer TSign, infer I, infer F>
        ? SignedFloat<TSign, UnsignedFloat<SplitIntoDigits<I>, SplitIntoDigits<F>>>
        : never
)

export type ToUnsignedFloat<N extends number> = ToSignedFloat<N>[1]