"use client";
import CodeHighlighter from "@/components/CodeHighlighter";

export default function EventHandlers() {
  const vanillaJsExample = `
// Vanilla JavaScript
const button = document.querySelector('.btn');
button.addEventListener('click', doSomething);`;

  const reactHandlerExample = `
// React JSX
function App() {
  function doSomething() {
    // Handle click
  }

  return (
    <button onClick={doSomething}>
      Click me!
    </button>
  );
}`;

  const incorrectHtmlCase = `
// 🚫 Incorrect casing
<button onclick={doSomething}>
  Click me!
</button>`;

  const functionReference = `
// ✅ Correct - pass reference
<button onClick={doSomething} />

// 🚫 Incorrect - invokes immediately
<button onClick={doSomething()} />`;

  const compiledJsExample = `
// Correct compiled JS
React.createElement('button', { onClick: doSomething });

// Incorrect compiled JS
React.createElement('button', { onClick: doSomething() });`;

const invalidExamples = `
// 🚫 No arguments provided
<button onClick={setTheme}>
  Toggle theme
</button>

// 🚫 Invokes immediately on render
<button onClick={setTheme('dark')}>
  Toggle theme
</button>`;

  const solutionCode = `
// ✅ Wrapper function solution
<button onClick={() => setTheme('dark')}>
  Toggle theme
</button>`;

  const bindExample = `
// ✅ .bind alternative (less common)
<button onClick={setTheme.bind(null, 'dark')}>
  Toggle theme
</button>`;

  const performanceMyth = `
// Myth: This is bad for performance
const handleClick = () => setTheme('dark');

// Reality: Modern JS engines handle this efficiently
<button onClick={handleClick}>`;

  return (
    <div className="flex flex-col gap-3">
      <h1 className="scroll-m-20 text-4xl font-extrabold tracking-tight lg:text-5xl mb-[20px]">
        Event Handlers in React
      </h1>

      <p>React provides a declarative way to handle events through JSX props:</p>

      <h2 className="text-2xl font-bold">React vs Vanilla JS</h2>
      <div className="mb-[20px]">
        <CodeHighlighter code={vanillaJsExample} lang="javascript" theme="vitesse-dark" />
        <CodeHighlighter code={reactHandlerExample} lang="javascript" theme="vitesse-dark" />
      </div>

      <h2 className="text-2xl font-bold">Key Differences from HTML</h2>
      
      <h3 className="text-xl font-semibold mt-4">1. Camel Casing</h3>
      <div className="mb-[20px]">
        <CodeHighlighter code={incorrectHtmlCase} lang="javascript" theme="vitesse-dark" />
        <p className="mt-2 text-red-600">Console warning: "Did you mean onClick?"</p>
      </div>

      <h3 className="text-xl font-semibold mt-4">2. Function References</h3>
      <div className="mb-[20px]">
        <CodeHighlighter code={functionReference} lang="javascript" theme="vitesse-dark" />
        <p className="mt-2">Underlying compiled JavaScript:</p>
        <CodeHighlighter code={compiledJsExample} lang="javascript" theme="vitesse-dark" />
      </div>

      <div className="p-4 bg-blue-100 rounded-lg">
        <h2 className="text-2xl font-bold mb-3">Why Use React's Event System?</h2>
        <ul className="list-disc pl-6">
          <li>Automatic event listener cleanup</li>
          <li>Performance optimizations</li>
          <li>Consistent cross-browser behavior</li>
          <li>Integrated with React's update cycle</li>
        </ul>
      </div>

      <div className="p-4 bg-yellow-100 rounded-lg mt-4">
        <h3 className="text-xl font-semibold">Important Note</h3>
        <p>
          Avoid direct DOM manipulation with querySelector. Trust React's abstraction
          for event handling and DOM updates. Mixing imperative DOM APIs with React
          can lead to hard-to-debug issues.
        </p>
      </div>
      <h1 className="scroll-m-20 text-4xl font-extrabold tracking-tight lg:text-5xl mb-[20px]">
        Passing Arguments to Event Handlers
      </h1>

      <h2 className="text-2xl font-bold">The Problem</h2>
      <p>How to pass parameters to handler functions:</p>
      <div className="mb-[20px]">
        <CodeHighlighter code={invalidExamples} lang="javascript" theme="vitesse-dark" />
      </div>

      <h2 className="text-2xl font-bold">Recommended Solution</h2>
      <p>Use arrow function wrapper:</p>
      <div className="mb-[20px]">
        <CodeHighlighter code={solutionCode} lang="javascript" theme="vitesse-dark" />
      </div>

      <h2 className="text-2xl font-bold">Alternative .bind Approach</h2>
      <div className="mb-[20px]">
        <CodeHighlighter code={bindExample} lang="javascript" theme="vitesse-dark" />
        <p className="mt-2 text-gray-600">(Not recommended for typical use cases)</p>
      </div>

      <div className="p-4 bg-yellow-100 rounded-lg">
        <h3 className="text-xl font-bold mb-2">Performance Considerations</h3>
        <CodeHighlighter code={performanceMyth} lang="javascript" theme="vitesse-dark" />
        <ul className="list-disc pl-6 mt-2">
          <li>Modern JavaScript engines optimize short-lived functions</li>
          <li>React's event delegation minimizes performance impact</li>
          <li>Only optimize with useCallback when proven necessary</li>
        </ul>
      </div>

      <div className="p-4 bg-blue-100 rounded-lg mt-4">
        <h3 className="text-xl font-bold mb-2">Best Practice</h3>
        <p className="mb-2">✅ Use arrow functions for most cases:</p>
        <CodeHighlighter 
          code={`<button onClick={() => handleAction(param)}>`} 
          lang="javascript" 
          theme="vitesse-dark" 
        />
        <p className="mt-4 mb-2">🚫 Avoid premature optimization:</p>
        <CodeHighlighter 
          code={`// Don't complicate code unless benchmarks show issues`} 
          lang="javascript" 
          theme="vitesse-dark" 
        />
      </div>
    </div>
  );
}