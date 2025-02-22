"use client";
import CodeHighlighter from "@/components/CodeHighlighter";

export default function CoreReactLoop() {
  const counterExample = `
function Counter() {
  const [count, setCount] = React.useState(0);

  return (
    <button onClick={() => setCount(count + 1)}>
      Value: {count}
    </button>
  );
}`;

  const compiledJsx = `
// Compiled JavaScript
function Counter() {
  const [count, setCount] = React.useState(0);

  return React.createElement(
    'button',
    { onClick: () => setCount(count + 1) },
    'Value: ',
    count
  );
}`;

  const reactElementObject = `
// React Element Object
{
  type: 'button',
  props: {
    onClick: () => setCount(count + 1),
    children: ['Value: ', 0]
  },
  // ...other internal properties
}`;

  const reconciliationProcess = `
// Before Update
<button>Value: 0</button>

// After Update
<button>Value: 1</button>

// DOM Operation
button.textContent = "Value: 1";`;

  return (
    <div className="flex flex-col gap-3">
      <h1 className="scroll-m-20 text-4xl font-extrabold tracking-tight lg:text-5xl mb-[20px]">
        Core React Loop
      </h1>

      <h2 className="text-2xl font-bold">Component Example</h2>
      <div className="mb-[20px]">
        <CodeHighlighter code={counterExample} lang="javascript" theme="vitesse-dark" />
      </div>

      <h2 className="text-2xl font-bold">JSX Compilation</h2>
      <div className="mb-[20px]">
        <CodeHighlighter code={compiledJsx} lang="javascript" theme="vitesse-dark" />
      </div>

      <h2 className="text-2xl font-bold">Initial Render Process</h2>
      <div className="mb-[20px]">
        <CodeHighlighter code={reactElementObject} lang="javascript" theme="vitesse-dark" />
        <p className="mt-2">
          React creates a virtual representation (React Element) and converts it to actual DOM nodes
        </p>
      </div>

      <h2 className="text-2xl font-bold">State Update Flow</h2>
      <ol className="list-decimal pl-6 mb-4">
        <li>User clicks button triggering onClick handler</li>
        <li>setCount updates state (0 → 1)</li>
        <li>React schedules re-render</li>
        <li>Counter component function executes again</li>
        <li>New React Element created with updated value</li>
      </ol>

      <h2 className="text-2xl font-bold">Reconciliation Process</h2>
      <div className="mb-[20px]">
        <CodeHighlighter code={reconciliationProcess} lang="html" theme="vitesse-dark" />
        <p className="mt-2">
          React compares virtual DOM snapshots and calculates minimal DOM operations needed
        </p>
      </div>

      <div className="p-4 bg-blue-100 rounded-lg">
        <h3 className="text-xl font-bold mb-2">Key Concepts</h3>
        <ul className="list-disc pl-6">
          <li>Virtual DOM: Lightweight JavaScript representation of UI</li>
          <li>Reconciliation: Diffing algorithm comparing virtual DOM versions</li>
          <li>Commit Phase: Applying minimal necessary DOM updates</li>
          <li>Immutable Snapshots: Each render creates new React Elements</li>
        </ul>
      </div>

      <div className="p-4 bg-green-100 rounded-lg mt-4">
        <h3 className="text-xl font-bold mb-2">Visual Analogy</h3>
        <div className="flex gap-4">
          <div className="flex-1 p-4 border rounded">
            <h4 className="font-bold mb-2">Before Update</h4>
            <div className="text-center">🖼️<button>Value: 0</button></div>
          </div>
          <div className="flex-1 p-4 border rounded">
            <h4 className="font-bold mb-2">After Update</h4>
            <div className="text-center">🖼️<button>Value: 1</button></div>
          </div>
        </div>
        <p className="mt-4">React acts like a "spot the difference" game between UI snapshots</p>
      </div>

      <div className="p-4 bg-yellow-100 rounded-lg mt-4">
        <h3 className="text-xl font-bold mb-2">Core Loop Stages</h3>
        <ol className="list-decimal pl-6">
          <li><strong>Trigger:</strong> State/props change</li>
          <li><strong>Render:</strong> Create new virtual DOM snapshot</li>
          <li><strong>Reconcile:</strong> Compare with previous snapshot</li>
          <li><strong>Commit:</strong> Update actual DOM</li>
        </ol>
      </div>
    </div>
  );
}