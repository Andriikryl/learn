"use client";
import CodeHighlighter from "@/components/CodeHighlighter";

export default function PureFunctionsGuide() {
  const impureExamples = [
    {
      title: "State Mutation",
      code: `function addTodo(todo) {
  todos.push(todo);
}`,
      explanation: "Mutates external state (todos array)"
    },
    {
      title: "API Call",
      code: `function getGithubProfile(username) {
  return fetch(\`https://api.github.com/users/\${username}\`)
    .then(res => res.json());
}`,
      explanation: "Relies on external API state"
    },
    {
      title: "DOM Manipulation",
      code: `function updateDocumentTitle(title) {
  document.title = title;
}`,
      explanation: "Creates observable side effect"
    }
  ];

  const pureExamples = [
    {
      title: "Tax Calculation",
      code: `function calculateTotal(price, quantity, taxRate) {
  return price * quantity * (1 + taxRate);
}`,
      explanation: "No external dependencies, deterministic"
    },
    {
      title: "String Formatting",
      code: `function fullName(first, last) {
  return \`\${first} \${last}\`;
}`,
      explanation: "Same output for same inputs"
    },
    {
      title: "Array Processing",
      code: `function getEvenNumbers(numbers) {
  return numbers.filter(n => n % 2 === 0);
}`,
      explanation: "No mutation, pure transformation"
    }
  ];

  const cachingExample = `
// Initial pure version
const isPrime = (n) => {
  if (n === 1) return false;
  for (let i = 2; i <= Math.sqrt(n); i++) {
    if (n % i === 0) return false;
  }
  return true;
};

// Cached version
let primeCache = {1: false};

const isPrime = (n) => {
  if (typeof primeCache[n] === 'boolean') {
    return primeCache[n];
  }
  // ... same logic as before ...
  primeCache[n] = result;
  return result;
};`;

  const reactComponentExample = `
// Pure React component
function UserProfile({ user }) {
  return (
    <div>
      <h2>{user.name}</h2>
      <p>Email: {user.email}</p>
      <p>Joined: {new Date(user.joinDate).toLocaleDateString()}</p>
    </div>
  );
}`;

  return (
    <div className="flex flex-col gap-3">
      <h1 className="scroll-m-20 text-4xl font-extrabold tracking-tight lg:text-5xl mb-[20px]">
        Mastering Pure Functions in React
      </h1>

      <section>
        <h2 className="text-2xl font-bold mb-4">The Foundation of Predictability</h2>
        <div className="grid grid-cols-2 gap-4 mb-[20px]">
          <div className="p-4 bg-red-50 rounded-lg">
            <h3 className="font-bold text-red-800 mb-2">Impure Functions</h3>
            <ul className="list-disc pl-4 space-y-2">
              <li>Create side effects</li>
              <li>Depend on external state</li>
              <li>Unpredictable outcomes</li>
            </ul>
          </div>
          <div className="p-4 bg-green-50 rounded-lg">
            <h3 className="font-bold text-green-800 mb-2">Pure Functions</h3>
            <ul className="list-disc pl-4 space-y-2">
              <li>No side effects</li>
              <li>Deterministic outputs</li>
              <li>Referentially transparent</li>
            </ul>
          </div>
        </div>
      </section>

      <section>
        <h2 className="text-2xl font-bold mb-4">The Two Rules of Purity</h2>
        <div className="grid grid-cols-2 gap-4 mb-[20px]">
          <div className="p-4 bg-blue-50 rounded-lg">
            <h3 className="font-bold mb-2">Rule #1: No Side Effects</h3>
            <div className="space-y-4">
              {impureExamples.map((ex, i) => (
                <div key={i}>
                  <CodeHighlighter code={ex.code} lang="javascript" theme="vitesse-dark" />
                  <p className="text-sm text-gray-600 mt-2">{ex.explanation}</p>
                </div>
              ))}
            </div>
          </div>
          
          <div className="p-4 bg-purple-50 rounded-lg">
            <h3 className="font-bold mb-2">Rule #2: Consistent Outputs</h3>
            <div className="space-y-4">
              {pureExamples.map((ex, i) => (
                <div key={i}>
                  <CodeHighlighter code={ex.code} lang="javascript" theme="vitesse-dark" />
                  <p className="text-sm text-gray-600 mt-2">{ex.explanation}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section>
        <h2 className="text-2xl font-bold mb-4">Real-World Optimization</h2>
        <div className="mb-[20px]">
          <CodeHighlighter 
            code={cachingExample} 
            lang="javascript" 
            theme="vitesse-dark" 
          />
          <p className="text-sm text-gray-600 mt-2">
            Caching demonstrates how purity enables performance optimizations
          </p>
        </div>
      </section>

      <section>
        <h2 className="text-2xl font-bold mb-4">React & Purity</h2>
        <div className="grid grid-cols-2 gap-4 mb-[20px]">
          <div className="p-4 bg-yellow-50 rounded-lg">
            <h3 className="font-bold mb-2">Pure Components</h3>
            <CodeHighlighter 
              code={reactComponentExample} 
              lang="javascript" 
              theme="vitesse-dark" 
            />
            <p className="text-sm text-gray-600 mt-2">
              Props-driven components with no internal state
            </p>
          </div>
          <div className="p-4 bg-teal-50 rounded-lg">
            <h3 className="font-bold mb-2">Benefits in React</h3>
            <ul className="list-disc pl-4 space-y-2">
              <li>Predictable renders</li>
              <li>Memoization opportunities</li>
              <li>Easier testing</li>
              <li>Better performance</li>
            </ul>
          </div>
        </div>
      </section>

      <section>
        <h2 className="text-2xl font-bold mb-4">Pragmatic Purity</h2>
        <div className="p-4 bg-gray-100 rounded-lg">
          <p className="mb-2">
            While perfect purity is ideal, real-world React applications require pragmatic solutions:
          </p>
          <ul className="list-disc pl-6 space-y-2">
            <li>Isolate side effects in dedicated layers</li>
            <li>Use effect management libraries</li>
            <li>Employ dependency injection for testability</li>
            <li>Leverage React's built-in memoization</li>
          </ul>
        </div>
      </section>

      <section className="mt-8">
        <h2 className="text-2xl font-bold mb-4">Key Takeaways</h2>
        <div className="grid grid-cols-3 gap-4">
          <div className="p-4 bg-blue-100 rounded-lg">
            <h3 className="font-bold mb-2">Testing</h3>
            <p>Pure functions enable snapshot testing and deterministic test cases</p>
          </div>
          <div className="p-4 bg-green-100 rounded-lg">
            <h3 className="font-bold mb-2">Optimization</h3>
            <p>Memoization and caching become trivial with pure functions</p>
          </div>
          <div className="p-4 bg-purple-100 rounded-lg">
            <h3 className="font-bold mb-2">Maintenance</h3>
            <p>Pure codebases reduce cognitive load and debugging time</p>
          </div>
        </div>
      </section>
    </div>
  );
}