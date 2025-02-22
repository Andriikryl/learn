"use client";
import CodeHighlighter from "@/components/CodeHighlighter";

export default function ConditionalIfStatements() {
  const incorrectIf = `
function Friend({ name, isOnline }) {
  return (
    <li className="friend">
      {if (isOnline) {
        <div className="green-dot" />
      }}
      {name}
    </li>
  );
}`;

  const compiledErrorExample = `
function Friend({ name, isOnline }) {
  return React.createElement(
    'li',
    { className: 'friend' },
    if (isOnline) {  // 🚫 Syntax error!
      React.createElement('div', { className: 'green-dot' });
    },
    name
  );
}`;

  const correctApproach = `
function Friend({ name, isOnline }) {
  let prefix;
  
  if (isOnline) {
    prefix = <div className="green-dot" />;
  }

  return (
    <li className="friend">
      {prefix}
      {name}
    </li>
  );
}`;

  const compiledCorrect = `
function Friend({ name, isOnline }) {
  let prefix;

  if (isOnline) {
    prefix = React.createElement(
      'div', 
      { className: 'green-dot' }
    );
  }

  return React.createElement(
    'li',
    { className: 'friend' },
    prefix,
    name
  );
}`;

  const undefinedAttributeExample = `
function Greeting() {
  let someClass;  // undefined
  
  return (
    <div className={someClass}>
      Hello World
    </div>
  );
}`;

  return (
    <div className="flex flex-col gap-3">
      <h1 className="scroll-m-20 text-4xl font-extrabold tracking-tight lg:text-5xl mb-[20px]">
        Conditional Rendering with If Statements
      </h1>

      <p>
        JSX only accepts expressions within curly braces, which means we can't directly 
        use if statements inside our JSX markup:
      </p>

      <div className="mb-[20px]">
        <CodeHighlighter code={incorrectIf} lang="javascript" theme="vitesse-dark" />
      </div>

      <h2 className="text-2xl font-bold">The Compilation Problem</h2>
      <p>This JSX would compile to invalid JavaScript:</p>
      <div className="mb-[20px]">
        <CodeHighlighter code={compiledErrorExample} lang="javascript" theme="vitesse-dark" />
      </div>

      <h2 className="text-2xl font-bold">Correct Approach</h2>
      <p>Move conditional logic outside the return statement:</p>
      <div className="mb-[20px]">
        <CodeHighlighter code={correctApproach} lang="javascript" theme="vitesse-dark" />
      </div>

      <p>Which compiles to valid JavaScript:</p>
      <div className="mb-[20px]">
        <CodeHighlighter code={compiledCorrect} lang="javascript" theme="vitesse-dark" />
      </div>

      <h2 className="text-2xl font-bold">Handling Undefined Values</h2>
      <p>React automatically omits undefined attributes:</p>
      <div className="mb-[20px]">
        <CodeHighlighter code={undefinedAttributeExample} lang="javascript" theme="vitesse-dark" />
      </div>
      <p>This produces clean HTML without empty attributes:</p>
      <div className="mb-[20px]">
        <CodeHighlighter code="<div>Hello World</div>" lang="html" theme="vitesse-dark" />
      </div>
    </div>
  );
}