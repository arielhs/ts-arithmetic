import type { Not } from '../Bit'
import type { IsUnsignedFloatEven } from '../Digit'
import type { ToUnsignedFloat } from './ToFloat'

export type IsEven<N extends number> = IsUnsignedFloatEven<ToUnsignedFloat<N>>

export type IsOdd<N extends number> = Not<IsEven<N>>
