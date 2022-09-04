import type { Add } from './Addition'
import type { Subtract } from './Subtraction'

type TestResult<TValue, TExpected> = {
    value: TValue
    expected: TExpected
}

type Clean<T> = {} & { [K in keyof T]: T[K] }
type Test<TValue extends TExpected, TExpected> = [TValue] extends [never] ? 999 : Clean<TestResult<TValue, TExpected>>

type Test197 = Subtract<1.1111, 2.11112>

type DoTest<TTests extends TestResult<number, number>[]> = TTests

type Tests = DoTest<[
    Test<Add<0, 0>, 0>,
    Test<Add<13, 4>, 17>,
    Test<Add<4, 13>, 17>,
    Test<Add<13, -4>, 9>,
    Test<Add<-4, 13>, 9>,
    Test<Add<-13, -4>, -17>,
    Test<Add<-4, -13>, -17>,

    Test<Add<0.1, 0.2>, 0.3>,
    Test<Add<-.010, 10.01>, 10>,

    Test<Subtract<0, 0>, 0>,
    Test<Subtract<13, 4>, 9>,
    Test<Subtract<4, 13>, -9>,
    Test<Subtract<13, -4>, 17>,
    Test<Subtract<-4, 13>, -17>,
    Test<Subtract<-13, -4>, -9>,
    Test<Subtract<-4, -13>, 9>,

    Test<Subtract<1.1111, 2.11112>, -1.00002>,

]>
