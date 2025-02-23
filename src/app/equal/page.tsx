"use client";
import CodeHighlighter from "@/components/CodeHighlighter";

export default function EqualityGuide() {
  const strictExamples = `
5 === 5;   // true (number)
5 === "5"; // false (number vs string)
true === 1; // false (boolean vs number)
null === undefined; // false
`;

  const looseExamples = `
5 == "5";    // true
0 == false;  // true
"" == false; // true
null == undefined; // true
[1] == true; // true
`;

  const referenceExample = `
const obj1 = { name: 'Meg' };
const obj2 = { name: 'Meg' };
const obj3 = obj1;

console.log(obj1 === obj2); // false (different references)
console.log(obj1 === obj3); // true (same reference)
`;

  return (
    <div className="flex flex-col gap-3">
      <h1 className="scroll-m-20 text-4xl font-extrabold tracking-tight lg:text-5xl mb-[20px]">
        JavaScript Equality: == vs ===
      </h1>

      <section>
        <div className="p-4 bg-green-50 rounded-lg mb-4">
          <h2 className="text-2xl font-bold mb-2">TL;DR</h2>
          <p className="text-lg font-semibold">
            Always use <code>===</code> (triple equals) for predictable comparisons
          </p>
        </div>
      </section>

      <section>
        <h2 className="text-2xl font-bold mb-4">Strict Equality (===)</h2>
        <div className="grid grid-cols-2 gap-4">
          <div>
            <CodeHighlighter 
              code={strictExamples} 
              lang="javascript" 
              theme="vitesse-dark" 
            />
          </div>
          <div className="p-4 bg-blue-50 rounded-lg">
            <h3 className="font-bold mb-2">Characteristics</h3>
            <ul className="list-disc pl-6 space-y-2">
              <li>Checks value <strong>and</strong> type</li>
              <li>No type coercion</li>
              <li>Predictable results</li>
            </ul>
          </div>
        </div>
      </section>

      <section>
        <h2 className="text-2xl font-bold mb-4">Loose Equality (==)</h2>
        <div className="grid grid-cols-2 gap-4">
          <div>
            <CodeHighlighter 
              code={looseExamples} 
              lang="javascript" 
              theme="vitesse-dark" 
            />
          </div>
          <div className="p-4 bg-red-50 rounded-lg">
            <h3 className="font-bold mb-2">Characteristics</h3>
            <ul className="list-disc pl-6 space-y-2">
              <li>Performs type coercion</li>
              <li>Unpredictable behavior</li>
              <li>Many edge cases</li>
            </ul>
          </div>
        </div>
      </section>

      <section>
        <h2 className="text-2xl font-bold mb-4">Key Differences</h2>
        <div className="grid grid-cols-3 gap-4 mb-4">
          <div className="p-4 bg-purple-50 rounded-lg">
            <h3 className="font-bold mb-2">Type Check</h3>
            <p><code>===</code> checks type first</p>
            <p><code>==</code> converts types</p>
          </div>
          <div className="p-4 bg-yellow-50 rounded-lg">
            <h3 className="font-bold mb-2">Safety</h3>
            <p><code>===</code> prevents unexpected conversions</p>
            <p><code>==</code> can introduce subtle bugs</p>
          </div>
          <div className="p-4 bg-green-50 rounded-lg">
            <h3 className="font-bold mb-2">Performance</h3>
            <p><code>===</code> faster (no conversion)</p>
            <p><code>==</code> requires type analysis</p>
          </div>
        </div>
      </section>

      <section>
        <h2 className="text-2xl font-bold mb-4">Reference Comparison</h2>
        <div className="grid grid-cols-2 gap-4">
          <div>
            <CodeHighlighter 
              code={referenceExample} 
              lang="javascript" 
              theme="vitesse-dark" 
            />
          </div>
          <div className="p-4 bg-blue-50 rounded-lg">
            <h3 className="font-bold mb-2">Object Comparison</h3>
            <ul className="list-disc pl-6 space-y-2">
              <li>Compares memory references</li>
              <li>Different objects ≠ same contents</li>
              <li>Same object = same reference</li>
            </ul>
          </div>
        </div>
      </section>

      <section>
        <h2 className="text-2xl font-bold mb-4">Common Pitfalls with ==</h2>
        <div className="grid grid-cols-2 gap-4">
          <div className="p-4 bg-red-50 rounded-lg">
            <h3 className="font-bold mb-2">Surprising Truths</h3>
            <ul className="list-disc pl-6 space-y-2">
              <li><code>0 == ""</code> → true</li>
              <li><code>"0" == false</code> → true</li>
              <li><code>[] == ![]</code> → true</li>
            </ul>
          </div>
          <div className="p-4 bg-green-50 rounded-lg">
            <h3 className="font-bold mb-2">How === Helps</h3>
            <ul className="list-disc pl-6 space-y-2">
              <li><code>0 === ""</code> → false</li>
              <li><code>"0" === false</code> → false</li>
              <li><code>[] === ![]</code> → false</li>
            </ul>
          </div>
        </div>
      </section>

      <section className="mt-8">
        <h2 className="text-2xl font-bold mb-4">Best Practices</h2>
        <div className="grid grid-cols-3 gap-4">
          <div className="p-4 bg-green-100 rounded-lg">
            <h3 className="font-bold mb-2">Always Use ===</h3>
            <p>Default to strict equality</p>
          </div>
          <div className="p-4 bg-blue-100 rounded-lg">
            <h3 className="font-bold mb-2">Explicit Conversion</h3>
            <p>Convert types manually when needed</p>
          </div>
          <div className="p-4 bg-red-100 rounded-lg">
            <h3 className="font-bold mb-2">Avoid ==</h3>
            <p>Except for specific null/undefined checks</p>
          </div>
        </div>
      </section>

      <section>
        <div className="p-4 bg-yellow-50 rounded-lg">
          <h3 className="text-xl font-bold mb-2">When Might == Be Useful?</h3>
          <div>
            <p>
            Only in rare cases like checking for both null and undefined:
            </p>
            <CodeHighlighter 
              code="if (value == null) { /* handles null/undefined */ }" 
              lang="javascript" 
              theme="vitesse-dark" 
            />
          </div>
        </div>
      </section>
    </div>
  );
}