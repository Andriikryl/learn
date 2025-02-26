"use client";
import CodeHighlighter from "@/components/CodeHighlighter";

export default function V8FunctionOptimization() {
  return (
    <div className="flex flex-col gap-6">
      {/* Header */}
      <div>
        <h1 className="scroll-m-20 text-4xl font-extrabold tracking-tight lg:text-5xl">
          V8 function optimization
        </h1>
        <p className="text-sm text-gray-600">
          Published 6 Aug 2019 · 34 min read
        </p>
        <p className="text-sm text-gray-600">
          Engines · Javascript Performance · Internals
        </p>
      </div>

      {/* Setup (optional) */}
      <section>
        <h2 className="text-2xl font-bold mb-4">Setup (optional)</h2>
        <p>
          If you don’t want to run it on your computer, please skip this section.
          First, install V8 so you can run it without a full package (like Node or a
          web browser). I’ve created a gist for Linux users:
        </p>
        <p className="text-blue-600 underline">
          <a
            href="https://gist.github.com/burnpiro/d85d836200df93af892877c2cf37f12c"
            target="_blank"
            rel="noreferrer"
          >
            https://gist.github.com/burnpiro/d85d836200df93af892877c2cf37f12c
          </a>
        </p>
        <p>
          If you’re a Mac user, the process should be similar. For any installation
          problems, refer to the Official Docs. Once installed, you should be able
          to run code like:
        </p>
        <div >
        <CodeHighlighter
          code={`// index.js
console.log('it works');`}
          lang="javascript"
          theme="vitesse-dark"
        />
        </div>
        <p>
          by calling <code>d8 index.js</code>.
        </p>
      </section>

      {/* What are we trying to optimize? */}
      <section>
        <h2 className="text-2xl font-bold mb-4">
          What are we trying to optimize?
        </h2>
        <p>
          Our test function is as follows. Imagine it’s called thousands of times,
          so performance is crucial:
        </p>
        <CodeHighlighter
          code={`function test(obj: any): string {
  let result = '';
  for (let i = 0; i < N; i += 1) {
    result += obj.a + obj.b;
  }
  return result;
}`}
          lang="javascript"
          theme="vitesse-dark"
        />
        <p>
          We want to optimize this function to run as quickly as possible.
        </p>
      </section>

      {/* Shapes (Maps in V8) */}
      <section>
        <h2 className="text-2xl font-bold mb-4">
          Shapes (Maps in V8)
        </h2>
        <p>
          In V8, the concept of a “Shape” (also called a “Hidden Class” or “Map”)
          is used to describe an object’s property layout. Shapes contain
          descriptors (such as offsets) that tell V8 where to find each property.
        </p>
        <p>
          For example, consider this object:
        </p>
        <CodeHighlighter
          code={`const obj = {
  x: 1,
  y: 1,
};`}
          lang="javascript"
          theme="vitesse-dark"
        />
        <p>
          In V8, property <code>x</code> might be stored at a specific offset (say,
          12), as defined by its Shape.
        </p>
        <p>
          V8 reuses Shapes for objects with the same structure. However, note that
          objects created in different ways—even with the same properties—can end up
          with different Shapes:
        </p>
        <CodeHighlighter
          code={`const obj1 = { x: 1, y: 1 };
const obj2 = {};
obj2.x = 1;
obj2.y = 1;`}
          lang="javascript"
          theme="vitesse-dark"
        />
        <p>
          Although <code>obj1</code> and <code>obj2</code> look identical, they may
          have different Shapes because of how they were constructed.
        </p>
      </section>

      {/* Inline Cache (IC) */}
      <section>
        <h2 className="text-2xl font-bold mb-4">Inline Cache (IC)</h2>
        <p>
          V8 uses Inline Caches (ICs) to speed up property lookups. Once a function
          accesses a property, V8 caches the lookup so that subsequent calls with
          the same object Shape can skip the full lookup.
        </p>
        <p>
          Consider this code:
        </p>
        <CodeHighlighter
          code={`const N = 1000000;
const obj1 = {};
obj1.name = 'Jake';

function getMeName(o) {
  return o.name;
}

for (let i = 0; i < N; i += 1) {
  getMeName(obj1);
}`}
          lang="javascript"
          theme="vitesse-dark"
        />
        <p>
          Run it with <code>d8 --trace-ic index.js</code> to see the IC in action.
          Initially uninitialized, the cache becomes monomorphic when the function
          always sees objects with the same Shape.
        </p>
      </section>

      {/* Function States and Performance Test */}
      <section>
        <h2 className="text-2xl font-bold mb-4">
          Function States and Performance Test
        </h2>
        <p>
          V8 tracks the state of inline caches: monomorphic (one Shape), polymorphic
          (2–4 Shapes), and megamorphic (more than 5 Shapes). Only monomorphic and
          polymorphic functions are optimized.
        </p>
        <p>
          Here’s a test comparing two functions: one that is always called with the
          same Shape and one with multiple Shapes.
        </p>
        <CodeHighlighter
          code={`const N = 10000;
let a = { a: 'Jack', b: 'Sparrow' };
let b = { tmp: 3, a: 'Charles', b: 'Xavier' };
let c = { tmp: 3, tmp2: 3, a: 'Frodo', b: 'Baggins' };
let d = { tmp: 3, tmp2: 3, tmp3: 3, a: 'Legolas', b: 'Thranduilion' };
let e = { tmp: 3, tmp2: 3, tmp3: 3, tmp4: 3, a: 'Indiana', b: 'Jones' };
let f = { tmp: 3, tmp2: 3, tmp3: 3, tmp4: 3, tmp5: 3, a: 'Gandalf', b: 'The Grey' };
let f2 = { tmp: 3, tmp2: 3, tmp3: 3, tmp4: 3, tmp5: 3, a: 'Jack', b: 'Sparrow' };
let f3 = { tmp: 3, tmp2: 3, tmp3: 3, tmp4: 3, tmp5: 3, a: 'Charles', b: 'Xavier' };
let f4 = { tmp: 3, tmp2: 3, tmp3: 3, tmp4: 3, tmp5: 3, a: 'Frodo', b: 'Baggins' };
let f5 = { tmp: 3, tmp2: 3, tmp3: 3, tmp4: 3, tmp5: 3, a: 'Legolas', b: 'Thranduilion' };
let f6 = { tmp: 3, tmp2: 3, tmp3: 3, tmp4: 3, tmp5: 3, a: 'Indiana', b: 'Jones' };

function test(obj) {
  let result = '';
  for (let i = 0; i < N; i += 1) {
    result += obj.a + obj.b;
  }
  return result;
}

function test2(obj) {
  let result = '';
  for (let i = 0; i < N; i += 1) {
    result += obj.a + obj.b;
  }
  return result;
}

const startT1 = Date.now();
for (let i = 0; i < N; i += 1) {
  test(f);
  test(f2);
  test(f3);
  test(f4);
  test(f5);
  test(f6);
}
console.log("test with one shape:", Date.now() - startT1, "ms.");

const startT2 = Date.now();
for (let i = 0; i < N; i += 1) {
  test2(a);
  test2(b);
  test2(c);
  test2(d);
  test2(e);
  test2(f);
}
console.log("test with multiple shape:", Date.now() - startT2, "ms.");`}
          lang="javascript"
          theme="vitesse-dark"
        />
        <p>
          In this test, <code>test</code> is always called with objects of the same
          Shape, while <code>test2</code> is called with different Shapes—resulting in
          a significant performance difference.
        </p>
      </section>

      {/* Extra Information */}
      <section>
        <h2 className="text-2xl font-bold mb-4">Extra Information</h2>
        <p>
          Shapes contain more than just property descriptors (for example, size,
          pointers to prototypes, etc.). To explore Shapes in your own code, run:
        </p>
        <CodeHighlighter
          code={`d8 --trace-maps index.js`}
          lang="bash"
          theme="vitesse-dark"
        />
        <p>
          Then upload the generated <code>v8.log</code> into{" "}
          <code>v8/tools/map-processor.html</code> and explore the transitions.
        </p>
      </section>

      {/* Citation */}
      <section>
        <h2 className="text-2xl font-bold mb-4">Citation</h2>
        <p>
          Kemal Erdem, (Aug 2019). "V8 function optimization".{" "}
          <a
            href="https://erdem.pl/2019/08/v-8-function-optimization"
            target="_blank"
            rel="noreferrer"
            className="text-blue-600 underline"
          >
            https://erdem.pl/2019/08/v-8-function-optimization
          </a>
        </p>
        <p>Or</p>
        <CodeHighlighter
          code={`@article{erdem2019v8FunctionOptimization,
  title   = "V8 function optimization",
  author  = "Kemal Erdem",
  journal = "https://erdem.pl",
  year    = "2019",
  month   = "Aug",
  url     = "https://erdem.pl/2019/08/v-8-function-optimization"
}`}
          lang="javascript"
          theme="vitesse-dark"
        />
        <p>
          Published 6 Aug 2019 · Engines, Javascript Performance, Internals
        </p>
        <p>Kemal Erdem on Twitter</p>
      </section>
    </div>
  );
}
