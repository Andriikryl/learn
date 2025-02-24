"use client";
import CodeHighlighter from "@/components/CodeHighlighter";

export default function ReduceGuide() {
  return (
    <div className="flex flex-col gap-6">
      {/* Header */}
      <header>
        <h1 className="scroll-m-20 text-4xl font-extrabold tracking-tight lg:text-5xl">
          Reduce in JavaScript
        </h1>
      </header>

      {/* Introduction */}
      <section>
        <p>
          When interviewing candidates, I used to ask them about several native
          Array methods in JavaScript and have them implement one on paper—like
          some or map. Most know functions can be passed around, so this shouldn’t
          be too hard. Yet, the <code>reduce</code> function was most rarely mentioned.
        </p>
        <p>
          Last week Sophie Alpert tweeted about her rule for the
          <code>reduce</code> function. This sparked a hot discussion, especially
          regarding the last two rules, which many found controversial.
        </p>
        <p>
          I use <code>reduce</code> a lot—not just for summing or multiplying
          numbers, but also for composing new arrays or objects. Sophie's rule made
          me reconsider the function's power.
        </p>
      </section>

      {/* Reduce vs Fold */}
      <section>
        <h2 className="text-2xl font-bold mb-4">Reduce vs Fold</h2>
        <p>
          <code>reduce</code> is a higher-order function that’s often called{" "}
          <code>fold</code> in functional programming languages. I prefer the name
          <code>fold</code> because it evokes the idea of "folding" a list, much like
          folding a fan.
        </p>
        <p>
          In JavaScript, <code>reduce</code> traverses an array from left to right,
          while <code>reduceRight</code> does so in the opposite direction. Many
          languages use names like <code>foldl</code> and <code>foldr</code> for these
          operations.
        </p>
        <p>
          Note: if no initial value is supplied, the first element of the array is
          used. For example:
        </p>
        <CodeHighlighter
          code={`[1, 2, 3].reduce((a, b) => a + b, 0);`}
          lang="javascript"
          theme="vitesse-dark"
        />
        <CodeHighlighter
          code={`// The 1st element is used as the initial value when missing:
[1, 2, 3].reduce((a, b) => a + b);`}
          lang="javascript"
          theme="vitesse-dark"
        />
      </section>

      {/* Two Tasks */}
      <section>
        <h2 className="text-2xl font-bold mb-4">Two Tasks</h2>
        <p>
          Consider the following data:
        </p>
        <CodeHighlighter
          code={`const scoreArray = [
  { name: 'Jim', score: 99 },
  { name: 'Han', score: 55 },
  { name: 'Tom', score: 87 },
  { name: 'Ana', score: 50 }
];`}
          lang="javascript"
          theme="vitesse-dark"
        />
        <h3 className="text-xl font-semibold mt-4">a) Get the total score</h3>
        <p>Using a normal loop:</p>
        <CodeHighlighter
          code={`function getScoreSum(array) {
  let ret = 0;
  array.forEach(item => {
    ret += item.score;
  });
  return ret;
}`}
          lang="javascript"
          theme="vitesse-dark"
        />
        <p>With <code>reduce</code> (after abstracting the pattern):</p>
        <CodeHighlighter
          code={`function getScoreSum(array) {
  return reduce(array, (ret, item) => ret + item.score, 0);
}`}
          lang="javascript"
          theme="vitesse-dark"
        />
        <h3 className="text-xl font-semibold mt-4">b) Get the item with the highest score</h3>
        <p>Using a normal loop:</p>
        <CodeHighlighter
          code={`function getHighest(array) {
  let ret = {};
  array.forEach(item => {
    if (!ret.score || (ret.score < item.score)) {
      ret = item;
    }
  });
  return ret;
}`}
          lang="javascript"
          theme="vitesse-dark"
        />
        <p>Using <code>reduce</code>:</p>
        <CodeHighlighter
          code={`function getHighest(array) {
  return reduce(array, (ret, item) => ret.score > item.score ? ret : item, {});
}`}
          lang="javascript"
          theme="vitesse-dark"
        />
      </section>

      {/* Seeing Patterns */}
      <section>
        <h2 className="text-2xl font-bold mb-4">Seeing Patterns</h2>
        <p>
          Both functions share a common pattern:
          <br />
          1. An initial value.
          <br />
          2. A rule for updating that value with each item.
          <br />
          3. Returning the final result.
        </p>
        <p>
          We can abstract this repeated pattern with a custom{" "}
          <code>reduce</code> implementation:
        </p>
        <CodeHighlighter
          code={`function reduce(array, rule, initial) {
  // initialization
  let result = initial;
  // traverse through the list and update the result
  array.forEach(item => {
    result = rule(result, item);
  });
  // return the final result
  return result;
}`}
          lang="javascript"
          theme="vitesse-dark"
        />
        <p>
          And, for example, we can define a reusable rule:
        </p>
        <CodeHighlighter
          code={`function maxByScore(a, b) {
  return a.score > b.score ? a : b;
}

function getHighest(array) {
  return reduce(array, maxByScore, {});
}`}
          lang="javascript"
          theme="vitesse-dark"
        />
      </section>

      {/* The Difference */}
      <section>
        <h2 className="text-2xl font-bold mb-4">The Difference</h2>
        <p>
          Note the distinction: <code>getScoreSum</code> returns a number, while{" "}
          <code>getHighest</code> returns an object. When the returned type differs
          from the array element type, it’s considered asymmetrical.
        </p>
        <p>
          To allow omitting the initial value when the function is symmetrical, we
          can modify our <code>reduce</code>:
        </p>
        <CodeHighlighter
          code={`function reduce(array, rule, initial) {
  let hasInitial = arguments.length > 2;
  // Use first element as initial value if none provided
  let result = hasInitial ? initial : array[0];
  let start = hasInitial ? 0 : 1;
  for (let i = start; i < array.length; ++i) {
    result = rule(result, array[i]);
  }
  return result;
}`}
          lang="javascript"
          theme="vitesse-dark"
        />
        <p>
          Now, <code>getHighest</code> can be as simple as:
        </p>
        <CodeHighlighter
          code={`function getHighest(array) {
  return reduce(array, (a, b) => a.score > b.score ? a : b);
}`}
          lang="javascript"
          theme="vitesse-dark"
        />
      </section>

      {/* Building Up a List */}
      <section>
        <h2 className="text-2xl font-bold mb-4">Building Up a List</h2>
        <p>
          <code>reduce</code> is also very useful for constructing new arrays. For
          example, to implement a shallow flatten function:
        </p>
        <p>Using a loop:</p>
        <CodeHighlighter
          code={`function flat(array) {
  let ret = [];
  array.forEach(n => {
    ret = ret.concat(n);
  });
  return ret;
}`}
          lang="javascript"
          theme="vitesse-dark"
        />
        <p>Using <code>reduce</code>:</p>
        <CodeHighlighter
          code={`function flat(array) {
  return array.reduce((ret, n) => ret.concat(n), []);
}`}
          lang="javascript"
          theme="vitesse-dark"
        />
        <p>
          To flatten deeply nested arrays, we can write:
        </p>
        <CodeHighlighter
          code={`function flat(array) {
  return array.reduce((ret, n) =>
    ret.concat(Array.isArray(n) ? flat(n) : n), []
  );
}`}
          lang="javascript"
          theme="vitesse-dark"
        />
      </section>

      {/* Other Examples */}
      <section>
        <h2 className="text-2xl font-bold mb-4">Other Examples</h2>
        <p>
          Other useful functions can be implemented with <code>reduce</code>. For
          example:
        </p>
        <CodeHighlighter
          code={`function map(L, fn) {
  return L.reduce((acc, n, i) => [...acc, fn(n, i, L)], []);
}

function reverse(L) {
  return L.reduce((acc, n) => [n, ...acc], []);
}

function join(L, sep = '') {
  return L.reduce((a, b) => a + sep + b);
}

function length(L) {
  return L.reduce(acc => acc + 1, 0);
}`}
          lang="javascript"
          theme="vitesse-dark"
        />
      </section>

      {/* Thoughts */}
      <section>
        <h2 className="text-2xl font-bold mb-4">Thoughts</h2>
        <p>
          Abstractions are ways of thinking. Even if performance isn’t crucial,
          I prefer to use <code>reduce</code> whenever appropriate because it
          lets me focus on the essence of the transformation and write less code.
        </p>
      </section>
    </div>
  );
}
