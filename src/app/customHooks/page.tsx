"use client";
import CodeHighlighter from "@/components/CodeHighlighter";

export default function CustomHooksGuide() {
  const clockBefore = `
function Clock() {
  const [time, setTime] = React.useState(new Date());

  React.useEffect(() => {
    const intervalId = setInterval(() => {
      setTime(new Date());
    }, 1000);

    return () => clearInterval(intervalId);
  }, []);

  return <p>{format(time, 'hh:mm:ss a')}</p>;
}`;

  const clockAfter = `
function Clock() {
  const time = useTime();
  
  return <p>{format(time, 'hh:mm:ss a')}</p>;
}

function useTime() {
  const [time, setTime] = React.useState(new Date());

  React.useEffect(() => {
    const intervalId = setInterval(() => {
      setTime(new Date());
    }, 1000);
    
    return () => clearInterval(intervalId);
  }, []);

  return time;
}`;

  const lintWarning = `
// ❌ Bad practice
function getTime() {
  const [time, setTime] = React.useState(new Date());
  // React Hook "React.useState" is called in function "getTime" 
  // that is neither a React function component nor a custom React Hook 
  // function. React component names must start with an uppercase 
  // character. React Hook names must start with the word "use". 
}`;

  return (
    <div className="flex flex-col gap-3">
      <h1 className="scroll-m-20 text-4xl font-extrabold tracking-tight lg:text-5xl mb-[20px]">
        Mastering Custom Hooks in React
      </h1>

      <section>
        <h2 className="text-2xl font-bold mb-4">What Are Custom Hooks?</h2>
        <div className="p-4 bg-blue-50 rounded-lg mb-4">
          <p className="mb-2">
            Custom hooks let you extract component logic into reusable functions that:
          </p>
          <ul className="list-disc pl-6 space-y-2">
            <li>Can use React hooks internally</li>
            <li>Maintain component lifecycle integration</li>
            <li>Follow the Rules of Hooks</li>
            <li>Start with "use" prefix</li>
          </ul>
        </div>
      </section>

      <section>
        <h2 className="text-2xl font-bold mb-4">Before vs After Custom Hooks</h2>
        <div className="grid grid-cols-2 gap-4 mb-[20px]">
          <div>
            <h3 className="font-bold mb-2">Standard Component</h3>
            <CodeHighlighter code={clockBefore} lang="javascript" theme="vitesse-dark" />
          </div>
          <div>
            <h3 className="font-bold mb-2">With Custom Hook</h3>
            <CodeHighlighter code={clockAfter} lang="javascript" theme="vitesse-dark" />
          </div>
        </div>
      </section>

      <section>
        <h2 className="text-2xl font-bold mb-4">Key Benefits</h2>
        <div className="grid grid-cols-2 gap-4 mb-[20px]">
          <div className="p-4 bg-green-50 rounded-lg">
            <h3 className="font-bold mb-2">Code Organization</h3>
            <ul className="list-disc pl-6 space-y-2">
              <li>Separate concerns</li>
              <li>Self-documenting names</li>
              <li>Reduce component complexity</li>
            </ul>
          </div>
          <div className="p-4 bg-purple-50 rounded-lg">
            <h3 className="font-bold mb-2">Code Reuse</h3>
            <ul className="list-disc pl-6 space-y-2">
              <li>Share logic across components</li>
              <li>Maintain single source of truth</li>
              <li>Simplify testing</li>
            </ul>
          </div>
        </div>
      </section>

      <section>
        <h2 className="text-2xl font-bold mb-4">Special Hook Capabilities</h2>
        <div className="grid grid-cols-2 gap-4">
          <div className="p-4 bg-yellow-50 rounded-lg">
            <h3 className="font-bold mb-2">Lifecycle Integration</h3>
            <ul className="list-disc pl-6 space-y-2">
              <li>Access to useEffect</li>
              <li>State management</li>
              <li>Cleanup handling</li>
            </ul>
          </div>
          <div className="p-4 bg-red-50 rounded-lg">
            <h3 className="font-bold mb-2">Naming Requirements</h3>
            <CodeHighlighter code={lintWarning} lang="javascript" theme="vitesse-dark" />
            <p className="mt-2 text-sm text-red-600">
              Must start with "use" to identify as hook
            </p>
          </div>
        </div>
      </section>

      <section>
        <h2 className="text-2xl font-bold mb-4">Practical Hook Example</h2>
        <div className="grid grid-cols-2 gap-4">
          <div>
            <CodeHighlighter 
              code={`function useWindowWidth() {
  const [width, setWidth] = React.useState(window.innerWidth);

  React.useEffect(() => {
    const handleResize = () => setWidth(window.innerWidth);
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return width;
}`} 
              lang="javascript" 
              theme="vitesse-dark" 
            />
          </div>
          <div className="p-4 bg-blue-50 rounded-lg">
            <h3 className="font-bold mb-2">Usage</h3>
            <CodeHighlighter 
              code={`function ResponsiveComponent() {
  const width = useWindowWidth();
  
  return (
    <p>Window width: {width}px</p>
  );
}`} 
              lang="javascript" 
              theme="vitesse-dark" 
            />
          </div>
        </div>
      </section>

      <section className="mt-8">
        <h2 className="text-2xl font-bold mb-4">Best Practices</h2>
        <div className="grid grid-cols-3 gap-4">
          <div className="p-4 bg-green-100 rounded-lg">
            <h3 className="font-bold mb-2">Naming</h3>
            <p>Always prefix with "use"</p>
          </div>
          <div className="p-4 bg-blue-100 rounded-lg">
            <h3 className="font-bold mb-2">Single Responsibility</h3>
            <p>One clear purpose per hook</p>
          </div>
          <div className="p-4 bg-purple-100 rounded-lg">
            <h3 className="font-bold mb-2">Composability</h3>
            <p>Combine hooks to build complex logic</p>
          </div>
        </div>
      </section>
    </div>
  );
}