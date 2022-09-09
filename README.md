<a name="readme-top"></a>

[![Contributors][contributors-shield]][contributors-url]
[![Forks][forks-shield]][forks-url]
[![Stargazers][stars-shield]][stars-url]
[![Issues][issues-shield]][issues-url]
[![MIT License][license-shield]][license-url]

<div align="center">
<h3 align="center">Type Level Arithmetic</h3>

  <p align="center">
    A package of TypeScript utility types to perform all the basic arithmetic operations <strong>at the Type Level</strong>, without the usual limitations.
    <br />
    <a href="#type-utility-reference"><strong>Explore the docs »</strong></a>
    <br />
    <br />
    <a href="https://github.com/arielhs/ts-arithmetic/issues">Report Bug</a>
    ·
    <a href="https://github.com/arielhs/ts-arithmetic/issues">Request Feature</a>
  </p>
</div>

<!-- TABLE OF CONTENTS -->
<details>
  <summary>Table of Contents</summary>
  <ol>
    <li>
      <a href="#about-the-project">About The Project</a>
      <ul>
        <li><a href="#built-with">Built With</a></li>
      </ul>
    </li>
    <li>
      <a href="#getting-started">Getting Started</a>
      <ul>
        <li><a href="#prerequisites">Prerequisites</a></li>
        <li><a href="#installation">Installation</a></li>
      </ul>
    </li>
    <li>
        <a href="#usage">Usage</a>
        <ul>
            <li><a href="#core">Core</a></li>
        </ul>
    </li>
    <li>
        <a href="#type-utility-reference">Type Utility Reference</a>
        <ul>
            <li>
                <a href="#general-operation-semantics">General Operation Semantics</a>
                <ul>
                    <li><a href="#never">never</a></li>
                    <li><a href="#unions-of-numeric-literals">Unions of numeric literals</a></li>
                    <li><a href="#number">number</a></li>
                    <li><a href="#scientific-notation">Scientific Notation</a></li>
                </ul>
            </li>
        </ul>
    </li>
    <li><a href="#roadmap">Road Map</a></li>
    <li><a href="#license">License</a></li>
  </ol>
</details>



<!-- ABOUT THE PROJECT -->
## About The Project

[![Product Name Screen Shot][product-screenshot]](/ts-arithmetic-screenshot.png)



<p align="right">(<a href="#readme-top">back to top</a>)</p>

**ts-arithmetic** allows you to perform all the basic arithmetic operations at the **Type Level**, without any of the usual limitations associated with the dreaded "type instantiation is excessively deep and possibly infinite" TypeScript error. All other existing utilities are limited to small positive integers. **ts-arithmetic** does not have this limitation.



### Built With

* [![TypeScript][TypeScript]][typescript-url]

<p align="right">(<a href="#readme-top">back to top</a>)</p>



<!-- GETTING STARTED -->
## Getting Started

### Prerequisites

* 
  ```sh
  npm install typscript@^4.8.2 --save-dev
  ```

### Installation

* 
  ```sh
  npm install ts-arithmetic --save-dev
  ```

<p align="right">(<a href="#readme-top">back to top</a>)</p>



<!-- USAGE EXAMPLES -->
## Usage

### Core

```ts
import { Add, Subtract, Multiply, Divide, Pow, Compare, Mod } from 'ts-arithmetic'
// Check the docs below for more

// Add any two numbers
type AddExample = Add<1024, 256>
// 1280

// Subtract any two numbers
type SubtractExample = Subtract<400, 1000>
// -600

// Multiply any two numbers
type MultiplyExample = Multiply<25, 50>
// 1250

// Divide any two numbers
type DivideExample = Divide<-1, 800>
// -0.00125

// Raise a number to an integer power
type PowExample = Pow<5, 7>
// 78125

// Compare any two numbers (same rules as JavaScript Array.sort())
type CompareExample = Compare<123456, 20>
// 1

// Get the JavaScript mod (i.e. remainder)
type ModExmaple = Mod<87, 7>
// 3

```

<p align="right">(<a href="#readme-top">back to top</a>)</p>


# Type Utility Reference

## Arithmetical Operations
* [`Add`](#add)
* [`Subtract`](#subtract)
* [`Multiply`](#multiply)
* [`Divide`](#divide)
* [`Pow`](#pow)
* [`Mod`](#mod)
* [`Negate`](#negate)
* [`Abs`](#abs)

## Comparison Operations
* [`Compare`](#compare)
* [`Gt`](#gt)
* [`Lt`](#lt)
* [`Eq`](#eq)
* [`GtOrEq`](#gtoreq)
* [`LtOrEq`](#ltoreq)
* [`Max`](#max)
* [`Min`](#min)

## Other Checks
### Sign
* [`IsPositive`](#ispositive)
* [`IsNegative`](#isnegative)
### Parity
* [`IsOdd`](#isodd)
* [`IsEven`](#iseven)
### Number Type
* [`IsInt`](#isint)
* [`IsNotInt`](#isnotint)

## Bit Operations
* [`And`](#and)
* [`Or`](#or)
* [`Xor`](#xor)
* [`Not`](#not)

---

## General Operation Semantics

All of the operations behave pretty much how you would expect them to. They all accept positive/negative integers/fractions. There are a few things to note about `never`, `number`, unions of numeric literals and literals given in scientific notation (e.g. 8.5e-15)

### never

Passing `never` in for any parameter will always resolve to `never`.

### Unions of numeric literals

Every type operation will **distribute** over their parameters as though you called the operation once on each member of the provided union type. e.g.
```ts
type ThreeOrFour = Add<1, 2|3> // resolves to 3 | 4

type NegFiveOrTen = Negate<5|-10> // reolves to -5 | 10
```

For operations that take 2 parameters, if a union type is provided for both parameters, then it will be as though you called the operation on each **combination** of members of the union types. e.g.
```ts
type CartesianAdd = Add<3|4, 10|20> // resolves to 13 | 23 | 14 | 24
```

### number

Most of the time, passing `number` in for any parameter will resolve to `number` - though not always.

The answer for any specific case can always be worked out if you think of `number` as meaning **the union of all numeric literals** i.e.

```ts
type number = ... | -1 | -0.999...9 | -0.999...8 | ... | 0 | 0.000...1 | 0.000...2 | ... | 1 | ...
```

The type utilities will always return the most restrictive union of the results possible.

For example, 0 * X = 0 **for all X**. So:
```ts
type Zero = Multiply<0, number> // resolves to 0
```

Or for any of the types that already return some subset of `number`, then that entire subset will be returned. e.g.
```ts
type ZeroOrOne = IsPositive<number> // resolves to 0 | 1
```

But for 1 + X, there is no meaningfull way to simplify down in the same way. So:
```ts
type Useless = Add<1, number> // resolves to number
```

### Scientific Notation

Passing in a numeric literal `N` where `-1 < N < 1` in scientific notation e.g. `8.5e-10` will work just fine.

However there is an issue with large numeric literals given in scientific notation e.g. `1e+21`. For `N` where `Abs(N) < 1e+21`, typescript will automatically resolve this to its expanded form (e.g. `100000000000000000000`) so everything will work as normal. But exceeding this limit will cause typescript to resolve the literal in scientific notation.
```ts
type Big1 = 1.0000001e+20 // typescript resolves this to 100000010000000000000
type Big2 = 1e+20 // typescript resolves this to 100000000000000000000
type BigSubtract = Subtract<Big1, Big2> // 10000000000000

type TooBig1 = 1.0000001e+21 // typescript resolves this exactly as it appears, 1.0000001e+21
type TooBig2 = 1e+21 // typescript resolves this exactly as it appears, 1e+21
type TooBigSubtract = Subtract<TooBig1, TooBig2> // never
```

This notation can be supported (and might in the future) but it currently is not.

### `Add`

Add any two numeric literals. It works exactly how you expect it to.

```ts
type NormalExample = Add<75, 25> // 100

type NegativeFractionsExample = Add<-1.5, 0.25> // -0.25

type UnionExample = Add<75|5, 25> // 100 | 30
```

### `Subtract`

Subtract a numeric literal from another.

```ts
type NormalExample = Subtract<200, 50> // 150

type NegativeFractionsExample = Subtract<-35.5, 1.75> // -37.25

type UnionExample = Subtract<100|70, 20> // 80 | 50
```

### `Multiply`

Multiply any two numeric literals.

```ts
type NormalExample = Multiply<25, 25> // 625

type NegativeFractionsExample = Multiply<-0.005, 20> // -0.1

type UnionExample = Multiply<2|3, 4> // 8 | 12

type Zero = Multiply<0, 21212> // 0

type AlsoZero = Multiply<0, number> // 0
```

### `Divide`
Divide a numeric literal by another. 

```ts
type NormalExample = Divide<25, 5> // 25

type NegativeFractionsExample = Divide<-0.005, 20> // -0.00025

type UnionExample = Divide<100|50, 5> // 20 | 10

type NotPossible = Divide<10, 0> // never

type AbsorbedNever = Divide<10, 2|0> // 5 | never --> 5

// even though number "contains" 0, since Divide distibutes, the never is
// absorbed into the resulting union just like the above example
type Zero = Divide<0, number> // 0
```

### `Pow`
Raise a numeric literal to an **integer** exponent. The limitation of integer exponents will be lifted soon.

```ts
type NormalExample = Pow<2, 10> // 1024

type UnionExample = Pow<2|3, 10> // 1024 | 59049

type ReciprocalExample = Pow<20.5, -2> // 0.002379535990481

type AlwaysOne = Pow<10, 0> // 1

type AlsoAlwaysOne = Pow<number, 0> // 1

type NotPossible = Pow<0, -1> // never

type AbsorbedNever = Pow<0, -1|5> // never | 0 --> 0

// even though number "contains" negative values, since Pow distibutes, the never is
// absorbed into the resulting union just like the above example
type Zero = Pow<0, number> // 0

type AndAlsoAlwaysOne = Pow<1, number> // 1

type OneOrMinusOne = Pow<-1, 2|3> // 1 | -1

type AlsoOneOrMinusOne = Pow<-1, number> // 1 | -1

type Imaginary = Pow<-1, 0.5> // never

type ZeroOrOne = Pow<0|1, number> // 0 | 1

type AsExpected0 = Pow<0, 0.5> // 0
type AsExpected1 = Pow<1, 0.5> // 1

type NotAvailableYet = Pow<2, 0.5> // never

type AbsorbedNotAvailableYetNever = Pow<2, 0.5|2> // never | 4 --> 4
```

### `Mod`
Perform a JavaScript remainder (%) operation on any two numeric literals.

```ts
type NormalExample = Mod<7, 2> // 1

type UnionExample = Mod<20|19, 10> // 0 | 9

type NegativeExample = Mod<-7, 2> // -1

type FractionExample = Mod<19.99, 7.5> // 4.99

type NotPossible = Mod<5, 0> // never

type ZeroRemainder = Mod<20, 1> // 0

type FractionRemainder = Mod<20.555, 1> // 0.555

type AlwaysZero = Mod<0, 45> // 0

type ReallyItsAlwaysZero = Mod<0, number> // 0

type AbsorbedNever = Mod<10, 3|0> // 1 | never --> 1
```
### `Negate`
Negate a numeric literal.
```ts
type NormalExample = Negate<-12345> // 12345

type UnionExample = Negate<-1 | 2> // 1 | -2

type NumberExample = Negate<number> // number
```

### `Abs`
Get the absolute value of a numeric literal.
```ts
type NormalExample = Abs<-12345> // 12345

type UnionExample = Abs<-1 | 2> // 1 | 2

type NumberExample = Abs<number> // number
```
### `Compare`
Compare any two numeric literals. Returns -1 | 0 | 1 as per rules in Array.sort().

For Compare<X, Y>

* -1 --> X is less than Y
* 0 --> X and Y are equal
* 1 --> X is greater than Y

```ts
type NormalExample1 = Compare<5, 10> // -1
type NormalExample2 = Compare<5, 5> // 0
type NormalExample3 = Compare<10.1234, -5.111> // 1

type UnionExample = Compare<5|10, 7> // -1 | 1

type NumberExample = Compare<number, 7> // -1 | 0 | 1

```

### `Gt`
Perform a greater than comparison on any two numeric literals.

* 1 --> X > Y
* 0 --> X <= Y
```ts
type NormalExample1 = Gt<5, 10> // 0
type NormalExample2 = Gt<5, 5> // 0
type NormalExample3 = Gt<10.1234, -5.111> // 1

type UnionExample = Gt<5|10, 7> // 0 | 1

type NumberExample = Gt<number, 7> // 0 | 1

```
### `Lt`
Perform a less than comparison on any two numeric literals.

* 1 --> X < Y
* 0 --> X >= Y
```ts
type NormalExample1 = Lt<5, 10> // 1
type NormalExample2 = Lt<5, 5> // 0
type NormalExample3 = Lt<10.1234, -5.111> // 0

type UnionExample = Lt<5|10, 7> // 0 | 1

type NumberExample = Lt<number, 7> // 0 | 1

```
### `Eq`
Perform a equality comparison on any two numeric literals.

* 1 --> X === Y
* 0 --> X !== Y
```ts
type NormalExample1 = Eq<5, 10> // 0
type NormalExample2 = Eq<5, 5> // 1

type UnionExample = Eq<5|10, 10> // 0 | 1

type NumberExample = Eq<number, 7> // 0 | 1

```
### `GtOrEq`
Perform a greater than or equal to comparison on any two numeric literals.

* 1 --> X >= Y
* 0 --> X < Y
```ts
type NormalExample1 = GtOrEq<5, 10> // 0
type NormalExample2 = GtOrEq<5, 5> // 1
type NormalExample3 = GtOrEq<10.1234, -5.111> // 1

type UnionExample = GtOrEq<5|7|10, 7> // 0 | 1

type NumberExample = GtOrEq<number, 7> // 0 | 1

```
### `LtOrEq`
Perform a less than or equal to comparison on any two numeric literals.

* 1 --> X <= Y
* 0 --> X > Y
```ts
type NormalExample1 = LtOrEq<5, 10> // 1
type NormalExample2 = LtOrEq<5, 5> // 1
type NormalExample3 = LtOrEq<10.1234, -5.111> // 0

type UnionExample = LtOrEq<5|7|10, 7> // 0 | 1

type NumberExample = LtOrEq<number, 7> // 0 | 1

```
### `Max`
Get the greatest of two numeric literals.
```ts
type NormalExample1 = Max<5, 10> // 10
type NormalExample2 = Max<50, 5> // 50
type NormalExample3 = Max<10.1234, -5.111> // 10.1234

type UnionExample = Max<5|8|10, 7> // 7 | 8 | 10

type NumberExample = Max<number, 7> // number

```
### `Min`
Get the smallest of two numeric literals.
```ts
type NormalExample1 = Min<5, 10> // 5
type NormalExample2 = Min<50, 5> // 5
type NormalExample3 = Min<10.1234, -5.111> // -5.111

type UnionExample = Min<5|8|10, 7> // 5 | 7

type NumberExample = Min<number, 7> // number

```
### `IsPositive`
Check if a numeric literal is positive.
```ts
type NormalExample = IsPositive<-12345> // 0

type UnionExample = IsPositive<-1 | 2> // 0 | 1

type NumberExample = IsPositive<number> // 0 | 1

```
### `IsNegative`
Check if a numeric literal is negative.
```ts
type NormalExample = IsNegative<-12345> // 1

type UnionExample = IsNegative<-1 | 2> // 0 | 1

type NumberExample = IsNegative<number> // 0 | 1

```
### `IsOdd`
Check if a numeric literal is odd.
```ts
type NormalExample = IsOdd<123> // 1

type FractionExample = IsOdd<3.5> // never

type UnionExample = IsOdd<2 | 3> // 0 | 1

type NumberExample = IsOdd<number> // 0 | 1

```
### `IsEven`
Check if a numeric literal is even.
```ts
type NormalExample = IsEven<123> // 0

type FractionExample = IsEven<3.5> // never

type UnionExample = IsEven<2 | 3> // 0 | 1

type NumberExample = IsEven<number> // 0 | 1

```
### `IsInt`
Check if a numeric literal is an integer.
```ts
type NormalExample = IsInt<123> // 1

type FractionExample = IsInt<3.5> // 0

type UnionExample = IsInt<2 | 3.5> // 0 | 1

type NumberExample = IsInt<number> // 0 | 1
```
### `IsNotInt`
Check if a numeric literal is not an integer.
```ts
type NormalExample = IsNotInt<123> // 0

type FractionExample = IsNotInt<3.5> // 1

type UnionExample = IsNotInt<2 | 3.5> // 0 | 1

type NumberExample = IsNotInt<number> // 0 | 1
```
### `And`
Perform an AND operation on two Bits.
```ts
type OneAndOne = And<1, 1> // 1
type OneAndZero = And<1, 0> // 0
type ZeroAndOne = And<0, 1> // 0
type ZeroAndZero = And<0, 0> // 0

type UnionExample = And<1 | 0, 1> // 0 | 1
```
### `Or`
Perform an OR operation on two Bits.
```ts
type OneOrOne = Or<1, 1> // 1
type OneOrZero = Or<1, 0> // 1
type ZeroOrOne = Or<0, 1> // 1
type ZeroOrZero = Or<0, 0> // 0

type UnionExample = Or<1 | 0, 1> // 1
```
### `Xor`
Perform an XOR operation on two Bits.
```ts
type OneXorOne = Xor<1, 1> // 0
type OneXorZero = Xor<1, 0> // 1
type ZeroXorOne = Xor<0, 1> // 1
type ZeroXorZero = Xor<0, 0> // 0

type UnionExample = Xor<1 | 0, 1> // 0 | 1
```
### `Not`
Perform an NOT operation on a Bit.
```ts
type NotZero = Not<0> // 1
type NotOne = Not<1> // 0

type UnionExample = Not<0 | 1> // 0 | 1
```

See the [open issues](https://github.com/arielhs/ts-arithmetic/issues) for a full list of proposed features (and known issues).

<p align="right">(<a href="#readme-top">back to top</a>)</p>

<!-- ROADMAP -->
## Roadmap

- Support big numbers e.g. `8.5e+50`

<!-- LICENSE -->
## License

Distributed under the MIT License. See `LICENSE` for more information.

<p align="right">(<a href="#readme-top">back to top</a>)</p>

<!-- CONTACT -->
## Contact

Project Link: [https://github.com/arielhs/ts-arithmetic](https://github.com/arielhs/ts-arithmetic)

<p align="right">(<a href="#readme-top">back to top</a>)</p>


<!-- MARKDOWN LINKS & IMAGES -->
<!-- https://www.markdownguide.org/basic-syntax/#reference-style-links -->
[contributors-shield]: https://img.shields.io/github/contributors/arielhs/ts-arithmetic.svg?style=for-the-badge
[contributors-url]: https://github.com/arielhs/ts-arithmetic/graphs/contributors
[forks-shield]: https://img.shields.io/github/forks/arielhs/ts-arithmetic.svg?style=for-the-badge
[forks-url]: https://github.com/arielhs/ts-arithmetic/network/members
[stars-shield]: https://img.shields.io/github/stars/arielhs/ts-arithmetic.svg?style=for-the-badge
[stars-url]: https://github.com/arielhs/ts-arithmetic/stargazers
[issues-shield]: https://img.shields.io/github/issues/arielhs/ts-arithmetic.svg?style=for-the-badge
[issues-url]: https://github.com/arielhs/ts-arithmetic/issues
[license-shield]: https://img.shields.io/github/license/arielhs/ts-arithmetic.svg?style=for-the-badge
[license-url]: https://github.com/arielhs/ts-arithmetic/blob/main/LICENSE.txt
[product-screenshot]: /ts-arithmetic-screenshot.png
[TypeScript]: https://shields.io/badge/TypeScript-3178C6?logo=TypeScript&logoColor=FFF&style=flat-square
[typescript-url]: https://www.typescriptlang.org