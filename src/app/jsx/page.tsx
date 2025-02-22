"use client";
import CodeHighlighter from "@/components/CodeHighlighter";

export default function JSXDeepDive() {
  const multiLineJSX = `
// Correct multi-line JSX with parentheses
export default function WhatIsJSX() {
  return (
    <main>
      <h1>This is JSX</h1>
      <h2>JSX <i>looks</i> like HTML</h2>
      <h4>(but it's not)</h4>
      <p>
        JSX is inspired by HTML and allows you to
        write HTML-ish looking syntax inside your
        React Components.
      </p>
    </main>
  )
}`;

  const fragmentExample = `
// Using React.Fragment
import * as React from "react"

export default function Authors() {
  return (
    <React.Fragment>
      <h2>Authors</h2>
      <ul>
        <li>Tyler McGinnis</li>
        <li>Ben Adam</li>
        <li>Alex Brown</li>
      </ul>
    </React.Fragment>
  )
}`;

  const selfClosingTags = `
// Proper self-closing tags in JSX
function Form() {
  return (
    <form method="get" action="/search">
      <img src="search.png" alt="search icon" />
      <br />
      <label>
        Search
        <input name="term" type="text" />
      </label>
      <button type="submit">Search</button>
    </form>
  )
}`;

  const classNameExample = `
// Using className instead of class
function Avatar() {
  return (
    <img
      src="avatar.png"
      alt="Avatar"
      className="avatar"
    />
  )
}`;

  const expressionsInJSX = `
// Using expressions in JSX
function Welcome() {
  const name = 'Tyler'
  return (
    <div>
      <h1>Hello, {name}</h1>
      <p>Today is {new Date().toLocaleDateString()}</p>
      <p>What is 2 + 2? {2 + 2}</p>
    </div>
  )
}`;

  const conditionalRendering = `
// Conditional rendering with ternary
function Dashboard() {
  return (
    <React.Fragment>
      <Logo />
      {isAuthed() === true
        ? <h1>Welcome back!</h1>
        : <h1>Login to see your dashboard</h1>}
    </React.Fragment>
  )
}`;

  const listRendering = `
// Rendering lists with .map()
import tweets from "./tweets"

export default function Tweets() {
  return (
    <ul id="tweets">
      {tweets.map((tweet) => (
        <li key={tweet.id}>{tweet.text}</li>
      ))}
    </ul>
  )
}`;

  const jsxCompilation = `
// JSX compilation example
function Hello() {
  return <h1>Hello World</h1>
}

// Compiled to:
import { jsx as _jsx } from "react/jsx-runtime"

function Hello() {
  return _jsx("h1", {
    children: "Hello World"
  })
}`;

  return (
    <div className="flex flex-col gap-3">
      <h1 className="scroll-m-20 text-4xl font-extrabold tracking-tight lg:text-5xl mb-[20px]">
        JSX in React
      </h1>

      <section>
        <h2 className="text-2xl font-bold mb-4">Multi-line JSX</h2>
        <div className="mb-[20px]">
          <CodeHighlighter code={multiLineJSX} lang="javascript" theme="vitesse-dark" />
          <div className="p-4 bg-red-50 rounded-lg mt-4">
            <h3 className="font-bold mb-2">🚨 Automatic Semicolon Insertion</h3>
            <p>Without parentheses, JavaScript inserts semicolon after return:</p>
            <CodeHighlighter 
              code={`return;\n  <main>...</main>`} 
              lang="javascript" 
              theme="vitesse-dark" 
            />
          </div>
        </div>
      </section>

      <section>
        <h2 className="text-2xl font-bold mb-4">Fragments</h2>
        <div className="grid grid-cols-2 gap-4 mb-[20px]">
          <div>
            <CodeHighlighter code={fragmentExample} lang="javascript" theme="vitesse-dark" />
          </div>
          <div className="p-4 bg-blue-50 rounded-lg">
            <h3 className="font-bold mb-2">Shorthand Syntax</h3>
            <CodeHighlighter 
              code={`<>\n  <h2>Authors</h2>\n  <ul>...</ul>\n</>`} 
              lang="javascript" 
              theme="vitesse-dark" 
            />
            <p className="text-sm mt-2">Using empty tags (<>...</>) as fragment shorthand</p>
          </div>
        </div>
      </section>

      <section>
        <h2 className="text-2xl font-bold mb-4">JSX Gotchas</h2>
        <div className="grid grid-cols-2 gap-4 mb-[20px]">
          <div>
            <h3 className="font-bold mb-2">Self-closing Tags</h3>
            <CodeHighlighter code={selfClosingTags} lang="javascript" theme="vitesse-dark" />
          </div>
          <div>
            <h3 className="font-bold mb-2">Attribute Names</h3>
            <CodeHighlighter code={classNameExample} lang="javascript" theme="vitesse-dark" />
            <div className="p-4 bg-yellow-50 rounded-lg mt-4">
              <p>Hyphenated attributes become camelCase:</p>
              <CodeHighlighter 
                code={`stroke-width → strokeWidth`} 
                lang="javascript" 
                theme="vitesse-dark" 
              />
            </div>
          </div>
        </div>
      </section>

      <section>
        <h2 className="text-2xl font-bold mb-4">Dynamic Content</h2>
        <div className="grid grid-cols-2 gap-4 mb-[20px]">
          <div>
            <h3 className="font-bold mb-2">Expressions</h3>
            <CodeHighlighter code={expressionsInJSX} lang="javascript" theme="vitesse-dark" />
          </div>
          <div>
            <h3 className="font-bold mb-2">Conditional Rendering</h3>
            <CodeHighlighter code={conditionalRendering} lang="javascript" theme="vitesse-dark" />
            <div className="p-4 bg-green-50 rounded-lg mt-4">
              <p>Logical && operator for conditional display:</p>
              <CodeHighlighter 
                code={`{showWarning && <Warning />}`} 
                lang="javascript" 
                theme="vitesse-dark" 
              />
            </div>
          </div>
        </div>
      </section>

      <section>
        <h2 className="text-2xl font-bold mb-4">List Rendering</h2>
        <div className="mb-[20px]">
          <CodeHighlighter code={listRendering} lang="javascript" theme="vitesse-dark" />
          <div className="p-4 bg-purple-50 rounded-lg mt-4">
            <h3 className="font-bold mb-2">Key Prop Importance</h3>
            <ul className="list-disc pl-6">
              <li>Helps React identify items during updates</li>
              <li>Must be unique among siblings</li>
              <li>Use stable IDs from data when possible</li>
            </ul>
          </div>
        </div>
      </section>

      <section>
        <h2 className="text-2xl font-bold mb-4">JSX Under the Hood</h2>
        <div className="mb-[20px]">
          <CodeHighlighter code={jsxCompilation} lang="javascript" theme="vitesse-dark" />
          <div className="p-4 bg-gray-100 rounded-lg mt-4">
            <p>JSX gets compiled to regular JavaScript function calls during build process</p>
          </div>
        </div>
      </section>
    </div>
  );
}