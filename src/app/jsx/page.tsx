import CodeHighlighter from "@/components/CodeHighlighter";

export default function Jsx() {
  const codeEx = `
  import React from 'react';
  import { createRoot } from 'react-dom/client';

  //// Old way:
  // const element = React.createElement(
  // 'p',
  // {
  // id: 'hello',
  // },
  // 'Hello World!'
  // );

  // New way:
  const element = (
  <p id="hello">
  Hello World!
  </p>
  );

  const container = document.querySelector('#root');
  const root = createRoot(container);
  root.render(element);

`;
  const JsxEl = `
  const element = React.createElement(
    "nav",
    { id: "main-nav" },
    React.createElement(
      "ul",
      null,
      React.createElement(
        "li",
        null,
        React.createElement(
          "a",
          { href: "/" },
          "Home"
        )
      ),
      React.createElement(
        "li",
        null,
        React.createElement(
          "a",
          { href: "/archives" },
          "Archives"
        )
      )
    )
  );
  `;
  const plainEl = `// In JSX:
const element = (
  <nav id="main-nav">
    <ul>
      <li>
        <a href="/">
          Home
        </a>
      </li>
      <li>
        <a href="/archives">
          Archives
        </a>
      </li>
    </ul>
  </nav>
);`;
  return (
    <div>
      <h1 className="scroll-m-20 text-4xl font-extrabold tracking-tight lg:text-5xl mb-[20px]">
        JSX
      </h1>
      <p>
        In the last lesson, we saw how to create a React element using plain,
        everyday JavaScript. In reality, very few developers create elements
        this way. It's much more common to use a specialized syntax called JSX.
        Here's that same example, but using JSX instead of JavaScript:
      </p>
      <div className="mb-[20px]">
        <CodeHighlighter code={codeEx} lang="javascript" theme="vitesse-dark" />
      </div>
      <p>
        Instead of writing React.createElement, we use an HTML-like syntax to
        create React elements. Why do we use JSX? It might not be obvious from
        this tiny example, but as our chunk of markup grows, it becomes
        increasingly clear that JSX is just easier to read. Remember how I
        mentioned that React elements can form a tree structure, just like HTML
        elements? This happens when we set the “children” parameter of a React
        element to another React element. In practice, we often wind up with
        pretty significant tree structures in our React code. Here's an example,
        using plain JavaScript:
      </p>
      <div className="mb-[20px]">
        <CodeHighlighter code={JsxEl} lang="javascript" theme="vitesse-dark" />
      </div>
      <p>Pretty hard to read, right? Here's that same example in JSX:</p>
      <div className="mb-[20px]">
        <CodeHighlighter
          code={plainEl}
          lang="javascript"
          theme="vitesse-dark"
        />
      </div>
      <h2 className="scroll-m-20 mb-[20px] border-b pb-2 text-3xl font-semibold tracking-tight first:mt-0">
        Compiling JSX into JavaScript
      </h2>
      <p>
        If we try to run this JSX code in the browser, we'll get an error.
        JavaScript engines don't understand JSX, they only understand
        JavaScript. And so we need to "compile" our code into plain JS. This is
        most commonly done as part of a build step, using a tool like Babel;
        we'll talk much more about this later in the course. Here's the
        important thing to understand for now: The JSX we write gets converted
        into React.createElement. By the time our code is running in the user's
        browser, all of the JSX has been zapped out, and we're left with a JS
        file full of nested React.createElement calls.
      </p>
    </div>
  );
}
