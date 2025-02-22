"use client";
import CodeHighlighter from "@/components/CodeHighlighter";

export default function RulesOfHooks() {
  const invalidExample = `
// 🚫 Violates Rules of Hooks
function TextInput({ id }) {
  if (!id) {
    const generatedId = React.useId(); // Hook inside condition
  }
  // ... rest of component
}`;

  const validExample = `
// ✅ Proper Hook Usage
function TextInput({ id }) {
  const generatedId = React.useId(); // Top-level call
  const appliedId = id || generatedId;
  // ... rest of component
}`;

  const stateOrderExample = `
function Component() {
  const [first] = React.useState('A');
  const [second] = React.useState('B');
  
  // React remembers order:
  // 1st useState → first
  // 2nd useState → second
}`;

  const brokenOrderExample = `
function BrokenComponent({ condition }) {
  if (condition) {
    const [first] = React.useState('A'); 
  }
  const [second] = React.useState('B'); // Order changes!
}`;
const mutableExample = `
// 🚫 Bad: Mutating state directly
const [user, setUser] = useState({ name: 'Ivy' });

function handleClick() {
  user.name = 'Ava'; // Mutation!
  setUser(user);     // Won't trigger re-render
}`;

  const immutableExample = `
// ✅ Good: Create new object
const [user, setUser] = useState({ name: 'Ivy' });

function handleClick() {
  setUser({ ...user, name: 'Ava' });
}`;

  const arrayExample = `
// Updating arrays immutably
const [items, setItems] = useState([1, 2, 3]);

// Adding item
setItems([...items, 4]);

// Removing item
setItems(items.filter(item => item !== 2));

// Updating item
setItems(items.map(item => 
  item === 2 ? 20 : item
));`;

  const memoryDiagram = `
// Initial state
Memory Address 0x123: { name: 'Ivy' }

// After mutation (BAD)
Same Address 0x123: { name: 'Ava' }

// After immutable update (GOOD)
New Address 0x456: { name: 'Ava' }`;
  return (
    <div className="flex flex-col gap-3">
      <h1 className="scroll-m-20 text-4xl font-extrabold tracking-tight lg:text-5xl mb-[20px]">
        Rules of Hooks
      </h1>

      <div className="p-4 bg-red-100 rounded-lg">
        <h2 className="text-2xl font-bold mb-3">Invalid Hook Call Warning</h2>
        <div className="mb-4">
          <CodeHighlighter 
            code={"React Hook 'React.useId' cannot be called at the top level"} 
            lang="javascript" 
            theme="vitesse-dark" 
          />
        </div>
        <p>Common causes of invalid hook calls:</p>
        <ul className="list-disc pl-6 mt-2">
          <li>Calling hooks outside components</li>
          <li>Conditional hook execution</li>
          <li>Changing hook order between renders</li>
        </ul>
      </div>

      <div className="p-4 bg-blue-100 rounded-lg">
        <h2 className="text-2xl font-bold mb-3">The Two Fundamental Rules</h2>
        <div className="grid md:grid-cols-2 gap-4">
          <div className="p-4 bg-white rounded">
            <h3 className="font-bold mb-2">1. Only Call Hooks at the Top Level</h3>
            <p>Never inside loops, conditions, or nested functions</p>
          </div>
          <div className="p-4 bg-white rounded">
            <h3 className="font-bold mb-2">2. Only Call Hooks from React Functions</h3>
            <p>Inside components or custom hooks</p>
          </div>
        </div>
      </div>

      <div className="p-4 bg-yellow-100 rounded-lg">
        <h2 className="text-2xl font-bold mb-3">Conditional Hook Problem</h2>
        <div className="grid md:grid-cols-2 gap-4">
          <div>
            <h3 className="text-xl font-semibold mb-2">Invalid Usage</h3>
            <CodeHighlighter code={invalidExample} lang="javascript" theme="vitesse-dark" />
          </div>
          <div>
            <h3 className="text-xl font-semibold mb-2">Valid Solution</h3>
            <CodeHighlighter code={validExample} lang="javascript" theme="vitesse-dark" />
          </div>
        </div>
      </div>

      <div className="p-4 bg-green-100 rounded-lg">
        <h2 className="text-2xl font-bold mb-3">Why Order Matters</h2>
        <div className="grid md:grid-cols-2 gap-4">
          <div>
            <h3 className="text-xl font-semibold mb-2">Proper Order</h3>
            <CodeHighlighter code={stateOrderExample} lang="javascript" theme="vitesse-dark" />
            <p className="mt-2">Consistent hook order between renders</p>
          </div>
          <div>
            <h3 className="text-xl font-semibold mb-2">Broken Order</h3>
            <CodeHighlighter code={brokenOrderExample} lang="javascript" theme="vitesse-dark" />
            <p className="mt-2 text-red-600">Hook order changes based on condition</p>
          </div>
        </div>
        <div className="mt-4 p-4 bg-white rounded">
          <h3 className="font-bold mb-2">How React Tracks Hooks</h3>
          <ul className="list-disc pl-6">
            <li>Uses call order to associate hooks with state</li>
            <li>Each hook call gets a "memory slot"</li>
            <li>Changing order corrupts the slots</li>
          </ul>
        </div>
      </div>

      <div className="p-4 bg-purple-100 rounded-lg">
        <h2 className="text-2xl font-bold mb-3">Best Practices</h2>
        <div className="grid md:grid-cols-2 gap-4">
          <div>
            <p className="font-semibold">✅ Do</p>
            <ul className="list-disc pl-6">
              <li>Call hooks unconditionally</li>
              <li>Keep hook order consistent</li>
              <li>Use ESLint plugin for enforcement</li>
            </ul>
          </div>
          <div>
            <p className="font-semibold">🚫 Don't</p>
            <ul className="list-disc pl-6">
              <li>Put hooks in conditionals/loops</li>
              <li>Call hooks from regular JS functions</li>
              <li>Change hook order dynamically</li>
            </ul>
          </div>
        </div>
      </div>

      <div className="p-4 bg-orange-100 rounded-lg">
        <h2 className="text-2xl font-bold mb-3">Real-World Example</h2>
        <div className="mb-4">
          <CodeHighlighter code={validExample} lang="javascript" theme="vitesse-dark" />
        </div>
        <p className="mt-2">Even if <code>id</code> is provided, we still call <code>useId</code> at top level</p>
      </div>
      <h1 className="scroll-m-20 text-4xl font-extrabold tracking-tight lg:text-5xl mb-[20px]">
        Immutability in React
      </h1>

      <div className="p-4 bg-red-100 rounded-lg">
        <h2 className="text-2xl font-bold mb-3">The Mutation Problem</h2>
        <div className="grid md:grid-cols-2 gap-4">
          <div>
            <CodeHighlighter code={mutableExample} lang="javascript" theme="vitesse-dark" />
          </div>
          <div className="p-4 bg-white rounded">
            <h3 className="text-lg font-bold mb-2">Why This Fails</h3>
            <ul className="list-disc pl-6">
              <li>Same object reference</li>
              <li>React uses reference equality</li>
              <li>No re-render triggered</li>
            </ul>
          </div>
        </div>
      </div>

      <div className="p-4 bg-green-100 rounded-lg">
        <h2 className="text-2xl font-bold mb-3">Immutable Solution</h2>
        <div className="grid md:grid-cols-2 gap-4">
          <div>
            <CodeHighlighter code={immutableExample} lang="javascript" theme="vitesse-dark" />
          </div>
          <div className="p-4 bg-white rounded">
            <h3 className="text-lg font-bold mb-2">How This Works</h3>
            <ul className="list-disc pl-6">
              <li>New object reference</li>
              <li>React detects change</li>
              <li>Triggers re-render</li>
            </ul>
          </div>
        </div>
      </div>

      <div className="p-4 bg-blue-100 rounded-lg">
        <h2 className="text-2xl font-bold mb-3">Memory Management</h2>
        <div className="grid md:grid-cols-2 gap-4">
          <div>
            <CodeHighlighter code={memoryDiagram} lang="javascript" theme="vitesse-dark" />
          </div>
          <div className="p-4 bg-white rounded">
            <h3 className="text-lg font-bold mb-2">Key Points</h3>
            <ul className="list-disc pl-6">
              <li>Objects stored by reference</li>
              <li>Garbage collects old versions</li>
              <li>New references = state changes</li>
            </ul>
          </div>
        </div>
      </div>

      <div className="p-4 bg-purple-100 rounded-lg">
        <h2 className="text-2xl font-bold mb-3">Working with Arrays</h2>
        <CodeHighlighter code={arrayExample} lang="javascript" theme="vitesse-dark" />
        <div className="mt-4 p-4 bg-white rounded">
          <h3 className="text-lg font-bold mb-2">Immutable Array Patterns</h3>
          <ul className="list-disc pl-6">
            <li>Spread operator (...) for adding</li>
            <li>filter() for removing</li>
            <li>map() for updating</li>
            <li>slice() for copying</li>
          </ul>
        </div>
      </div>

      <div className="p-4 bg-yellow-100 rounded-lg">
        <h2 className="text-2xl font-bold mb-3">Why Immutability Matters</h2>
        <div className="grid md:grid-cols-2 gap-4">
          <div className="p-4 bg-white rounded">
            <h3 className="text-lg font-bold mb-2">For React</h3>
            <ul className="list-disc pl-6">
              <li>State comparison by reference</li>
              <li>Optimized re-renders</li>
              <li>Predictable state management</li>
            </ul>
          </div>
          <div className="p-4 bg-white rounded">
            <h3 className="text-lg font-bold mb-2">For Developers</h3>
            <ul className="list-disc pl-6">
              <li>Easier debugging</li>
              <li>Time-travel debugging support</li>
              <li>Clear data flow</li>
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
              <li>Use spread operator for objects/arrays</li>
              <li>Create new references for changes</li>
              <li>Use immutability libraries for complex state</li>
            </ul>
          </div>
          <div>
            <h3 className="text-lg font-bold mb-2">🚫 Don't</h3>
            <ul className="list-disc pl-6">
              <li>Mutate nested properties directly</li>
              <li>Use array indices as keys</li>
              <li>Modify state outside of setState</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}