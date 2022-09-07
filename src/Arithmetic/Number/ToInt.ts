import type { SignedFloat, SignedInt } from '../Digit'
import type { ToSignedFloat } from './ToFloat'

export type ToSignedInt<N extends number> = (
    ToSignedFloat<N> extends SignedFloat<infer TSign, infer TUnsignedFloat>
        ? TUnsignedFloat[1] extends []
            ? SignedInt<TSign, TUnsignedFloat[0]>
            : never
        : never
)