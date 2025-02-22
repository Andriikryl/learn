"use client";
import CodeHighlighter from "@/components/CodeHighlighter";

export default function Hello() {
  const starter = `
  // 1. Import dependencies
  import React from 'react';
  import { createRoot } from 'react-dom/client';

  // 2. Create a React element
  const element = React.createElement(
  'p',
  { id: 'hello' },
  'Hello World!'
  );

  // 3. Render the application
  const container = document.querySelector('#root');
  const root = createRoot(container);
  root.render(element);

`;
  const importDespend = `
  import React from 'react';
  import { createRoot } from 'react-dom/client';
 `;
  const createReactEl = `
  const element = React.createElement(
  'p',
  { id: 'hello' },
  'Hello World!'
);
 `;
  const reactElement = `
 {
  type: "p",
  key: null,
  ref: null,
  props: {
    id: 'hello',
    children: 'Hello World!',
  },
  _owner: null,
  _store: { validated: false }
}
 `;
  const renderEl = `
  const container = document.querySelector('#root');
  const root = createRoot(container);
  root.render(element);

`;
  const root = `<div id="root"></div>`;
  const p = `<p id="hello">
  Hello World!
</p>`;
  return (
    <div>
      <h1 className="scroll-m-20 text-4xl font-extrabold tracking-tight lg:text-5xl mb-[20px]">
        Let's start with a “hello world” React application, using pure
        JavaScript:
      </h1>
      <div className="mb-[20px]">
        <CodeHighlighter
          code={starter}
          lang="javascript"
          theme="vitesse-dark"
        />
      </div>
      <h2 className="scroll-m-20 mb-[20px] border-b pb-2 text-3xl font-semibold tracking-tight first:mt-0">
        1. Import dependencies
      </h2>
      <div className="mb-[20px]">
        <CodeHighlighter
          code={importDespend}
          lang="javascript"
          theme="vitesse-dark"
        />
      </div>
      <p className="leading-7 [&:not(:first-child)]:mt-6 mb-[20px]">
        At the very top of the file, we have two import statements, using the
        native JavaScript module system. We're importing the core React library
        from the react dependency, as well as a createRoot function from
        react-dom. If you're wondering why there are two separate packages, this
        is because React itself is “platform agnostic”. We have the core react
        package, and then there are different platform-specific renderers:
        react-dom for the web react-native for mobile (iOS / Android) or desktop
        (Windows / macOS) applications react-three-fiber for 3D scenes using
        WebGL and Three.js
      </p>
      <p className="leading-7 [&:not(:first-child)]:mt-6 mb-[20px]">
        Every platform has its own “primitives”, the set of built-in elements we
        use to create our UI. On the web, the primitives are HTML elements like
        div and p and button. By contrast, React Native doesn't have divs, it
        has Text and View and Pressable. And things get even more wild with
        react-three-fiber, where the primitives are things like lights,
        geometries, materials, and cameras. All of these platforms will use the
        same core React framework, which comes from the react package. But when
        it comes to actually turning all of the business logic into a user
        interface, we need the correct bindings for our platform. This is
        actually a terrific thing, because it means that the skills you build
        learning React can also be used to build mobile applications or 3D
        interfaces, if that's where your interests or your career takes you!
      </p>
      <h3 className="scroll-m-20 text-2xl font-semibold tracking-tight mb-[20px]">
        What is the DOM?
      </h3>
      <p className="leading-7 [&:not(:first-child)]:mt-6 mb-[20px]">
        The Document Object Model (DOM) is a programming interface for web
        documents. It represents the page so that programs can change the
        document structure, style, and content. The DOM represents the document
        as nodes and objects; that way, programming languages can interact with
        the page. A web page is a document that can be either displayed in the
        browser window or as the HTML source. In both cases, it is the same
        document but the Document Object Model (DOM) representation allows it to
        be manipulated. As an object-oriented representation of the web page, it
        can be modified with a scripting language such as JavaScript.
      </p>
      <h3 className="scroll-m-20 text-2xl font-semibold tracking-tight mb-[20px]">
        2. Create a React element
      </h3>
      <div className="mb-[20px]">
        <CodeHighlighter
          code={createReactEl}
          lang="javascript"
          theme="vitesse-dark"
        />
      </div>
      <p className="leading-7 [&:not(:first-child)]:mt-6 mb-[20px]">
        React.createElement is a function that accepts 3 or more arguments:
      </p>
      <ol className="leading-7 [&:not(:first-child)]:mt-6 mb-[20px]">
        <li>The type of the element to create.</li>
        <li>The properties we want this element to have.</li>
        <li>
          The element's contents, what the element should have as children.
        </li>
      </ol>
      <p>
        This function returns a “React element”. React elements are plain old
        JavaScript objects. If we inspect it with console.log(element), we'll
        see something like this:
      </p>
      <div className="mb-[20px]">
        <CodeHighlighter
          code={reactElement}
          lang="javascript"
          theme="vitesse-dark"
        />
      </div>
      <p>
        This JavaScript object is a description of a hypothetical paragraph tag,
        with an ID of hello, containing the text "Hello World!". This
        information will be used to construct the actual paragraph we can see
        in-browser. Later in this course, we'll learn about key and ref. The
        final two properties, _owner and _store, are meant to be used internally
        by React, and can be safely ignored by us. *
      </p>
      <h3 className="scroll-m-20 text-2xl font-semibold tracking-tight mb-[20px]">
        3. Render the application
      </h3>
      <div className="mb-[20px]">
        <CodeHighlighter
          code={renderEl}
          lang="javascript"
          theme="vitesse-dark"
        />
      </div>
      <p>
        document.querySelector is a helpful function that lets us capture a
        reference to a pre-existing DOM element. It's the modern version of
        document.getElementById, if you're more familiar with that function. It
        works in this case because our index.html file includes the following
        element:
      </p>
      <div className="mb-[20px]">
        <CodeHighlighter code={root} lang="javascript" theme="vitesse-dark" />
      </div>
      <p>
        This element will be our application's container. When we render our
        React application, it will create and append new DOM element(s) to this
        container. With react-dom's createRoot function, we specify that this
        element should be the root of our application. And, finally, we render
        the application with root.render(element). You can think of the render
        function as a machine that converts React elements into DOM nodes. In
        this case, our React element describes a paragraph tag, with an ID, and
        some text inside. render will turn that description into the following
        DOM structure:
      </p>
      <div className="mb-[20px]">
        <CodeHighlighter code={p} lang="javascript" theme="vitesse-dark" />
      </div>
      <p>
        With that DOM element created, it then adds it to the page at the
        specified root. In essence, this code takes a JavaScript-based
        description of some HTML, and uses it to produce real-world DOM nodes.
        This probably seems like a very complicated way to create a paragraph!
        But, as we'll learn throughout this course, the real magic happens when
        things change.{" "}
      </p>
    </div>
  );
}
