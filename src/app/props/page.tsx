"use client";
import CodeHighlighter from "@/components/CodeHighlighter";

export default function Props() {
  const comp = `
    import React from 'react';
    import { createRoot } from 'react-dom/client';

    function FriendlyGreeting({ name }) {
    return (
    <p
    style={{
    fontSize: '1.25rem',
    textAlign: 'center',
    color: 'sienna',
    }}
    >
    Greetings, {name}!
    </p>
    );
    }

    // The video was filmed using React 17, and so
    // this playground has been updated for React 18.
    const root = createRoot(document.querySelector('#root'));

    root.render(
    <div>
    <FriendlyGreeting name="Josh" />
    <FriendlyGreeting name="Anita" />
    <FriendlyGreeting name="Rahul" />
    </div>
    );
    `;
  const compJs = `
    // If I know their name:
    Hey Josh!

    // If not:
    Hey there!
    `;
  const exoperator = `
    function FriendlyGreeting({ name }) {
    return (
        <p>
        Hey {name || 'there'}!
        </p>
    );
    }
  `;
  const defOp = `function FriendlyGreeting({ name = 'there' }) {
  return (
    <p>
      Hey {name}
    </p>
  );
}`;
  const costProps = `function RedButton({ contents }) {
  return (
    <button
      style={{
        color: 'white',
        backgroundColor: 'red',
      }}
    >
      {contents}
    </button>
  );
}`;
  const costExProps = `root.render(
  <RedButton contents="Don't click me" />
);`;
  const childProps = `<button>
  Don't click me
</button>`;
  const childPorpsEx = `function RedButton({ children }) {
  return (
    <button
      style={{
        color: 'white',
        backgroundColor: 'red',
      }}
    >
      {children}
    </button>
  );
}`;
const functionAnalogy = `
// Function composition analogy
function getProfilePic(username) {
  return "https://photo.fb.com/" + username
}

function getProfileLink(username) {
  return "https://www.fb.com/" + username
}

function getAvatarInfo(username) {
  return {
    pic: getProfilePic(username),
    link: getProfileLink(username),
  }
}

getAvatarInfo("tylermcginnis")`;

  const basicPropsExample = `
// Passing and accessing props
function Hello(props) {
  return <h1>Hello, {props.name}</h1>
}

export default function App() {
  return <Hello name='Tyler' />
}`;

  const multiplePropsExample = `
// Multiple props with destructuring
function Hello({ first, last }) {
  return <h1>Hello, {first} {last}</h1>
}

export default function App() {
  return <Hello first="Tyler" last="McGinnis" />
}`;

  const complexPropsExample = `
// Various prop types
<Profile
  username="tylermcginnis"
  authed={true}
  logout={handleLogout}
  header={<h1>👋</h1>}
  settings={{
    theme: "dark",
    notifications: true
  }}
/>`;

  const childrenPropExample = `
// Using props.children
function Header(props) {
  return <h1 className="header">{props.children}</h1>
}

function Layout(props) {
  return (
    <div className="layout">
      <Sidebar />
      {props.children}
      <Footer />
    </div>
  )
}

// Usage
<Layout>
  <h1>Main Content</h1>
  <p>This is the page body</p>
</Layout>`;

  const modalExample = `
// Modal component implementation
// Modal.jsx
export default function Modal({ children, onClose }) {
  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <button className="close-btn" onClick={onClose}>×</button>
        {children}
      </div>
    </div>
  )
}

// App.jsx
export default function App() {
  const [isOpen, setIsOpen] = React.useState(false)
  
  return (
    <main>
      <button onClick={() => setIsOpen(true)}>Open Modal</button>
      {isOpen && (
        <Modal onClose={() => setIsOpen(false)}>
          <h1>Custom Modal Content</h1>
          <p>This content is passed via children prop</p>
        </Modal>
      )}
    </main>
  )
}`;
  return (
    <>
    <div className="flex flex-col gap-3">
      <h1 className="scroll-m-20 text-4xl font-extrabold tracking-tight lg:text-5xl mb-[20px]">
        Props
      </h1>
      <p className="mb-[20px]">
        So far, our FriendlyGreeting component is kinda cool, but it isn't
        terribly useful. Every time we render FriendlyGreeting, we get the exact
        same result. It isn't flexible at all! Thankfully, components have a
        thing called props. Props are like arguments to a function: they allow
        us to pass data to our components, so that the components can include
        customizations based on the data. When I taught React at a local coding
        bootcamp, props were a common stumbling block. It can take a while for
        the concept to “click”. If you feel discouraged for not getting it right
        away, please know that it's normal to feel that way, and you can always
        ask questions in our community Discord! Alright, so let's suppose we
        want to tweak our greeting to take a person's name, so that we can greet
        them!
      </p>
      <div className="mb-[20px]">
        <CodeHighlighter code={comp} lang="javascript" theme="vitesse-dark" />
      </div>
      <p>Default values</p>
      <p>
        Let's suppose we're working on our FriendlyGreeting component. We want
        to greet the user, but there's a problem: We don't know everyone's name.
        I ran into this exact problem when I was building a tool to generate
        newsletter issues. I didn't know the name of every subscriber. If I
        didn't know their name, I wanted to render a “fallback” value:
      </p>
      <div className="mb-[20px]">
        <CodeHighlighter code={compJs} lang="javascript" theme="vitesse-dark" />
      </div>
      <p>We could do this in React with the || operator, like this:</p>
      <div className="mb-[20px]">
        <CodeHighlighter
          code={exoperator}
          lang="javascript"
          theme="vitesse-dark"
        />
      </div>
      <p>
        If name is provided, it'll be used. Otherwise, we'll fall back and use
        “there”. This method works, but there's an even better way to do this in
        React. We can specify default values for each prop:
      </p>
      <div className="mb-[20px]">
        <CodeHighlighter code={defOp} lang="javascript" theme="vitesse-dark" />
      </div>
      <h2 className="scroll-m-20 mb-[20px] border-b pb-2 text-3xl font-semibold tracking-tight first:mt-0">
        The Children Prop
      </h2>
      <p>
        Let's suppose that we're building a custom button component. It should
        look and act just like a regular HTML button, but it should have a red
        background and white text. We could write it like this:
      </p>
      <div className="mb-[20px]">
        <CodeHighlighter
          code={costProps}
          lang="javascript"
          theme="vitesse-dark"
        />
      </div>
      <p>And then we'd use it like this:</p>
      <div className="mb-[20px]">
        <CodeHighlighter
          code={costExProps}
          lang="javascript"
          theme="vitesse-dark"
        />
      </div>
      <p>
        This works… but it feels a bit funny, doesn't it? It's quite different
        from how we use a typical HTML button, where the content goes in-between
        the open and close tags:
      </p>
      <div className="mb-[20px]">
        <CodeHighlighter
          code={childProps}
          lang="javascript"
          theme="vitesse-dark"
        />
      </div>
      
        {" "}
        <p>
          This works… but it feels a bit funny, doesn't it? It's quite different
          from how we use a typical HTML button, where the content goes
          in-between the open and close tags:
        </p>
      
      <div className="mb-[20px]">
        <CodeHighlighter
          code={childPorpsEx}
          lang="javascript"
          theme="vitesse-dark"
        />
      </div>
      <p>
        children is a special value, a “reserved word” when it comes to props.
        But it's not that special. I think a lot of newcomers to React think
        that children is somehow distinct or different from other props. In
        fact, it's exactly the same.
      </p>
      <section>
        <h2 className="text-2xl font-bold mb-4">Props: Component Interface</h2>
        <div className="mb-[20px]">
          <CodeHighlighter code={functionAnalogy} lang="javascript" theme="vitesse-dark" />
          <div className="p-4 bg-blue-50 rounded-lg mt-4">
            <p>Props are to components what arguments are to functions</p>
          </div>
        </div>
      </section>

      <section>
        <h2 className="text-2xl font-bold mb-4">Passing Props</h2>
        <div className="grid grid-cols-2 gap-4 mb-[20px]">
          <div>
            <CodeHighlighter code={basicPropsExample} lang="javascript" theme="vitesse-dark" />
          </div>
          <div>
            <CodeHighlighter code={complexPropsExample} lang="javascript" theme="vitesse-dark" />
            <div className="p-4 bg-yellow-50 rounded-lg mt-4">
              <h3 className="font-bold mb-2">💡 Prop Rules</h3>
              <ul className="list-disc pl-6">
                <li>Strings: <code>name="value"</code></li>
                <li>Other types: <code>number={42}</code></li>
                <li>Boolean shorthand: <code>authed</code> vs <code>authed={true}</code></li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      <section>
        <h2 className="text-2xl font-bold mb-4">Accessing Props</h2>
        <div className="grid grid-cols-2 gap-4 mb-[20px]">
          <div>
            <CodeHighlighter code={multiplePropsExample} lang="javascript" theme="vitesse-dark" />
          </div>
          <div className="p-4 bg-green-50 rounded-lg">
            <h3 className="font-bold mb-2">Destructuring Pattern</h3>
            <CodeHighlighter 
              code={`function Hello({ first, last }) {\n  return <h1>Hello, {first} {last}</h1>\n}`} 
              lang="javascript" 
              theme="vitesse-dark" 
            />
          </div>
        </div>
      </section>

      <section>
        <h2 className="text-2xl font-bold mb-4">Children Prop</h2>
        <div className="mb-[20px]">
          <CodeHighlighter code={childrenPropExample} lang="javascript" theme="vitesse-dark" />
          <div className="p-4 bg-purple-50 rounded-lg mt-4">
            <p>Children allow component composition similar to HTML elements:</p>
            <CodeHighlighter 
              code={`<div>\n  <h1>Child content</h1>\n</div>`} 
              lang="html" 
              theme="vitesse-dark" 
            />
          </div>
        </div>
      </section>

      <section>
        <h2 className="text-2xl font-bold mb-4">Practical Example: Modal</h2>
        <div className="mb-[20px]">
          <CodeHighlighter code={modalExample} lang="javascript" theme="vitesse-dark" />
          <div className="p-4 bg-red-50 rounded-lg mt-4">
            <h3 className="font-bold mb-2">Component Structure</h3>
            <ul className="list-disc pl-6">
              <li>Modal handles overlay and closing logic</li>
              <li>Parent controls open/close state</li>
              <li>Content fully customizable via children</li>
            </ul>
          </div>
        </div>
      </section>

      <section className="mt-8">
        <h2 className="text-2xl font-bold mb-4">Key Takeaways</h2>
        <div className="grid grid-cols-3 gap-4">
          <div className="p-4 bg-blue-100 rounded-lg">
            <h3 className="font-bold mb-2">Composition</h3>
            <p>Props enable component reuse and composition</p>
          </div>
          <div className="p-4 bg-green-100 rounded-lg">
            <h3 className="font-bold mb-2">Type Flexibility</h3>
            <p>Props can be any JS value: strings, numbers, objects, even components</p>
          </div>
          <div className="p-4 bg-purple-100 rounded-lg">
            <h3 className="font-bold mb-2">Children Pattern</h3>
            <p>Special children prop enables HTML-like content nesting</p>
          </div>
        </div>
      </section>
    </div>
    <div className="flex flex-col gap-6">
      {/* Header */}
      <div>
        <h1 className="scroll-m-20 text-4xl font-extrabold tracking-tight lg:text-5xl">
          Prop Delegation
        </h1>
        <p className="text-sm text-gray-600">
          Learn how to forward props easily using rest parameters and spread syntax.
        </p>
      </div>

      {/* Forwarding Props – The Basic Idea */}
      <section>
        <p>
          In the Banner example from the Spectrum of Components lesson, our{" "}
          <code>LoggedInBanner</code> had to “forward” some props:
        </p>
        <CodeHighlighter
          code={`function LoggedInBanner({
  user,
  // These two props:
  type,
  children,
}) {
  if (!user || user.registrationStatus === 'unverified') {
    return null;
  }

  // ...are forwarded along to Banner:
  return <Banner type={type}>{children}</Banner>;
}`}
          lang="javascript"
          theme="vitesse-dark"
        />
      </section>

      {/* Using Rest Parameters for Delegation */}
      <section>
        <p>
          What if this component had 10 forwarded props instead of 2? React makes it simple by using rest parameters
          and the spread syntax.
        </p>
        <CodeHighlighter
          code={`function LoggedInBanner({
  user,
  // Collect all unspecified props:
  ...delegated
}) {
  if (!user || user.registrationStatus === 'unverified') {
    return null;
  }

  // And pass them onto Banner:
  return <Banner {...delegated} />;
}`}
          lang="javascript"
          theme="vitesse-dark"
        />
        <p>
          Some folks prefer to name the rest parameter <code>rest</code>:
        </p>
        <CodeHighlighter
          code={`function LoggedInBanner({
  user,
  ...rest
}) {
  if (!user || user.registrationStatus === 'unverified') {
    return null;
  }

  return <Banner {...rest} />;
}`}
          lang="javascript"
          theme="vitesse-dark"
        />
        <p>
          For consistency, we'll use <code>delegated</code> throughout.
          If you were to log <code>delegated</code> to the console, you’d see:
        </p>
        <CodeHighlighter
          code={`console.log(delegated);
/*
  {
    type: 'success',
    children: 'Account registered!',
  }
*/`}
          lang="javascript"
          theme="vitesse-dark"
        />
      </section>

      {/* How Spread Syntax Works */}
      <section>
        <p>
          To apply these props to our <code>Banner</code> element, we use spread syntax:
        </p>
        <CodeHighlighter
          code={`<Banner {...delegated} />`}
          lang="javascript"
          theme="vitesse-dark"
        />
        <p>
          This is equivalent to:
        </p>
        <CodeHighlighter
          code={`<Banner
  type={delegated.type}
  children={delegated.children}
/>`}
          lang="javascript"
          theme="vitesse-dark"
        />
        <p>
          And when transpiled to plain JavaScript, it becomes:
        </p>
        <CodeHighlighter
          code={`React.createElement(
  Banner,
  {
    type: delegated.type,
    ...delegated
  }
);`}
          lang="javascript"
          theme="vitesse-dark"
        />
      </section>

      {/* Spread Syntax Gotcha */}
      <section>
        <h2 className="text-2xl font-bold mb-4">Spread Syntax Gotcha (Warning)</h2>
        <p>
          It's common in JavaScript to use trailing commas, for example:
        </p>
        <CodeHighlighter
          code={`const someObject = {
  id: 1234,
  createdAt: '2022/07/01',
  modifiedAt: '2022/07/02',
  avatar: '/src/avatar.png', // <-- trailing comma here is fine
};`}
          lang="javascript"
          theme="vitesse-dark"
        />
        <p>
          However, if you try to add a trailing comma after a rest parameter:
        </p>
        <CodeHighlighter
          code={`function Slider({
  label,
  ...delegated, // <-- This comma causes an error
}) {}`}
          lang="javascript"
          theme="vitesse-dark"
        />
        <p>
          You'll get an error: "Unexpected trailing comma after rest element." Rest parameters must be the final item.
        </p>
      </section>

      {/* Supercharged HTML Tags */}
      <section>
        <h2 className="text-2xl font-bold mb-4">Supercharged HTML Tags</h2>
        <p>
          Many React components are simply enhanced wrappers around standard HTML elements.
          Consider the <code>TextInput</code> component:
        </p>
        <CodeHighlighter
          code={`import React from 'react';

function TextInput({ id, label, ...delegated }) {
  const generatedId = React.useId();
  const appliedId = id || generatedId;

  return (
    <div className="text-input">
      <label htmlFor={appliedId}>{label}</label>
      <input id={appliedId} {...delegated} />
    </div>
  );
}

export default TextInput;`}
          lang="javascript"
          theme="vitesse-dark"
        />
        <p>
          From a consumer's perspective, this <code>TextInput</code> behaves like an{" "}
          <code>&lt;input&gt;</code> element with added features (like automatic ID generation).
        </p>
        <p>
          For example, in a login form:
        </p>
        <CodeHighlighter
          code={`import TextInput from './TextInput';

function LoginForm() {
  const [email, setEmail] = React.useState('');
  const [password, setPassword] = React.useState('');

  function handleLogin() {
    alert(\`Logged in with \${email}\`);
  }

  return (
    <form onSubmit={handleLogin}>
      <TextInput
        required={true}
        data-test-id="login-email-field"
        label="Email"
        type="email"
        value={email}
        onChange={(event) => setEmail(event.target.value)}
      />
      <TextInput
        required={true}
        minLength={12}
        label="Password"
        type="password"
        value={password}
        onChange={(event) => setPassword(event.target.value)}
      />
      <button>Submit</button>
    </form>
  );
}

export default LoginForm;`}
          lang="javascript"
          theme="vitesse-dark"
        />
      </section>

      {/* Prop Delegation and TypeScript */}
      <section>
        <h2 className="text-2xl font-bold mb-4">Prop Delegation and TypeScript</h2>
        <p>
          In JavaScript, prop delegation forwards any extra props to an underlying DOM node.
          In TypeScript, you don’t need to list every possible attribute. Instead, you can
          leverage the <code>ComponentProps</code> helper. For more details, check out Matt Pocock’s
          article,{" "}
          <a
            className="text-blue-600 underline"
            href="https://mattpocock.com/componentprops-reacts-most-useful-type-helper"
            target="_blank"
            rel="noreferrer"
          >
            "ComponentProps: React's Most Useful Type Helper"
          </a>.
        </p>
      </section>
    </div>
    </>
  );
}
