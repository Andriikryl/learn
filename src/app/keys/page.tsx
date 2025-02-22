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
    </div>
  );
}