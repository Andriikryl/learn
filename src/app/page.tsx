"use client";
import { useState } from "react";
import Link from "next/link";
import { Input } from "@/components/ui/input";

const data = {
  navMain: [
    {
      title: "Fundamentals",
      url: "/",
      isActive: true,
      items: [
        { title: "Imperative vs Declarative Programming", url: "/typesProgram" },
        { title: "Pure Functions", url: "/pureFunction" },
        { title: "Hello World", url: "/hello" },
        { title: "Build React", url: "/build" },
        { title: "JSX", url: "/jsx" },
        { title: "Syntax", url: "/syntax" },
        { title: "Components", url: "/comp" },
        { title: "Props", url: "/props" },
        { title: "Fragments", url: "/fragments" },
        { title: "Mapping", url: "/mapping" },
        { title: "Keys", url: "/keys" },
        { title: "Conditional", url: "/conditional" },
        { title: "&& Operator", url: "/logicalAnd" },
        { title: "Ternary Operator", url: "/ternary" },
        { title: "Rendering", url: "/rendering" },
        { title: "Hydration", url: "/hydration" },
      ],
    },
    {
      title: "State",
      url: "#",
      items: [
        { title: "Handlers", url: "/handlers" },
        { title: "useState", url: "/useState" },
        { title: "React Loop", url: "/loop" },
        { title: "Render", url: "/render" },
        { title: "Binding", url: "/binding" },
        { title: "Props vs. State", url: "/propsState" },
        { title: "Forms", url: "/forms" },
      ],
    },
    {
      title: "Hooks",
      url: "#",
      items: [
        { title: "Rules of Hooks", url: "/rulesHooks" },
        { title: "useId", url: "/useId" },
        { title: "Refs", url: "/refs" },
        { title: "Effects", url: "/effects" },
        { title: "Cleanup", url: "/cleanup" },
        { title: "Strict Mode", url: "/strictMode" },
        { title: "Custom Hooks", url: "/customHooks" },
        { title: "Fetching data", url: "/fetching" },
        { title: "Memoization", url: "/memoization" },
        { title: "UseMemo Hook", url: "/useMemoHook" },
      ],
    },
    {
      title: "TypeScript",
      url: "#",
      items: [{ title: "Types -> Sets", url: "/sets" }],
    },
    {
      title: "JavaScript",
      url: "#",
      items: [{ title: "Equal", url: "/equal" }, { title: "Function Composition", url: "/functionComposition"}],
    },
  ],
};

export default function Home() {
  const [search, setSearch] = useState("");

  // Filtered items
  const filteredData = data.navMain.flatMap((section) =>
    section.items.filter((item) =>
      item.title.toLowerCase().includes(search.toLowerCase())
    )
  );

  return (
    <div>
      <Input
        type="text"
        placeholder="Search..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        className="w-full p-2 border rounded mb-4"
      />

      <ul className="space-y-2">
        {filteredData.length > 0 ? (
          filteredData.map((item, index) => (
            <li key={index} className=" border-b-2 border-black pb-2">
              <Link className="leading-7 [&:not(:first-child)]:mt-6" href={item.url}>{item.title}</Link>
            </li>
          ))
        ) : (
          <li className="text-gray-500">No results found.</li>
        )}
      </ul>
    </div>
  );
}
