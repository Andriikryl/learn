"use client";
import CodeHighlighter from "@/components/CodeHighlighter";

export default function TypeSetsGuide() {
  const intersectionExample = `
type Bar = { x: number };
type Baz = { y: number };
type Foo = Bar & Baz;

const value: Foo = { x: 1, y: 2 }; // Valid
`;

  const unionExample = `
type Foo = { x: number };
type Baz = { y: number };
type Bar = Foo | Baz;

const value1: Bar = { x: 1 }; // Valid
const value2: Bar = { y: 2 }; // Valid
`;

  const typeMappingExample = `
type InsideArray<T> = T extends Array<infer R> ? R : never;
type NumberInside = InsideArray<Array<number>>; // number
`;

  const recursiveTypeExample = `
type FirstLetterUppercase<T extends string> =
  T extends \`\${infer R}\${infer RestWord} \${infer RestSentence}\`
    ? \`\${Uppercase<R>}\${RestWord} \${FirstLetterUppercase<RestSentence>}\`
    : T extends \`\${infer R}\${infer RestWord}\`
    ? \`\${Uppercase<R>}\${RestWord}\`
    : never;

type Result = FirstLetterUppercase<'hello world'>; // 'Hello World'
`;

  return (
    <div className="flex flex-col gap-3">
      <h1 className="scroll-m-20 text-4xl font-extrabold tracking-tight lg:text-5xl mb-[20px]">
        TypeScript Types as Sets
      </h1>

      <section>
        <div className="p-4 bg-blue-50 rounded-lg mb-4">
          <h2 className="text-2xl font-bold mb-2">Core Concept</h2>
          <p className="text-lg">
            Think of TypeScript types as representing sets of possible values
          </p>
        </div>
      </section>

      <section>
        <h2 className="text-2xl font-bold mb-4">Basic Set Operations</h2>
        <div className="grid grid-cols-2 gap-4 mb-4">
          <div>
            <h3 className="font-bold mb-2">Intersection (&)</h3>
            <CodeHighlighter 
              code={intersectionExample} 
              lang="typescript" 
              theme="vitesse-dark" 
            />
            <div className="mt-2 p-2 bg-green-50 rounded-lg">
              <p>Combines sets to create a new set with shared properties</p>
            </div>
          </div>
          <div>
            <h3 className="font-bold mb-2">Union (|)</h3>
            <CodeHighlighter 
              code={unionExample} 
              lang="typescript" 
              theme="vitesse-dark" 
            />
            <div className="mt-2 p-2 bg-purple-50 rounded-lg">
              <p>Creates a set containing all values from both types</p>
            </div>
          </div>
        </div>
      </section>

      <section>
        <h2 className="text-2xl font-bold mb-4">Type Introspection</h2>
        <div className="grid grid-cols-2 gap-4">
          <div className="p-4 bg-yellow-50 rounded-lg">
            <h3 className="font-bold mb-2">Extends Keyword</h3>
            <CodeHighlighter 
              code={`type Check = T extends U ? TrueType : FalseType`} 
              lang="typescript" 
              theme="vitesse-dark" 
            />
            <p className="mt-2">Checks if one set is a subset of another</p>
          </div>
          <div className="p-4 bg-red-50 rounded-lg">
            <h3 className="font-bold mb-2">Conditional Types</h3>
            <CodeHighlighter 
              code={`type Result = T extends string ? 'string' : 'other'`} 
              lang="typescript" 
              theme="vitesse-dark" 
            />
            <p className="mt-2">Performs type-level branching</p>
          </div>
        </div>
      </section>

      <section>
        <h2 className="text-2xl font-bold mb-4">Type Mapping</h2>
        <div className="grid grid-cols-2 gap-4 mb-4">
          <div>
            <CodeHighlighter 
              code={typeMappingExample} 
              lang="typescript" 
              theme="vitesse-dark" 
            />
          </div>
          <div className="p-4 bg-green-50 rounded-lg">
            <h3 className="font-bold mb-2">Infer Keyword</h3>
            <ul className="list-disc pl-6 space-y-2">
              <li>Extracts types from complex structures</li>
              <li>Works with conditional types</li>
              <li>Essential for type transformations</li>
            </ul>
          </div>
        </div>
      </section>

      <section>
        <h2 className="text-2xl font-bold mb-4">Advanced Patterns</h2>
        <div className="grid grid-cols-2 gap-4">
          <div>
            <h3 className="font-bold mb-2">Recursive Types</h3>
            <CodeHighlighter 
              code={recursiveTypeExample} 
              lang="typescript" 
              theme="vitesse-dark" 
            />
          </div>
          <div className="p-4 bg-purple-50 rounded-lg">
            <h3 className="font-bold mb-2">Mapped Types</h3>
            <CodeHighlighter 
              code={`type Mapped = { [K in keyof T]: NewType }`} 
              lang="typescript" 
              theme="vitesse-dark" 
            />
            <p className="mt-2">Transforms object types at compile time</p>
          </div>
        </div>
      </section>

      <section className="mt-8">
        <h2 className="text-2xl font-bold mb-4">Best Practices</h2>
        <div className="grid grid-cols-3 gap-4">
          <div className="p-4 bg-green-100 rounded-lg">
            <h3 className="font-bold mb-2">Set Thinking</h3>
            <p>Visualize types as sets of possible values</p>
          </div>
          <div className="p-4 bg-blue-100 rounded-lg">
            <h3 className="font-bold mb-2">Type Safety</h3>
            <p>Use strict type operations</p>
          </div>
          <div className="p-4 bg-purple-100 rounded-lg">
            <h3 className="font-bold mb-2">Recursion</h3>
            <p>Leverage for complex type transformations</p>
          </div>
        </div>
      </section>

      <section>
        <div className="p-4 bg-yellow-50 rounded-lg">
          <h3 className="text-xl font-bold mb-2">Key Insight</h3>
          <p>
            TypeScript's type system is a functional programming language
            operating on sets of values
          </p>
        </div>
      </section>
    </div>
  );
}