import type { Not } from '../Bit'

export type IsInt<N extends number> = (
    `${N}` extends `${string}.${string}`
        ? 0
        : 1
)

export type IsNotInt<N extends number> = Not<IsInt<N>>