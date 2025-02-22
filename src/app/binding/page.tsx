"use client";
import CodeHighlighter from "@/components/CodeHighlighter";

export default function DataBinding() {
  const searchFormExample = `
function SearchForm() {
  const [searchTerm, setSearchTerm] = React.useState('cats');
  
  return (
    <>
      <form>
        <input
          type="text"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </form>
      <p>Search term: {searchTerm}</p>
    </>
  );
}`;

  const controlledInputExample = `
// Controlled Input
<input
  value={stateValue}
  onChange={(e) => setState(e.target.value)}
/>`;

  const uncontrolledInputExample = `
// Uncontrolled Input
<input
  defaultValue="initial"
  ref={inputRef}
/>`;

  const initialStateProblem = `
// 🚫 Problem: Undefined initial state
const [username, setUsername] = React.useState();

// ✅ Solution: Initialize with empty string
const [username, setUsername] = React.useState('');`;

  const formDataExample = `
function SignupForm() {
  function handleSubmit(event) {
    const formData = new FormData(event.target);
    const data = Object.fromEntries(formData);
    // Use data...
  }

  return (
    <form onSubmit={handleSubmit}>
      <input name="username" />
    </form>
  );
}`;

  return (
    <div className="flex flex-col gap-3">
      <h1 className="scroll-m-20 text-4xl font-extrabold tracking-tight lg:text-5xl mb-[20px]">
        Data Binding in React
      </h1>

      <div className="p-4 bg-blue-100 rounded-lg">
        <h2 className="text-2xl font-bold mb-3">Two-Way Data Binding</h2>
        <CodeHighlighter code={searchFormExample} lang="javascript" theme="vitesse-dark" />
        <ul className="list-disc pl-6 mt-2">
          <li><code>value</code> prop syncs state to input</li>
          <li><code>onChange</code> updates state from input</li>
          <li>Full synchronization between state and UI</li>
        </ul>
      </div>

      <div className="grid md:grid-cols-2 gap-4">
        <div className="p-4 border rounded">
          <h3 className="text-xl font-bold mb-2">Controlled Inputs</h3>
          <CodeHighlighter code={controlledInputExample} lang="javascript" theme="vitesse-dark" />
          <ul className="list-disc pl-6 mt-2">
            <li>React manages input value</li>
            <li>Required for real-time validation</li>
            <li>Necessary for derived UI updates</li>
          </ul>
        </div>
        
        <div className="p-4 border rounded">
          <h3 className="text-xl font-bold mb-2">Uncontrolled Inputs</h3>
          <CodeHighlighter code={uncontrolledInputExample} lang="javascript" theme="vitesse-dark" />
          <ul className="list-disc pl-6 mt-2">
            <li>DOM manages input value</li>
            <li>Use refs to access values</li>
            <li>Better for form-heavy pages</li>
          </ul>
        </div>
      </div>

      <div className="p-4 bg-yellow-100 rounded-lg">
        <h3 className="text-xl font-bold mb-2">Golden Rule</h3>
        <p className="font-semibold mb-2">
          Never switch between controlled/uncontrolled!
        </p>
        <CodeHighlighter code={initialStateProblem} lang="javascript" theme="vitesse-dark" />
        <p className="mt-2">Initial undefined state causes warnings</p>
      </div>

      <div className="p-4 bg-green-100 rounded-lg">
        <h3 className="text-xl font-bold mb-2">Alternative Approach</h3>
        <CodeHighlighter code={formDataExample} lang="javascript" theme="vitesse-dark" />
        <div className="mt-2 grid md:grid-cols-2 gap-4">
          <div>
            <p className="font-semibold">✅ Pros</p>
            <ul className="list-disc pl-6">
              <li>Less state management</li>
              <li>Better performance</li>
            </ul>
          </div>
          <div>
            <p className="font-semibold">🚫 Cons</p>
            <ul className="list-disc pl-6">
              <li>No real-time validation</li>
              <li>Limited UI interaction</li>
            </ul>
          </div>
        </div>
      </div>

      <div className="p-4 bg-purple-100 rounded-lg">
        <h3 className="text-xl font-bold mb-2">Synthetic Events</h3>
        <div className="grid md:grid-cols-2 gap-4">
          <div>
            <p className="font-semibold">React Event</p>
            <CodeHighlighter 
              code={`onChange={(e) => console.log(e.nativeEvent)}`} 
              lang="javascript" 
              theme="vitesse-dark" 
            />
          </div>
          <div>
            <p className="font-semibold">Native Event</p>
            <CodeHighlighter 
              code={`addEventListener('change', (e) => console.log(e))`} 
              lang="javascript" 
              theme="vitesse-dark" 
            />
          </div>
        </div>
        <p className="mt-2">React normalizes events across browsers</p>
      </div>
    </div>
  );
}