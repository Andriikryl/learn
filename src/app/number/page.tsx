"use client";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import CodeHighlighter from "@/components/CodeHighlighter";

export default function NumberGuide() {
  return (
    <div className="flex flex-col gap-6">
      <h1 className="scroll-m-20 text-4xl font-extrabold tracking-tight lg:text-5xl mb-6">
        JavaScript Number
      </h1>

      {/* Overview Section */}
      <Card>
        <CardHeader>
          <CardTitle>Overview</CardTitle>
          <CardDescription>
            The Number type in JavaScript represents floating-point numbers. It is a double-precision 64-bit binary format IEEE 754 value.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <p className="mb-4">
            Numbers in JavaScript can be expressed in various forms, including literals, hexadecimal, binary, and exponential notation.
          </p>
          <CodeHighlighter
            code={`255; // Decimal
255.0; // Same as 255
255 === 255.0; // true
255 === 0xff; // Hexadecimal
255 === 0b11111111; // Binary
255 === 0.255e3; // Exponential`}
            lang="javascript"
            theme="vitesse-dark"
          />
        </CardContent>
      </Card>

      {/* Number Encoding Section */}
      <Card>
        <CardHeader>
          <CardTitle>Number Encoding</CardTitle>
          <CardDescription>
            JavaScript numbers are stored in 64-bit IEEE 754 format, consisting of:
          </CardDescription>
        </CardHeader>
        <CardContent>
          <ul className="list-disc pl-6 space-y-2">
            <li><strong>1 bit</strong> for the sign (positive or negative)</li>
            <li><strong>11 bits</strong> for the exponent (-1022 to 1023)</li>
            <li><strong>52 bits</strong> for the mantissa (significant digits)</li>
          </ul>
          <p className="mt-4">
            The maximum safe integer is <code>2^53 - 1</code> (9007199254740991), and the minimum is <code>-(2^53 - 1)</code>.
          </p>
        </CardContent>
      </Card>

      {/* Number Coercion Section */}
      <Card>
        <CardHeader>
          <CardTitle>Number Coercion</CardTitle>
          <CardDescription>
            JavaScript automatically converts values to numbers in certain contexts.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <CodeHighlighter
            code={`Number("123"); // 123
Number("123.45"); // 123.45
Number("0xff"); // 255
Number("0b1010"); // 10
Number("0o10"); // 8
Number(""); // 0
Number(null); // 0
Number(undefined); // NaN
Number(true); // 1
Number(false); // 0
Number("abc"); // NaN`}
            lang="javascript"
            theme="vitesse-dark"
          />
        </CardContent>
      </Card>

      {/* Static Properties Section */}
      <Card>
        <CardHeader>
          <CardTitle>Static Properties</CardTitle>
          <CardDescription>
            The Number constructor provides useful constants.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <CodeHighlighter
            code={`Number.MAX_VALUE; // Largest positive number
Number.MIN_VALUE; // Smallest positive number
Number.MAX_SAFE_INTEGER; // 9007199254740991
Number.MIN_SAFE_INTEGER; // -9007199254740991
Number.EPSILON; // Smallest interval between numbers
Number.NaN; // Not-a-Number
Number.POSITIVE_INFINITY; // Infinity
Number.NEGATIVE_INFINITY; // -Infinity`}
            lang="javascript"
            theme="vitesse-dark"
          />
        </CardContent>
      </Card>

      {/* Static Methods Section */}
      <Card>
        <CardHeader>
          <CardTitle>Static Methods</CardTitle>
          <CardDescription>
            Methods for checking number properties.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <CodeHighlighter
            code={`Number.isFinite(42); // true
Number.isFinite(Infinity); // false

Number.isInteger(42); // true
Number.isInteger(42.5); // false

Number.isNaN(NaN); // true
Number.isNaN(42); // false

Number.isSafeInteger(9007199254740991); // true
Number.isSafeInteger(9007199254740992); // false`}
            lang="javascript"
            theme="vitesse-dark"
          />
        </CardContent>
      </Card>

      {/* Instance Methods Section */}
      <Card>
        <CardHeader>
          <CardTitle>Instance Methods</CardTitle>
          <CardDescription>
            Methods available on Number instances.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <CodeHighlighter
            code={`const num = 123.456;

num.toExponential(2); // "1.23e+2"
num.toFixed(2); // "123.46"
num.toLocaleString(); // "123.456" (locale-specific)
num.toPrecision(5); // "123.46"
num.toString(16); // "7b.74bc6a7ef9db" (hexadecimal)`}
            lang="javascript"
            theme="vitesse-dark"
          />
        </CardContent>
      </Card>

      {/* Examples Section */}
      <Card>
        <CardHeader>
          <CardTitle>Examples</CardTitle>
          <CardDescription>
            Practical use cases for the Number type.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <CodeHighlighter
            code={`// Converting Date to Number
const date = new Date("2023-10-01");
console.log(Number(date)); // Timestamp in milliseconds

// Parsing numeric strings
console.log(Number("123.45")); // 123.45
console.log(Number("0x10")); // 16 (hexadecimal)
console.log(Number("0b1010")); // 10 (binary)
console.log(Number("0o10")); // 8 (octal)

// Handling large numbers
console.log(Number.MAX_SAFE_INTEGER + 1 === Number.MAX_SAFE_INTEGER + 2); // true (precision loss)
console.log(BigInt(Number.MAX_SAFE_INTEGER) + 1n); // 9007199254740992n (using BigInt)`}
            lang="javascript"
            theme="vitesse-dark"
          />
        </CardContent>
      </Card>

      {/* Best Practices Section */}
      <Card>
        <CardHeader>
          <CardTitle>Best Practices</CardTitle>
          <CardDescription>
            Tips for working with numbers in JavaScript.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <ul className="list-disc pl-6 space-y-2">
            <li>Use <code>Number.isNaN()</code> instead of <code>isNaN()</code> to avoid unexpected coercion.</li>
            <li>For precise integer arithmetic, use <code>BigInt</code> for values outside the safe integer range.</li>
            <li>Be cautious with floating-point arithmetic due to precision limitations.</li>
            <li>Use <code>Number.parseFloat()</code> or <code>Number.parseInt()</code> for parsing strings to numbers.</li>
          </ul>
        </CardContent>
      </Card>
    </div>
  );
}