"use client";
import CodeHighlighter from "@/components/CodeHighlighter";

export default function Fragments() {
  const comp = `
    <h1>Welcome to my homepage!</h1>
    <p>Don't forget to sign the guestbook!</p>
    `;
  const compJs = `
return (
  <div>
    <h1>Welcome to my homepage!</h1>
    <p>Don't forget to sign the guestbook!</p>
  </div>
);
    `;
  const exoperator = `
return (
  React.createElement(
    'div',
    {},
    React.createElement('h1', {}, 'Welcome…'),
    React.createElement('p', {}, "Don't forget…"),
  );
);
  `;
  const defOp = `
 return (
  <>
    <h1>Welcome to my homepage!</h1>
    <p>Don't forget to sign the guestbook!</p>
  </>
);`;
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
  return (
    <div className="flex flex-col gap-3">
      <h1 className="scroll-m-20 text-4xl font-extrabold tracking-tight lg:text-5xl mb-[20px]">
        Fragments
      </h1>
      <p className="mb-[20px]">
        Let's suppose we want to wind up with the following HTML:
      </p>
      <div className="mb-[20px]">
        <CodeHighlighter code={comp} lang="javascript" theme="vitesse-dark" />
      </div>
      <p>
        We copy/paste this HTML into our React application, turning it into JSX.
        We wind up getting an error though:
      </p>
      <p>
        The error message is telling us to use a “JSX fragment”, and we'll learn
        all about that shortly. But first, let's take a moment and think about
        it. Why does this produce an error? Spend a couple minutes tinkering
        with the problem. Can you figure out why this is invalid?
      </p>
      <p>One option is to wrap both React elements in a div:</p>
      <div className="mb-[20px]">
        <CodeHighlighter code={compJs} lang="javascript" theme="vitesse-dark" />
      </div>
      <p>If we examine the raw JS, we see that we're no longer returning multiple expressions:</p>
      <div className="mb-[20px]">
        <CodeHighlighter
          code={exoperator}
          lang="javascript"
          theme="vitesse-dark"
        />
      </div>
      <p>
      Shorthand
      React fragments can also be created using the following syntax:
      </p>
      <div className="mb-[20px]">
        <CodeHighlighter code={defOp} lang="javascript" theme="vitesse-dark" />
      </div>
    </div>
  );
}
