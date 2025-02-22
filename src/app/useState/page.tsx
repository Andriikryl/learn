"use client";
import CodeHighlighter from "@/components/CodeHighlighter";
import { Button } from "@/components/ui/button";
import React from "react";

export default function UseStateHook() {
    const [count, setCount] = React.useState(0);
  const counterExample = `
import React from 'react';

function Counter() {
  const [count, setCount] = React.useState(0);

  return (
    <button onClick={() => setCount(count + 1)}>
      Value: {count}
    </button>
  );
}`;

  const destructuringExample = `
// Without destructuring
const countArray = React.useState(0);
const count = countArray[0];
const setCount = countArray[1];`;

  const namingConventions = `
// Common naming patterns
const [user, setUser] = React.useState();
const [errorMessage, setErrorMessage] = React.useState();
const [isLoading, setIsLoading] = React.useState(false);`;

  const importStyles = `
// Option 1: Direct import
import { useState } from 'react';
const [count, setCount] = useState(0);

// Option 2: Namespaced import
import React from 'react';
const [count, setCount] = React.useState(0);`;

  const initialStateExamples = `
// Simple value
const [count, setCount] = React.useState(1);

// Function initializer
const [count, setCount] = React.useState(() => {
  return Number(window.localStorage.getItem('saved-count')) || 0;
});`;

  const initializationComparison = `
// Form 1: Value - runs on every render
const [count, setCount] = React.useState(
  window.localStorage.getItem('saved-count') // Called every render
);

// Form 2: Function - runs only once
const [count, setCount] = React.useState(() => {
  return window.localStorage.getItem('saved-count'); // Called once
});`;

  return (
    <div className="flex flex-col gap-3">
      <h1 className="scroll-m-20 text-4xl font-extrabold tracking-tight lg:text-5xl mb-[20px]">
        The useState Hook
      </h1>

      <h2 className="text-2xl font-bold">Basic Usage</h2>
      <p>Simple counter example:</p>
      <div className="mb-[20px]">
        <CodeHighlighter
          code={counterExample}
          lang="javascript"
          theme="vitesse-dark"
        />
      </div>
      <Button className="max-w-[200px]" onClick={() => setCount(count + 1)}>
      Value: {count}
    </Button>
      <h2 className="text-2xl font-bold">Destructuring Assignment</h2>
      <div className="mb-[20px]">
        <CodeHighlighter
          code={destructuringExample}
          lang="javascript"
          theme="vitesse-dark"
        />
      </div>

      <h2 className="text-2xl font-bold">Naming Conventions</h2>
      <div className="mb-[20px]">
        <CodeHighlighter
          code={namingConventions}
          lang="javascript"
          theme="vitesse-dark"
        />
      </div>

      <h2 className="text-2xl font-bold">Import Styles</h2>
      <div className="mb-[20px]">
        <CodeHighlighter
          code={importStyles}
          lang="javascript"
          theme="vitesse-dark"
        />
        <p className="mt-2">Both approaches are functionally equivalent</p>
      </div>

      <h2 className="text-2xl font-bold">Initial State</h2>
      <div className="mb-[20px]">
        <CodeHighlighter
          code={initialStateExamples}
          lang="javascript"
          theme="vitesse-dark"
        />
      </div>

      <div className="p-4 bg-yellow-100 rounded-lg">
        <h3 className="text-xl font-bold mb-2">Performance Tip</h3>
        <CodeHighlighter
          code={initializationComparison}
          lang="javascript"
          theme="vitesse-dark"
        />
        <p className="mt-2">
          Use function initializers for expensive operations that should only
          run once
        </p>
      </div>

      <div className="p-4 bg-blue-100 rounded-lg mt-4">
        <h3 className="text-xl font-bold mb-2">Key Points</h3>
        <ul className="list-disc pl-6">
          <li>useState returns a state value and its setter function</li>
          <li>State is preserved between re-renders</li>
          <li>Always use the setter function to update state</li>
          <li>Multiple state variables can be declared</li>
        </ul>
      </div>

      <div className="p-4 bg-green-100 rounded-lg mt-4">
        <h3 className="text-xl font-bold mb-2">When to Use State</h3>
        <ul className="list-disc pl-6">
          <li>User input (forms, buttons)</li>
          <li>Dynamic UI elements (toggles, modals)</li>
          <li>Data that changes over time</li>
          <li>Any values that affect component rendering</li>
        </ul>
      </div>
    </div>
  );
}
