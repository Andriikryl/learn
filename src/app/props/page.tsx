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
  );
}
