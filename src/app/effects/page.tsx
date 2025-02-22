"use client";
import CodeHighlighter from "@/components/CodeHighlighter";

export default function UseEffectLesson() {
  const documentTitleExample = `
function Counter() {
  const [count, setCount] = React.useState(0);
  
  React.useEffect(() => {
    document.title = \`Count: \${count}\`;
  }, [count]); // Only re-run when count changes

  return <button onClick={() => setCount(c => c + 1)}>Increment</button>;
}`;

  const loggingExample = `
function SignupForm() {
  const [email, setEmail] = React.useState('');
  
  React.useEffect(() => {
    console.log('Email changed:', email);
  }, [email]);

  return <input value={email} onChange={(e) => setEmail(e.target.value)} />;
}`;

  const localStorageExample = `
function DarkModeToggle() {
  const [isDark, setIsDark] = React.useState(() => {
    const saved = localStorage.getItem('dark-mode');
    return JSON.parse(saved) || false;
  });

  React.useEffect(() => {
    localStorage.setItem('dark-mode', isDark);
  }, [isDark]);

  return <Toggle checked={isDark} onChange={setIsDark} />;
}`;

  const dependencyArray = `
// Empty array: runs once on mount
useEffect(() => {
  fetchData();
}, []);

// No array: runs after every render
useEffect(() => {
  console.log('Component updated');
});

// Specific dependencies
useEffect(() => {
  updateChart(data);
}, [data]);`;

const problemCode = `
function Counter() {
  const [count, setCount] = React.useState(0);

  React.useEffect(() => {
    console.log(count);
  }, []); // 🚫 Missing count dependency

  return <button onClick={() => setCount(c => c + 1)}>Increment</button>;
}`;

  const solutionCode = `
function Counter() {
  const [count, setCount] = React.useState(0);

  React.useEffect(() => {
    console.log(count);
  }, [count]); // ✅ Added count to dependencies

  return <button onClick={() => setCount(c => c + 1)}>Increment</button>;
}`;

  const staleClosureExample = `
// First render: count = 0
useEffect(() => {
  console.log(count); // Logs 0
}, []);

// After increment: count = 1
// Effect doesn't re-run - still logging 0!`;

  const lintWarning = `
React Hook React.useEffect has a missing dependency: 'count'.
Either include it or remove the dependency array.`;

  return (
    <div className="flex flex-col gap-3">
      <h1 className="scroll-m-20 text-4xl font-extrabold tracking-tight lg:text-5xl mb-[20px]">
        Mastering useEffect
      </h1>

      <div className="p-4 bg-blue-100 rounded-lg">
        <h2 className="text-2xl font-bold mb-3">What are Side Effects?</h2>
        <p>Operations that interact with outside systems:</p>
        <ul className="list-disc pl-6 mt-2">
          <li>API calls</li>
          <li>DOM manipulation</li>
          <li>Subscriptions</li>
          <li>Timers</li>
          <li>LocalStorage</li>
        </ul>
      </div>

      <div className="p-4 bg-green-100 rounded-lg">
        <h2 className="text-2xl font-bold mb-3">Basic useEffect Pattern</h2>
        <CodeHighlighter code={documentTitleExample} lang="javascript" theme="vitesse-dark" />
        <div className="mt-4 p-4 bg-white rounded">
          <h3 className="text-lg font-bold mb-2">Key Points</h3>
          <ul className="list-disc pl-6">
            <li>Runs after every render by default</li>
            <li>Dependency array controls execution</li>
            <li>Cleanup function for subscriptions</li>
          </ul>
        </div>
      </div>

      <div className="p-4 bg-purple-100 rounded-lg">
        <h2 className="text-2xl font-bold mb-3">Dependency Array Guide</h2>
        <CodeHighlighter code={dependencyArray} lang="javascript" theme="vitesse-dark" />
        <div className="mt-4 grid md:grid-cols-2 gap-4">
          <div className="p-4 bg-white rounded">
            <h3 className="font-bold mb-2">✅ Proper Use</h3>
            <ul className="list-disc pl-6">
              <li>Include all changing values</li>
              <li>Empty array for mount-only</li>
              <li>Omit array for every render</li>
            </ul>
          </div>
          <div className="p-4 bg-white rounded">
            <h3 className="font-bold mb-2">🚫 Common Mistakes</h3>
            <ul className="list-disc pl-6">
              <li>Missing dependencies</li>
              <li>Unnecessary dependencies</li>
              <li>Forgetting cleanup</li>
            </ul>
          </div>
        </div>
      </div>

      <div className="p-4 bg-yellow-100 rounded-lg">
        <h2 className="text-2xl font-bold mb-3">Real-World Examples</h2>
        <div className="grid md:grid-cols-2 gap-4">
          <div>
            <h3 className="text-xl font-semibold mb-2">Logging Changes</h3>
            <CodeHighlighter code={loggingExample} lang="javascript" theme="vitesse-dark" />
          </div>
          <div>
            <h3 className="text-xl font-semibold mb-2">Persisting State</h3>
            <CodeHighlighter code={localStorageExample} lang="javascript" theme="vitesse-dark" />
          </div>
        </div>
      </div>

      <div className="p-4 bg-red-100 rounded-lg">
        <h2 className="text-2xl font-bold mb-3">Important Considerations</h2>
        <div className="grid md:grid-cols-2 gap-4">
          <div className="p-4 bg-white rounded">
            <h3 className="font-bold mb-2">Strict Mode</h3>
            <ul className="list-disc pl-6">
              <li>Double-invokes effects in development</li>
              <li>Helps find cleanup issues</li>
              <li>Doesn't affect production</li>
            </ul>
          </div>
          <div className="p-4 bg-white rounded">
            <h3 className="font-bold mb-2">Performance</h3>
            <ul className="list-disc pl-6">
              <li>Memoize expensive operations</li>
              <li>Use cleanup functions</li>
              <li>Avoid unnecessary re-renders</li>
            </ul>
          </div>
        </div>
      </div>

      <div className="p-4 bg-green-100 rounded-lg">
        <h2 className="text-2xl font-bold mb-3">When to Use useEffect</h2>
        <div className="grid md:grid-cols-2 gap-4">
          <div>
            <h3 className="text-lg font-bold mb-2">Good Cases</h3>
            <ul className="list-disc pl-6">
              <li>Data fetching</li>
              <li>Event listeners</li>
              <li>Third-party integrations</li>
            </ul>
          </div>
          <div>
            <h3 className="text-lg font-bold mb-2">Alternative Solutions</h3>
            <ul className="list-disc pl-6">
              <li>Event handlers for user actions</li>
              <li>State derivation for computed values</li>
              <li>Libraries for complex state</li>
            </ul>
          </div>
        </div>
      </div>
      <h1 className="scroll-m-20 text-4xl font-extrabold tracking-tight lg:text-5xl mb-[20px]">
        useEffect Dependency Rules
      </h1>

      <div className="p-4 bg-red-100 rounded-lg">
        <h2 className="text-2xl font-bold mb-3">The Missing Dependency Problem</h2>
        <CodeHighlighter code={problemCode} lang="javascript" theme="vitesse-dark" />
        <div className="mt-4 p-4 bg-white rounded">
          <h3 className="text-lg font-bold mb-2">ESLint Warning</h3>
          <CodeHighlighter code={lintWarning} lang="javascript" theme="vitesse-dark" />
        </div>
      </div>

      <div className="p-4 bg-green-100 rounded-lg">
        <h2 className="text-2xl font-bold mb-3">Proper Solution</h2>
        <CodeHighlighter code={solutionCode} lang="javascript" theme="vitesse-dark" />
        <div className="mt-4 p-4 bg-white rounded">
          <h3 className="text-lg font-bold mb-2">Why This Works</h3>
          <ul className="list-disc pl-6">
            <li>Effect stays synchronized with state</li>
            <li>Runs whenever count changes</li>
            <li>Avoids stale closure issues</li>
          </ul>
        </div>
      </div>

      <div className="p-4 bg-yellow-100 rounded-lg">
        <h2 className="text-2xl font-bold mb-3">Stale Closure Visualization</h2>
        <div className="grid md:grid-cols-2 gap-4">
          <div>
            <CodeHighlighter code={staleClosureExample} lang="javascript" theme="vitesse-dark" />
          </div>
          <div className="p-4 bg-white rounded">
            <h3 className="text-lg font-bold mb-2">Understanding Snapshots</h3>
            <ul className="list-disc pl-6">
              <li>Each render has its own props/state</li>
              <li>Effects "see" values from render they were created</li>
              <li>Missing dependencies freeze values in time</li>
            </ul>
          </div>
        </div>
      </div>

      <div className="p-4 bg-purple-100 rounded-lg">
        <h2 className="text-2xl font-bold mb-3">Dependency Array Guidelines</h2>
        <div className="grid md:grid-cols-2 gap-4">
          <div className="p-4 bg-white rounded">
            <h3 className="font-bold mb-2">✅ Include</h3>
            <ul className="list-disc pl-6">
              <li>All state variables used</li>
              <li>Props used in the effect</li>
              <li>Context values accessed</li>
            </ul>
          </div>
          <div className="p-4 bg-white rounded">
            <h3 className="font-bold mb-2">🚫 Exclude</h3>
            <ul className="list-disc pl-6">
              <li>State setters (setCount)</li>
              <li>Mutable ref.current values</li>
              <li>Stable utility functions</li>
            </ul>
          </div>
        </div>
      </div>

      <div className="p-4 bg-blue-100 rounded-lg">
        <h2 className="text-2xl font-bold mb-3">Common Mistakes</h2>
        <div className="grid md:grid-cols-2 gap-4">
          <div className="p-4 bg-white rounded">
            <h3 className="font-bold mb-2">Disabling the Warning</h3>
            <code className="block p-2 bg-red-50 rounded">
              // eslint-disable-next-line react-hooks/exhaustive-deps
            </code>
            <p className="mt-2 text-red-600">Only use as last resort!</p>
          </div>
          <div className="p-4 bg-white rounded">
            <h3 className="font-bold mb-2">Over-including Dependencies</h3>
            <CodeHighlighter
              code={`useEffect(() => {}, [count, setCount, props, context])`}
              lang="javascript"
              theme="vitesse-dark"
            />
            <p className="mt-2">Causes unnecessary re-runs</p>
          </div>
        </div>
      </div>

      <div className="p-4 bg-green-100 rounded-lg">
        <h2 className="text-2xl font-bold mb-3">When to Break the Rules</h2>
        <div className="grid md:grid-cols-2 gap-4">
          <div className="p-4 bg-white rounded">
            <h3 className="font-bold mb-2">Valid Exceptions</h3>
            <ul className="list-disc pl-6">
              <li>Running only on mount/unmount</li>
              <li>Event-driven effects</li>
              <li>Performance-critical animations</li>
            </ul>
          </div>
          <div className="p-4 bg-white rounded">
            <h3 className="font-bold mb-2">Safe Workarounds</h3>
            <ul className="list-disc pl-6">
              <li>Use refs for latest values</li>
              <li>Create custom hooks</li>
              <li>Move logic outside effects</li>
            </ul>
          </div>
        </div>
      </div>

      <div className="p-4 bg-orange-100 rounded-lg">
        <h2 className="text-2xl font-bold mb-3">Best Practices</h2>
        <div className="grid md:grid-cols-2 gap-4">
          <div>
            <h3 className="text-lg font-bold mb-2">✅ Do</h3>
            <ul className="list-disc pl-6">
              <li>Trust the lint rules</li>
              <li>Keep dependencies accurate</li>
              <li>Use dependency array linter</li>
            </ul>
          </div>
          <div>
            <h3 className="text-lg font-bold mb-2">🚫 Don't</h3>
            <ul className="list-disc pl-6">
              <li>Ignore warnings without consideration</li>
              <li>Use empty arrays as quick fix</li>
              <li>Disable rules globally</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}