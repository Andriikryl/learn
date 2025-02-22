"use client";
import CodeHighlighter from "@/components/CodeHighlighter";

export default function TernaryConditional() {
  const twoAndApproach = `
function App({ user }) {
  const isLoggedIn = !!user;

  return (
    <>
      {isLoggedIn && <AdminDashboard />}
      {!isLoggedIn && <p>Please login first</p>}
    </>
  );
}`;

  const ternaryApproach = `
function App({ user }) {
  const isLoggedIn = !!user;

  return (
    <>
      {isLoggedIn
        ? <AdminDashboard />
        : <p>Please login first</p>}
    </>
  );
}`;

  const ternarySyntax = `
condition ? truthyExpression : falsyExpression`;

  const shortCircuitExample = `
// Only "condition" and "second condition" get logged
console.log('condition') 
  ? console.log('first condition') 
  : console.log('second condition');`;

  const safeNetworkExample = `
const networkRequest = isLoggedIn && fetch('/user/login-details');`;

  return (
    <div className="flex flex-col gap-3">
      <h1 className="scroll-m-20 text-4xl font-extrabold tracking-tight lg:text-5xl mb-[20px]">
        Conditional Rendering with Ternary Operator
      </h1>

      <p>
        For true if/else logic in JSX, use JavaScript's ternary operator to handle 
        both branches of a condition:
      </p>

      <h2 className="text-2xl font-bold">Two && Operators Approach</h2>
      <div className="mb-[20px]">
        <CodeHighlighter code={twoAndApproach} lang="javascript" theme="vitesse-dark" />
      </div>

      <h2 className="text-2xl font-bold">Ternary Operator Solution</h2>
      <div className="mb-[20px]">
        <CodeHighlighter code={ternaryApproach} lang="javascript" theme="vitesse-dark" />
      </div>

      <h2 className="text-2xl font-bold">Ternary Syntax Breakdown</h2>
      <div className="mb-[20px]">
        <CodeHighlighter code={ternarySyntax} lang="javascript" theme="vitesse-dark" />
      </div>

      <h2 className="text-2xl font-bold">Short-Circuiting Behavior</h2>
      <p>
        Only the chosen branch executes, similar to && operator:
      </p>
      <div className="mb-[20px]">
        <CodeHighlighter code={shortCircuitExample} lang="javascript" theme="vitesse-dark" />
      </div>

      <h2 className="text-2xl font-bold">Safe Conditional Execution</h2>
      <p>
        Short-circuiting ensures right-side only runs when condition is met:
      </p>
      <div className="mb-[20px]">
        <CodeHighlighter code={safeNetworkExample} lang="javascript" theme="vitesse-dark" />
      </div>

      <div className="p-4 bg-blue-100 rounded-lg">
        <strong>Pro Tip:</strong> Use ternary for explicit either/or choices, 
        and && for simple presence/absence rendering. Combine them for complex 
        conditional logic!
      </div>
    </div>
  );
}