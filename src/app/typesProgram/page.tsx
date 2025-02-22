"use client";
import CodeHighlighter from "@/components/CodeHighlighter";

export default function ImperativeDeclarativeGuide() {
  const imperativeExample = `
// Imperative array doubling
function double(arr) {
  let results = [];
  for (let i = 0; i < arr.length; i++) {
    results.push(arr[i] * 2);
  }
  return results;
}`;

  const declarativeExample = `
// Declarative array doubling
function double(arr) {
  return arr.map(item => item * 2);
}`;

  const jqueryExample = `
// Imperative jQuery toggle
$("#btn").click(function() {
  $(this).toggleClass("highlight");
  $(this).text() === "Add Highlight" 
    ? $(this).text("Remove Highlight")
    : $(this).text("Add Highlight");
});`;

  const reactExample = `
// Declarative React component
function Btn({ highlight, onToggle }) {
  return (
    <button 
      className={highlight ? 'highlight' : ''}
      onClick={onToggle}
    >
      {highlight ? 'Remove Highlight' : 'Add Highlight'}
    </button>
  );
}`;

  const sqlExample = `
-- Declarative SQL query
SELECT * FROM Users 
WHERE Country='Mexico';`;

  const htmlExample = `
<!-- Declarative HTML structure -->
<article>
  <header>
    <h1>Declarative Programming</h1>
    <p>Sprinkle Declarative in your verbiage to sound smart</p>
  </header>
</article>`;

  return (
    <div className="flex flex-col gap-3">
      <h1 className="scroll-m-20 text-4xl font-extrabold tracking-tight lg:text-5xl mb-[20px]">
        Imperative vs Declarative Programming in React
      </h1>

      <section>
        <h2 className="text-2xl font-bold mb-4">The Core Difference</h2>
        <div className="grid grid-cols-2 gap-4 mb-[20px]">
          <div className="p-4 bg-blue-50 rounded-lg">
            <h3 className="font-bold text-blue-800 mb-2">Imperative</h3>
            <p>How to do something</p>
            <p className="text-sm text-gray-600 mt-2">
              Focuses on step-by-step instructions and explicit state management
            </p>
          </div>
          <div className="p-4 bg-green-50 rounded-lg">
            <h3 className="font-bold text-green-800 mb-2">Declarative</h3>
            <p>What to achieve</p>
            <p className="text-sm text-gray-600 mt-2">
              Focuses on describing the desired outcome without implementation details
            </p>
          </div>
        </div>
      </section>

      <section>
        <h2 className="text-2xl font-bold mb-4">Real-World Metaphors</h2>
        <div className="space-y-4 mb-[20px]">
          <div className="p-4 bg-gray-100 rounded-lg">
            <h3 className="font-bold mb-2">🍤 Restaurant Example</h3>
            <p><strong>Imperative:</strong> "Walk to the table under the Gone Fishin' sign"</p>
            <p><strong>Declarative:</strong> "Table for two, please"</p>
          </div>
          
          <div className="p-4 bg-gray-100 rounded-lg">
            <h3 className="font-bold mb-2">🗺️ Navigation Example</h3>
            <p><strong>Imperative:</strong> Detailed turn-by-turn directions</p>
            <p><strong>Declarative:</strong> "My address is 123 Main Street"</p>
          </div>
        </div>
        <div className="space-y-4 mb-[20px]">
          <div className="p-4 bg-gray-100 rounded-lg">
            <h3 className="font-bold mb-2">More Example</h3>
            <p><strong>Imperative:</strong> Go out of the north exit of the parking lot and take a left. Get on I-15 going North until you get to the 12th street exit. Take a right off the exit like you’re going to Ikea. Go straight and take a right at the first light. Continue through the next light then take your next left. My house is #298.</p>
            <p><strong>Declarative:</strong> My address is 298 West Immutable Alley, Eden, Utah 84310</p>
          </div>
          
        </div>
      </section>

      <section>
        <h2 className="text-2xl font-bold mb-4">Code Comparison</h2>
        <div className="grid grid-cols-2 gap-4 mb-[20px]">
          <div>
            <h3 className="font-bold mb-2">Array Operations</h3>
            <div className="mb-4">
              <CodeHighlighter 
                code={imperativeExample} 
                lang="javascript" 
                theme="vitesse-dark" 
              />
              <p className="text-sm text-gray-600 mt-2">Manual iteration and mutation</p>
            </div>
            <div>
              <CodeHighlighter 
                code={declarativeExample} 
                lang="javascript" 
                theme="vitesse-dark" 
              />
              <p className="text-sm text-gray-600 mt-2">Declarative data transformation</p>
            </div>
          </div>
          
          <div>
            <h3 className="font-bold mb-2">UI Updates</h3>
            <div className="mb-4">
              <CodeHighlighter 
                code={jqueryExample} 
                lang="javascript" 
                theme="vitesse-dark" 
              />
              <p className="text-sm text-gray-600 mt-2">Direct DOM manipulation</p>
            </div>
            <div>
              <CodeHighlighter 
                code={reactExample} 
                lang="javascript" 
                theme="vitesse-dark" 
              />
              <p className="text-sm text-gray-600 mt-2">State-driven UI declaration</p>
            </div>
          </div>
        </div>
      </section>

      <section>
        <h2 className="text-2xl font-bold mb-4">Declarative Language Examples</h2>
        <div className="grid grid-cols-2 gap-4 mb-[20px]">
          <div>
            <CodeHighlighter 
              code={sqlExample} 
              lang="sql" 
              theme="vitesse-dark" 
            />
          </div>
          <div>
            <CodeHighlighter 
              code={htmlExample} 
              lang="html" 
              theme="vitesse-dark" 
            />
          </div>
        </div>
      </section>

      <section>
        <h2 className="text-2xl font-bold mb-4">Key Benefits of Declarative</h2>
        <div className="grid grid-cols-3 gap-4 mb-[20px]">
          <div className="p-4 bg-purple-50 rounded-lg">
            <h3 className="font-bold mb-2">🧠 Readability</h3>
            <p className="text-sm">Code expresses intent clearly</p>
          </div>
          <div className="p-4 bg-yellow-50 rounded-lg">
            <h3 className="font-bold mb-2">🔄 Predictability</h3>
            <p className="text-sm">No hidden state mutations</p>
          </div>
          <div className="p-4 bg-pink-50 rounded-lg">
            <h3 className="font-bold mb-2">🧩 Reusability</h3>
            <p className="text-sm">Context-independent components</p>
          </div>
        </div>
      </section>

      <section>
        <h2 className="text-2xl font-bold mb-4">Expert Definitions</h2>
        <div className="space-y-4">
          <blockquote className="p-4 bg-gray-100 rounded-lg">
            "Declarative programming is programming with declarations - declarative sentences"
          </blockquote>
          <blockquote className="p-4 bg-gray-100 rounded-lg">
            "In React, you describe your UI as a function of state, and let the library handle the rendering optimizations"
          </blockquote>
        </div>
      </section>

      <section className="mt-8">
        <h2 className="text-2xl font-bold mb-4">When to Go Declarative</h2>
        <ul className="list-disc pl-6 space-y-2">
          <li>Building complex UIs with predictable state</li>
          <li>Working with data transformations (use .map/.filter/.reduce)</li>
          <li>Creating reusable components</li>
          <li>Managing application-wide state (Context/Redux)</li>
        </ul>
      </section>
    </div>
  );
}