import type { Normalise } from '../Digit'
import type { ToSignedFloat } from './ToFloat'

export type SplitAndNormalise<X extends number, Y extends number> = Normalise<ToSignedFloat<X>[1], ToSignedFloat<Y>[1]>
