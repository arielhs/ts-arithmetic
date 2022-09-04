
export type Bit = 0 | 1
type FourBits = [Bit, Bit, Bit, Bit]

export type BitMap<TFalse = unknown, TTrue = unknown> = {
    0: TFalse
    1: TTrue
}

type TwoBitMap<R extends FourBits = FourBits> = 
    BitMap<
        BitMap<R[0], R[1]>,
        BitMap<R[2], R[3]>
    >

type AndMap = TwoBitMap<[0,0,0,1]>
export type And<A extends Bit, B extends Bit> = AndMap[A][B]

type OrMap = TwoBitMap<[0,1,1,1]>
export type Or<A extends Bit, B extends Bit> = OrMap[A][B]

type XorMap = TwoBitMap<[0,1,1,0]>
export type Xor<A extends Bit, B extends Bit> = XorMap[A][B]

type NotMap = BitMap<1, 0>
export type Not<B extends Bit> = NotMap[B]

export type FlipBits<X extends Bit[]> = (
    X extends [infer A extends Bit, ...infer R extends Bit[]]
        ? [Not<A>, ...FlipBits<R>]
        : []
)

