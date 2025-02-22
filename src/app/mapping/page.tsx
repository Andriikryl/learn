"use client";
import CodeHighlighter from "@/components/CodeHighlighter";

export default function MappingOverData() {
  const dataArray = `
const data = [
  {
    id: 'sunita-abc123',
    name: 'Sunita Kumar',
    job: 'Electrical Engineer',
    email: 'sunita.kumar@acme.co',
  },
  {
    id: 'henderson-def456',
    name: 'Henderson G. Sterling II',
    job: 'Receptionist',
    email: 'henderson-the-second@acme.co',
  },
  {
    id: 'aio-ghi789',
    name: 'Aoi Kobayashi',
    job: 'President',
    email: 'kobayashi.aoi@acme.co',
  },
];`;

  const incorrectMap = `
return (
  <ul>
    {data.map((contact) => {
      <ContactCard
        name={contact.name}
        job={contact.job}
        email={contact.email}
      />
    })}
  </ul>
);
  `;

  const correctMap = `
return (
  <ul>
    {data.map((contact) => (
      <ContactCard
        key={contact.id}
        name={contact.name}
        job={contact.job}
        email={contact.email}
      />
    ))}
  </ul>
);
  `;

  const jsxInsideJsx = `
<ul>
  {items.map(item => (
    <li>{item}</li>
  ))}
</ul>
  `;

  const compiledJsx = `
React.createElement(
  'ul',
  {},
  items.map(item => (
    React.createElement(
      'li',
      {},
      item
    )
  ))
);
  `;

  return (
    <div className="flex flex-col gap-3">
      <h1 className="scroll-m-20 text-4xl font-extrabold tracking-tight lg:text-5xl mb-[20px]">
        Mapping Over Data
      </h1>
      <p>
        Alright, so let's suppose that the data for our CRM is held in an array,
        like this:
      </p>
      <div className="mb-[20px]">
        <CodeHighlighter code={dataArray} lang="javascript" theme="vitesse-dark" />
      </div>
      <p>
        We want to create a {'<ContactCard>'} element for each of the contacts
        in the data array, passing in their name, job, and email.
      </p>
      <p>
        In other frameworks like Vue and Angular, special syntax is provided for
        doing iteration. In React, however, we rely purely on JavaScript.
      </p>
      <p>
        If you're feeling adventurous, spend a few minutes and see if you can
        figure out how to solve this problem! Experiment and see what happens!
      </p>
      <h2 className="text-2xl font-bold">My Approach</h2>
      <p>
        Unlike in other template languages, there is no directive like v-for or
        #each to help with iteration. We rely on JavaScript's built-in array
        methods.
      </p>
      <p>
        The most common way is using the {'map'} method. However, there's a
        common mistake when using {'map'}, as shown below:
      </p>
      <div className="mb-[20px]">
        <CodeHighlighter code={incorrectMap} lang="javascript" theme="vitesse-dark" />
      </div>
      <p>
        The issue is that the {'<ContactCard>'} elements are not being returned
        inside the {'map'} function. We can fix this using the correct syntax:
      </p>
      <div className="mb-[20px]">
        <CodeHighlighter code={correctMap} lang="javascript" theme="vitesse-dark" />
      </div>
      <p>
        Also, note that React requires a unique {'key'} prop for each item
        rendered in a list.
      </p>
      <h2 className="text-2xl font-bold">JSX Inside JS Inside JSX</h2>
      <p>
        When iterating in React, it's common to have JSX inside JavaScript,
        inside JSX. For example:
      </p>
      <div className="mb-[20px]">
        <CodeHighlighter code={jsxInsideJsx} lang="javascript" theme="vitesse-dark" />
      </div>
      <p>
        The JSX compiler resolves nested JSX calls without issue. Under the hood,
        this compiles to:
      </p>
      <div className="mb-[20px]">
        <CodeHighlighter code={compiledJsx} lang="javascript" theme="vitesse-dark" />
      </div>
    </div>
  );
}
