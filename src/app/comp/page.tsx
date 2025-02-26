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
    <>
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
    <div className="flex flex-col gap-6 p-6">

      <div>
        <h1 className="scroll-m-20 text-4xl font-extrabold tracking-tight lg:text-5xl">
          The Spectrum of Components
        </h1>
        <p className="text-sm text-gray-600">A discussion on component abstraction in React</p>
      </div>

      <section>
        <p>
          So, here's an implementation of a <code>&lt;Banner /&gt;</code> component meant to show the user a message.
        </p>
      </section>

      <section>
        <h2 className="text-2xl font-bold mb-4">Original Banner Implementation</h2>
        <p>
          The following code shows a <code>Banner</code> component that includes some business logic (for example, checking a user's registration status) along with UI concerns.
        </p>
        <CodeHighlighter
          code={`import React from 'react';
import styles from './Banner.module.css';

function Banner({ type, user, children }) {
  const backgroundColor = type === 'success'
    ? 'var(--color-success)'
    : 'var(--color-error)';
  
  // Only logged in, verified users are allowed to see the banner
  if (!user || user.registrationStatus === 'unverified') {
    return null;
  }
  
  return (
    <div className={styles.banner} style={{ backgroundColor }}>
      {children}
    </div>
  );
}

export default Banner;`}
          lang="javascript"
          theme="vitesse-dark"
        />
      </section>

      {/* The Spectrum of Components Discussion */}
      <section>
        <h2 className="text-2xl font-bold mb-4">Discussion: The Spectrum of Components</h2>
        <p>
          When considering components, imagine a spectrum. On the left end, you have generic, low-level LEGO brick components like{" "}
          <code>&lt;Button /&gt;</code> or <code>&lt;Modal /&gt;</code>. As you move right, the components become more application-specific—like a{" "}
          <code>&lt;LoginForm /&gt;</code> or <code>&lt;UserProfileCard /&gt;</code>—and are more tightly coupled to your business logic.
        </p>
        <p>
          In our original <code>&lt;Banner /&gt;</code> component, we see that while it looks like a generic UI component, it also contains business logic (checking if the user is logged in and verified). This means it “stretches out” along the spectrum.
        </p>
      </section>

      {/* Improved Banner: Splitting Responsibilities */}
      <section>
        <h2 className="text-2xl font-bold mb-4">
          Improved Approach: Splitting Responsibilities
        </h2>
        <p>
          One way to address this is by splitting the responsibilities into two components:
        </p>
        <ul className="list-disc pl-6 space-y-1">
          <li>
            <code>&lt;Banner /&gt;</code> – a low-level, reusable UI component.
          </li>
          <li>
            <code>&lt;LoggedInBanner /&gt;</code> – a mid-level component that applies the business logic and then renders a <code>&lt;Banner /&gt;</code> if appropriate.
          </li>
        </ul>
        <p>The improved implementation might look like this:</p>
        <CodeHighlighter
          code={`function Banner({ type, children }) {
  const backgroundColor = type === 'success'
    ? 'var(--color-success)'
    : 'var(--color-error)';

  return (
    <div className={styles.banner} style={{ backgroundColor }}>
      {children}
    </div>
  );
}

export function LoggedInBanner({ type, user, children }) {
  if (!user || user.registrationStatus === 'unverified') {
    return null;
  }

  return <Banner type={type}>{children}</Banner>;
}

export default Banner;`}
          lang="javascript"
          theme="vitesse-dark"
        />
        <p>
          Now, the low-level <code>&lt;Banner /&gt;</code> only deals with UI concerns, while{" "}
          <code>&lt;LoggedInBanner /&gt;</code> encapsulates the business logic.
        </p>
      </section>

      {/* Black Friday Sale Banner Example */}
      <section>
        <h2 className="text-2xl font-bold mb-4">
          Example: Black Friday Sale Banner
        </h2>
        <p>
          To further illustrate the benefits of this approach, consider a special banner for a Black Friday sale. Instead of cluttering the low-level <code>&lt;Banner /&gt;</code> with extra logic, we create a new high-level component:
        </p>
        <CodeHighlighter
          code={`function BlackFridaySaleBanner({ saleStartDate, saleEndDate }) {
  // Check if the banner should be shown
  const now = new Date();
  if (now < saleStartDate || now > saleEndDate) {
    return null;
  }

  // Hardcode the type and children since these should not change
  return (
    <Banner type="success">
      We're having a Black Friday sale! Get 50% off selected products.
    </Banner>
  );
}`}
          lang="javascript"
          theme="vitesse-dark"
        />
        <p>
          This design allows all banners to share the same UI logic in <code>&lt;Banner /&gt;</code>, so that any design updates (padding, colors, etc.) automatically propagate to all variations.
        </p>
      </section>

      {/* Final Thoughts */}
      <section>
        <h2 className="text-2xl font-bold mb-4">Final Thoughts</h2>
        <p>
          Organizing components along a spectrum—from low-level, generic LEGO bricks to high-level,
          application-specific views—helps keep your code simple and maintainable. By splitting the{" "}
          <code>&lt;Banner /&gt;</code> component into a base UI component and a wrapper that contains
          business logic, we gain both flexibility and clarity. As requirements change, you can spin
          off new specialized variants (like a <code>&lt;BlackFridaySaleBanner /&gt;</code>) without
          overloading your base components.
        </p>
        <p>
          This mental model has been a game changer in building scalable React applications.
        </p>
      </section>

      {/* Additional Resources */}
      <section>
        <h2 className="text-2xl font-bold mb-4">Additional Resources</h2>
        <p>
          A few years ago, Facebook developer Cheng Lou gave a talk at React Europe titled “On the Spectrum
          of Abstraction.” Although it can be challenging to follow at first, it’s full of fascinating insights.
          It’s well worth watching if you want to deepen your understanding of component design.
        </p>
      </section>
    </div>
    </>
  );
}