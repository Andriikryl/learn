"use client";
import CodeHighlighter from "@/components/CodeHighlighter";

export default function ComponentsGuide() {
  const htmlExample = `
<aside>
  <h2>Authors</h2>
  <ul>
    <li>Tyler McGinnis</li>
    <li>Ben Adam</li>
    <li>Lynn Fisher</li>
  </ul>
</aside>`;

  const reactComponentExample = `
// Authors.jsx
export default function Authors() {
  return (
    <aside>
      <h2>Authors</h2>
      <ul>
        <li>Tyler McGinnis</li>
        <li>Ben Adam</li>
        <li>Lynn Fisher</li>
      </ul>
    </aside>
  );
}`;

  const componentUsageExample = `
// App.jsx
import Authors from './Authors';

export default function About() {
  return (
    <main>
      <h1>About Us</h1>
      <p>We write JavaScript and words about JavaScript.</p>
      <Authors />
    </main>
  );
}`;

  const fileOrganizationExample = `
// HomePage.jsx
import SharedComponents from './SharedComponents';

function Timeline() { /* ... */ }
function Trending() { /* ... */ }

export default function HomePage() {
  return (
    <main>
      <SharedComponents.Sidebar />
      <Timeline />
      <SharedComponents.Search />
      <Trending />
      <SharedComponents.Footer />
    </main>
  );
}`;

  const pureComponentExample = `
// PureUserCard.jsx
export default function UserCard({ user }) {
  return (
    <div className="card">
      <h2>{user.name}</h2>
      <p>Joined: {new Date(user.joinDate).toLocaleDateString()}</p>
      <p>Posts: {user.postCount}</p>
    </div>
  );
}`;

  return (
    <div className="flex flex-col gap-3">
      <h1 className="scroll-m-20 text-4xl font-extrabold tracking-tight lg:text-5xl mb-[20px]">
        React Components
      </h1>

      <section>
        <h2 className="text-2xl font-bold mb-4">From HTML to Components</h2>
        <div className="grid grid-cols-2 gap-4 mb-[20px]">
          <div>
            <h3 className="font-bold mb-2">Static HTML</h3>
            <CodeHighlighter code={htmlExample} lang="html" theme="vitesse-dark" />
          </div>
          <div>
            <h3 className="font-bold mb-2">React Component</h3>
            <CodeHighlighter code={reactComponentExample} lang="javascript" theme="vitesse-dark" />
          </div>
        </div>
      </section>

      <section>
        <h2 className="text-2xl font-bold mb-4">Component Fundamentals</h2>
        <div className="grid grid-cols-2 gap-4 mb-[20px]">
          <div className="p-4 bg-blue-50 rounded-lg">
            <h3 className="font-bold mb-2">Capitalization Matters</h3>
            <p className="mb-2">React components must start with uppercase letter:</p>
            <CodeHighlighter 
              code="<Authors />  // Component\n<footer />   // HTML element" 
              lang="javascript" 
              theme="vitesse-dark" 
            />
          </div>
          <div className="p-4 bg-green-50 rounded-lg">
            <h3 className="font-bold mb-2">Component Composition</h3>
            <CodeHighlighter code={componentUsageExample} lang="javascript" theme="vitesse-dark" />
          </div>
        </div>
      </section>

      <section>
        <h2 className="text-2xl font-bold mb-4">File Organization Strategies</h2>
        <div className="mb-[20px]">
          <CodeHighlighter 
            code={fileOrganizationExample} 
            lang="javascript" 
            theme="vitesse-dark" 
          />
          <div className="mt-4 p-4 bg-yellow-50 rounded-lg">
            <h3 className="font-bold mb-2">Organization Rules</h3>
            <ul className="list-disc pl-6 space-y-2">
              <li>Reusable components → Separate files</li>
              <li>Single-use components → Colocate in parent file</li>
              <li>Shared components → Index file/barrel exports</li>
            </ul>
          </div>
        </div>
      </section>

      <section>
        <h2 className="text-2xl font-bold mb-4">Pure Components in Practice</h2>
        <div className="grid grid-cols-2 gap-4 mb-[20px]">
          <div>
            <CodeHighlighter 
              code={pureComponentExample} 
              lang="javascript" 
              theme="vitesse-dark" 
            />
            <p className="text-sm text-gray-600 mt-2">
              Pure component: Output depends only on props, no side effects
            </p>
          </div>
          <div className="p-4 bg-red-50 rounded-lg">
            <h3 className="font-bold mb-2">Handling Side Effects</h3>
            <ul className="list-disc pl-6 space-y-2">
              <li>Use useEffect hook for data fetching</li>
              <li>Isolate state management in custom hooks</li>
              <li>Keep UI rendering pure</li>
            </ul>
          </div>
        </div>
      </section>

      <section className="mt-8">
        <h2 className="text-2xl font-bold mb-4">Component Design Principles</h2>
        <div className="grid grid-cols-3 gap-4">
          <div className="p-4 bg-purple-100 rounded-lg">
            <h3 className="font-bold mb-2">Single Responsibility</h3>
            <p>Each component should manage one logical piece of UI</p>
          </div>
          <div className="p-4 bg-green-100 rounded-lg">
            <h3 className="font-bold mb-2">Composability</h3>
            <p>Design components to work together through props</p>
          </div>
          <div className="p-4 bg-blue-100 rounded-lg">
            <h3 className="font-bold mb-2">Reusability</h3>
            <p>Create flexible components through prop customization</p>
          </div>
        </div>
      </section>
    </div>
  );
}