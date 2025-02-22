"use client";
import CodeHighlighter from "@/components/CodeHighlighter";

export default function Syntax() {
  const comp = `
    const heading = <h1>Hello!</h1>
    const greeting = <FriendlyGreeting />
    `;
  const compJs = `
    const heading = React.createElement('h1', null, 'Hello!');
    const greeting = React.createElement(FriendlyGreeting, null);
    `;
  return (
    <div className="flex flex-col gap-3">
      <h1 className="scroll-m-20 text-4xl font-extrabold tracking-tight lg:text-5xl mb-[20px]">
        Syntax
      </h1>
      <p className="mb-[20px]">
        In React, components are defined as JavaScript functions. They can also
        be defined using the class keyword, though this is considered a legacy
        alternative that isn't recommended in modern React applications.
        Typically, React components return one or more React elements. This
        component, FriendlyGreeting, creates a React element that describes a
        paragraph, with some built-in styles. For simplicity, we're using inline
        styles here; we'll talk more about React's rich styling ecosystem in an
        upcoming lesson. We render a component the same way we render an HTML
        tag. Instead of rendering a div or an h1, we render a FriendlyGreeting
      </p>
      <h2 className="scroll-m-20 mb-[20px] border-b pb-2 text-3xl font-semibold tracking-tight first:mt-0">
        The big component rule
      </h2>
      <p>
        There aren't a ton of rules when it comes to creating components, but
        there's an iron-clad one: React components need to start with a Capital
        Letter. This is how the JSX compiler can tell whether we're trying to
        render a built-in HTML tag, or a custom React component. For example,
        here are two JSX elements:
      </p>
      <div className="mb-[20px]">
        <CodeHighlighter code={comp} lang="javascript" theme="vitesse-dark" />
      </div>
      <p>And here are those same elements, compiled into JavaScript:</p>
      <div className="mb-[20px]">
        <CodeHighlighter code={compJs} lang="javascript" theme="vitesse-dark" />
      </div>
      <p>
        A React element is a description of a thing we want to create. In some
        cases, we want to create a DOM node, like an h1 or a p. In other cases,
        we want to create a component instance. The first argument that we pass
        to React.createElement is the “type” of the thing we want to create. For
        the first element, it's a string "h1". For the second element, it's a
        function! It's FriendlyGreeting, and not "FriendlyGreeting". The
        convention is to use PascalCase? for all React component names, though
        technically it's only the first letter that truly matters. We could name
        it Friendlygreeting, but it's much more conventional to go with
        FriendlyGreeting.
      </p>
    </div>
  );
}
