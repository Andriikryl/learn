"use client";
import CodeHighlighter from "@/components/CodeHighlighter";

export default function Hydration() {
  return (
    <div className="flex flex-col gap-6 p-6">
      {/* Header */}
      <header>
        <h1 className="scroll-m-20 text-4xl font-extrabold tracking-tight lg:text-5xl">
          Hydration
        </h1>
        <p className="text-sm text-gray-600">
          Transforming static HTML into an interactive application
        </p>
      </header>

      {/* Introduction */}
      <section>
        <p>
          When we use server-side rendering (SSR), the browser receives a fully-formed page
          with all the necessary HTML and CSS. However, a huge component of React applications
          is interactivity – state, effects, and event handlers. The process of turning the
          initial static HTML into a dynamic, interactive application is called <strong>hydration</strong>.
        </p>
        <p>
          As Dan Abramov puts it: <em>"Hydration is like watering the ‘dry’ HTML with the ‘water’ of interactivity and event handlers."</em>
        </p>
      </section>

      {/* High-Level Process */}
      <section>
        <h2 className="text-2xl font-bold mb-4">High-Level Hydration Process</h2>
        <p>
          Hydration involves two main steps:
        </p>
        <ol className="list-decimal pl-6 space-y-2">
          <li>
            A “speed render” that quickly determines the structure of our component tree and initializes our component instances.
          </li>
          <li>
            Wiring up interactivity by attaching event listeners, refs, etc.
          </li>
        </ol>
        <p>
          Unlike client-side rendering—where the initial render creates all DOM nodes—the DOM already
          exists with SSR. React must “adopt” the existing DOM instead of creating it from scratch.
        </p>
      </section>

      {/* Visualizing Hydration */}
      <section>
        <h2 className="text-2xl font-bold mb-4">Visualizing Hydration</h2>
        <p>
          Imagine the server sends over static HTML (represented by grey boxes). Hydration is the process
          where React quickly constructs the component tree and matches it to these static nodes, wiring up all
          necessary interactivity.
        </p>
        <p>
          (Picture a diagram with static boxes transforming into interactive components.)
        </p>
      </section>

      {/* Updated SSR Timeline */}
      <section>
        <h2 className="text-2xl font-bold mb-4">Updated SSR Flow with Hydration</h2>
        <p>
          Here’s an abstract timeline that shows the sequence of events when using SSR with hydration:
        </p>
        <ul className="list-disc pl-6 space-y-2">
          <li>
            <strong>Render application (server):</strong> 8 units of time
          </li>
          <li>
            <strong>Request to server:</strong> 3 units of time
          </li>
          <li>
            <strong>Download JavaScript (client):</strong> 12 units of time
          </li>
          <li>
            <strong>Hydrate (client):</strong> 4 units of time
          </li>
        </ul>
        <p>
          Note that the "Download JavaScript" step is split into downloading the bundle and then hydrating
          the application.
        </p>
      </section>

      {/* Hydration in Code */}
      <section>
        <h2 className="text-2xl font-bold mb-4">Hydration in Code</h2>
        <p>
          To “adopt” an existing DOM rather than creating new nodes, we use{" "}
          <code>hydrateRoot</code> instead of <code>createRoot</code>. For example, modify your
          <code>index.js</code> as follows:
        </p>
        <CodeHighlighter
          code={`import React from 'react';
import { hydrateRoot } from 'react-dom/client';

function App() {
  return <h1>Hello world!</h1>;
}

hydrateRoot(document.querySelector('#root'), <App />);`}
          lang="javascript"
          theme="vitesse-dark"
        />
        <p>
          In production, frameworks like Next.js handle this process internally, but it's important to
          understand how hydration works conceptually.
        </p>
      </section>

      {/* Gotchas and Next Steps */}
      <section>
        <h2 className="text-2xl font-bold mb-4">Gotchas & Next Steps</h2>
        <p>
          Hydration and SSR come with some challenges that we'll explore later in this module.
          For now, remember that hydration is the process of “waking up” static HTML by wiring it
          with interactivity.
        </p>
        <p>
          Next up: SSR Flavors, where we'll dive deeper into different approaches to server-side rendering.
        </p>
      </section>

      {/* Footer */}
      <footer>
        <p className="text-sm text-gray-600">
          Submit Feedback • Next up: SSR Flavors
        </p>
      </footer>
    </div>
  );
}
