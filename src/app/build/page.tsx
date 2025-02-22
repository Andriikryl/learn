"use client"

import CodeHighlighter from "@/components/CodeHighlighter";

export default function Build() {
    const build = `
    function render(reactElement, containerDOMElement) {
    // 1. create a DOM element
    const domElement = document.createElement(reactElement.type);

    // 2. update properties
    domElement.innerText = reactElement.children;
    for (const key in reactElement.props) {
        const value = reactElement.props[key];
        domElement.setAttribute(key, value);
    }

    // 3. put it in the container
    containerDOMElement.appendChild(domElement);
    }
    `;
    return (
      <div>
        <h1 className="scroll-m-20 text-4xl font-extrabold tracking-tight lg:text-5xl mb-[20px]">Build React</h1>
        <div className="mb-[20px]">
        <CodeHighlighter
          code={build}
          lang="javascript"
          theme="vitesse-dark"
        />
      </div>
      </div>
    );
  }
  