"use client";
import CodeHighlighter from "@/components/CodeHighlighter";

export default function RefsLesson() {
  const domAccessExample = `
// 🚫 Traditional DOM access
const canvas = document.querySelector('canvas');
canvas.getContext('2d');`;

  const callbackRefExample = `
// ✅ React callback ref
<canvas
  ref={(node) => {
    if (node) {
      const ctx = node.getContext('2d');
      // Draw operations
    }
  }}
/>`;

  const useRefExample = `
// ✅ useRef hook pattern
function Component() {
  const canvasRef = React.useRef(null);

  useEffect(() => {
    const ctx = canvasRef.current.getContext('2d');
    // Initial draw
  }, []);

  return <canvas ref={canvasRef} />;
}`;

  const canvasExample = `
function ArtGallery() {
  const canvasRef = React.useRef();

  return (
    <>
      <canvas ref={canvasRef} />
      <button onClick={() => draw(canvasRef.current)}>
        Draw!
      </button>
    </>
  );
}`;

  const refsVsState = `
// Refs vs State
const ref = useRef(0);  // Mutable, no re-render
const [state, setState] = useState(0); // Immutable, triggers re-render`;

  return (
    <div className="flex flex-col gap-3">
      <h1 className="scroll-m-20 text-4xl font-extrabold tracking-tight lg:text-5xl mb-[20px]">
        Working with Refs
      </h1>

      <div className="p-4 bg-red-100 rounded-lg">
        <h2 className="text-2xl font-bold mb-3">The DOM Access Problem</h2>
        <div className="grid md:grid-cols-2 gap-4">
          <div>
            <CodeHighlighter code={domAccessExample} lang="javascript" theme="vitesse-dark" />
            <p className="mt-2 text-red-600">Avoid direct DOM manipulation in React</p>
          </div>
          <div className="p-4 bg-white rounded">
            <h3 className="text-lg font-bold mb-2">Why This Fails</h3>
            <ul className="list-disc pl-6">
              <li>Bypasses React's virtual DOM</li>
              <li>Could conflict with React's management</li>
              <li>Unreliable element existence</li>
            </ul>
          </div>
        </div>
      </div>

      <div className="p-4 bg-green-100 rounded-lg">
        <h2 className="text-2xl font-bold mb-3">React Ref Solutions</h2>
        <div className="grid md:grid-cols-2 gap-4">
          <div>
            <h3 className="text-xl font-semibold mb-2">Callback Refs</h3>
            <CodeHighlighter code={callbackRefExample} lang="javascript" theme="vitesse-dark" />
            <p className="mt-2">Function that receives DOM node</p>
          </div>
          <div>
            <h3 className="text-xl font-semibold mb-2">useRef Hook</h3>
            <CodeHighlighter code={useRefExample} lang="javascript" theme="vitesse-dark" />
            <p className="mt-2">Persistent mutable container</p>
          </div>
        </div>
      </div>

      <div className="p-4 bg-blue-100 rounded-lg">
        <h2 className="text-2xl font-bold mb-3">Canvas Example</h2>
        <CodeHighlighter code={canvasExample} lang="javascript" theme="vitesse-dark" />
        <div className="mt-4 p-4 bg-white rounded">
          <h3 className="text-lg font-bold mb-2">Implementation Notes</h3>
          <ul className="list-disc pl-6">
            <li>Create ref with useRef</li>
            <li>Attach to canvas via ref prop</li>
            <li>Access current property when needed</li>
          </ul>
        </div>
      </div>

      <div className="p-4 bg-purple-100 rounded-lg">
        <h2 className="text-2xl font-bold mb-3">Refs vs State</h2>
        <CodeHighlighter code={refsVsState} lang="javascript" theme="vitesse-dark" />
        <div className="grid md:grid-cols-2 gap-4 mt-4">
          <div className="p-4 bg-white rounded">
            <h3 className="font-bold mb-2">When to Use Refs</h3>
            <ul className="list-disc pl-6">
              <li>DOM node references</li>
              <li>Imperative animations</li>
              <li>Third-party library integration</li>
              <li>Storing mutable values that don't affect UI</li>
            </ul>
          </div>
          <div className="p-4 bg-white rounded">
            <h3 className="font-bold mb-2">When to Use State</h3>
            <ul className="list-disc pl-6">
              <li>Data that affects rendering</li>
              <li>User input handling</li>
              <li>Component interactivity</li>
              <li>Data that needs reactivity</li>
            </ul>
          </div>
        </div>
      </div>

      <div className="p-4 bg-yellow-100 rounded-lg">
        <h2 className="text-2xl font-bold mb-3">Key Characteristics</h2>
        <div className="grid md:grid-cols-3 gap-4">
          <div className="p-4 bg-white rounded">
            <h3 className="font-bold mb-2">Mutable</h3>
            <p>Can modify .current property directly</p>
          </div>
          <div className="p-4 bg-white rounded">
            <h3 className="font-bold mb-2">Persistent</h3>
            <p>Value persists between renders</p>
          </div>
          <div className="p-4 bg-white rounded">
            <h3 className="font-bold mb-2">Non-reactive</h3>
            <p>Changes don't trigger re-renders</p>
          </div>
        </div>
      </div>

      <div className="p-4 bg-orange-100 rounded-lg">
        <h2 className="text-2xl font-bold mb-3">Best Practices</h2>
        <div className="grid md:grid-cols-2 gap-4">
          <div>
            <h3 className="text-lg font-bold mb-2">✅ Do</h3>
            <ul className="list-disc pl-6">
              <li>Use for DOM measurements/actions</li>
              <li>Store timeout/interval IDs</li>
              <li>Integrate with non-React libraries</li>
            </ul>
          </div>
          <div>
            <h3 className="text-lg font-bold mb-2">🚫 Don't</h3>
            <ul className="list-disc pl-6">
              <li>Use for declarative data flow</li>
              <li>Overuse - prefer state when possible</li>
              <li>Access during rendering</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}