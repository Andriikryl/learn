"use client";
import CodeHighlighter from "@/components/CodeHighlighter";

export default function Keys() {
  const dataArray = `
const data = [
  {
    id: 'sunita-abc123',
    name: 'Sunita Kumar',
    job: 'Electrical Engineer',
    email: 'sunita.kumar@acme.co',
  },
  // ✂️ Other contacts trimmed
];`;

  const correctMap = `
function App() {
  return (
    <ul>
      {data.map(contact => (
        <ContactCard
          key={contact.id}
          name={contact.name}
          job={contact.job}
          email={contact.email}
        />
      ))}
    </ul>
  );
}`;

  const keyNotPropExample = `
function ContactCard({ key, name, job, email }) {
  console.log(key); // undefined
  // ... rest of component
}`;

  const compiledJsx = `
const element = {
  type: ContactCard,
  key: 'sunita-abc123',
  props: {
    name: 'Sunita Kumar',
    job: 'Electrical Engineer',
    email: 'sunita.kumar@acme.co',
  }
}`;

  const incorrectKeyPlacement = `
// 🚫 Incorrect: Key on nested element
function NavigationLinks({ links }) {
  return (
    <ul>
      {links.map(item => (
        <li>
          <a key={item.id} href={item.href}>
            {item.text}
          </a>
        </li>
      ))}
    </ul>
  );
}`;

  const correctKeyPlacement = `
// ✅ Correct: Key on top-level element
function NavigationLinks({ links }) {
  return (
    <ul>
      {links.map(item => (
        <li key={item.id}>
          <a href={item.href}>
            {item.text}
          </a>
        </li>
      ))}
    </ul>
  );
}`;

  const fragmentExampleIncorrect = `
// 🚫 Missing key with short syntax
function Thing({ data }) {
  return data.map(item => (
    <>
      <p>{item.content}</p>
      <button>Cancel</button>
    </>
  ));
}`;

  const fragmentExampleCorrect = `
// ✅ Fixed with explicit Fragment
function Thing({ data }) {
  return data.map(item => (
    <React.Fragment key={item.id}>
      <p>{item.content}</p>
      <button>Cancel</button>
    </React.Fragment>
  ));
}`;

const problemCode = `
// 🚫 Problem: No keys warning
{stickers.map((sticker) => (
  <img src={sticker.src} />
))}`;

  const solutionCode = `
// ✅ Solution: Generated unique ID
const newSticker = {
  ...stickerData,
  id: crypto.randomUUID() // Generated once on creation
};

{stickers.map((sticker) => (
  <img key={sticker.id} src={sticker.src} />
))}`;

  const indexKeyExample = `
// 🚫 Dangerous: Array index as key
{stickers.map((sticker, index) => (
  <img key={index} src={sticker.src} />
))}`;

  const inviteeExample = `
// 🚫 Problem with index keys in editable lists
{invitees.map((name, index) => (
  <li key={index}>
    <input defaultValue={name} />
  </li>
))}`;

  const keyRules = `
// Key Requirements
1. Unique among siblings
2. Stable across re-renders
3. Predictable (not random per render)`;

  return (
    <div className="flex flex-col gap-3">
      <h1 className="scroll-m-20 text-4xl font-extrabold tracking-tight lg:text-5xl mb-[20px]">
        Keys
      </h1>

      <p>
        When rendering lists in React, you'll encounter a console warning if you forget to add keys:
      </p>
      <div className="mb-[20px]">
        <CodeHighlighter code={dataArray} lang="javascript" theme="vitesse-dark" />
      </div>

      <h2 className="text-2xl font-bold">Adding Keys</h2>
      <div className="mb-[20px]">
        <CodeHighlighter code={correctMap} lang="javascript" theme="vitesse-dark" />
      </div>

      <h2 className="text-2xl font-bold">Why Keys Are Necessary</h2>
      <p>
        Keys help React identify items during re-renders. They enable efficient updates
        by tracking element identity across changes to the data array.
      </p>

      <h2 className="text-2xl font-bold">Key Implementation Details</h2>
      <p>Keys aren't passed as props to components:</p>
      <div className="mb-[20px]">
        <CodeHighlighter code={keyNotPropExample} lang="javascript" theme="vitesse-dark" />
      </div>
      <p>Under the hood, React elements handle keys separately:</p>
      <div className="mb-[20px]">
        <CodeHighlighter code={compiledJsx} lang="javascript" theme="vitesse-dark" />
      </div>

      <h2 className="text-2xl font-bold">Key Placement Rules</h2>
      <p>Keys must be on the top-level element:</p>
      <div className="mb-[20px]">
        <CodeHighlighter code={incorrectKeyPlacement} lang="javascript" theme="vitesse-dark" />
        <CodeHighlighter code={correctKeyPlacement} lang="javascript" theme="vitesse-dark" />
      </div>

      <h2 className="text-2xl font-bold">Fragments with Keys</h2>
      <div className="mb-[20px]">
        <CodeHighlighter code={fragmentExampleIncorrect} lang="javascript" theme="vitesse-dark" />
        <CodeHighlighter code={fragmentExampleCorrect} lang="javascript" theme="vitesse-dark" />
      </div>

      <h2 className="text-2xl font-bold">Key Uniqueness</h2>
      <p>
        Keys only need to be unique within their immediate array context, not globally.
        This is valid:
      </p>
      <div className="mb-[20px]">
        <CodeHighlighter code={correctMap} lang="javascript" theme="vitesse-dark" />
      </div>
      <h1 className="scroll-m-20 text-4xl font-extrabold tracking-tight lg:text-5xl mb-[20px]">
        Dynamic Key Generation
      </h1>

      <div className="p-4 bg-red-100 rounded-lg">
        <h2 className="text-2xl font-bold mb-3">The Problem</h2>
        <CodeHighlighter code={problemCode} lang="javascript" theme="vitesse-dark" />
        <p className="mt-2">⚠️ React warning: Missing keys for array elements</p>
      </div>

      <div className="p-4 bg-green-100 rounded-lg">
        <h2 className="text-2xl font-bold mb-3">Proper Solution</h2>
        <CodeHighlighter code={solutionCode} lang="javascript" theme="vitesse-dark" />
        <ul className="list-disc pl-6 mt-2">
          <li>Generate unique ID when creating items</li>
          <li>Use crypto.randomUUID() or similar</li>
          <li>ID remains stable across re-renders</li>
        </ul>
      </div>

      <div className="p-4 bg-yellow-100 rounded-lg">
        <h2 className="text-2xl font-bold mb-3">Common Pitfalls</h2>
        
        <h3 className="text-xl font-semibold mt-4">1. Array Index Keys</h3>
        <CodeHighlighter code={indexKeyExample} lang="javascript" theme="vitesse-dark" />
        <div className="mt-2 grid md:grid-cols-2 gap-4">
          <div>
            <p className="font-semibold">Issues:</p>
            <ul className="list-disc pl-6">
              <li>Broken reordering</li>
              <li>Duplicate keys on deletion</li>
              <li>Performance problems</li>
            </ul>
          </div>
          <div className="bg-white p-2 rounded">
            <img src="/index-key-problem.png" alt="Index key visualization" />
          </div>
        </div>

        <h3 className="text-xl font-semibold mt-4">2. Editable List Example</h3>
        <CodeHighlighter code={inviteeExample} lang="javascript" theme="vitesse-dark" />
        <p className="mt-2">Deleting items causes input focus issues with index keys</p>
      </div>

      <div className="p-4 bg-blue-100 rounded-lg">
        <h2 className="text-2xl font-bold mb-3">Key Rules</h2>
        <CodeHighlighter code={keyRules} lang="javascript" theme="vitesse-dark" />
        <div className="mt-4 grid md:grid-cols-2 gap-4">
          <div className="p-2 bg-white rounded">
            <img src="/good-keys.png" alt="Proper key usage diagram" />
          </div>
          <div className="p-2 bg-white rounded">
            <img src="/bad-keys.png" alt="Improper key usage diagram" />
          </div>
        </div>
      </div>

      <div className="p-4 bg-purple-100 rounded-lg">
        <h2 className="text-2xl font-bold mb-3">When Index Keys Are Safe</h2>
        <ul className="list-disc pl-6">
          <li>Static lists (no additions/removals)</li>
          <li>No user interaction with elements</li>
          <li>No sorting/filtering functionality</li>
          <li className="text-red-600">Use with extreme caution!</li>
        </ul>
      </div>

      <div className="p-4 bg-green-100 rounded-lg">
        <h2 className="text-2xl font-bold mb-3">Best Practices</h2>
        <ul className="list-disc pl-6">
          <li>Always generate unique IDs for dynamic lists</li>
          <li>Use UUID libraries for complex cases</li>
          <li>Store IDs with your data when possible</li>
          <li>Avoid index keys except for simple prototypes</li>
        </ul>
      </div>
    </div>
  );
}