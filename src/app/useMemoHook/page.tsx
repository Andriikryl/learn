"use client";
import CodeHighlighter from "@/components/CodeHighlighter";

export default function UseMemoHookGuide() {
  return (
    <div className="flex flex-col gap-6">
      {/* Header */}
      <div>
        <h1 className="scroll-m-20 text-4xl font-extrabold tracking-tight lg:text-5xl">
          The useMemo Hook
        </h1>
      </div>

      {/* Introduction */}
      <section>
        <p>
          In this lesson, we're going to learn about another tool that enables a different sort of memoization: the <code>useMemo</code> hook. The fundamental idea behind <code>useMemo</code> is that it allows us to “remember” a computed value between renders.
        </p>
        <p>
          We generally use this hook for performance optimizations. It can be used in two related ways:
        </p>
        <ul className="list-disc pl-6 space-y-2">
          <li>Reduce the amount of work that needs to be done during a render.</li>
          <li>Reduce the number of times that a component is re-rendered.</li>
        </ul>
        <p>Let's explore these strategies one at a time.</p>
      </section>

      {/* Use Case 1: Heavy Computations */}
      <section>
        <h2 className="text-2xl font-bold mb-4">Use Case 1: Heavy Computations</h2>
        <p>
          Suppose we're building a tool to help users find all of the prime numbers between 0 and <code>selectedNum</code> (a user-supplied value). A prime number is a number that can only be divided by 1 and itself (e.g. 17).
        </p>
        <p>Here's one possible implementation:</p>
        <CodeHighlighter
          code={`import React from 'react';

function App() {
  // We hold the user's selected number in state.
  const [selectedNum, setSelectedNum] = React.useState(100);
  
  // Calculate all prime numbers between 0 and selectedNum.
  const allPrimes = [];
  for (let counter = 2; counter < selectedNum; counter++) {
    if (isPrime(counter)) {
      allPrimes.push(counter);
    }
  }
  
  return (
    <>
      <form>
        <label htmlFor="num">Your number:</label>
        <input
          id="num"
          type="number"
          value={selectedNum}
          onChange={(event) => {
            // To prevent computers from exploding, we'll max out at 100k.
            const num = Math.min(100_000, Number(event.target.value));
            setSelectedNum(num);
          }}
        />
      </form>
      <p>
        There are {allPrimes.length} prime(s) between 1 and {selectedNum}:{" "}
        <span className="prime-list">{allPrimes.join(", ")}</span>
      </p>
    </>
  );
}

function isPrime(n) {
  const max = Math.ceil(Math.sqrt(n));
  if (n === 2) return true;
  for (let counter = 2; counter <= max; counter++) {
    if (n % counter === 0) return false;
  }
  return true;
}

export default App;`}
          lang="javascript"
          theme="vitesse-dark"
        />
        <p>
          This code does a lot of computation. If the user picks a large number, tens of thousands of numbers are checked for primality.
        </p>
        <p>
          Now imagine that our application also includes a digital clock (using, say, a custom <code>useTime</code> hook) that updates every second. Each time the clock updates, our component re-renders and re-calculates the primes—even if <code>selectedNum</code> hasn’t changed!
        </p>
        <p>
          We can avoid this unnecessary work by using <code>useMemo</code> to “cache” the result:
        </p>
        <CodeHighlighter
          code={`const allPrimes = React.useMemo(() => {
  const result = [];
  for (let counter = 2; counter < selectedNum; counter++) {
    if (isPrime(counter)) {
      result.push(counter);
    }
  }
  return result;
}, [selectedNum]);`}
          lang="javascript"
          theme="vitesse-dark"
        />
        <p>
          Now the list of primes is recalculated only when <code>selectedNum</code> changes.
        </p>
      </section>

      {/* Use Case 2: Preserved References */}
      <section>
        <h2 className="text-2xl font-bold mb-4">Use Case 2: Preserved References</h2>
        <p>
          The <code>useMemo</code> hook isn’t just for heavy computations—it can also help preserve references. Consider a <code>Boxes</code> component that displays a set of colorful boxes.
        </p>
        <p>
          Even if the boxes data appears unchanged, if we create a new array on every render, a component wrapped with <code>React.memo</code> will re-render because the array reference is different. For example:
        </p>
        <CodeHighlighter
          code={`function App() {
  const [name, setName] = React.useState('');
  const [boxWidth, setBoxWidth] = React.useState(1);
  const id = React.useId();
  
  // A new boxes array is created on every render.
  const boxes = [
    { flex: boxWidth, background: 'hsl(345deg 100% 50%)' },
    { flex: 3, background: 'hsl(260deg 100% 40%)' },
    { flex: 1, background: 'hsl(50deg 100% 60%)' },
  ];
  
  return (
    <>
      <PureBoxes boxes={boxes} />
      <section>
        <label htmlFor={\`\${id}-name\`}>Name:</label>
        <input
          id={\`\${id}-name\`}
          type="text"
          value={name}
          onChange={(event) => setName(event.target.value)}
        />
        <label htmlFor={\`\${id}-box-width\`}>First box width:</label>
        <input
          id={\`\${id}-box-width\`}
          type="range"
          min={1}
          max={5}
          step={0.01}
          value={boxWidth}
          onChange={(event) => setBoxWidth(Number(event.target.value))}
        />
      </section>
    </>
  );
}`}
          lang="javascript"
          theme="vitesse-dark"
        />
        <p>
          Every time <code>App</code> re-renders (for example, when the user types in their name), a new <code>boxes</code> array is created, causing <code>PureBoxes</code> to re-render even though the data is logically the same.
        </p>
        <p>
          We can solve this by wrapping the array creation in <code>useMemo</code>:
        </p>
        <CodeHighlighter
          code={`const boxes = React.useMemo(() => {
  return [
    { flex: boxWidth, background: 'hsl(345deg 100% 50%)' },
    { flex: 3, background: 'hsl(260deg 100% 40%)' },
    { flex: 1, background: 'hsl(50deg 100% 60%)' },
  ];
}, [boxWidth]);`}
          lang="javascript"
          theme="vitesse-dark"
        />
        <p>
          This ensures the same array reference is reused across renders unless <code>boxWidth</code> changes.
        </p>
      </section>

      {/* Similarities to Other Hooks */}
      <section>
        <h2 className="text-2xl font-bold mb-4">Similarities to Other Hooks</h2>
        <p>
          The structure of <code>useMemo</code> is very similar to <code>useEffect</code>: both take a callback function and a dependency array. The key difference is that <code>useMemo</code> calculates a value during render and returns it, whereas <code>useEffect</code> runs after render to synchronize side effects.
        </p>
        <p>
          Additionally, the naming similarity with <code>React.memo</code> is no accident. Both are forms of memoization—one for computed values and one for component rendering.
        </p>
      </section>

      {/* Live Example */}
      <section>
        <h2 className="text-2xl font-bold mb-4">Live Example</h2>
        <p>
          Here's a live version of our solution that implements the <code>useMemo</code> hook:
        </p>
        <CodeHighlighter
          code={`import React from 'react';
import format from 'date-fns/format';
import useTime from './use-time';

function App() {
  const [selectedNum, setSelectedNum] = React.useState(100);
  const time = useTime();
  
  const allPrimes = React.useMemo(() => {
    const result = [];
    for (let counter = 2; counter < selectedNum; counter++) {
      if (isPrime(counter)) {
        result.push(counter);
      }
    }
    return result;
  }, [selectedNum]);
  
  return (
    <>
      <p className="clock">{format(time, 'hh:mm:ss a')}</p>
      <form>
        <label htmlFor="num">Your number:</label>
        <input
          id="num"
          type="number"
          value={selectedNum}
          onChange={(event) => {
            let num = Math.min(100_000, Number(event.target.value));
            setSelectedNum(num);
          }}
        />
      </form>
      <p>
        There are {allPrimes.length} prime(s) between 1 and {selectedNum}: 
        <span className="prime-list">{allPrimes.join(", ")}</span>
      </p>
    </>
  );
}

function isPrime(n) {
  const max = Math.ceil(Math.sqrt(n));
  if (n === 2) return true;
  for (let counter = 2; counter <= max; counter++) {
    if (n % counter === 0) return false;
  }
  return true;
}

export default App;`}
          lang="javascript"
          theme="vitesse-dark"
        />
      </section>

      {/* Conclusion */}
      <section>
        <h2 className="text-2xl font-bold mb-4">Conclusion</h2>
        <p>
          The <code>useMemo</code> hook lets us cache expensive calculations and preserve reference equality between renders, both of which can significantly improve performance.
        </p>
        <p>
          Next up: The <code>useCallback</code> hook!
        </p>
      </section>
    </div>
  );
}
