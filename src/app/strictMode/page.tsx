"use client";
import CodeHighlighter from "@/components/CodeHighlighter";

export default function StrictModeGuide() {
  const strictModeSetup = `
import React from 'react';

root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);`;

  const useEffectExample = `
React.useEffect(() => {
  function handleKeyDown(event) {
    if (event.code === 'Space') {
      setIsPlaying(current => !current);
    }
  }

  window.addEventListener('keydown', handleKeyDown);
  
  return () => {
    window.removeEventListener('keydown', handleKeyDown);
  };
}, []);`;

  const clockExample = `
function Clock() {
  const [time, setTime] = React.useState(new Date());

  React.useEffect(() => {
    const intervalId = setInterval(() => {
      setTime(new Date());
    }, 1000);

    return () => clearInterval(intervalId);
  }, []);

  console.log('Re-render');
  
  return <p>{time.toLocaleTimeString()}</p>;
}`;

  const mountCheckExample = `
function App() {
  React.useEffect(() => {
    console.log('Mount check!');
  }, []);
  
  return <div>Hello World</div>;
}`;

  return (
    <div className="flex flex-col gap-3">
      <h1 className="scroll-m-20 text-4xl font-extrabold tracking-tight lg:text-5xl mb-[20px]">
        React Strict Mode Deep Dive
      </h1>

      <section>
        <h2 className="text-2xl font-bold mb-4">Why Strict Mode?</h2>
        <div className="p-4 bg-blue-50 rounded-lg mb-4">
          <p className="mb-2">
            Strict Mode helps catch subtle issues by:
          </p>
          <ul className="list-disc pl-6 space-y-2">
            <li>Identifying unsafe lifecycle methods</li>
            <li>Detecting legacy API usage</li>
            <li>Highlighting potential memory leaks</li>
            <li>Verifying effect cleanup behavior</li>
          </ul>
        </div>
        <CodeHighlighter code={strictModeSetup} lang="javascript" theme="vitesse-dark" />
      </section>

      <section>
        <h2 className="text-2xl font-bold mb-4">Effect Double Execution</h2>
        <div className="grid grid-cols-2 gap-4 mb-[20px]">
          <div>
            <h3 className="font-bold mb-2">Problematic Code</h3>
            <CodeHighlighter 
              code={useEffectExample.replace('window.removeEventListener', '// Removed cleanup')} 
              lang="javascript" 
              theme="vitesse-dark" 
            />
          </div>
          <div className="p-4 bg-red-50 rounded-lg">
            <h3 className="font-bold mb-2">Strict Mode Behavior</h3>
            <ul className="list-disc pl-6 space-y-2">
              <li>Mount component → Run effect</li>
              <li>Immediately run cleanup</li>
              <li>Re-run effect</li>
              <li className="font-bold">Without cleanup: Double event listeners</li>
            </ul>
          </div>
        </div>
      </section>

      <section>
        <h2 className="text-2xl font-bold mb-4">Development vs Production</h2>
        <div className="grid grid-cols-2 gap-4">
          <div className="p-4 bg-green-50 rounded-lg">
            <h3 className="font-bold mb-2">Development</h3>
            <ul className="list-disc pl-6 space-y-2">
              <li>Double effect execution</li>
              <li>Additional render checks</li>
              <li>Deprecation warnings</li>
            </ul>
          </div>
          <div className="p-4 bg-yellow-50 rounded-lg">
            <h3 className="font-bold mb-2">Production</h3>
            <ul className="list-disc pl-6 space-y-2">
              <li>No double execution</li>
              <li>No performance overhead</li>
              <li>Silent about warnings</li>
            </ul>
          </div>
        </div>
      </section>

      <section>
        <h2 className="text-2xl font-bold mb-4">Component Double Rendering</h2>
        <CodeHighlighter code={clockExample} lang="javascript" theme="vitesse-dark" />
        <div className="mt-4 p-4 bg-purple-50 rounded-lg">
          <p className="font-semibold">
            Strict Mode will log "Re-render" twice every second during development
          </p>
        </div>
      </section>

      <section>
        <h2 className="text-2xl font-bold mb-4">Strict Mode Simulation</h2>
        <div className="grid grid-cols-2 gap-4">
          <div>
            <CodeHighlighter code={mountCheckExample} lang="javascript" theme="vitesse-dark" />
          </div>
          <div className="p-4 bg-orange-50 rounded-lg">
            <h3 className="font-bold mb-2">Expected Output</h3>
            <CodeHighlighter 
              code="Mount check!\nMount check!" 
              lang="text" 
              theme="vitesse-dark" 
            />
            <p className="mt-2 text-sm">
              Toggle Strict Mode to see the difference in mount counts
            </p>
          </div>
        </div>
      </section>

      <section className="mt-8">
        <h2 className="text-2xl font-bold mb-4">Best Practices</h2>
        <div className="grid grid-cols-3 gap-4">
          <div className="p-4 bg-green-100 rounded-lg">
            <h3 className="font-bold mb-2">Always Clean Up</h3>
            <p>Return cleanup functions from all effects</p>
          </div>
          <div className="p-4 bg-blue-100 rounded-lg">
            <h3 className="font-bold mb-2">Pure Components</h3>
            <p>Ensure components are side-effect free</p>
          </div>
          <div className="p-4 bg-purple-100 rounded-lg">
            <h3 className="font-bold mb-2">Strict Mode First</h3>
            <p>Enable from project start</p>
          </div>
        </div>
      </section>
    </div>
  );
}