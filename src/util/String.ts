export type Trim<S extends string, L extends string, R extends string> = (
    (L | R) extends ''
        ? S
        : '' extends (L | R)
            ? S extends `${L}${infer M}${R}`
                ? Trim<M, L, R>
                : S
            : never
)
