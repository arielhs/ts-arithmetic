import type { Digit } from './Digit'

export type SplitIntoDigits<N extends string> = (
    N extends `${infer D extends Digit}${infer R}`
        ? R extends ''
            ? [D]
            : R extends `${number}`
                ? [D, ...SplitIntoDigits<R>]
                : never
        : never
)
