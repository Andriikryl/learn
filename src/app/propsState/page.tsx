"use client";
import CodeHighlighter from "@/components/CodeHighlighter";

export default function PropsVsState() {
  const propsExample = `
// Parent Component
function App() {
  return (
    <Button variant="primary" size="large">
      Click me
    </Button>
  );
}

// Child Component
function Button({ variant, size, children }) {
  return (
    <button className={\`btn-\${variant} \${size}\`}>
      {children}
    </button>
  );
}`;

  const stateExample = `
function Toggle() {
  const [isOn, setIsOn] = React.useState(false);

  return (
    <button onClick={() => setIsOn(!isOn)}>
      {isOn ? 'ON' : 'OFF'}
    </button>
  );
}`;

  const combinedExample = `
function ParentComponent() {
  const [count, setCount] = React.useState(0);

  return <ChildComponent count={count} />;
}

function ChildComponent({ count }) {
  return <div>Current count: {count}</div>;
}`;

  const propNamingTip = `
// 🚫 Ambiguous
<Button disabled={true} />

// ✅ Clear
<Button isEnabled={false} />`;

  return (
    <div className="flex flex-col gap-3">
      <h1 className="scroll-m-20 text-4xl font-extrabold tracking-tight lg:text-5xl mb-[20px]">
        Props vs State
      </h1>

      <div className="grid md:grid-cols-2 gap-4 mb-4">
        <div className="p-4 bg-blue-50 rounded-lg">
          <h2 className="text-2xl font-bold mb-3">Props</h2>
          <ul className="list-disc pl-6">
            <li>Inputs passed to components</li>
            <li>Immutable (read-only)</li>
            <li>Like function parameters</li>
            <li>Used for parent→child communication</li>
          </ul>
        </div>
        
        <div className="p-4 bg-green-50 rounded-lg">
          <h2 className="text-2xl font-bold mb-3">State</h2>
          <ul className="list-disc pl-6">
            <li>Internal component memory</li>
            <li>Mutable (via setter functions)</li>
            <li>Triggers re-renders when changed</li>
            <li>Component-specific data</li>
          </ul>
        </div>
      </div>

      <h2 className="text-2xl font-bold">Props Example</h2>
      <div className="mb-[20px]">
        <CodeHighlighter code={propsExample} lang="javascript" theme="vitesse-dark" />
        <p className="mt-2">Props flow down from parent to child components</p>
      </div>

      <h2 className="text-2xl font-bold">State Example</h2>
      <div className="mb-[20px]">
        <CodeHighlighter code={stateExample} lang="javascript" theme="vitesse-dark" />
        <p className="mt-2">State is managed internally within a component</p>
      </div>

      <h2 className="text-2xl font-bold">Combined Usage</h2>
      <div className="mb-[20px]">
        <CodeHighlighter code={combinedExample} lang="javascript" theme="vitesse-dark" />
        <p className="mt-2">State can be passed down as props to child components</p>
      </div>

      <div className="p-4 bg-yellow-100 rounded-lg">
        <h3 className="text-xl font-bold mb-2">Prop Naming Tips</h3>
        <CodeHighlighter code={propNamingTip} lang="javascript" theme="vitesse-dark" />
        <p className="mt-2">Avoid naming conflicts with HTML attributes</p>
      </div>

      <div className="p-4 bg-red-100 rounded-lg">
        <h3 className="text-xl font-bold mb-2">⚠️ UX Warning</h3>
        <p>
          Avoid disabled buttons - they provide poor user feedback.<br/>
          Instead, allow interaction and show validation messages.
        </p>
      </div>

      <div className="p-4 bg-purple-100 rounded-lg">
        <h3 className="text-xl font-bold mb-2">When to Use</h3>
        <div className="grid md:grid-cols-2 gap-4">
          <div>
            <p className="font-semibold">Use Props For:</p>
            <ul className="list-disc pl-6">
              <li>Component configuration</li>
              <li>Passing callback functions</li>
              <li>Parent→child communication</li>
            </ul>
          </div>
          <div>
            <p className="font-semibold">Use State For:</p>
            <ul className="list-disc pl-6">
              <li>User input tracking</li>
              <li>UI state management</li>
              <li>Component-specific data</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}