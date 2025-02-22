"use client";
import CodeHighlighter from "@/components/CodeHighlighter";

export default function RenderVsPaint() {
  const ageLimitExample = `
function AgeLimit({ age }) {
  if (age < 18) {
    return <p>You're not old enough!</p>;
  }
  return <p>Hello, adult!</p>;
}`;

  const snapshotExample = `
// First render (age: 16)
{
  type: 'p',
  props: { children: "You're not old enough!" }
}

// Second render (age: 17)
{
  type: 'p',
  props: { children: "You're not old enough!" }
}`;

  const processSteps = `
1. Trigger: State/props change
2. Render: Create new virtual DOM snapshot
3. Reconcile: Compare with previous snapshot
4. Commit: Apply DOM updates if needed
5. Paint: Browser updates screen pixels`;

  return (
    <div className="flex flex-col gap-3">
      <h1 className="scroll-m-20 text-4xl font-extrabold tracking-tight lg:text-5xl mb-[20px]">
        Rendering vs Painting
      </h1>

      <div className="p-4 bg-blue-100 rounded-lg">
        <h2 className="text-2xl font-bold mb-3">Key Difference</h2>
        <p>
          <strong>Rendering</strong> is React's process of determining what needs to change.<br/>
          <strong>Painting</strong> is the browser's process of updating screen pixels.
        </p>
      </div>

      <h2 className="text-2xl font-bold">Example Component</h2>
      <div className="mb-[20px]">
        <CodeHighlighter code={ageLimitExample} lang="javascript" theme="vitesse-dark" />
      </div>

      <h2 className="text-2xl font-bold">React's Rendering Process</h2>
      <div className="mb-[20px]">
        <CodeHighlighter code={snapshotExample} lang="javascript" theme="vitesse-dark" />
        <p className="mt-2">
          React compares these snapshots during <strong>reconciliation</strong>
        </p>
      </div>

      <div className="grid md:grid-cols-2 gap-4 mb-4">
        <div className="p-4 border rounded">
          <h3 className="text-xl font-bold mb-2">React Render Phase</h3>
          <ul className="list-disc pl-6">
            <li>Virtual DOM comparison</li>
            <li>JSX → React Elements</li>
            <li>Pure computation</li>
            <li>No DOM manipulation</li>
          </ul>
        </div>
        
        <div className="p-4 border rounded">
          <h3 className="text-xl font-bold mb-2">Browser Paint Phase</h3>
          <ul className="list-disc pl-6">
            <li>Actual pixel changes</li>
            <li>Layout recalculations</li>
            <li>Style computations</li>
            <li>GPU intensive</li>
          </ul>
        </div>
      </div>

      <h2 className="text-2xl font-bold">Process Flow</h2>
      <div className="mb-[20px]">
        <CodeHighlighter code={processSteps} lang="markdown" theme="vitesse-dark" />
      </div>

      <div className="p-4 bg-green-100 rounded-lg">
        <h3 className="text-xl font-bold mb-2">Why It Matters</h3>
        <div className="flex gap-4">
          <div className="flex-1">
            🚀 <strong>Efficiency:</strong><br/>
            React minimizes DOM operations → Fewer repaints
          </div>
          <div className="flex-1">
            ⚡ <strong>Performance:</strong><br/>
            Virtual DOM diffing faster than direct DOM manipulation
          </div>
        </div>
      </div>

      <div className="p-4 bg-yellow-100 rounded-lg mt-4">
        <h3 className="text-xl font-bold mb-2">Remember</h3>
        <p>
          🔄 Not all re-renders cause repaints<br/>
          💡 Multiple renders can batch into single paint<br/>
          🎯 React targets only changed DOM elements
        </p>
      </div>

      <div className="p-4 bg-purple-100 rounded-lg mt-4">
        <h3 className="text-xl font-bold mb-2">Analogy</h3>
        <div className="flex items-center gap-4">
          <div className="text-4xl">🎨</div>
          <div>
            <p>
              Think of React as an artist making <strong>sketches</strong> (renders)<br/>
              and the browser as painting the final <strong>canvas</strong> (paint)
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}