import type { Digit, HeadDigitArray, SignedInt } from './Digit'
import type { SignedFloat, UnsignedFloat } from './Float'

export type IsIntEven<D extends Digit[]> = (
    D extends HeadDigitArray<any, infer TLastDigit>
        ? TLastDigit extends (0 | 2 | 4 | 6 | 8)
            ? 1
            : 0
        : never
)

export type IsSignedIntEven<T extends SignedInt> = IsIntEven<T[1]>

export type IsUnsignedFloatEven<F extends UnsignedFloat> = (
    F[1] extends []
        ? IsIntEven<F[0]>
        : never
)

export type IsSignedFloatEven<X extends SignedFloat> = IsUnsignedFloatEven<X[1]>
