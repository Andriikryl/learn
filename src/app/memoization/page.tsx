"use client";
import CodeHighlighter from "@/components/CodeHighlighter";

export default function MemoizationGuide() {
  const counterExample = `
function Counter() {
  const [count, setCount] = useState(0);

  return (
    <main>
      <BigCountNumber count={count} />
      <button onClick={() => setCount(count + 1)}>
        Increment
      </button>
      <Decoration />
    </main>
  );
}`;

  const memoizedComponent = `
const MemoizedBigNumber = React.memo(BigCountNumber);

function Counter() {
  // ... same as before
  return (
    <main>
      <MemoizedBigNumber count={count} />
      {/* ... */}
    </main>
  );
}`;

  const useCallbackExample = `
const handleClick = useCallback(() => {
  console.log('Button clicked');
}, []); // Dependency array

<ChildComponent onClick={handleClick} />`;

  const useMemoExample = `
const expensiveValue = useMemo(() => {
  return calculateExpensiveThing(a, b);
}, [a, b]); // Re-run when a/b change`;

const memoExample = `
function Decoration() {
  return <div>⛵️</div>;
}

const PureDecoration = React.memo(Decoration);
export default PureDecoration;`;

  const beforeAfterExample = `
// Before: Re-renders on parent update
<Decoration />

// After: Only re-renders when props change
<MemoDecoration />`;

  const performanceConsiderations = `
function ExpensiveComponent({ data }) {
  // Complex calculations here
  return <div>{processedData}</div>;
}

const MemoizedExpensive = React.memo(ExpensiveComponent);`;

  return (
    <>  
    <div className="flex flex-col gap-3">
      <h1 className="scroll-m-20 text-4xl font-extrabold tracking-tight lg:text-5xl mb-[20px]">
        React Memoization & Performance
      </h1>

      <section>
        <h2 className="text-2xl font-bold mb-4">Understanding Re-renders</h2>
        <div className="grid grid-cols-2 gap-4 mb-4">
          <div>
            <CodeHighlighter 
              code={counterExample} 
              lang="javascript" 
              theme="vitesse-dark" 
            />
          </div>
          <div className="p-4 bg-blue-50 rounded-lg">
            <h3 className="font-bold mb-2">Re-render Flow</h3>
            <ul className="list-disc pl-6 space-y-2">
              <li>State change in Counter</li>
              <li>All children re-render</li>
              <li>DOM diffing occurs</li>
            </ul>
          </div>
        </div>
      </section>

      <section>
        <h2 className="text-2xl font-bold mb-4">Common Misconceptions</h2>
        <div className="grid grid-cols-2 gap-4 mb-[20px]">
          <div className="p-4 bg-red-50 rounded-lg">
            <h3 className="font-bold mb-2">Myths</h3>
            <ul className="list-disc pl-6 space-y-2">
              <li>Entire app re-renders on state change</li>
              <li>Props changes cause re-renders</li>
              <li>All re-renders are expensive</li>
            </ul>
          </div>
          <div className="p-4 bg-green-50 rounded-lg">
            <h3 className="font-bold mb-2">Reality</h3>
            <ul className="list-disc pl-6 space-y-2">
              <li>Only component + children re-render</li>
              <li>Re-renders determine DOM updates</li>
              <li>Virtual DOM diffing is optimized</li>
            </ul>
          </div>
        </div>
      </section>

      <section>
        <h2 className="text-2xl font-bold mb-4">Memoization Techniques</h2>
        <div className="flex flex-wrap gap-[20px] mb-[20px]">
          <div className="p-4 bg-purple-50 rounded-lg">
            <h3 className="font-bold mb-2">React.memo</h3>
            <CodeHighlighter 
              code={memoizedComponent} 
              lang="javascript" 
              theme="vitesse-dark" 
            />
          </div>
          <div className="p-4 bg-blue-50 rounded-lg">
            <h3 className="font-bold mb-2">useCallback</h3>
            <CodeHighlighter 
              code={useCallbackExample} 
              lang="javascript" 
              theme="vitesse-dark" 
            />
          </div>
          <div className="p-4 bg-green-50 rounded-lg">
            <h3 className="font-bold mb-2">useMemo</h3>
            <CodeHighlighter 
              code={useMemoExample} 
              lang="javascript" 
              theme="vitesse-dark" 
            />
          </div>
        </div>
      </section>

      <section>
        <h2 className="text-2xl font-bold mb-4">Optimization Strategy</h2>
        <div className="grid grid-cols-2 gap-4">
          <div>
            <h3 className="font-bold mb-2">Before Optimization</h3>
            <CodeHighlighter 
              code={`<Decoration /> // Re-renders on parent update`} 
              lang="javascript" 
              theme="vitesse-dark" 
            />
          </div>
          <div className="p-4 bg-yellow-50 rounded-lg">
            <h3 className="font-bold mb-2">After Optimization</h3>
            <CodeHighlighter 
              code={`const MemoDecoration = React.memo(Decoration);`} 
              lang="javascript" 
              theme="vitesse-dark" 
            />
          </div>
        </div>
      </section>

      <section className="mt-8">
        <h2 className="text-2xl font-bold mb-4">Best Practices</h2>
        <div className="grid grid-cols-3 gap-4">
          <div className="p-4 bg-green-100 rounded-lg">
            <h3 className="font-bold mb-2">When to Memoize</h3>
            <ul className="list-disc pl-6 space-y-2">
              <li>Large component trees</li>
              <li>Expensive computations</li>
              <li>Frequent re-renders</li>
            </ul>
          </div>
          <div className="p-4 bg-red-100 rounded-lg">
            <h3 className="font-bold mb-2">When to Avoid</h3>
            <ul className="list-disc pl-6 space-y-2">
              <li>Simple components</li>
              <li>Props change often</li>
              <li>Premature optimization</li>
            </ul>
          </div>
          <div className="p-4 bg-blue-100 rounded-lg">
            <h3 className="font-bold mb-2">Tools</h3>
            <ul className="list-disc pl-6 space-y-2">
              <li>React DevTools Profiler</li>
              <li>Chrome Performance tab</li>
              <li>Memoization as last resort</li>
            </ul>
          </div>
        </div>
      </section>

      <section>
        <h2 className="text-2xl font-bold mb-4">Key Insight</h2>
        <div className="p-4 bg-purple-50 rounded-lg">
          <p className="font-semibold">
            Memoization isn't free! It trades memory for computation. 
            Only optimize components with measurable performance issues.
          </p>
        </div>
      </section>
    </div>
    <div className="flex flex-col gap-3">
      <h1 className="scroll-m-20 text-4xl font-extrabold tracking-tight lg:text-5xl mb-[20px]">
        Optimizing with Pure Components
      </h1>

      <section>
        <h2 className="text-2xl font-bold mb-4">The Re-render Problem</h2>
        <div className="grid grid-cols-2 gap-4 mb-4">
          <div className="p-4 bg-red-50 rounded-lg">
            <h3 className="font-bold mb-2">Without Optimization</h3>
            <ul className="list-disc pl-6 space-y-2">
              <li>All children re-render on parent update</li>
              <li>Wasted computation cycles</li>
              <li>Potential performance bottlenecks</li>
            </ul>
          </div>
          <div className="p-4 bg-green-50 rounded-lg">
            <h3 className="font-bold mb-2">React.memo Solution</h3>
            <ul className="list-disc pl-6 space-y-2">
              <li>Memoizes component output</li>
              <li>Shallow prop comparison</li>
              <li>Selective re-renders</li>
            </ul>
          </div>
        </div>
      </section>

      <section>
        <h2 className="text-2xl font-bold mb-4">Implementing React.memo</h2>
        <div className="grid grid-cols-2 gap-4 mb-[20px]">
          <div>
            <CodeHighlighter 
              code={memoExample} 
              lang="javascript" 
              theme="vitesse-dark" 
            />
          </div>
          <div className="p-4 bg-blue-50 rounded-lg">
            <h3 className="font-bold mb-2">Key Features</h3>
            <ul className="list-disc pl-6 space-y-2">
              <li>Wraps functional components</li>
              <li>Optional custom comparison function</li>
              <li>Works with props and state</li>
            </ul>
          </div>
        </div>
      </section>

      <section>
        <h2 className="text-2xl font-bold mb-4">Before & After</h2>
        <CodeHighlighter 
          code={beforeAfterExample} 
          lang="javascript" 
          theme="vitesse-dark" 
        />
        <div className="mt-4 p-4 bg-purple-50 rounded-lg">
          <p className="font-semibold">
            Memoization reduces re-renders from 3 to 1 in typical component trees
          </p>
        </div>
      </section>

      <section>
        <h2 className="text-2xl font-bold mb-4">Performance Considerations</h2>
        <div className="grid grid-cols-2 gap-4">
          <div>
            <CodeHighlighter 
              code={performanceConsiderations} 
              lang="javascript" 
              theme="vitesse-dark" 
            />
          </div>
          <div className="p-4 bg-yellow-50 rounded-lg">
            <h3 className="font-bold mb-2">When to Use</h3>
            <ul className="list-disc pl-6 space-y-2">
              <li>Large component trees</li>
              <li>Expensive render operations</li>
              <li>Frequent parent re-renders</li>
            </ul>
          </div>
        </div>
      </section>

      <section className="mt-8">
        <h2 className="text-2xl font-bold mb-4">Best Practices</h2>
        <div className="grid grid-cols-3 gap-4">
          <div className="p-4 bg-green-100 rounded-lg">
            <h3 className="font-bold mb-2">Do Use For</h3>
            <ul className="list-disc pl-6 space-y-2">
              <li>Static presentational components</li>
              <li>Components with heavy computations</li>
              <li>Leaf nodes in component trees</li>
            </ul>
          </div>
          <div className="p-4 bg-red-100 rounded-lg">
            <h3 className="font-bold mb-2">Avoid For</h3>
            <ul className="list-disc pl-6 space-y-2">
              <li>Components with frequent prop changes</li>
              <li>Small simple components</li>
              <li>Components using impure props</li>
            </ul>
          </div>
          <div className="p-4 bg-blue-100 rounded-lg">
            <h3 className="font-bold mb-2">Optimization Tips</h3>
            <ul className="list-disc pl-6 space-y-2">
              <li>Profile before optimizing</li>
              <li>Use custom comparison functions</li>
              <li>Combine with useCallback/useMemo</li>
            </ul>
          </div>
        </div>
      </section>

      <section>
        <h2 className="text-2xl font-bold mb-4">Why Not Default?</h2>
        <div className="p-4 bg-orange-50 rounded-lg">
          <ul className="list-disc pl-6 space-y-2">
            <li>Shallow comparison has cost</li>
            <li>Memoization increases memory usage</li>
            <li>Most components don't need optimization</li>
            <li>Premature optimization can hurt performance</li>
          </ul>
        </div>
      </section>

      <section>
        <h2 className="text-2xl font-bold mb-4">Advanced Usage</h2>
        <div className="grid grid-cols-2 gap-4">
          <div className="p-4 bg-purple-50 rounded-lg">
            <h3 className="font-bold mb-2">Custom Comparator</h3>
            <CodeHighlighter 
              code={`const areEqual = (prev, next) => prev.id === next.id;\nReact.memo(Component, areEqual);`} 
              lang="javascript" 
              theme="vitesse-dark" 
            />
          </div>
          <div className="p-4 bg-green-50 rounded-lg">
            <h3 className="font-bold mb-2">Class Components</h3>
            <CodeHighlighter 
              code="class PureComponent extends React.PureComponent" 
              lang="javascript" 
              theme="vitesse-dark" 
            />
            <p className="mt-2 text-sm">Legacy approach for class components</p>
          </div>
        </div>
      </section>
    </div>

    </>
  );
}


