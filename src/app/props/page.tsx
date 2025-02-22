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
      <p>
        {" "}
        <p>
          This works… but it feels a bit funny, doesn't it? It's quite different
          from how we use a typical HTML button, where the content goes
          in-between the open and close tags:
        </p>
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
    </div>
  );
}
