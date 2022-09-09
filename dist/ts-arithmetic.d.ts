/**
 * Get the absolute value of a numeric literal
 *
 * @param N - The number to get the absolute value of.
 * @returns N as a positive number.
 *
 * @public
 */
export declare type Abs<N extends number> = (N extends N ? `${N}` extends `-${infer M extends number}` ? M : N : never);

/**
 * Add two numeric type literals.
 *
 * @param X - The first operand.
 * @param Y - The second operand.
 * @returns X + Y
 *
 * @public
 */
export declare type Add<X extends number, Y extends number> = (SomeElementExtends<[X, Y], never> extends 1 ? never : X extends 0 ? Y : Y extends 0 ? X : number extends (X | Y) ? number : AddNumbers<X, Y>);

declare type AdditionTable = MakeAdditionTable<[FirstAdditiveResultRow]>;

declare type AdditiveOperationResult<C extends Bit = Bit, R extends Digit = Digit> = OperationResult<C, R>;

declare type AdditiveOperationTable = AdditiveOperationResult[][];

/**
 * Add two numeric type literals
 *
 * @internal
 */
declare type AddNumbers<X extends number, Y extends number> = SignedFloatToNum<AddSignedFloats<ToSignedFloat<X>, ToSignedFloat<Y>>>;

declare type AddSignedFloats<X extends SignedFloat, Y extends SignedFloat> = (X extends SignedFloat<infer XSign, infer XUnsignedFloat> ? Y extends SignedFloat<infer YSign, infer YUnsignedFloat> ? {
    '-': {
        '-': SignedFloat<'-', AddUnsignedFloats<XUnsignedFloat, YUnsignedFloat>>;
        '+': NegateSignedFloat<SubtractUnsignedFloats<XUnsignedFloat, YUnsignedFloat>>;
    };
    '+': {
        '-': SubtractUnsignedFloats<XUnsignedFloat, YUnsignedFloat>;
        '+': SignedFloat<'+', AddUnsignedFloats<XUnsignedFloat, YUnsignedFloat>>;
    };
}[XSign][YSign] : never : never);

declare type AddUnsignedFloats<X extends UnsignedFloat, Y extends UnsignedFloat> = (Normalise<X, Y> extends [...DigitsPair<infer TNormalisedX, infer TNormalisedY>, infer TDecimalPlaces extends number] ? DigitsToUnsignedFloat<DigitwiseAdd<TNormalisedX, TNormalisedY>, TDecimalPlaces> : never);

declare type AddUnsignedInts<X extends Digit[], Y extends Digit[]> = (NormaliseIntPartLengths<X, Y> extends DigitsPair<infer TNormalisedX, infer TNormalisedY> ? DigitwiseAdd<TNormalisedX, TNormalisedY> : never);

/**
 * Perform an AND operation on two Bit literals.
 *
 * @param A - The first operand.
 * @param B - The second operand.
 * @returns Bit - (A & B)
 *
 * @public
 */
export declare type And<A extends Bit, B extends Bit> = AndMap[A][B];

declare type AndMap = TwoBitMap<[0, 0, 0, 1]>;

declare type ArrayOf<TLength extends number, TValue, A extends TValue[] = []> = (A['length'] extends TLength ? A : ArrayOf<TLength, TValue, [TValue, ...A]>);

/**
 * Used to represent true or false, but can be used to key into objects/tuples.
 *
 * @public
 */
export declare type Bit = 0 | 1;

declare type BitMap<TFalse = unknown, TTrue = unknown> = {
    0: TFalse;
    1: TTrue;
};

/**
 * Compare two numeric type literals.
 *
 * @param X - The number on the "left".
 * @param Y - The number on the "right".
 * @returns (-1 | 0 | 1) - (-1 if X is less than Y, 1 if X is greater than Y, 0 if X === Y).
 *
 * @public
 */
export declare type Compare<X extends number, Y extends number> = (SomeElementExtends<[X, Y], never> extends 1 ? never : number extends (X | Y) ? ComparisonResult : X extends X ? Y extends Y ? _Compare<X, Y> : never : never);

declare type _Compare<X extends number, Y extends number> = (SignDecisionBranch<X, Y, {
    '-': {
        '-': CompareNumberMagnitudes<Y, X>;
        '+': -1;
    };
    '+': {
        '-': 1;
        '+': CompareNumberMagnitudes<X, Y>;
    };
}>);

declare type CompareDecisionBranch<X extends number, Y extends number, TMap extends _CompareMap> = TMap[Compare<X, Y>];

declare type CompareDigits<A extends Digit, B extends Digit> = (A extends B ? 0 : _CompareDigits<A, B>);

declare type _CompareDigits<A extends Digit, B extends Digit, TOrderedDigits extends Digit[] = OrderedDigits> = (TOrderedDigits extends HeadDigitArray<infer THeadDigits, infer TLastDigit> ? A extends TLastDigit ? 1 : B extends TLastDigit ? -1 : _CompareDigits<A, B, THeadDigits> : never);

declare type CompareFloatMagnitudes<X extends UnsignedFloat, Y extends UnsignedFloat> = (Normalise<X, Y> extends [...DigitsPair<infer TNormalisedX, infer TNormalisedY>, number] ? CompareMagnitudes<TNormalisedX, TNormalisedY> : never);

declare type CompareIntMagnitudes<X extends Digit[], Y extends Digit[]> = (NormaliseIntPartLengths<X, Y> extends DigitsPair<infer TNormalisedX, infer TNormalisedY> ? CompareMagnitudes<TNormalisedX, TNormalisedY> : never);

declare type CompareLengths<A extends unknown[], B extends unknown[]> = (A['length'] extends B['length'] ? 0 : A['length'] extends 0 ? -1 : B['length'] extends 0 ? 1 : CompareLengths<Head<A>, Head<B>>);

declare type CompareMagnitudes<TNormalisedX extends Digit[], TNormalisedY extends Digit[]> = (TNormalisedX extends TNormalisedY ? 0 : [TNormalisedX, TNormalisedY] extends [TailDigitArray<infer XFirst, infer XTail>, TailDigitArray<infer YFirst, infer YTail>] ? CompareDigits<XFirst, YFirst> extends 0 ? CompareMagnitudes<XTail, YTail> : CompareDigits<XFirst, YFirst> : never);

declare type _CompareMap = {
    [K in ComparisonResult]: unknown;
};

declare type CompareNumberMagnitudes<X extends number, Y extends number> = (SplitAndNormalise<X, Y> extends [...DigitsPair<infer TNormalisedX, infer TNormalisedY>, number] ? CompareMagnitudes<TNormalisedX, TNormalisedY> : never);

declare type ComparisonResult = -1 | 0 | 1;

declare type CrossMultiply<X extends Digit[], Y extends Digit[], TShift extends 0[] = [], TPrevRowResult extends Digit[] = []> = (Y extends HeadDigitArray<infer YHead, infer B> ? CrossMultiply<X, YHead, [...TShift, 0], NormaliseIntZeros<AddUnsignedInts<TPrevRowResult, [
...MultiplyRow<X, B>,
...TShift
]>>> : TPrevRowResult);

declare type DecomposeNum<S extends string | number> = (SeparateSign<`${S}`> extends [infer TSign extends Sign, infer M extends string] ? SplitIntAndFractionParts<ScientificNotationAsDecimal<M>> extends NumComponents<never, infer I, infer F> ? NumComponents<TSign, TrimLeadingZeros<I>, TrimTrailingZeros<F>> : never : never);

declare type Digit = OrderedDigits[number];

declare type DigitsPair<TDigits1 extends Digit[], TDigits2 extends Digit[]> = [TDigits1, TDigits2];

declare type DigitsToUnsignedFloat<X extends Digit[], TDecimalPlaces extends number, TFractionalDigits extends Digit[] = []> = (TFractionalDigits['length'] extends TDecimalPlaces ? MakeUnsignedFloat<X, TFractionalDigits> : X extends HeadDigitArray<infer XHead, infer XLast> ? DigitsToUnsignedFloat<XHead, TDecimalPlaces, [XLast, ...TFractionalDigits]> : never);

declare type DigitwiseAdd<TNormalisedX extends Digit[], TNormalisedY extends Digit[]> = DigitwiseAdditiveOp<AdditionTable, TNormalisedX, TNormalisedY>;

declare type DigitwiseAdditiveOp<TTable extends AdditiveOperationTable, X extends Digit[], Y extends Digit[], TCarryIn extends Bit = 0, TFinalResult extends Digit[] = []> = ([
X,
Y
] extends [HeadDigitArray<infer XHead, infer A>, HeadDigitArray<infer YHead, infer B>] ? TTable[TCarryIn][A] extends AdditiveOperationResult<infer TCarryOut1, infer AAndCarryIn> ? TTable[B][AAndCarryIn] extends AdditiveOperationResult<infer TCarryOut2, infer TResult> ? DigitwiseAdditiveOp<TTable, XHead, YHead, Or<TCarryOut1, TCarryOut2>, [TResult, ...TFinalResult]> : never : never : [TCarryIn, ...TFinalResult]);

declare type DigitwiseSubtract<TNormalisedX extends Digit[], TNormalisedY extends Digit[]> = DigitwiseAdditiveOp<SubtractionTable, TNormalisedX, TNormalisedY>;

/**
 * Divide two numeric type literals.
 *
 * @param TNumerator - The numerator (a.k.a dividend)
 * @param TDivisor - The divisor (a.k.a denominator)
 * @returns TNumerator / TDivisor
 *
 * @public
 */
export declare type Divide<TNumerator extends number, TDivisor extends number> = (SomeElementExtends<[TNumerator, TDivisor], never> extends 1 ? never : TDivisor extends 0 ? never : TNumerator extends 0 ? 0 : TDivisor extends 1 ? TNumerator : number extends (TNumerator | TDivisor) ? number : TDivisor extends -1 ? Negate<TNumerator> : DivideNumbers<TNumerator, TDivisor>);

declare type DivideMaxDigits = 13;

declare type DivideNumbers<TNumerator extends number, TDivisor extends number> = SignedFloatToNum<DivideSignedFloats<ToSignedFloat<TNumerator>, ToSignedFloat<TDivisor>>>;

declare type DivideSignedFloats<TNumerator extends SignedFloat, TDivisor extends SignedFloat> = (TNumerator extends SignedFloat<infer NSign, infer N> ? TDivisor extends SignedFloat<infer DSign, infer D> ? SignedFloat<MultiplySigns<NSign, DSign>, DivideUnsignedFloats<N, D>[0]> : never : never);

declare type DivideUnsignedFloats<TNumerator extends UnsignedFloat, TDivisor extends UnsignedFloat, TWithRemainder extends boolean = false> = (Normalise<TNumerator, TDivisor> extends [...DigitsPair<infer N, infer D>, infer TDecimalPlaces] ? N extends TailDigitArray<infer TNumeratorHead, infer TNumeratorTail> ? [
LongDivide<D, [TNumeratorHead], TNumeratorTail, [], TWithRemainder>,
TDecimalPlaces
] : never : never);

declare type EmptryStringAsZero<S extends string> = S extends '' ? '0' : S;

/**
 * Perform an equality comparison on two numeric type literals.
 *
 * @param X - The number on the "left".
 * @param Y - The number on the "right".
 * @returns Bit - (1 if X \< Y, 0 if X \>= Y).
 *
 * @public
 */
export declare type Eq<X extends number, Y extends number> = (SomeElementExtends<[X, Y], never> extends 1 ? never : number extends (X | Y) ? Bit : X extends Y ? Y extends X ? 1 : 0 : 0);

declare type EuclideanDivide<TNumerator extends Digit[], TDivisor extends Digit[]> = _EuclideanDivide<TDivisor, TNumerator, [0]>;

declare type _EuclideanDivide<TDivisor extends Digit[], TRemainder extends Digit[], TQuotient extends Digit[]> = (CompareIntMagnitudes<TRemainder, TDivisor> extends (1 | 0) ? _EuclideanDivide<TDivisor, SubtractUnsignedInts<TRemainder, TDivisor>, AddUnsignedInts<TQuotient, [1]>> : MakeModResult<TRemainder, TQuotient>);

declare type EuclideanDivideResult<TRemainder extends Digit[], TQuotient extends Digit> = ModResult<TRemainder, [TQuotient]>;

declare type Exponentiate<X extends number, N extends number> = (N extends 0 ? 1 : IsNegative<N> extends 1 ? Exponentiate<Divide<1, X>, Negate<N>> : IsEven<N> extends 1 ? Exponentiate<Multiply<X, X>, Divide<N, 2>> : Exponentiate<Multiply<X, X>, Divide<Subtract<N, 1>, 2>> extends infer XX extends number ? Multiply<X, XX> : never);

declare type FirstAdditiveResultRow = MakeFirstRow<[]>;

declare type FlipSign<S extends Sign> = SignMap<'+', '-'>[S];

declare type FloatDigitCount<TUnsignedFloat extends UnsignedFloat> = ([
...TUnsignedFloat[0],
...TUnsignedFloat[1]
] extends infer TDigits extends Digit[] ? TDigits['length'] : never);

declare type FloatMaxDigits = 16;

declare type FloatMaxDigitsAsUnsignedFloat = ToUnsignedFloat<FloatMaxDigits>;

declare type FourBits = [Bit, Bit, Bit, Bit];

declare type GetSign<N extends number> = BitMap<'-', '+'>[IsPositive<N>];

/**
 * Perform a 'greater than' comparison on two numeric type literals.
 *
 * @param X - The number on the "left".
 * @param Y - The number on the "right".
 * @returns Bit - (1 if X \> Y, 0 if X \<= Y).
 *
 * @public
 */
export declare type Gt<X extends number, Y extends number> = (CompareDecisionBranch<X, Y, {
    [-1]: 0;
    0: 0;
    1: 1;
}>);

/**
 * Perform a 'greater than or equal to' operation on two numeric type literals.
 *
 * @param X - The number on the "left".
 * @param Y - The number on the "right".
 * @returns Bit - (1 if X \>= Y, 0 if X \< Y).
 *
 * @public
 */
export declare type GtOrEq<X extends number, Y extends number> = (CompareDecisionBranch<X, Y, {
    [-1]: 0;
    0: 1;
    1: 1;
}>);

declare type Head<A extends unknown[]> = A extends [...infer THead, unknown] ? THead : never;

declare type HeadDigitArray<THead extends Digit[], TLast extends Digit> = [...THead, TLast];

declare type InferNum<S extends string, TSign extends Sign> = (S extends '0' ? 0 : `${SignStr<TSign>}${S}` extends `${infer N extends number}` ? N : never);

/**
 * Checks if a numeric type literal is Even.
 *
 * @param N - The number to check.
 * @returns Bit - (i.e. 1 if N is Even, 0 if N is Odd. Returns never if N is has a non-zero fractional component).
 *
 * @public
 */
export declare type IsEven<N extends number> = (number extends N ? Bit : N extends N ? IsUnsignedFloatEven<ToUnsignedFloat<N>> : never);

/**
 * Checks if a numeric type literal is an Integer.
 *
 * @param N - The number to check.
 * @returns Bit - (i.e. 1 if N is an Integer, 0 if N has a non-zero fractional component).
 *
 * @public
 */
export declare type IsInt<N extends number> = (number extends N ? Bit : N extends N ? `${N}` extends `${string}.${string}` ? 0 : 1 : never);

declare type IsIntEven<D extends Digit[]> = (D extends HeadDigitArray<any, infer TLastDigit> ? TLastDigit extends (0 | 2 | 4 | 6 | 8) ? 1 : 0 : never);

/**
 * Check if a numeric literal is negative.
 *
 * @param N - The number to check.
 * @returns Bit (i.e. 1 if N is negative, 0 if N is positive).
 *
 * @public
 */
export declare type IsNegative<N extends number> = Not<IsPositive<N>>;

/**
 * Checks if a numeric type literal is not an Integer.
 *
 * @param N - The number to check.
 * @returns Bit - (i.e. 1 if N has a non-zero fractional component, 0 if N is an Integer).
 *
 * @public
 */
export declare type IsNotInt<N extends number> = Not<IsInt<N>>;

/**
 * Checks if a numeric type literal is Odd.
 *
 * @param N - The number to check.
 * @returns Bit - (i.e. 1 if N is Odd, 0 if N is Even. Returns never if N is has a non-zero fractional component).
 *
 * @public
 */
export declare type IsOdd<N extends number> = Not<IsEven<N>>;

/**
 * Check if a numeric literal is positive.
 *
 * @param N - The number to check.
 * @returns Bit (i.e. 1 if N is positive, 0 if N is negative).
 *
 * @public
 */
export declare type IsPositive<N extends number> = (N extends N ? number extends N ? Bit : `${N}` extends `-${number}` ? 0 : 1 : never);

declare type IsUnsignedFloatEven<F extends UnsignedFloat> = (F[1] extends [] ? IsIntEven<F[0]> : never);

declare type Join<A extends Stringable[], S extends string = ''> = (A extends [infer H extends Stringable, ...infer R extends Stringable[]] ? Join<R, `${S}${H}`> : S);

declare type Last<A extends unknown[]> = A extends [...unknown[], infer TLast] ? TLast : never;

declare type LeftPad<A extends unknown[], V, N extends number> = (A['length'] extends N ? A : LeftPad<[V, ...A], V, N>);

declare type LeftTrimTuple<A extends unknown[], T> = (A extends [infer H, ...infer R] ? [H] extends [T] ? LeftTrimTuple<R, T> : A : A);

declare type LongDivide<TDivisor extends Digit[], TNumeratorHead extends Digit[], TNumeratorTail extends Digit[], TQuotient extends Digit[] = [], TWithRemainder extends boolean = false> = (EuclideanDivide<TNumeratorHead, TDivisor> extends EuclideanDivideResult<infer TRemainder, infer TNextQuotientDigit> ? [...TQuotient, TNextQuotientDigit] extends infer TNextQuotient extends Digit[] ? TNumeratorTail extends TailDigitArray<infer TNextDigit, infer TNextTail> ? LongDivide<TDivisor, [...TRemainder, TNextDigit], TNextTail, TNextQuotient, TWithRemainder> : TWithRemainder extends false ? MakeUnsignedFloat<TNextQuotient, TRemainder extends [0] ? [] : LongDivideFraction<TDivisor, [...TRemainder, 0]>> : MakeModResult<TRemainder, TNextQuotient> : never : never);

declare type LongDivideFraction<TDivisor extends Digit[], TNumerator extends Digit[], TQuotient extends Digit[] = []> = (_Compare<TQuotient['length'], DivideMaxDigits> extends 1 ? TQuotient : EuclideanDivide<TNumerator, TDivisor> extends EuclideanDivideResult<infer TRemainder, infer TNextQuotientDigit> ? TRemainder extends [0] ? [...TQuotient, TNextQuotientDigit] : LongDivideFraction<TDivisor, [...TRemainder, 0], [...TQuotient, TNextQuotientDigit]> : never);

/**
 * Perform a 'less than' comparison on two numeric type literals.
 *
 * @param X - The number on the "left".
 * @param Y - The number on the "right".
 * @returns Bit - (1 if X \< Y, 0 if X \>= Y).
 *
 * @public
 */
export declare type Lt<X extends number, Y extends number> = Gt<Y, X>;

/**
 * Perform a 'less than or equal to' operation on two numeric type literals.
 *
 * @param X - The number on the "left".
 * @param Y - The number on the "right".
 * @returns Bit - (1 if X \<= Y, 0 if X \> Y).
 *
 * @public
 */
export declare type LtOrEq<X extends number, Y extends number> = GtOrEq<Y, X>;

declare type MakeAdditionTable<T extends unknown[]> = (T['length'] extends 10 ? T : MakeAdditionTable<[...T, RotateLeftWithCarry<Last<T>>]>);

declare type MakeFirstRow<A extends AdditiveOperationResult[]> = (A['length'] extends Digit ? MakeFirstRow<[...A, AdditiveOperationResult<0, A['length']>]> : A);

declare type MakeModResult<TRemainder extends Digit[], TQuotient extends Digit[]> = ModResult<NormaliseIntZeros<TRemainder>, NormaliseIntZeros<TQuotient>>;

declare type MakeMultiplicationRow<N extends Digit, TRow extends number[] = [0]> = (TRow['length'] extends 10 ? TRow : Last<TRow> extends infer TPrev extends number ? MakeMultiplicationRow<N, [...TRow, Add<TPrev, N>]> : never);

declare type MakeMultiplicationTable<TTable extends unknown[], X extends Digit[]> = (TTable['length'] extends 10 ? TTable : X extends TailDigitArray<infer N, infer XTail> ? MakeMultiplicationTable<[...TTable, MapToOperationResult<MakeMultiplicationRow<N>>], XTail> : never);

declare type MakeSignedFloat<TSign extends Sign, TUnsignedFloat extends UnsignedFloat> = (MakeUnsignedFloat<TUnsignedFloat[0], TUnsignedFloat[1]> extends infer TActualUnsignedFloat extends UnsignedFloat ? TActualUnsignedFloat extends UnsignedFloatZero ? SignedFloatZero : SignedFloat<TSign, TActualUnsignedFloat> : never);

declare type MakeSubtractionTable<T extends unknown[]> = (T['length'] extends 10 ? T : MakeSubtractionTable<[...T, RotateRightWithCarry<Last<T>>]>);

declare type MakeUnsignedFloat<TIntegerDigits extends Digit[], TFractionalDigits extends Digit[] = []> = (UnsignedFloat<NormaliseIntZeros<TIntegerDigits>, NormaliseFractionalZeros<TFractionalDigits>>);

declare type MapToOperationResult<TRow extends number[]> = {
    [K in keyof TRow]: OperationResultFromNum<TRow[K]>;
};

/**
 * Get the greatest of two numeric type literals.
 *
 * @param X - The first operand.
 * @param Y - The second operand.
 * @returns X|Y - (X if X \> Y, Y if Y \> X else X (since they would be equal)).
 *
 * @public
 */
export declare type Max<X extends number, Y extends number> = (number extends (X | Y) ? number : X extends Y ? X : Y extends X ? Y : Gt<X, Y> extends 1 ? X : Y);

/**
 * Get the smallest of two numeric type literals.
 *
 * @param X - The first operand.
 * @param Y - The second operand.
 * @returns X|Y - (X if X \< Y, Y if Y \< X else X (since they would be equal)).
 *
 * @public
 */
export declare type Min<X extends number, Y extends number> = (number extends (X | Y) ? number : X extends Y ? X : Y extends X ? Y : Lt<X, Y> extends 1 ? X : Y);

/**
 * Mod two numeric type literals. This returns the remainder as per JavaScript's Remainder (%) operator.
 *
 * @param TNumerator - The numerator (a.k.a dividend)
 * @param TDivisor - The divisor (a.k.a denominator)
 * @returns TNumerator % TDivisor
 *
 * @public
 */
export declare type Mod<TNumerator extends number, TDivisor extends number> = (SomeElementExtends<[TNumerator, TDivisor], never> extends 1 ? never : TDivisor extends 0 ? never : TNumerator extends 0 ? 0 : number extends (TNumerator | TDivisor) ? number : ModNumbers<TNumerator, TDivisor>);

declare type ModNumbers<TNumerator extends number, TDivisor extends number> = SignedFloatToNum<ModSignedFloats<ToSignedFloat<TNumerator>, ToSignedFloat<TDivisor>>>;

declare type ModResult<TRemainder extends Digit[], TQuotient extends Digit[]> = [
remainder: TRemainder,
quotient: TQuotient
];

declare type ModSignedFloats<TNumerator extends SignedFloat, TDivisor extends SignedFloat> = (TNumerator extends SignedFloat<infer NSign, infer N> ? TDivisor extends SignedFloat<Sign, infer D> ? SignedFloat<NSign, ModUnsignedFloats<N, D>> : never : never);

declare type ModUnsignedFloats<TNumerator extends UnsignedFloat, TDivisor extends UnsignedFloat> = (DivideUnsignedFloats<TNumerator, TDivisor, true> extends [ModResult<infer TRemainder, infer TQuotient>, infer TDecimalPlaces extends number] ? SafeDigitsToUnsignedFloat<TRemainder, TDecimalPlaces> : never);

declare type MultiplicationTable = MakeMultiplicationTable<[], OrderedDigits>;

/**
 * Multiply two numeric type literals.
 *
 * @param X - The first operand.
 * @param Y - The second operand.
 * @returns X * Y
 *
 * @public
 */
export declare type Multiply<X extends number, Y extends number> = (SomeElementExtends<[X, Y], never> extends 1 ? never : X extends 0 ? 0 : Y extends 0 ? 0 : X extends 1 ? Y : Y extends 1 ? X : number extends (X | Y) ? number : X extends -1 ? Negate<Y> : Y extends -1 ? Negate<X> : MultiplyNumbers<X, Y>);

declare type MultiplyNumbers<X extends number, Y extends number> = SignedFloatToNum<MultiplySignedFloats<ToSignedFloat<X>, ToSignedFloat<Y>>>;

declare type MultiplyRow<X extends Digit[], B extends Digit, TCarryIn extends Digit = 0, TFinalResult extends Digit[] = []> = (X extends HeadDigitArray<infer XHead, infer A> ? MultiplicationTable[A][B] extends OperationResult<infer ATimesBCarryOut, infer ATimesB> ? AdditionTable[ATimesB][TCarryIn] extends AdditiveOperationResult<infer TCarryOut2, infer TResult> ? AdditionTable[ATimesBCarryOut][TCarryOut2] extends AdditiveOperationResult<0, infer TFinalCarryOut> ? MultiplyRow<XHead, B, TFinalCarryOut, [TResult, ...TFinalResult]> : never : never : never : [TCarryIn, ...TFinalResult]);

declare type MultiplySignedFloats<X extends SignedFloat, Y extends SignedFloat> = (X extends SignedFloat<infer XSign, infer XUnsignedFloat> ? Y extends SignedFloat<infer YSign, infer YUnsignedFloat> ? SignedFloat<MultiplySigns<XSign, YSign>, MultiplyUnsignedFloats<XUnsignedFloat, YUnsignedFloat>> : never : never);

declare type MultiplySigns<S extends Sign, T extends Sign> = SignMultiplicationMap[S][T];

declare type MultiplyUnsignedFloats<X extends UnsignedFloat, Y extends UnsignedFloat> = (NormaliseForCrossMultiply<X, Y> extends [...DigitsPair<infer TNormalisedX, infer TNormalisedY>, infer TDecimalPlaces extends number] ? SafeDigitsToUnsignedFloat<CrossMultiply<TNormalisedX, TNormalisedY>, TDecimalPlaces> : never);

/**
 * Negate a numeric literal
 *
 * @param N - The number to negate.
 * @returns -N
 *
 * @public
 */
export declare type Negate<N extends number> = (N extends 0 ? 0 : number extends N ? number : `${N}` extends `-${infer M extends number}` ? M : `-${N}` extends `${infer M extends number}` ? M : never);

declare type NegateSignedFloat<X extends SignedFloat> = (X extends SignedFloat<infer TSign, infer TUnsignedFloat> ? SignedFloat<FlipSign<TSign>, TUnsignedFloat> : never);

declare type Normalise<X extends UnsignedFloat, Y extends UnsignedFloat> = (NormaliseIntPartLengths<X[0], Y[0]> extends DigitsPair<infer XIntegerPart, infer YIntegerPart> ? NormaliseLengths<X[1], Y[1], 'R', 0> extends DigitsPair<infer XFractionalPart, infer YFractionalPart> ? [
xDigits: [...XIntegerPart, ...XFractionalPart],
yDigits: [...YIntegerPart, ...YFractionalPart],
decimalPlaces: YFractionalPart['length']
] : never : never);

declare type NormaliseForCrossMultiply<X extends UnsignedFloat, Y extends UnsignedFloat> = (X extends UnsignedFloat<infer XIntegerPart, infer XFractionalPart> ? Y extends UnsignedFloat<infer YIntegerPart, infer YFractionalPart> ? [
xDigits: NormaliseIntZeros<[...XIntegerPart, ...XFractionalPart]>,
yDigits: NormaliseIntZeros<[...YIntegerPart, ...YFractionalPart]>,
decimalPlaces: AddNumbers<XFractionalPart['length'], YFractionalPart['length']>
] : never : never);

declare type NormaliseFractionalZeros<X extends Digit[]> = RightTrimTuple<X, 0>;

declare type NormaliseIntPartLengths<X extends Digit[], Y extends Digit[]> = NormaliseLengths<X, Y, 'L', 0>;

declare type NormaliseIntZeros<X extends Digit[]> = (LeftTrimTuple<X, 0> extends infer TTrimmedX extends Digit[] ? TTrimmedX extends [] ? [0] : TTrimmedX : never);

declare type NormaliseLengths<A extends unknown[], B extends unknown[], D extends PadDirection, TPadValue> = (CompareLengths<A, B> extends 0 | -1 ? [Pad<D, A, TPadValue, B['length']>, B] : [A, Pad<D, B, TPadValue, A['length']>]);

/**
 * Perform an NOT operation on a Bit literals.
 *
 * @param B - The operand to NOT.
 * @returns Bit - (~B)
 *
 * @public
 */
export declare type Not<B extends Bit> = NotMap[B];

declare type NotMap = BitMap<1, 0>;

declare type NumComponents<TSign extends Sign, I extends string, F extends string> = [
sign: EmptryStringAsZero<I | F> extends '0' ? '+' : TSign,
integerPart: I,
fractionalPart: F
];

declare type NumsUpto<N extends number, A extends number[] = []> = (A['length'] extends N ? Reject<A, never> : NumsUpto<N, [...A, A['length']]>);

declare type OperationResult<C extends Digit = Digit, R extends Digit = Digit> = [carry: C, result: R];

declare type OperationResultFromNum<N extends number> = (`${N}` extends `${infer C extends Digit}${infer R extends Digit}` ? OperationResult<C, R> : `${N}` extends `${infer R extends Digit}` ? OperationResult<0, R> : never);

/**
 * Perform an OR operation on two Bit literals.
 *
 * @param A - The first operand.
 * @param B - The second operand.
 * @returns Bit - (A | B)
 *
 * @public
 */
export declare type Or<A extends Bit, B extends Bit> = OrMap[A][B];

declare type OrderedDigits = NumsUpto<10>;

declare type OrMap = TwoBitMap<[0, 1, 1, 1]>;

declare type Pad<D extends PadDirection, A extends unknown[], V, N extends number> = {
    'L': LeftPad<A, V, N>;
    'R': RightPad<A, V, N>;
}[D];

declare type PadDirection = 'L' | 'R';

/**
 * Raise a numeric literal to the power of another.
 *
 * @param X - The base.
 * @param N - The exponent (a.k.a power). Must be an Integer.
 * @returns X^N
 *
 * @public
 */
export declare type Pow<X extends number, N extends number> = (SomeElementExtends<[X, N], never> extends 1 ? never : N extends 0 ? 1 : N extends 1 ? X : X extends 1 ? 1 : X extends -1 ? number extends N ? -1 | 1 : PowRejectingFractionalExponent<X, N> : X extends 0 ? IsNegative<N> extends 1 ? never : 0 : number extends (X | N) ? number : PowRejectingFractionalExponent<X, N>);

declare type PowRejectingFractionalExponent<X extends number, N extends number> = (IsInt<N> extends 0 ? never : Exponentiate<X, N>);

declare type Reject<A extends unknown[], T> = (A extends [infer H, ...infer R] ? [H] extends [T] ? Reject<R, T> : [H, ...Reject<R, T>] : []);

declare type RightPad<A extends unknown[], V, N extends number> = (A['length'] extends N ? A : RightPad<[...A, V], V, N>);

declare type RightTrimTuple<A extends unknown[], T> = (A extends [...infer H, infer L] ? [L] extends [T] ? RightTrimTuple<H, T> : A : A);

declare type RotateLeftWithCarry<A> = (A extends [AdditiveOperationResult<any, infer R>, ...infer TTail] ? [...TTail, AdditiveOperationResult<1, R>] : never);

declare type RotateRightWithCarry<A> = (A extends [...infer THead, AdditiveOperationResult<any, infer R>] ? [AdditiveOperationResult<1, R>, ...THead] : never);

declare type RoundFloat<F extends SignedFloat> = (SmallEnoughForScientificNotation<F[1][1]> extends 1 ? F : F extends SignedFloat<infer TSign, infer FUnsignedFloat> ? _Compare<FloatDigitCount<FUnsignedFloat>, FloatMaxDigits> extends (-1 | 0) ? F : SubtractUnsignedFloats<FloatMaxDigitsAsUnsignedFloat, ToUnsignedFloat<FUnsignedFloat[0]['length']>> extends SignedFloat<infer TTargetFractionLengthSign, infer TTargetFractionLength> ? TTargetFractionLengthSign extends '-' ? F : RoundFractionalDigits<FUnsignedFloat[1], RoundingCarryMap[TSign], UnsignedFloatToNum<TTargetFractionLength, '+'>> extends [infer TCarryOut extends Digit, ...infer TRoundedFraction extends Digit[]] ? MakeSignedFloat<TSign, UnsignedFloat<AddUnsignedInts<FUnsignedFloat[0], [TCarryOut]>, TRoundedFraction>> : never : never : never);

declare type RoundFractionalDigits<F extends Digit[], TRoundingMap extends Digit[], TTargetFractionLength extends number> = (F extends HeadDigitArray<infer FHead, infer D> ? FHead['length'] extends TTargetFractionLength ? TTargetFractionLength extends 0 ? [TRoundingMap[D]] : AddUnsignedInts<FHead, [TRoundingMap[D]]> : RoundFractionalDigits<FHead, TRoundingMap, TTargetFractionLength> : never);

declare type RoundingCarryMap = SignMap<[
...ArrayOf<6, 0>,
...ArrayOf<4, 1>
], [
...ArrayOf<5, 0>,
...ArrayOf<5, 1>
]>;

declare type SafeDigitsToUnsignedFloat<X extends Digit[], TDecimalPlaces extends number, TFractionalDigits extends Digit[] = []> = (_Compare<X['length'], TDecimalPlaces> extends -1 ? DigitsToUnsignedFloat<LeftPad<X, 0, TDecimalPlaces>, TDecimalPlaces> : DigitsToUnsignedFloat<X, TDecimalPlaces>);

declare type ScientificNotationAsDecimal<N extends string | number> = (`${N}` extends `${infer TSignificand extends number}e-${infer TExp extends number}` ? SplitIntAndFractionParts<TSignificand> extends NumComponents<never, infer I, infer F> ? ArrayOf<TExp, 0> extends [infer TIntZero extends 0, ...infer TFractionZeros extends 0[]] ? Join<[TIntZero, '.', ...TFractionZeros, I, F]> : never : never : `${N}`);

declare type SeparateSign<S extends string> = (S extends `-${infer N}` ? ['-', N] : ['+', S]);

declare type Sign = '+' | '-';

declare type SignDecisionBranch<X extends number, Y extends number, TBranches extends SignMap<SignMap, SignMap>> = TBranches[GetSign<X>][GetSign<Y>];

declare type SignedFloat<TSign extends Sign = Sign, TUnsignedFloat extends UnsignedFloat = UnsignedFloat> = [
sign: TSign,
unsignedFloat: TUnsignedFloat
];

declare type SignedFloatToNum<TSignedFloat extends SignedFloat> = (RoundFloat<TSignedFloat> extends SignedFloat<infer TSign, infer TUnsignedFloat> ? UnsignedFloatToNum<TUnsignedFloat, TSign> : never);

declare type SignedFloatZero = SignedFloat<'+', UnsignedFloatZero>;

declare type SignMap<TNegative = unknown, TPositive = unknown> = {
    '-': TNegative;
    '+': TPositive;
};

declare type SignMultiplicationMap = SignMap<SignMap<'+', '-'>, SignMap<'-', '+'>>;

declare type SignStr<S extends Sign> = S extends '+' ? '' : S;

declare type SmallEnoughForScientificNotation<TFractionalDigits extends Digit[]> = (TFractionalDigits extends [0, 0, 0, 0, 0, 0, ...Digit[]] ? 1 : 0);

declare type SomeElementExtends<A extends unknown[], T> = (A extends [infer H, ...infer R] ? [H] extends [T] ? 1 : SomeElementExtends<R, T> : 0);

declare type SplitAndNormalise<X extends number, Y extends number> = Normalise<ToSignedFloat<X>[1], ToSignedFloat<Y>[1]>;

declare type SplitIntAndFractionParts<S extends string | number> = (`${S}` extends `${infer I}.${infer F}` ? NumComponents<never, I, F> : NumComponents<never, `${S}`, ''>);

declare type SplitIntoDigits<N extends string> = (N extends '' ? [] : N extends `${infer D extends Digit}${infer R}` ? R extends '' ? [D] : R extends `${number}` ? [D, ...SplitIntoDigits<R>] : never : never);

declare type SplitLeadingElements<A extends unknown[], T, L extends unknown[] = []> = (A extends [infer H, ...infer R] ? [H] extends [T] ? SplitLeadingElements<R, T, [...L, H]> : [L, A] : [L, []]);

declare type Stringable = string | number | bigint | boolean | null | undefined;

/**
 * Perform subtraction on two numeric type literals.
 *
 * @param X - The first operand.
 * @param Y - The second operand.
 * @returns X - Y
 *
 * @public
 */
export declare type Subtract<X extends number, Y extends number> = (SomeElementExtends<[X, Y], never> extends 1 ? never : number extends (X | Y) ? number : X extends 0 ? Negate<Y> : Y extends 0 ? X : SubtractNumbers<X, Y>);

declare type SubtractionTable = MakeSubtractionTable<[FirstAdditiveResultRow]>;

declare type SubtractNumbers<X extends number, Y extends number> = SignedFloatToNum<SubtractSignedFloats<ToSignedFloat<X>, ToSignedFloat<Y>>>;

declare type SubtractSignedFloats<X extends SignedFloat, Y extends SignedFloat> = (X extends SignedFloat<infer XSign, infer XUnsignedFloat> ? Y extends SignedFloat<infer YSign, infer YUnsignedFloat> ? {
    '-': {
        '-': NegateSignedFloat<SubtractUnsignedFloats<XUnsignedFloat, YUnsignedFloat>>;
        '+': SignedFloat<'-', AddUnsignedFloats<XUnsignedFloat, YUnsignedFloat>>;
    };
    '+': {
        '-': SignedFloat<'+', AddUnsignedFloats<XUnsignedFloat, YUnsignedFloat>>;
        '+': SubtractUnsignedFloats<XUnsignedFloat, YUnsignedFloat>;
    };
}[XSign][YSign] : never : never);

declare type SubtractUnsignedFloats<X extends UnsignedFloat, Y extends UnsignedFloat> = {
    1: SignedFloat<'+', _SubtractUnsignedFloats<X, Y>>;
    0: SignedFloatZero;
    [-1]: SignedFloat<'-', _SubtractUnsignedFloats<Y, X>>;
}[CompareFloatMagnitudes<X, Y>];

declare type _SubtractUnsignedFloats<X extends UnsignedFloat, Y extends UnsignedFloat> = (Normalise<X, Y> extends [...DigitsPair<infer TNormalisedX, infer TNormalisedY>, infer TDecimalPlaces extends number] ? DigitsToUnsignedFloat<DigitwiseSubtract<TNormalisedX, TNormalisedY>, TDecimalPlaces> : never);

declare type SubtractUnsignedInts<X extends Digit[], Y extends Digit[]> = (NormaliseIntPartLengths<X, Y> extends DigitsPair<infer TNormalisedX, infer TNormalisedY> ? DigitwiseSubtract<TNormalisedX, TNormalisedY> : never);

declare type TailDigitArray<TFirst extends Digit, TTail extends Digit[]> = [TFirst, ...TTail];

declare type ToDecimalString<TIntegerDigits extends Digit[], TFractionalDigits extends Digit[]> = (TFractionalDigits extends [] ? Join<TIntegerDigits> : `${Join<TIntegerDigits>}.${Join<TFractionalDigits>}`);

declare type ToSignedFloat<N extends number> = (DecomposeNum<N> extends NumComponents<infer TSign, infer I, infer F> ? SignedFloat<TSign, UnsignedFloat<SplitIntoDigits<I>, SplitIntoDigits<F>>> : never);

declare type ToSmallFractionString<TFractionalDigits extends Digit[]> = (SmallEnoughForScientificNotation<TFractionalDigits> extends 1 ? SplitLeadingElements<TFractionalDigits, 0> extends [infer TFractionalZeros extends 0[], infer TSignificand extends Digit[]] ? TSignificand extends TailDigitArray<infer TSignificandInt, infer TSignificandFraction> ? [0, ...TFractionalZeros]['length'] extends infer TExp extends number ? `${SignedFloatToNum<RoundFloat<SignedFloat<'+', [[TSignificandInt], TSignificandFraction]>>>}e-${TExp}` : never : never : never : ToDecimalString<[0], TFractionalDigits>);

declare type ToUnsignedFloat<N extends number> = ToSignedFloat<N>[1];

declare type Trim<S extends string, L extends string, R extends string> = ((L | R) extends '' ? S : '' extends (L | R) ? S extends `${L}${infer M}${R}` ? Trim<M, L, R> : S : never);

declare type TrimLeadingZeros<S extends string> = EmptryStringAsZero<Trim<S, '0', ''>>;

declare type TrimTrailingZeros<S extends string> = Trim<S, '', '0'>;

declare type TwoBitMap<R extends FourBits = FourBits> = BitMap<BitMap<R[0], R[1]>, BitMap<R[2], R[3]>>;

declare type UnsignedFloat<TIntegerDigits extends Digit[] = Digit[], TFractionalDigits extends Digit[] = Digit[]> = [
integerDigits: TIntegerDigits,
fractionalDigits: TFractionalDigits
];

declare type UnsignedFloatToNum<TUnsignedFloat extends UnsignedFloat, TSign extends Sign> = (TUnsignedFloat extends UnsignedFloat<infer TIntegerDigits, infer TFractionalDigits> ? TIntegerDigits extends [0] ? InferNum<ToSmallFractionString<TFractionalDigits>, TSign> : InferNum<ToDecimalString<TIntegerDigits, TFractionalDigits>, TSign> : never);

declare type UnsignedFloatZero = MakeUnsignedFloat<[0]>;

/**
 * Perform an XOR (exclusive OR) operation on two Bit literals.
 *
 * @param A - The first operand.
 * @param B - The second operand.
 * @returns Bit - (A xor B)
 *
 * @public
 */
export declare type Xor<A extends Bit, B extends Bit> = XorMap[A][B];

declare type XorMap = TwoBitMap<[0, 1, 1, 0]>;

export { }
