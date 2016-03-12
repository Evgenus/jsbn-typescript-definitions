// Type definitions for jsbn v1.2
// Project: http://www-cs-students.stanford.edu/%7Etjw/jsbn/
// Definitions by: Eugene Chernyshov <https://github.com/Evgenus>
// Definitions: https://github.com/borisyankov/DefinitelyTyped

// Development repository: https://github.com/Evgenus/jsbn-typescript-definitions
// For answers, fixes and cutting edge version please see development repository.

/**
 * Basic JavaScript BN library - subset useful for RSA encryption.
 */
declare module 'jsbn' {

    interface RandomGenerator {
        nextBytes(bytes: number[]): void;
    }

    export interface BigIntegerFactory {
        new (a: number, c: RandomGenerator): BigInteger;
        new (a: number, b: number, c: RandomGenerator): BigInteger;
        new (a: string, b?: number): BigInteger;
        new (a: number[], b?: number): BigInteger;    
        new (a: BigInteger): BigInteger;
    }
    
    export class BigInteger {

        /**
         * Constructs new BigInteger with random value
         * 
         * @constructor implements new interface.
         *
         * @param {number} a          Bit length as number.
         * @param {RandomGenerator} c The random number generator.
         */
        constructor(a: number, c: RandomGenerator);

        /**
         * Constructs new BigInteger with random possible prime value.
         * 
         * @constructor implements new interface
         * @private Used inside some version of MillerRabin.
         *
         * @param {number} a          Bit length as number.
         * @param {number} b          The number coefficient of certainty.
         * @param {RandomGenerator} c The random number generator.
         */
        constructor(a: number, b: number, c: RandomGenerator);

        /**
         * Constructs new BigInteger from string representation.
         * 
         * @constructor implements new interface.
         *
         * @param {string} a The string representation of BigInteger.
         * @param {number=} b (Optional) the radix.
         */
        constructor(a: string, b?: number); //TODO

        /**
         * Constructs new BigInteger from bytes
         * 
         * @constructor implements new interface.
         *
         * @param {number[]} a Array of bytes.
         * @param {number=} b   (Optional) the radix.
         */
        constructor(a: number[], b?: number);

        /**
         * Constructs new BigInteger as a copy of existing BigInteger.
         * 
         * @constructor implements new interface.
         *
         * @param {BigInteger} a The BigInteger to copy.
         */
        constructor(a: BigInteger);

        /**
         * The sign number.
         */
        s: number;

        /**
         * The length number.
         */
        t: number;
        data: number[]; // forge specific

        DB: number;
        DM: number;
        DV: number;

        FV: number;
        F1: number;
        F2: number;

        /**
         * am: Compute w_j += (x*this_i), propagate carries,
         */
        am(i: number, x: number, w: BigInteger, j: number, c: number, n: number): number;

        /**
         * (protected) copy this to r.
         *
         * @param {BigInteger} r The destination BigInteger instance.
         */
        copyTo(r: BigInteger): void;

        /**
         * (protected) set from integer value x, -DV <= x < DV.
         *
         * @param {number} x The source number.
         */
        fromInt(x: number): void;

        /**
         * (protected) set from string and radix.
         *
         * @param {string} x The string representation of BigInteger.
         * @param {number} b The radix.
         */
        fromString(x: string, b: number): void;

        /**
         * (protected) clamp off excess high words.
         */
        clamp(): void;

        /**
         * (public) return string representation in given radix.
         *
         * @param {number=} b (Optional) the radix.
         *
         * @return {string} A string that represents this object.
         */
        toString(b?: number): string;

        /**
         * (public) -this.
         *
         * @return {BigInteger} A new negated BigInteger.
         */
        negate(): BigInteger;

        /**
         * (public) |this|.
         *
         * @return {BigInteger} A new BigInteger that equals to absolute value of this.
         */
        abs(): BigInteger;

        /**
         * (public) return + if this > a, - if this < a, 0 if equal.
         *
         * @param {BigInteger} a BigInteger to compare to this.
         *
         * @return {number} Negative if this object is less than the other, 0 if they are equal, or
         *         positive if this is greater.
         */
        compareTo(a: BigInteger): number;

        /**
         * (public) return the number of bits in "this".
         *
         * @return {number} A length of this BigInteger in bits.
         */
        bitLength(): number;

        /**
         * (protected) r = this << n*DB.
         *
         * @param {number} n     The number of shift amount.
         * @param {BigInteger} r The destination BigInteger to store result.
         */
        dlShiftTo(n: number, r: BigInteger): void;

        /**
         * (protected) r = this >> n*DB.
         *
         * @param {number} n     The number of shift amount.
         * @param {BigInteger} r The destination BigInteger to store result.
         */
        drShiftTo(n: number, r: BigInteger): void;

        /**
         * (protected) r = this << n.
         *
         * @param {number} n     The number of shift amount.
         * @param {BigInteger} r The destination BigInteger to store result.
         */
        lShiftTo(n: number, r: BigInteger): void;

        /**
         * (protected) r = this >> n.
         *
         * @param {number} n     The number of shift amount.
         * @param {BigInteger} r The destination BigInteger to store result.
         */
        rShiftTo(n: number, r: BigInteger): void;

        /**
         * (protected) r = this - a.
         *
         * @param {BigInteger} a The subtrahend BigInteger.
         * @param {BigInteger} r The destination BigInteger to store difference.
         */
        subTo(a: BigInteger, r: BigInteger): void;

        /**
         * (protected) r = this * a, r != this,a (HAC 14.12)
         *
         * @param {BigInteger} a The multiplier BigInteger.
         * @param {BigInteger} r The destination BigInteger to store product.
         */
        multiplyTo(a: BigInteger, r: BigInteger): void;

        /**
         * (protected) r = this^2, r != this (HAC 14.16)
         *
         * @param {BigInteger} r The destination BigInteger to store result.
         */
        squareTo(r: BigInteger): void;

        /**
         * (protected) divide this by m, quotient and remainder to q, r (HAC 14.20)
         * r != q, this != m.  q or r may be null.
         *
         * @param {BigInteger} m The divisor BigInteger.
         * @param {?BigInteger} q The destination BigInteger to store quotient.
         * @param {?BigInteger} r The destination BigInteger to store remainder.
         */
        divRemTo(m: BigInteger, q: BigInteger, r: BigInteger): void;

        /**
         * (public) this mod a.
         *
         * @param {BigInteger} a The divisor BigInteger.
         *
         * @return {BigInteger} A new BigInteger equals to remainder.
         */
        mod(a: BigInteger): BigInteger;

        /**
         * (protected) return "-1/this % 2^DB"; useful for Mont. reduction.
         *
         * @return {number}
         */
        invDigit(): number;

        /**
         * (protected) true if this is even.
         *
         * @return {boolean} true if even, false if not.
         */
        isEven(): boolean;

        /**
         * (protected) this^e, e < 2^32, doing sqr and mul with "r" (HAC 14.79)
         *
         * @param {number} e    The exponent.
         * @param {Reduction} z The Reduction.
         *
         * @return {BigInteger} A new BigInteger equals to power.
         */
        exp(e: number, z: Reduction): BigInteger;

        /**
         * (public) this^e % m, 0 <= e < 2^32.
         *
         * @param {number} e     The exponent.
         * @param {BigInteger} m The divisor BigInteger.
         *
         * @return {BigInteger} The new BigInteger equals to remainder.
         */
        modPowInt(e: number, m: BigInteger): BigInteger;

        /**
         * (public)
         *
         * @return {BigInteger} A copy of this object.
         */
        clone(): BigInteger;

        /**
         * (public) return value as integer.
         *
         * @return {number}
         */
        intValue(): number;

        /**
         * (public) return value as byte.
         *
         * @return {number}
         */
        byteValue(): number;

        /**
         * (public) return value as short (assumes DB>=16)
         *
         * @return {number}
         */
        shortValue(): number;

        /**
         * (protected) return x s.t. r^x < DV.
         *
         * @param {number} r The number to process.
         *
         * @return {number}
         */
        chunkSize(r: number): number;

        /**
         * (public) 0 if this == 0, 1 if this > 0.
         *
         * @return {number}.
         */
        signum(): number;

        /**
         * (protected) convert to radix string.
         *
         * @param {number} b The radix.
         *
         * @return {string} string representation accordingly to radix.
         */
        toRadix(b: number): string;

        /**
         * (protected) convert from radix string.
         *
         * @param {string} s  The string representation of BigInteger.
         * @param {?number} b The radix.
         */
        fromRadix(s: string, b: number): void;

        /**
         * (protected) alternate constructor.
         *
         * @param {number} a          The number of bits.
         * @param {RandomGenerator} b The random number generator.
         */
        fromNumber(a: number, b: RandomGenerator): void;

        /**
         * (protected) alternate constructor.
         *
         * @param {number} a          The number of bits.
         * @param {number} b          The number coefficient of certainty.
         * @param {RandomGenerator} c The random number generator.
         */
        fromNumber(a: number, b: number, c: RandomGenerator): void;

        /**
         * (public) convert to big-endian byte array.
         *
         * @return {number[]} This object as Array.
         */
        toByteArray(): number[];

        /**
         * Tests if this BigInteger is considered equal to another.
         *
         * @param {BigInteger} a The BigInteger to compare to this object.
         *
         * @return {boolean} true if the objects are considered equal, false if they are not.
         */
        equals(a: BigInteger): boolean;

        /**
         * Determines the minimum among this and given parameters.
         *
         * @param {BigInteger} a The BigInteger to compare to this object.
         *
         * @return {BigInteger} The minimum value.
         */
        min(a: BigInteger): BigInteger;

        /**
         * Determines the maximum among this and given parameters.
         *
         * @param {BigInteger} a The BigInteger to compare to this object.
         *
         * @return {BigInteger} The maximum value.
         */
        max(a: BigInteger): BigInteger;

        /**
         * (protected) r = this op a (bitwise)
         *
         * @param {BigInteger} a  The BigInteger to process.
         * @param {Function} op   bitwise operation function to apply.
         * @param {BigInteger} r  The destination BigInteger to store result.
         */
        bitwiseTo(a: BigInteger, op: (x: number, y: number) => number, r: BigInteger): void;

        /**
         * (public) this & a.
         *
         * @param {BigInteger} a The second argument as BigInteger.
         *
         * @return {BigInteger} A BigInteger result of bitwise AND operation.
         */
        and(a: BigInteger): BigInteger;

        /**
         * (public) this | a.
         *
         * @param {BigInteger} a The second argument as BigInteger.
         *
         * @return {BigInteger}  A BigInteger result of bitwise OR operation.
         */
        or(a: BigInteger): BigInteger;

        /**
         * (public) this ^ a.
         *
         * @param {BigInteger} a The second argument as BigInteger.
         *
         * @return {BigInteger} A BigInteger result of bitwise XOR operation.
         */
        xor(a: BigInteger): BigInteger;

        /**
         * (public) this & ~a.
         *
         * @param {BigInteger} a The second argument as BigInteger.
         *
         * @return {BigInteger} A BigInteger result of non-implication operation.
         */
        andNot(a: BigInteger): BigInteger;

        /**
         * (public) ~this.
         *
         * @return {BigInteger} An inverted BigInteger.
         */
        not(): BigInteger;

        /**
         * (public) this << n.
         *
         * @param {number} n Shift amount in bits.
         *
         * @return {BigInteger} A BigInteger shifted left.
         */
        shiftLeft(n: number): BigInteger;

        /**
         * (public) this >> n.
         *
         * @param {number} n Shift amount in bits.
         *
         * @return {BigInteger} A BigInteger shifted right.
         */
        shiftRight(n: number): BigInteger;

        /**
         * (public) returns index of lowest 1-bit (or -1 if none)
         *
         * @return {number} The lowest set bit.
         */
        getLowestSetBit(): number;

        /**
         * (public) return number of set bits.
         *
         * @return {number} A number of set bits.
         */
        bitCount(): number;

        /**
         * (public) true if nth bit is set.
         *
         * @param {number} n The index of bit tot test.
         *
         * @return {boolean} true if the test passes, false if the test fails.
         */
        testBit(n: number): boolean;

        /**
         * (protected) this op (1<<n)
         *
         * @param {number} a    The index of bit to apply operation.
         * @param {Function} op The bitwise operation function to apply.
         *
         * @return {BigInteger} A BigInteger with bit changed.
         */
        changeBit(n: number, op: (x: number, y: number) => number): BigInteger;

        /**
         * (protected) this | (1<<n)
         *
         * @param {number} n The index of bit to set.
         *
         * @return {BigInteger} A BigInteger with bit set to 1.
         */
        setBit(n: number): BigInteger;

        /**
         * (public) this & ~(1<<n)
         *
         * @param {number} n The index of bit to clear.
         *
         * @return {BigInteger} A BigInteger with bit set to 0.
         */
        clearBit(n: number): BigInteger;

        /**
         * (public) this ^ (1<<n)
         *
         * @param {number} n The index of bit to flip.
         *
         * @return {BigInteger} A BigInteger with bit flipped.
         */
        flipBit(n: number): BigInteger;

        /**
         * (protected) r = this + a.
         *
         * @param {BigInteger} a The BigInteger addend.
         * @param {BigInteger} r The destination BigInteger to store sum.
         */
        addTo(a: BigInteger, r: BigInteger): void;

        /**
         * (public) this + a.
         *
         * @param {BigInteger} a The BigInteger addend.
         *
         * @return {BigInteger} A sum as BigInteger.
         */
        add(a: BigInteger): BigInteger;

        /**
         * (public) this - a.
         *
         * @param {BigInteger} a The BigInteger subtrahend.
         *
         * @return {BigInteger} A difference as BigInteger.
         */
        subtract(a: BigInteger): BigInteger;

        /**
         * (public) this * a.
         *
         * @param {BigInteger} a The BigInteger multiplier.
         *
         * @return {BigInteger} A product as BigInteger.
         */
        multiply(a: BigInteger): BigInteger;

        /**
         * (public) this^2.
         *
         * @return {BigInteger} A square as BigInteger.
         */
        square(): BigInteger;

        /**
         * (public) this / a.
         *
         * @param {BigInteger} a The BigInteger divisor.
         *
         * @return {BigInteger} A quotient as BigInteger.
         */
        divide(a: BigInteger): BigInteger;

        /**
         * (public) this % a.
         *
         * @param {BigInteger} a The BigInteger divisor.
         *
         * @return {BigInteger} A remainder as BigInteger.
         */
        remainder(a: BigInteger): BigInteger;

        /**
         * (public) [this/a,this%a].
         *
         * @param {BigInteger} a The BigInteger divisor.
         *
         * @return A tuple of 2 BigIntegers: quotient and remainder.
         */
        divideAndRemainder(a: BigInteger): BigInteger[]; // Array of 2 items

        /**
         * (protected) this *= n, this >= 0, 1 < n < DV.
         *
         * @param {number} n The multiplier number.
         */
        dMultiply(n: number): void;

        /**
         * (protected) this += n << w words, this >= 0.
         *
         * @param {number} n The number to process.
         * @param {number} w The number to process.
         */
        dAddOffset(n: number, w: number): void;

        /**
         * (public) this^e.
         *
         * @param {number} e The exponent.
         *
         * @return {BigInteger} A result BigInteger.
         */
        pow(e: number): BigInteger;

        /**
         * (protected) r = lower n words of "this * a", a.t <= n.
         *
         * @param {BigInteger} a The BigInteger multiplier.
         * @param {number} n     The number of words.
         * @param {BigInteger} r The destination BigInteger to store result.
         */
        multiplyLowerTo(a: BigInteger, n: number, r: BigInteger): void;

        /**
         * (protected) r = "this * a" without lower n words, n > 0.
         *
         * @param {BigInteger} a The BigInteger multiplier.
         * @param {number} n     The number of words.
         * @param {BigInteger} r The destination BigInteger to store result.
         */
        multiplyUpperTo(a: BigInteger, n: number, r: BigInteger): void;

        /**
         * (public) this^e % m (HAC 14.85)
         *
         * @param {BigInteger} e The BigInteger exponent.
         * @param {BigInteger} m The BigInteger divisor.
         *
         * @return {BigInteger} A remainder as BigInteger.
         */
        modPow(e: BigInteger, m: BigInteger): BigInteger;

        /**
         * (public) gcd(this,a) (HAC 14.54)
         *
         * @param {BigInteger} a The BigInteger to process.
         *
         * @return {BigInteger} A greatest common divisor BigInteger.
         */
        gcd(a: BigInteger): BigInteger;

        /**
         * (protected) this % n, n < 2^26.
         *
         * @param {number} n The number divisor.
         *
         * @return {number} A remainder number.
         */
        modInt(n: number): number;

        /**
         * (public) 1/this % m (HAC 14.61)
         *
         * @param {BigInteger} m The BigInteger divisor.
         *
         * @return {BigInteger} A remainder as BigInteger.
         */
        modInverse(m: BigInteger): BigInteger;

        /**
         * (public) test primality with certainty >= 1-.5^t.
         *
         * @param {number} t The certainty coefficient.
         *
         * @return {boolean} true if probable prime, false if not.
         */
        isProbablePrime(t: number): boolean;

        /**
         * (protected) true if probably prime (HAC 4.24, Miller-Rabin)
         *
         * @param {number} t The number to process.
         *
         * @return {boolean} true if it succeeds, false if it fails.
         */
        millerRabin(t: number): boolean;

        /**
         * The zero.
         */
        static ZERO: BigInteger;

        /**
         * The one.
         */
        static ONE: BigInteger;
    }

    interface Reduction {
        convert(x: BigInteger): BigInteger;
        revert(x: BigInteger): BigInteger;
        reduce(x: BigInteger): void;
        mulTo(x: BigInteger, y: BigInteger, r: BigInteger): void;
        sqrTo(x: BigInteger, r: BigInteger): void;
    }
}
