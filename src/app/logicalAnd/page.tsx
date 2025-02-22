"use client";
import CodeHighlighter from "@/components/CodeHighlighter";

export default function LogicalAndConditional() {
  const correctApproach = `
function Friend({ name, isOnline }) {
  return (
    <li className="friend">
      {isOnline && <div className="green-dot" />}
      {name}
    </li>
  );
}`;

  const ifElseEquivalent = `
function Friend({ name, isOnline }) {
  let prefix;
  if (isOnline) {
    prefix = <div className="green-dot" />;
  } else {
    prefix = isOnline; // false
  }
  
  return (
    <li className="friend">
      {prefix}
      {name}
    </li>
  );
}`;

  const zeroGotcha = `
function App() {
  const shoppingList = [];
  const numOfItems = shoppingList.length;

  return (
    <div>
      {numOfItems && <ShoppingList items={shoppingList} />}
    </div>
  );
}`;

  const falsyValuesExample = `
function App() {
  return (
    <ul>
      <li>false: {false}</li>
      <li>undefined: {undefined}</li>
      <li>null: {null}</li>
      <li>Empty string: {''}</li>
      <li>Zero: {0}</li>
      <li>NaN: {NaN}</li>
    </ul>
  );
}`;

  const solutionCode = `
// Solution 1: Explicit boolean check
{numOfItems > 0 && <ShoppingList items={shoppingList} />}

// Solution 2: Double negation
{!!numOfItems && <ShoppingList items={shoppingList} />}`;

  return (
    <div className="flex flex-col gap-3">
      <h1 className="scroll-m-20 text-4xl font-extrabold tracking-tight lg:text-5xl mb-[20px]">
        Conditional Rendering with &&
      </h1>

      <p>
        The && operator allows embedding conditionals directly in JSX while 
        maintaining readability:
      </p>
      <div className="mb-[20px]">
        <CodeHighlighter code={correctApproach} lang="javascript" theme="vitesse-dark" />
      </div>

      <h2 className="text-2xl font-bold">How && Works</h2>
      <p>This compiles to equivalent if/else logic:</p>
      <div className="mb-[20px]">
        <CodeHighlighter code={ifElseEquivalent} lang="javascript" theme="vitesse-dark" />
      </div>

      <h2 className="text-2xl font-bold">Common Pitfall: Number Zero</h2>
      <p>This code renders 0 when list is empty:</p>
      <div className="mb-[20px]">
        <CodeHighlighter code={zeroGotcha} lang="javascript" theme="vitesse-dark" />
      </div>

      <h2 className="text-2xl font-bold">How React Handles Falsy Values</h2>
      <div className="mb-[20px]">
        <CodeHighlighter code={falsyValuesExample} lang="javascript" theme="vitesse-dark" />
      </div>

      <h2 className="text-2xl font-bold">Recommended Solutions</h2>
      <p>Ensure left-hand side is always boolean:</p>
      <div className="mb-[20px]">
        <CodeHighlighter code={solutionCode} lang="javascript" theme="vitesse-dark" />
      </div>

      <h2 className="text-2xl font-bold">Golden Rule</h2>
      <p className="p-4 bg-yellow-100 rounded-lg">
        Always use boolean values on the left side of && to avoid unexpected
        number rendering. Convert values using comparisons or double negation (!!).
      </p>
    </div>
  );
}