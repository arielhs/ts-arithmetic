<!-- Improved compatibility of back to top link: See: https://github.com/othneildrew/Best-README-Template/pull/73 -->
<a name="readme-top"></a>
<!--
*** Thanks for checking out the Best-README-Template. If you have a suggestion
*** that would make this better, please fork the repo and create a pull request
*** or simply open an issue with the tag "enhancement".
*** Don't forget to give the project a star!
*** Thanks again! Now go create something AMAZING! :D
-->



<!-- PROJECT SHIELDS -->
<!--
*** I'm using markdown "reference style" links for readability.
*** Reference links are enclosed in brackets [ ] instead of parentheses ( ).
*** See the bottom of this document for the declaration of the reference variables
*** for contributors-url, forks-url, etc. This is an optional, concise syntax you may use.
*** https://www.markdownguide.org/basic-syntax/#reference-style-links
-->
[![Contributors][contributors-shield]][contributors-url]
[![Forks][forks-shield]][forks-url]
[![Stargazers][stars-shield]][stars-url]
[![Issues][issues-shield]][issues-url]
[![MIT License][license-shield]][license-url]


<!-- PROJECT LOGO -->
<br />
<div align="center">
  <a href="https://github.com/arielhs/ts-arithmetic">
    <img src="images/logo.png" alt="Logo" width="80" height="80">
  </a>

<h3 align="center">Type Level Arithmetic</h3>

  <p align="center">
    A package of utility types to perform all the basic arithmetic operations, <strong>without the usual limitations</strong>
    <br />
    <a href="https://github.com/arielhs/ts-arithmetic"><strong>Explore the docs »</strong></a>
    <br />
    <br />
    <a href="https://github.com/arielhs/ts-arithmetic">View Demo</a>
    ·
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
    <li><a href="#type-utility-reference">Type Utility Reference</a></li>
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

All of the operations behave pretty much how you would expect them to. They all accept positive/negative integers/fractions. There are a few things to note about `never`, `number` and unions of numeric literals.

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

For example, 0 * X = 0 **for all X**. So:
```ts
type Zero = Multiply<0, number> // resolves to 0
```

But for 1 + X, there is no meaningfull way to simplify down in the same way. So:
```ts
type Useless = Add<1, number> // resolves to number
```

### `Add`

Add any two numeric literals. It works exactly how you expect it to - you can pass in negative values, fractions etc.

```ts
// 100
type NormalExample = Add<75, 25>

// -0.25
type NegativeFractionsExample = Add<-1.5, 0.25>
```

### `Subtract`

Perform a substraction operation on any two numeric literals. It works exactly how you expect it to - you can pass in negative values, fractions etc.

```ts
// 150
type NormalExample = Subtract<200, 50>
```

### `Multiply`

Multiply any two numeric literals. You can pass in negative values and fractions. 

```ts
// 150
type NormalExample = Multiply<200, 50>
```

### `Divide`
### `Pow`
### `Mod`
### `Negate`
### `Abs`

### `Compare`
### `Gt`
### `Lt`
### `Eq`
### `GtOrEq`
### `LtOrEq`
### `Max`
### `Min`

### `IsPositive`
### `IsNegative`
### `IsOdd`
### `IsEven`
### `IsInt`
### `IsNotInt`

### `And`
### `Or`
### `Xor`
### `Not`

See the [open issues](https://github.com/arielhs/ts-arithmetic/issues) for a full list of proposed features (and known issues).

<p align="right">(<a href="#readme-top">back to top</a>)</p>


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
[license-url]: https://github.com/arielhs/ts-arithmetic/blob/master/LICENSE
[linkedin-shield]: https://img.shields.io/badge/-LinkedIn-black.svg?style=for-the-badge&logo=linkedin&colorB=555
[linkedin-url]: https://linkedin.com/in/linkedin_username
[product-screenshot]: /ts-arithmetic-screenshot.png
[TypeScript]: https://shields.io/badge/TypeScript-3178C6?logo=TypeScript&logoColor=FFF&style=flat-square
[typescript-url]: https://www.typescriptlang.org