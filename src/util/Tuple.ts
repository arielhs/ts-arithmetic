export type Last<A extends unknown[]> = A extends [...unknown[], infer TLast] ? TLast : never

type Head<A extends unknown[]> = A extends [...infer THead, unknown] ? THead : never

type NumsBetween<TFrom extends number, TTo extends number> = NumsUpto<TTo, EmptyUpto<TFrom, []>>

type EmptyUpto<N extends number, A extends number[]> = (
    A['length'] extends N
        ? A
        : EmptyUpto<N, [...A, never]>
)

export type NumsUpto<N extends number, A extends number[] = []> = (
    A['length'] extends N
        ? Reject<A, never>
        : NumsUpto<N, [...A, A['length']]>
)

type Reject<A extends unknown[], T> = (
    A extends [infer H, ...infer R]
        ? [H] extends [T]
            ? Reject<R, T>
            : [H, ...Reject<R, T>]
        : []
)

type ArrayOf<TLength extends number, TValue, A extends TValue[] = []> = (
    A['length'] extends TLength
        ? A
        : ArrayOf<TLength, TValue, [TValue, ...A]>
)

type Stringable = string | number | bigint | boolean | null | undefined

export type Join<A extends Stringable[]> = (
    A extends [infer H extends Stringable, ...infer R extends Stringable[]]
        ? `${H}${Join<R>}`
        : ''
)

export type LeftTrimTuple<A extends unknown[], T> = (
    A extends [infer H, ...infer R]
        ? [H] extends [T]
            ? LeftTrimTuple<R, T>
            : A
        : A
)

export type LeftPad<A extends unknown[], V, N extends number> = (
    A['length'] extends N
        ? A
        : LeftPad<[V, ...A], V, N>
)

export type RightPad<A extends unknown[], V, N extends number> = (
    A['length'] extends N
        ? A
        : RightPad<[...A, V], V, N>
)

type PadDirection = 'L' | 'R'
export type Pad<D extends PadDirection, A extends unknown[], V, N extends number> = {
    'L': LeftPad<A, V, N>
    'R': RightPad<A, V, N>
}[D]

export type CompareLengths<A extends unknown[], B extends unknown[]> = (
    A['length'] extends B['length']
        ? 0
        : A['length'] extends 0
            ? -1
            : B['length'] extends 0
                ? 1
                : CompareLengths<Head<A>, Head<B>>
)

export type NormaliseLengths<A extends unknown[], B extends unknown[], D extends PadDirection, TPadValue> = (
    CompareLengths<A, B> extends 0 | -1
        ? [Pad<D, A, TPadValue, B['length']>, B]
        : [A, Pad<D, B, TPadValue, A['length']>]
)