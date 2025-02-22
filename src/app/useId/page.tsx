"use client";
import CodeHighlighter from "@/components/CodeHighlighter";

export default function UseIdHook() {
  const problemCode = `
// 🚫 Problem: Manual IDs might clash
function LoginForm() {
  return (
    <form>
      <label htmlFor="username">Username</label>
      <input id="username" />
      
      <label htmlFor="password">Password</label>
      <input id="password" />
    </form>
  );
}

// Multiple instances would have duplicate IDs!`;

  const solutionCode = `
// ✅ Solution: useId hook
function LoginForm() {
  const id = React.useId();
  
  return (
    <form>
      <label htmlFor={id + '-username'}>Username</label>
      <input id={id + '-username'} />
      
      <label htmlFor={id + '-password'}>Password</label>
      <input id={id + '-password'} />
    </form>
  );
}`;

  const toggleProblem = `
// Practice Exercise: Fix this Toggle component
function Toggle({ label }) {
  return (
    <div>
      <label>{label}</label>
      <button role="switch"></button>
    </div>
  );
}`;

  const toggleSolution = `
// Solved with useId
function Toggle({ label }) {
  const id = React.useId();
  
  return (
    <div>
      <label htmlFor={id}>{label}</label>
      <button id={id} role="switch"></button>
    </div>
  );
}`;

  return (
    <div className="flex flex-col gap-3">
      <h1 className="scroll-m-20 text-4xl font-extrabold tracking-tight lg:text-5xl mb-[20px]">
        The useId Hook
      </h1>

      <div className="p-4 bg-blue-100 rounded-lg">
        <h2 className="text-2xl font-bold mb-3">The Problem</h2>
        <p>When creating reusable components with form elements:</p>
        <ul className="list-disc pl-6 mt-2">
          <li>IDs must be unique in the DOM</li>
          <li>Hardcoded IDs cause collisions</li>
          <li>Passing IDs as props is cumbersome</li>
        </ul>
        <div className="mt-4">
          <CodeHighlighter code={problemCode} lang="javascript" theme="vitesse-dark" />
        </div>
      </div>

      <div className="p-4 bg-green-100 rounded-lg">
        <h2 className="text-2xl font-bold mb-3">React's Solution</h2>
        <p><code>useId</code> generates unique, stable IDs:</p>
        <div className="mt-4">
          <CodeHighlighter code={solutionCode} lang="javascript" theme="vitesse-dark" />
        </div>
        <div className="mt-4 p-4 bg-yellow-100 rounded">
          <h3 className="font-bold mb-2">Key Features</h3>
          <ul className="list-disc pl-6">
            <li>Unique across component instances</li>
            <li>Stable between re-renders</li>
            <li>SSR compatible</li>
            <li>Colon-prefixed (:r1:)</li>
          </ul>
        </div>
      </div>

      <div className="p-4 bg-purple-100 rounded-lg">
        <h2 className="text-2xl font-bold mb-3">Practice Exercise</h2>
        <p>Fix this Toggle component to properly associate the label with the switch:</p>
        <div className="mt-4">
          <CodeHighlighter code={toggleProblem} lang="javascript" theme="vitesse-dark" />
        </div>
        <div className="mt-6 p-4 bg-white rounded border">
          <h3 className="text-xl font-bold mb-3">Solution</h3>
          <CodeHighlighter code={toggleSolution} lang="javascript" theme="vitesse-dark" />
          <p className="mt-4 text-green-600">Now clicking the label toggles the switch!</p>
        </div>
      </div>

      <div className="p-4 bg-red-100 rounded-lg">
        <h2 className="text-2xl font-bold mb-3">Important Notes</h2>
        <div className="grid md:grid-cols-2 gap-4">
          <div className="p-4 bg-white rounded">
            <h3 className="font-bold mb-2">🚫 Don't Use For Keys</h3>
            <p><code>useId</code> is for DOM IDs, not React list keys</p>
            <code className="block mt-2 p-2 bg-gray-100 rounded text-red-600">
              // Bad: {`{items.map(item => <li key={useId()}>)}`}
            </code>
          </div>
          <div className="p-4 bg-white rounded">
            <h3 className="font-bold mb-2">✅ Proper Usage</h3>
            <ul className="list-disc pl-6">
              <li>Form labels</li>
              <li>ARIA attributes</li>
              <li>Accessibility relationships</li>
            </ul>
          </div>
        </div>
      </div>

      <div className="p-4 bg-yellow-100 rounded-lg">
        <h2 className="text-2xl font-bold mb-3">When to Use</h2>
        <div className="grid md:grid-cols-2 gap-4">
          <div>
            <p className="font-semibold">Use useId for:</p>
            <ul className="list-disc pl-6">
              <li>Connecting labels to inputs</li>
              <li>aria-labelledby/describedby</li>
              <li>Custom component IDs</li>
            </ul>
          </div>
          <div>
            <p className="font-semibold">Don't use for:</p>
            <ul className="list-disc pl-6">
              <li>List keys</li>
              <li>CSS class names</li>
              <li>Unique values in data structures</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}