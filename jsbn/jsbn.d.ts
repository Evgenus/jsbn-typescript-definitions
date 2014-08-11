// Type definitions for jsbn v1.2
// Project: http://www-cs-students.stanford.edu/%7Etjw/jsbn/
// Definitions by: Eugene Chernyshov <https://github.com/Evgenus>
// Definitions: https://github.com/borisyankov/DefinitelyTyped

// Development repository: https://github.com/Evgenus/jsbn-typescript-definitions
// For answers, fixes and cutting edge version please see development repository.

/**
 * Basic JavaScript BN library - subset useful for RSA encryption.
 */
declare module jsbn {

    interface RandomGenerator {
        nextBytes(bytes: number[]): void;
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
         * @constructor imlements new interface.
         *
         * @param {string} a The string representation of BigInteger.
         * @param {number} b (Optional) the radix.
         */
        constructor(a: string, b?: number); //TODO

        /**
         * Constructs new BigInteger from bytes
         * 
         * @constructor implements new interface.
         *
         * @param {number[]} a Array of bytes.
         * @param {number} b   (Optional) the radix.
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
         * @param {number} b (Optional) the radix.
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
         * @return A number.
         */
        invDigit(): number;

        /**
         * (protected) true if this is even.
         *
         * @return true if even, false if not.
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
         * @return The new BigInteger equals to remainder.
         */
        modPowInt(e: number, m: BigInteger): BigInteger;

        /**
         * (public)
         */
        clone(): BigInteger;

        /**
         * (public) return value as integer
         */
        intValue(): number;

        /**
         * (public) return value as byte
         */
        byteValue(): number;

        /**
         * (public) return value as short (assumes DB>=16)
         */
        shortValue(): number;

        /**
         * (protected) return x s.t. r^x < DV
         */
        chunkSize(r: number): number;

        /**
         * (public) 0 if this == 0, 1 if this > 0
         */
        signum(): number;

        /**
         * (protected) convert to radix string
         */
        toRadix(b: number): string;

        /**
         * (protected) convert from radix string
         */
        fromRadix(s: string, b: number): void;

        /**
         * (protected) alternate constructor
         */
        fromNumber(a: number, b?: number, c?: number): void;

        /**
         * (public) convert to bigendian byte array
         */
        toByteArray(): number[];

        equals(a: BigInteger): boolean;

        min(a: BigInteger): BigInteger;

        max(a: BigInteger): BigInteger;

        /**
         * (protected) r = this op a (bitwise)
         */
        bitwiseTo(a: BigInteger, op: (x: number, y: number) => number, r: BigInteger): void;

        /**
         * (public) this & a
         */
        and(a: BigInteger): BigInteger;

        /**
         * (public) this | a
         */
        or(a: BigInteger): BigInteger;

        /**
         * (public) this ^ a
         */
        xor(a: BigInteger): BigInteger;

        /**
         * (public) this & ~a
         */
        andNot(a: BigInteger): BigInteger;

        /**
         * (public) ~this
         */
        not(): BigInteger;

        /**
         * (public) this << n
         */
        shiftLeft(n: number): BigInteger;

        /**
         * (public) this >> n
         */
        shiftRight(n: number): BigInteger;

        /**
         * (public) returns index of lowest 1-bit (or -1 if none)
         */
        getLowestSetBit(): number;

        /**
         * (public) return number of set bits
         */
        bitCount(): number;

        /**
         * (public) true iff nth bit is set
         */
        testBit(n: number): boolean;

        /**
         * (protected) this op (1<<n)
         */
        changeBit(n: number, op: (x: number, y: number) => number): BigInteger;

        /**
         * (protected) this op (1<<n)
         */
        setBit(n: number): BigInteger;

        /**
         * (public) this & ~(1<<n)
         */
        clearBit(n: number): BigInteger

        /**
         * (public) this ^ (1<<n)
         */
        flipBit(n: number): BigInteger

        /**
         * (protected) r = this + a
         */
        addTo(a: BigInteger, r: BigInteger): void;

        /**
         * (public) this + a
         */
        add(a: BigInteger): BigInteger;

        /**
         * (public) this - a
         */
        subtract(a: BigInteger): BigInteger;

        /**
         * (public) this * a
         */
        multiply(a: BigInteger): BigInteger;

        /**
         * (public) this^2
         */
        square(): BigInteger;

        /**
         * (public) this / a
         */
        divide(a: BigInteger): BigInteger;

        /**
         * (public) this % a
         */
        remainder(a: BigInteger): BigInteger;

        /**
         * (public) [this/a,this%a]
         */
        divideAndRemainder(a: BigInteger): BigInteger[]; // Array of 2 items

        /**
         * (protected) this *= n, this >= 0, 1 < n < DV
         */
        dMultiply(n: number): void;

        /**
         * (protected) this += n << w words, this >= 0
         */
        dAddOffset(n: number, w: number): void;

        /**
         * (public) this^e
         */
        pow(e: number): BigInteger;

        /**
         * (protected) r = lower n words of "this * a", a.t <= n
         */
        multiplyLowerTo(a: BigInteger, n: number, r: BigInteger): void;

        /**
         * (protected) r = "this * a" without lower n words, n > 0
         */
        multiplyUpperTo(a: BigInteger, n: number, r: BigInteger): void;

        /**
         * (public) this^e % m (HAC 14.85)
         */
        modPow(e: BigInteger, m: BigInteger): BigInteger;

        /**
         * (public) gcd(this,a) (HAC 14.54)
         */
        gcd(a: BigInteger): BigInteger;

        /**
         * (protected) this % n, n < 2^26
         */
        modInt(n: number): number;

        /**
         * (public) 1/this % m (HAC 14.61)
         */
        modInverse(m: BigInteger): BigInteger;

        /**
         * (public) test primality with certainty >= 1-.5^t
         */
        isProbablePrime(t: number): boolean;

        /**
         * (protected) true if probably prime (HAC 4.24, Miller-Rabin)
         */
        millerRabin(t: number): boolean;

        static ZERO: BigInteger;
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