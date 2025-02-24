"use client";
import React, { useState } from "react";
import { Node, Edge } from "@xyflow/react";
import "@xyflow/react/dist/style.css";
import { Diagram } from "@/components/Diagram";
import CodeHighlighter from "@/components/CodeHighlighter";

export default function FunctionCompositionGuide() {
  const [nodes1, setNodes1] = useState<Node[]>([
    {
      id: "input1",
      position: { x: 100, y: 50 },
      data: { label: "Input (x)" },
      style: { backgroundColor: "#3B82F6", color: "white" },
    },
    {
      id: "funcB1",
      position: { x: 300, y: 50 },
      data: { label: "funcB" },
      style: { backgroundColor: "#10B981", color: "white" },
    },
    {
      id: "funcA1",
      position: { x: 500, y: 50 },
      data: { label: "funcA" },
      style: { backgroundColor: "#EF4444", color: "white" },
    },
    {
      id: "output1",
      position: { x: 700, y: 50 },
      data: { label: "Output (funcA(funcB(x)))" },
      style: { backgroundColor: "#3B82F6", color: "white" },
    },
  ]);
  const [edges1, setEdges1] = useState<Edge[]>([
    {
      id: "e1-1",
      source: "input1",
      target: "funcB1",
      animated: true,
      style: { stroke: "#3B82F6" },
    },
    {
      id: "e1-2",
      source: "funcB1",
      target: "funcA1",
      animated: true,
      style: { stroke: "#3B82F6" },
    },
    {
      id: "e1-3",
      source: "funcA1",
      target: "output1",
      animated: true,
      style: { stroke: "#3B82F6" },
    },
  ]);

  const c2 = `
    // Compose two functions: funcA(funcB(x))
    const c2 = (funcA, funcB) => x => funcA(funcB(x));

    // Example functions:
    const square = x => x * x;
    const double = x => x * 2;

    // Compose them: double first, then square
    const doubleThenSquare = c2(square, double);

    console.log(doubleThenSquare(3)); // Output: 36 (3*2 = 6, then 6*6 = 36)
`;
const compose = `
    // Compose functions from right to left
    const compose = (...fns) => x0 => fns.reduceRight((x, f) => f(x), x0);

    // Example functions:
    const headalize = str => str.replace(/^###\s+([^\n<"]*)/mg, '<h3>$1</h3>');
    const emphasize = str => str.replace(/_([^_]*)_/g, '<em>$1</em>');
    const imagify = str => str.replace(/!\[([^\]"<]*)\]\(([^)<"]*)\)/g, '<img src="$2" alt="$1" />');
    const linkify = str => str.replace(/\[([^\]"<]*)\]\(([^)<"]*)\)/g, '<a href="$2" rel="noopener nowfollow">$1</a>');

    // Create a composed function: headalize → emphasize → imagify → linkify
    const processComment = compose(linkify, imagify, emphasize, headalize);

    const comment = "### Welcome\n_Enjoy_ this image: ![alt](/img.png) [link](http://example.com)";
    console.log(processComment(comment)); 
`
const flow = "\n  // Flow functions from left to right\n  const flow = (...fns) => x0 => fns.reduce((x, f) => f(x), x0);\n\n  // Adding another function for code formatting:\n  const codify = str => str.replace(/`([^`<\"]*)`/g, '<code>$1</code>');\n\n  // Compose a function that processes comments with flow\n  const processCommentFlow = flow(headalize, emphasize, imagify, linkify, codify);\n\n  console.log(processCommentFlow(comment));\n";


  return (
    <>
      <div className="flex flex-col gap-4">
        <h1 className="text-2xl font-bold mb-4">Function Composition Guide</h1>
        <p>
          Function composition is where we take two functions, and combine them
          into one. That is, our new function calls one function, takes the
          result, and passes it into another function. That’s it.
        </p>
        <Diagram
          title="Function Composition Example 1"
          initialNodes={nodes1}
          initialEdges={edges1}
        />
        <p>
          Basic Concept: Function composition involves taking the output of one
          function and using it as the input for another. This can be done with
          a simple helper function (like c2) that returns a new function.
        </p>
        <CodeHighlighter code={c2} lang="javascript" theme="vitesse-dark" />
        <p>
          The article introduces several patterns—compose, flow, and pipe—which
          allow developers to chain functions together. While compose processes
          functions right-to-left, flow and pipe work left-to-right, making code
          more readable depending on the context.
        </p>
        <CodeHighlighter code={compose} lang="javascript" theme="vitesse-dark" />
        <p>
          Declarative vs. Imperative: By comparing traditional variable
          assignment with composed expressions, the article demonstrates that
          using composition leads to more concise, declarative code. This
          encourages a shift in mindset from detailing step-by-step instructions
          to focusing on the relationships between operations.
        </p>
        <CodeHighlighter code={flow} lang="javascript" theme="vitesse-dark" />
        <p>
          Modularity and Reusability: The approach promotes writing small,
          reusable functions. This modularity not only makes the code more
          elegant but also easier to maintain and adapt—highlighting the deeper
          value of function composition beyond mere syntax.
        </p>
        <p>
          Broader Implications: Ultimately, the "big deal" is not just code
          brevity but the change in how developers think about program
          structure. Function composition fosters a more functional, expressive
          style of programming that emphasizes outcomes over implementation
          details.
        </p>
      </div>
      <div className="flex flex-col gap-6">
      {/* Title & Meta */}
      <div>
        <h1 className="scroll-m-20 text-4xl font-extrabold tracking-tight lg:text-5xl">
          HOW TO COMPOSE JAVASCRIPT FUNCTIONS THAT TAKE MULTIPLE PARAMETERS (THE EPIC GUIDE)
        </h1>
        <p className="mt-2 text-sm text-gray-600">Written by James Sinclair</p>
        <p className="text-sm text-gray-600">10th June 2024</p>
      </div>

      {/* Table of Contents */}
      <section>
        <h2 className="text-2xl font-bold mb-4">Table of Contents</h2>
        <ul className="list-disc pl-6 space-y-2">
          <li>Composite data structures</li>
          <li>Partial application</li>
          <li>Currying</li>
          <li>Solving the get/set problem with ap()</li>
          <li>Solving the configuration problem with flatMap()</li>
          <li>So what?</li>
        </ul>
      </section>

      {/* Introduction */}
      <section>
        <p>
          Function composition is beautiful. In an earlier article, we looked at tools like <code>compose()</code> and <code>flow()</code>. These composition functions allow us to create function pipelines where the output from one function flows straight into the next – like maple syrup over pancakes.
        </p>
        <p>
          But what happens when the functions don’t line up? What if some of them expect more than one argument? There’s a short answer to this question: we can’t. Only unary functions (those that take a single argument) compose well. So, if a function expects more than one parameter, composition in its classic form won’t work.
        </p>
        <p>
          If composing functions with multiple parameters seems impossible, why write this article? The answer is that we “cheat” by wrapping or modifying our functions so that we transform multi-argument functions into unary functions. In this guide, we’ll look at five techniques for doing that.
        </p>
      </section>

      {/* Composite Data Structures */}
      <section>
        <h2 className="text-2xl font-bold mb-4">Composite data structures</h2>
        <p>
          Let’s start with the simplest issue. Suppose we have a function that needs two arguments, and another function that returns two values. Since functions can only return one value, we use composite data structures like arrays or objects. For example, React’s <code>useState()</code> returns a pair:
        </p>
        <CodeHighlighter
          code={`const temperatureStatePair = useState(23);
const temperature = temperatureStatePair[0];
const setTemp = temperatureStatePair[1];`}
          lang="javascript"
          theme="vitesse-dark"
        />
        <p>
          With destructuring, we can condense this to:
        </p>
        <CodeHighlighter
          code={`const [temperature, setTemp] = useState(23);`}
          lang="javascript"
          theme="vitesse-dark"
        />
        <p>
          Now suppose we’re building a thermostat UI and need to convert between Celsius and Fahrenheit. We might write:
        </p>
        <CodeHighlighter
          code={`const celsiusToFahrenheit = t => t * 9 / 5 + 32;
const fahrenheitToCelsius = t => (t - 32) * 5 / 9;

const stateCelsiusToFahrenheit = (temperature, setTemp) => {
  const tempF = celsiusToFahrenheit(temperature);
  const setTempF = (temp) => setTemp(fahrenheitToCelsius(temp));
  return [tempF, setTempF];
};`}
          lang="javascript"
          theme="vitesse-dark"
        />
        <p>
          However, since the function takes two parameters, we can’t compose it easily. By changing its signature to accept an array instead, we get:
        </p>
        <CodeHighlighter
          code={`const stateCelsiusToFahrenheit = ([temperature, setTemp]) => {
  const tempF = celsiusToFahrenheit(temperature);
  const setTempF = (temp) => setTemp(fahrenheitToCelsius(temp));
  return [tempF, setTempF];
};`}
          lang="javascript"
          theme="vitesse-dark"
        />
        <p>
          With that change, we can compose it with <code>useState()</code> using a simple <code>compose()</code> function:
        </p>
        <CodeHighlighter
          code={`const compose = (...fns) => x0 => fns.reduceRight(
  (x, f) => f(x),
  x0
);

const useFahrenheit = compose(
  stateCelsiusToFahrenheit,
  useState
);

// Set the initial temperature to 23°C (~74°F)
const [tempF, setTempF] = useFahrenheit(23);`}
          lang="javascript"
          theme="vitesse-dark"
        />
        <p>
          We can also inject a function to fix the initial temperature conversion:
        </p>
        <CodeHighlighter
          code={`const useFahrenheit = compose(
  stateCelsiusToFahrenheit,
  useState,
  fahrenheitToCelsius,
);

// Set the initial temperature to 74°F (~23°C)
const [tempF, setTempF] = useFahrenheit(74);`}
          lang="javascript"
          theme="vitesse-dark"
        />
      </section>

      {/* What About Objects */}
      <section>
        <h2 className="text-2xl font-bold mb-4">What about objects?</h2>
        <p>
          When using arrays, the order of values is arbitrary. An alternative is to return an object with meaningful names:
        </p>
        <CodeHighlighter
          code={`const stateCelsiusToFahrenheitObj = ([temperature, setTemp]) => {
  const tempF = celsiusToFahrenheit(temperature);
  const setTempF = (temp) => setTemp(fahrenheitToCelsius(temp));
  return { temperature: tempF, setTemperature: setTempF };
};

const useFahrenheit = compose(
  stateCelsiusToFahrenheitObj,
  useState,
  fahrenheitToCelsius,
);

// Destructure using meaningful names
const { temperature, setTemperature } = useFahrenheit(74);`}
          lang="javascript"
          theme="vitesse-dark"
        />
        <p>
          This approach makes destructuring order-independent, though renaming variables can become verbose.
        </p>
      </section>

      {/* Partial Application */}
      <section>
        <h2 className="text-2xl font-bold mb-4">Partial application</h2>
        <p>
          Consider replacing <code>useState()</code> with <code>useLocalStorage()</code> (which takes an extra key parameter):
        </p>
        <CodeHighlighter
          code={`const PREFIX = 'my-clever-prefix-to-prevent-namespace-collisions-';
const [temperature, setTemperature] = useLocalStorage(23, $PREFIXtemperature);}
          lang="javascript"
          theme="vitesse-dark"
        />
        <p>
          By partially applying the key, we create a new function:
        </p>
        <CodeHighlighter
          code={const tempKey = $(PREFIX)temperature;
const useDeconflictedLocalStorage = (initialVal) =>
  useLocalStorage(initialVal, tempKey);`}
          lang="javascript"
          theme="vitesse-dark"
        />
        <p>
          And then compose as before:
        </p>
        <CodeHighlighter
          code={`const useFahrenheit = compose(
  stateCelsiusToFahrenheitObj,
  useDeconflictedLocalStorage,
  fahrenheitToCelsius,
);

const { temperature, setTemperature } = useFahrenheit(74);`}
          lang="javascript"
          theme="vitesse-dark"
        />
      </section>

      {/* Currying */}
      <section>
        <h2 className="text-2xl font-bold mb-4">Currying</h2>
        <p>
          Currying converts multi-argument functions into a series of unary functions. For example, a curried version of <code>useLocalStorage()</code>:
        </p>
        <CodeHighlighter
          code={`const useLocalStorageCurried = (key) => (initialVal) =>
  useLocalStorage(initialVal, key);`}
          lang="javascript"
          theme="vitesse-dark"
        />
        <p>
          This allows us to create specific hooks:
        </p>
        <CodeHighlighter
          code={`const useTemperature = useLocalStorageCurried('temperature');
const useHeatingStatus = useLocalStorageCurried('heating');
const useCoolingStatus = useLocalStorageCurried('cooling');

// Use our hooks
const [temp, setTemp] = useTemperature(23);
const [heatingOn, setHeatingStatus] = useHeatingStatus(false);
const [coolingOn, setCoolingStatus] = useCoolingStatus(false);`}
          lang="javascript"
          theme="vitesse-dark"
        />
        <p>
          Similarly, a curried version of <code>el()</code> can be written as:
        </p>
        <CodeHighlighter
          code={`const elCurried = (tag) => (contents) => \`<\${tag}>\${contents}</\${tag}>\`;`}
          lang="javascript"
          theme="vitesse-dark"
        />
        <p>
          And used with compose:
        </p>
        <CodeHighlighter
          code={`const listify = compose(
  el('ul'),
  join(''),
  map(el('li')),
);

const characterList = ['Holmes', 'Watson', 'Mrs. Hudson'];
const characterListHTML = listify(characterList);
// ￩ "<ul><li>Holmes</li><li>Watson</li><li>Mrs. Hudson</li></ul>"`}
          lang="javascript"
          theme="vitesse-dark"
        />
      </section>

      {/* Solving the get/set problem with ap() */}
      <section>
        <h2 className="text-2xl font-bold mb-4">Solving the get/set problem with ap()</h2>
        <p>
          Often in front-end applications, you fetch data, combine it with local state, transform it, and then render the UI. This involves extracting values from an object, transforming them, and setting them back. The utility <code>ap()</code> helps wire these steps together.
        </p>
        <CodeHighlighter
          code={`const ap = (binaryCurriedFn) => (unaryFn) => (value) =>
  binaryCurriedFn(value)(unaryFn(value));`}
          lang="javascript"
          theme="vitesse-dark"
        />
        <p>
          For example, to format temperature timestamps:
        </p>
        <CodeHighlighter
          code={`const getTimestampAndFormat = compose(formatDate, getTimestamp);

const addFormattedDate = ap(setReadableDate)(getTimestampAndFormat);
const tempsWithFormattedDates = temps.map(addFormattedDate);`}
          lang="javascript"
          theme="vitesse-dark"
        />
        <p>
          We can also create helper utilities for getting and setting:
        </p>
        <CodeHighlighter
          code={`const get = (key) => (obj) => obj[key];
const set = (key) => (obj) => (val) => ({ ...obj, [key]: val });

const getSet = (setter) => (getter) => (transform) =>
  ap(setter)(compose(transform, getter));`}
          lang="javascript"
          theme="vitesse-dark"
        />
        <p>
          And use it in a pipeline:
        </p>
        <CodeHighlighter
          code={`const transformTempReadings = compose(
  getSet(set('tempF'))(get('temp'))(celsiusToFahrenheit),
  getSet(set('readableTime'))(get('time'))(formatDate),
);

const readingsForUI = temps.map(transformTempReadings);`}
          lang="javascript"
          theme="vitesse-dark"
        />
      </section>

      {/* Solving the configuration problem with flatMap() */}
      <section>
        <h2 className="text-2xl font-bold mb-4">Solving the configuration problem with flatMap()</h2>
        <p>
          Suppose you have a configuration object that you want to pass to multiple functions. For example:
        </p>
        <CodeHighlighter
          code={`const config = {
  locale: 'en-GB',
  timezone: 'GMT',
  defaultTarget: 23,
  defaultUnits: 'Celsius',
  baseHeatingRate: 3,
  baseCoolingRate: 5,
  sensors: {
    bakerst: { name: 'Baker St.', host: 'bakerst.thermostat.example.com' },
    gorvesnorsq: { name: 'Grosvenor Sq.', host: 'grosvenor.thermostat.example.com' },
    bedlam: { name: 'Bedlam', host: 'bedlam.thermostat.example.com' },
  },
};`}
          lang="javascript"
          theme="vitesse-dark"
        />
        <p>
          And functions that use the config:
        </p>
        <CodeHighlighter
          code={`const formatDateForLocale = (timestamp) => (config) =>
  (new Intl.DateTimeFormat(config.local, { timeStyle: 'medium', dateStyle: 'short' }))
    .format(new Date(timestamp));

const addReadableDate = (obj) => (config) => ({
  ...obj,
  readableDate: formatDateForLocale(config.locale)(obj.time)
});

const addSensorName = (obj) => (config) => ({
  ...obj,
  sensorName: config.sensors[obj.sensor]?.name
});

const addTempDiff = (obj) => (config) => ({
  ...obj,
  tempDiff: obj.temp - config.defaultTarget
});`}
          lang="javascript"
          theme="vitesse-dark"
        />
        <p>
          Using a utility called <code>flatMap()</code> (also known as chain), we can compose these so that each function gets the same config:
        </p>
        <CodeHighlighter
          code={`const flatMap = (binaryCurriedFn) => (unaryFn) =>
  (x) => binaryCurriedFn(unaryFn(x))(x);

const transformTempObjs = compose(
  flatMap(addTempDiff),
  flatMap(addSensorName),
  addReadableDate
);

// Example usage:
transformTempObjs(temps[0])(config);`}
          lang="javascript"
          theme="vitesse-dark"
        />
        <p>
          To flip the order of parameters so that the config comes first, use:
        </p>
        <CodeHighlighter
          code={`const flip = (binaryCurriedFn) => (b) => (a) =>
  binaryCurriedFn(a)(b);

const flippedTransformTempObjs = flip(compose(
  flatMap(addTempDiff),
  flatMap(addSensorName),
  addReadableDate
));

const transformedReadings = temps.map(flippedTransformTempObjs(config));
console.log(transformedReadings);`}
          lang="javascript"
          theme="vitesse-dark"
        />
      </section>

      {/* So what? */}
      <section>
        <h2 className="text-2xl font-bold mb-4">So what?</h2>
        <p>
          Imagine if every function were curried – a world of fascinating utility functions (combinators) would open up. While combinators such as <code>ap()</code>, <code>flatMap()</code>, and <code>flip()</code> give you powerful tools for composing functions, overusing them may make your code harder to understand.
        </p>
        <p>
          As a JavaScript developer, you’ll often be composing functions. Although using composite data structures works most of the time, knowing about partial application, currying, and combinators gives you more options for writing elegant and maintainable code.
        </p>
      </section>
    </div>
    </>
  );
}

