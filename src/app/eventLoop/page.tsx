"use client";
import CodeHighlighter from "@/components/CodeHighlighter";

export default function EventLoopGuide() {
  const eventLoopExample = `
// Simplified Event Loop Pseudo-Code
while (true) {
  const task = getNextTask();
  if (task) {
    executeTask(task);
  }
  processMicrotasks();
  if (shouldRender()) {
    render();
  }
}`;

  const taskQueueExample = `
// Tasks in the Task Queue
- setTimeout(() => {}, 0);
- DOM Events (click, input, etc.)
- Network Requests (fetch)
- I/O Operations (file reading)
- Rendering Updates`;

  const microtaskQueueExample = `
// Microtasks in the Microtask Queue
- Promise.resolve().then(() => {});
- queueMicrotask(() => {});
- MutationObserver Callbacks`;

  const libuvExample = `
// libuv Event Loop (Node.js)
const uv = require('uv');
const loop = uv.defaultLoop();

uv.run(loop); // Starts the Event Loop`;

const eventLoopDefinition = `
// Event Loop Definitions
- Window Event Loop: For similar-origin window agents.
- Worker Event Loop: For dedicated, shared, or service worker agents.
- Worklet Event Loop: For worklet agents.`;

  const taskQueueDefinition = `
// Task Queue
- A set of tasks, not a queue.
- Tasks are selected based on runnable status, not FIFO order.
- Examples of tasks:
  - Event dispatching (e.g., click, input).
  - Parsing HTML.
  - Callbacks (e.g., setTimeout).
  - Resource fetching (e.g., fetch API).
  - DOM manipulation reactions.`;

  const microtaskQueueDefinition = `
// Microtask Queue
- A queue of microtasks.
- Microtasks are executed after the current task completes.
- Examples of microtasks:
  - Promise resolutions.
  - queueMicrotask callbacks.
  - MutationObserver callbacks.`;

  const taskStructDefinition = `
// Task Structure
interface Task {
  steps: Steps; // Work to be done.
  source: TaskSource; // Task source (e.g., user interaction).
  document: Document | null; // Associated document.
  scriptEvaluationEnv: Set<EnvironmentSettingsObjects>; // Script tracking.
}`;

  const queueTaskExample = `
// Queuing a Task
function queueTask(source, steps, eventLoop, document) {
  const task = {
    steps,
    source,
    document,
    scriptEvaluationEnv: new Set(),
  };
  const queue = getTaskQueueForSource(eventLoop, source);
  queue.add(task);
}`;

  const queueMicrotaskExample = `
// Queuing a Microtask
function queueMicrotask(steps, document) {
  const microtask = {
    steps,
    source: 'microtask',
    document,
    scriptEvaluationEnv: new Set(),
  };
  eventLoop.microtaskQueue.push(microtask);
}`;

  return (
    <>    
    <div className="flex flex-col gap-3">
      <h1 className="scroll-m-20 text-4xl font-extrabold tracking-tight lg:text-5xl mb-[20px]">
        Event Loop: Myths and Reality
      </h1>

      <section>
        <h2 className="text-2xl font-bold mb-4">Introduction</h2>
        <p className="mb-4">
          The Event Loop is a fundamental mechanism enabling asynchronous operations in JavaScript environments. Despite its importance, there are many myths and misconceptions surrounding it. This guide aims to clarify how the Event Loop truly works.
        </p>
      </section>

      <section>
        <h2 className="text-2xl font-bold mb-4">Does the Event Loop Exist in JavaScript?</h2>
        <div className="mb-[20px]">
          <p className="mb-4">
            The term <strong>Event Loop</strong> exists, but it is not part of the ECMA-262 specification. Instead, it is implemented by the <strong>host environment</strong> (e.g., browsers, Node.js). The Event Loop is not regulated by JavaScript itself but by the environment executing the code.
          </p>
        </div>
      </section>

      <section>
        <h2 className="text-2xl font-bold mb-4">Official Sources of Information</h2>
        <div className="grid grid-cols-2 gap-4 mb-[20px]">
          <div className="p-4 bg-blue-50 rounded-lg">
            <h3 className="font-bold mb-2">Browser-Based Environments</h3>
            <p>
              The Event Loop is governed by the <strong>HTML specification</strong> (Section 8.1.7). Browsers rely on the operating system's API (e.g., <code>NSRunLoop</code> on macOS, <code>glib</code> on Linux).
            </p>
          </div>
          <div className="p-4 bg-green-50 rounded-lg">
            <h3 className="font-bold mb-2">Non-Browser Environments</h3>
            <p>
              In environments like <strong>Node.js</strong>, the Event Loop is implemented using the <strong>libuv</strong> library. Other environments (e.g., Deno, Bun) also rely on libuv or similar mechanisms.
            </p>
          </div>
        </div>
      </section>

      <section>
        <h2 className="text-2xl font-bold mb-4">Task Queue vs. Microtask Queue</h2>
        <div className="grid grid-cols-2 gap-4 mb-[20px]">
          <div>
            <h3 className="font-bold mb-2">Task Queue (Macrotasks)</h3>
            <CodeHighlighter code={taskQueueExample} lang="javascript" theme="vitesse-dark" />
          </div>
          <div>
            <h3 className="font-bold mb-2">Microtask Queue</h3>
            <CodeHighlighter code={microtaskQueueExample} lang="javascript" theme="vitesse-dark" />
          </div>
        </div>
      </section>

      <section>
        <h2 className="text-2xl font-bold mb-4">Event Loop Algorithm</h2>
        <div className="mb-[20px]">
          <CodeHighlighter code={eventLoopExample} lang="javascript" theme="vitesse-dark" />
          <p className="text-sm text-gray-600 mt-2">
            Simplified pseudo-code of the Event Loop algorithm.
          </p>
        </div>
      </section>

      <section>
        <h2 className="text-2xl font-bold mb-4">Thread Safety</h2>
        <div className="p-4 bg-yellow-50 rounded-lg">
          <h3 className="font-bold mb-2">Is the Event Loop Thread-Safe?</h3>
          <p>
            In most cases, the Event Loop is <strong>single-threaded</strong>. However, in browsers, multiple <strong>window event loops</strong> can share a single thread, while <strong>worker event loops</strong> run in dedicated threads.
          </p>
        </div>
      </section>

      <section>
        <h2 className="text-2xl font-bold mb-4">libuv in Node.js</h2>
        <div className="mb-[20px]">
          <CodeHighlighter code={libuvExample} lang="javascript" theme="vitesse-dark" />
          <p className="text-sm text-gray-600 mt-2">
            Example of the libuv Event Loop in Node.js.
          </p>
        </div>
      </section>

      <section>
        <h2 className="text-2xl font-bold mb-4">Summary</h2>
        <div className="p-4 bg-purple-50 rounded-lg">
          <ul className="list-disc pl-6 space-y-2">
            <li>The Event Loop is not part of JavaScript but is implemented by the host environment.</li>
            <li>It consists of a <strong>task queue</strong> (macrotasks) and a <strong>microtask queue</strong>.</li>
            <li>Tasks include timers, I/O, and rendering, while microtasks include Promises and <code>queueMicrotask</code>.</li>
            <li>The Event Loop is typically single-threaded but can vary in browser and non-browser environments.</li>
          </ul>
        </div>
      </section>
    </div>
    <div className="flex flex-col gap-3">
      <h1 className="scroll-m-20 text-4xl font-extrabold tracking-tight lg:text-5xl mb-[20px]">
        Event Loops in the HTML Specification
      </h1>

      <section>
        <h2 className="text-2xl font-bold mb-4">8.1.7 Event Loops</h2>
        <p className="mb-4">
          Event loops coordinate events, user interaction, scripts, rendering, networking, and more. Each agent has an associated event loop, which is unique to that agent.
        </p>
      </section>

      <section>
        <h2 className="text-2xl font-bold mb-4">8.1.7.1 Definitions</h2>
        <div className="mb-[20px]">
          <CodeHighlighter code={eventLoopDefinition} lang="javascript" theme="vitesse-dark" />
          <p className="text-sm text-gray-600 mt-2">
            Event loops are categorized into <strong>window</strong>, <strong>worker</strong>, and <strong>worklet</strong> event loops.
          </p>
        </div>
      </section>

      <section>
        <h2 className="text-2xl font-bold mb-4">Task Queues</h2>
        <div className="mb-[20px]">
          <CodeHighlighter code={taskQueueDefinition} lang="javascript" theme="vitesse-dark" />
          <p className="text-sm text-gray-600 mt-2">
            Task queues are <strong>sets</strong>, not queues. Tasks are selected based on their runnable status.
          </p>
        </div>
      </section>

      <section>
        <h2 className="text-2xl font-bold mb-4">Microtask Queue</h2>
        <div className="mb-[20px]">
          <CodeHighlighter code={microtaskQueueDefinition} lang="javascript" theme="vitesse-dark" />
          <p className="text-sm text-gray-600 mt-2">
            Microtasks are executed immediately after the current task completes, before the next task or rendering.
          </p>
        </div>
      </section>

      <section>
        <h2 className="text-2xl font-bold mb-4">Task Structure</h2>
        <div className="mb-[20px]">
          <CodeHighlighter code={taskStructDefinition} lang="typescript" theme="vitesse-dark" />
          <p className="text-sm text-gray-600 mt-2">
            A task is a struct containing steps, a source, a document, and a script evaluation environment.
          </p>
        </div>
      </section>

      <section>
        <h2 className="text-2xl font-bold mb-4">Queuing Tasks</h2>
        <div className="grid grid-cols-2 gap-4 mb-[20px]">
          <div>
            <h3 className="font-bold mb-2">Task Queuing</h3>
            <CodeHighlighter code={queueTaskExample} lang="javascript" theme="vitesse-dark" />
          </div>
          <div>
            <h3 className="font-bold mb-2">Microtask Queuing</h3>
            <CodeHighlighter code={queueMicrotaskExample} lang="javascript" theme="vitesse-dark" />
          </div>
        </div>
      </section>

      <section>
        <h2 className="text-2xl font-bold mb-4">Implied Event Loop and Document</h2>
        <div className="p-4 bg-yellow-50 rounded-lg">
          <p>
            The <strong>implied event loop</strong> and <strong>implied document</strong> are context-dependent concepts used when queuing tasks. However, they are vaguely defined and should be avoided in favor of explicit parameters.
          </p>
        </div>
      </section>

      <section>
        <h2 className="text-2xl font-bold mb-4">Summary</h2>
        <div className="p-4 bg-purple-50 rounded-lg">
          <ul className="list-disc pl-6 space-y-2">
            <li>Event loops coordinate tasks and microtasks for agents (e.g., windows, workers).</li>
            <li>Task queues are sets of tasks, while microtask queues are strict queues.</li>
            <li>Tasks include events, parsing, callbacks, and DOM manipulation reactions.</li>
            <li>Microtasks include Promise resolutions and <code>queueMicrotask</code> callbacks.</li>
            <li>Always prefer explicit event loops and documents when queuing tasks.</li>
          </ul>
        </div>
      </section>
    </div>
    </>
  );
}