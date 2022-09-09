/*

// only way to get VSCode intellisense to ignore this file, since its so heavy duty it causes lag

import type { Add } from './Addition'
import type { Divide, Mod } from './Division'
import type { Pow } from './Exponentiation'
import type { Multiply } from './Multiplication'
import type { Subtract } from './Subtraction'



type UnionToIntersection<U> =
    (U extends U ? (x: U) => void : never) extends ((x: infer T) => void)
    ? T
    : never;

type LastOf<TUnion> = UnionToIntersection<TUnion extends TUnion ? (() => TUnion) : never> extends (() => infer R) ? R : never

type UnionToString<TUnion, A extends string = '', L = LastOf<TUnion>> =
    [L] extends [never]
        ? A
        : [L] extends [number]
            ? UnionToString<Exclude<TUnion, L>, `${L}${A extends '' ? '' : '|'}${A}`>
            : never


type ApplyTest<TValue extends number, TExpected extends number> = (
    [TValue] extends [never]
        ? [TExpected] extends [never]
            ? 'Pass'
            : `Result: never does not match Expected: ${UnionToString<TExpected>}`
        : [TExpected] extends [never]
            ? `Expected: never does not match Result: ${TValue}`

    : [TValue] extends [TExpected]
        ? [TExpected] extends [TValue]
            ? 'Pass'
            : `Expected: ${UnionToString<TExpected>} does not extend Result: ${UnionToString<TValue>}`
        : `Result: ${UnionToString<TValue>} does not extend Expected: ${UnionToString<TExpected>}`
)

type Test<TCheck extends 'Pass'> = TCheck


type Tests = [
    Test<ApplyTest<Add<0, 0>, 0>>,
    Test<ApplyTest<Add<13, 4>, 17>>,
    Test<ApplyTest<Add<4, 13>, 17>>,
    Test<ApplyTest<Add<13, -4>, 9>>,
    Test<ApplyTest<Add<-4, 13>, 9>>,
    Test<ApplyTest<Add<-13, -4>, -17>>,
    Test<ApplyTest<Add<-4, -13>, -17>>,

    Test<ApplyTest<Add<0.1, 0.2>, 0.3>>,
    Test<ApplyTest<Add<-.010, 10.01>, 10>>,
    Test<ApplyTest<Add<1.234567891234, 9.8765432198765>, 11.1111111111105>>,
    Test<ApplyTest<Add<1.2345678912345, 9.87654321987656>, 11.11111111111106>>,
    Test<ApplyTest<Add<1.2345678912345411111111, 9.87654321987656511111111>, 11.111111111111111111>>, // rounding off

    Test<ApplyTest<Add<1|2, 3|4>, 4|5|6>>,
    Test<ApplyTest<Add<0.0000000001, 0.0000000002>, 0.0000000003>>,
    Test<ApplyTest<Add<0.0000000000000000011, 0.0000000000000000021>, 0.0000000000000000032>>,

    Test<ApplyTest<Add<number, 1>, number>>,
    Test<ApplyTest<Add<1, number>, number>>,
    Test<ApplyTest<Add<number, number>, number>>,
    Test<ApplyTest<Add<1, never>, never>>,
    Test<ApplyTest<Add<never, 1>, never>>,
    Test<ApplyTest<Add<never, never>, never>>,


    Test<ApplyTest<Subtract<0, 0>, 0>>,
    Test<ApplyTest<Subtract<0, 5>, -5>>,
    Test<ApplyTest<Subtract<0, -5>, 5>>,
    Test<ApplyTest<Subtract<5, 0>, 5>>,
    Test<ApplyTest<Subtract<-5, 0>, -5>>,
    Test<ApplyTest<Subtract<13, 4>, 9>>,
    Test<ApplyTest<Subtract<4, 13>, -9>>,
    Test<ApplyTest<Subtract<13, -4>, 17>>,
    Test<ApplyTest<Subtract<-4, 13>, -17>>,
    Test<ApplyTest<Subtract<-13, -4>, -9>>,
    Test<ApplyTest<Subtract<-4, -13>, 9>>,

    Test<ApplyTest<Subtract<0.1, 0.2>, -0.1>>,
    Test<ApplyTest<Subtract<-.010, 10.01>, -10.02>>,
    Test<ApplyTest<Subtract<7|5|3, 2|1>, 6|5|4|3|2|1>>,

    Test<ApplyTest<Subtract<1.1111, 2.11112>, -1.00002>>,
    Test<ApplyTest<Subtract<0.0000000001, 0.0000000002>, -0.0000000001>>,
    Test<ApplyTest<Subtract<0.0000000000000000011, 0.0000000000000000021>, -0.0000000000000000010>>,
    Test<ApplyTest<Subtract<9.8765432198765, 1.234567891234>, 8.6419753286425>>,
    Test<ApplyTest<Subtract<9.87654321987656, 1.2345678912345>, 8.64197532864206>>,
    Test<ApplyTest<Subtract<9.87654321987656111111111, 1.2345678912345111111111>, 8.64197532864205>>, // rounding off
    Test<ApplyTest<Subtract<-9.87654321987656111111111, -1.2345678912345111111111>, -8.64197532864205>>, // rounding off

    Test<ApplyTest<Subtract<number, 1>, number>>,
    Test<ApplyTest<Subtract<1, number>, number>>,
    Test<ApplyTest<Subtract<number, number>, number>>,
    Test<ApplyTest<Subtract<1, never>, never>>,
    Test<ApplyTest<Subtract<never, 1>, never>>,
    Test<ApplyTest<Subtract<never, never>, never>>,

    Test<ApplyTest<Multiply<0, 0>, 0>>,
    Test<ApplyTest<Multiply<0, 9>, 0>>,
    Test<ApplyTest<Multiply<9, 0>, 0>>,
    Test<ApplyTest<Multiply<1, 123>, 123>>,
    Test<ApplyTest<Multiply<123, 1>, 123>>,
    Test<ApplyTest<Multiply<123, -1>, -123>>,
    Test<ApplyTest<Multiply<-123, 1>, -123>>,
    Test<ApplyTest<Multiply<-123, -1>, 123>>,

    Test<ApplyTest<Multiply<0.0 | 3, 0.0>, 0>>,
    Test<ApplyTest<Multiply<-0.0, -0.0>, 0>>,
    Test<ApplyTest<Multiply<99.717, -.269>, -26.823873>>,
    Test<ApplyTest<Multiply<5|6|7, 0|1|2>, 0|5|6|7|10|12|14>>,
    Test<ApplyTest<Multiply<0.01, 0.01>, 0.0001>>,
    Test<ApplyTest<Multiply<0.001, 0.001>, 0.000001>>,
    Test<ApplyTest<Multiply<0.0001, 0.0001>, 1e-8>>,
    Test<ApplyTest<Multiply<0.0000000001, 0.0000000001>, 1e-20>>,
    Test<ApplyTest<Multiply<9.8765432198765, 1.234567891233>, 12.19326313563451>>,
    Test<ApplyTest<Multiply<9.8765432198765, -1.234567891234>, -12.19326313564439>>,
    Test<ApplyTest<Multiply<9.8765432198765111111, -1.234567891234111111>, -12.1932631356455>>, // rounds off

    Test<ApplyTest<Multiply<number, 1>, number>>,
    Test<ApplyTest<Multiply<1, number>, number>>,
    Test<ApplyTest<Multiply<number, number>, number>>,
    Test<ApplyTest<Multiply<1, never>, never>>,
    Test<ApplyTest<Multiply<never, 1>, never>>,
    Test<ApplyTest<Multiply<never, never>, never>>,
    Test<ApplyTest<Multiply<number, 0>, 0>>,
    Test<ApplyTest<Multiply<0, number>, 0>>,
    Test<ApplyTest<Multiply<0, never>, never>>,
    Test<ApplyTest<Multiply<never, 0>, never>>,

    Test<ApplyTest<Divide<1, 1>, 1>>,
    Test<ApplyTest<Divide<0, 9>, 0>>,
    Test<ApplyTest<Divide<123, 1>, 123>>,
    Test<ApplyTest<Divide<123, -1>, -123>>,
    Test<ApplyTest<Divide<-123, 1>, -123>>,
    Test<ApplyTest<Divide<-123, -1>, 123>>,

    Test<ApplyTest<Divide<1, 123>, 0.00813008130081>>,
    Test<ApplyTest<Divide<123, 10>, 12.3>>,

    Test<ApplyTest<Divide<24|12, 6|4|3>, 4|2|6|3|8>>,

    Test<ApplyTest<Divide<0.001, 0.001>, 1>>,
    Test<ApplyTest<Divide<15, 0.001>, 15000>>,
    Test<ApplyTest<Divide<9.876543219876512, -1.234567891233129>, -8.00000007290929>>,

    Test<ApplyTest<Divide<9, 0>, never>>,
    Test<ApplyTest<Divide<number, 1>, number>>,
    Test<ApplyTest<Divide<1, number>, number>>,
    Test<ApplyTest<Divide<number, number>, number>>,
    Test<ApplyTest<Divide<1, never>, never>>,
    Test<ApplyTest<Divide<never, 1>, never>>,
    Test<ApplyTest<Divide<never, never>, never>>,
    Test<ApplyTest<Divide<number, 0>, never>>,
    Test<ApplyTest<Divide<0, number>, 0>>,
    Test<ApplyTest<Divide<0, never>, never>>,
    Test<ApplyTest<Divide<never, 0>, never>>,

    Test<ApplyTest<Pow<1, 1>, 1>>,
    Test<ApplyTest<Pow<2, 2>, 4>>,
    Test<ApplyTest<Pow<2.55, 2>, 6.5025>>,
    Test<ApplyTest<Pow<10, -2>, 0.01>>,
    Test<ApplyTest<Pow<8000000, 0>, 1>>,
    Test<ApplyTest<Pow<0, 2>, 0>>,
    Test<ApplyTest<Pow<0, 0>, 1>>,
    Test<ApplyTest<Pow<0, -2>, never>>,

    Test<ApplyTest<Pow<4.5656, 1>, 4.5656>>,
    Test<ApplyTest<Pow<number, 1>, number>>,
    Test<ApplyTest<Pow<1, number>, 1>>,
    Test<ApplyTest<Pow<number, number>, number>>,
    Test<ApplyTest<Pow<1, never>, never>>,
    Test<ApplyTest<Pow<never, 1>, never>>,
    Test<ApplyTest<Pow<never, never>, never>>,
    Test<ApplyTest<Pow<number, 0>, 1>>,
    Test<ApplyTest<Pow<0, number>, 0>>,
    Test<ApplyTest<Pow<0, never>, never>>,
    Test<ApplyTest<Pow<never, 0>, never>>,

    Test<ApplyTest<Pow<0, 1.5>, 0>>,
    Test<ApplyTest<Pow<1, 1.5>, 1>>,
    Test<ApplyTest<Pow<2, 1.5>, never>>,
    Test<ApplyTest<Pow<2, 1.5|2>, 4>>,
    Test<ApplyTest<Pow<0|2, 1.5|2>, 0|4>>,
    Test<ApplyTest<Pow<1|2, 1.5|2>, 1|4>>,
    Test<ApplyTest<Pow<1|2, number>, number>>,
    Test<ApplyTest<Pow<0|1, number>, 0|1>>,
    Test<ApplyTest<Pow<0|1|2, number>, number>>,

    Test<ApplyTest<Pow<-1, 3>, -1>>,
    Test<ApplyTest<Pow<-1, 2|3>, -1|1>>,
    Test<ApplyTest<Pow<-1, 0.5>, never>>,
    Test<ApplyTest<Pow<-1, 2|3.5>, 1>>,
    Test<ApplyTest<Pow<-1, number>, -1|1>>,

    Test<ApplyTest<Mod<10, 5>, 0>>,
    Test<ApplyTest<Mod<19, 7>, 5>>,
    Test<ApplyTest<Mod<12312323, 1>, 0>>,
    Test<ApplyTest<Mod<0, 123232>, 0>>,
    Test<ApplyTest<Mod<7, 19>, 7>>,
    Test<ApplyTest<Mod<-7, 19>, -7>>,
    Test<ApplyTest<Mod<-19, 7>, -5>>,
    Test<ApplyTest<Mod<19, -7>, 5>>,
    Test<ApplyTest<Mod<19.99, 7.1>, 5.79>>,
    Test<ApplyTest<Mod<12345.6789, 0.555454>, 0.158296>>,

    Test<ApplyTest<Mod<2121, 0>, never>>,
    Test<ApplyTest<Mod<number, 1>, number>>, // 0 for all ints, but would be a fraction
    Test<ApplyTest<Mod<number, 0>, never>>,
    Test<ApplyTest<Mod<number, number>, number>>,
    Test<ApplyTest<Mod<5, never>, never>>,
    Test<ApplyTest<Mod<never, 5>, never>>,
    Test<ApplyTest<Mod<never, never>, never>>,
    Test<ApplyTest<Mod<0, number>, 0>>,
    Test<ApplyTest<Mod<0, never>, never>>,
    Test<ApplyTest<Mod<never, 0>, never>>,
]

*/