export type Trim<S extends string, L extends string, R extends string> = (
    (L | R) extends ''
        ? S
        : '' extends (L | R)
            ? S extends `${L}${infer M}${R}`
                ? Trim<M, L, R>
                : S
            : never
)
export type Stringable = string | number | bigint | boolean | null | undefined

export type StringOf<TLength extends number, V extends Stringable> = (
    _StringOf<TLength, V>
)
type _StringOf<TLength extends number, V extends Stringable, S extends string = '', TCounter extends never[] = []> = (
    TCounter['length'] extends TLength
        ? S
        : _StringOf<TLength, V, `${S}${V}`, [...TCounter, never]>
)
