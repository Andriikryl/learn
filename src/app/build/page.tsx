"use client";
import CodeHighlighter from "@/components/CodeHighlighter";

export default function ImplementingReactFromScratch() {
  // Core Type Definitions
  const componentTypes = `
export type ReactComponentInternalMetadata = {
  id: string;
  component: TagComponent | FunctionalComponent;
  props: AnyProps;
  children: Array<ReactComponentInternalMetadata>;
};

export type FunctionalComponent = {
  kind: "function";
  name: string;
  function: (props: any) => ReactComponentInternalMetadata;
};

export type ReactViewTreeNode = {
  id: string;
  childNodes: ReactViewTreeNode[];
  metadata: ReactComponentInternalMetadata;
  parent?: ReactViewTreeNode;
  hooks: any[];
  hasRendered: boolean;
};`;

  // createElement Implementation
  const createElementCode = `
export const createElement = (
  component: string | FunctionComponent,
  props: any,
  ...children: any[]
): ReactComponentInternalMetadata => {
  const processedChildren = children.flat(Infinity)
    .filter(child => child !== null && child !== undefined)
    .map(child => 
      typeof child === 'object' ? child : createTextElement(child)
    );

  return {
    id: crypto.randomUUID(),
    component: typeof component === 'string' 
      ? { kind: 'tag', tagName: component }
      : { kind: 'function', name: component.name, function: component },
    props: { ...props, children: processedChildren },
    children: processedChildren
  };
};`;

  // Virtual DOM Rendering
  const renderFunctionCode = `
const generateViewTree = (
  metadata: ReactComponentInternalMetadata,
  parentNode?: ReactViewTreeNode
): ReactViewTreeNode => {
  const node: ReactViewTreeNode = {
    id: metadata.id,
    metadata,
    childNodes: [],
    parent: parentNode,
    hooks: [],
    hasRendered: false
  };

  if (metadata.component.kind === 'function') {
    currentRenderingNode = node;
    const result = metadata.component.function(metadata.props);
    currentRenderingNode = undefined;
    
    const childTree = generateViewTree(result, node);
    node.childNodes.push(childTree);
  } else {
    node.childNodes = metadata.children.map(child => 
      generateViewTree(child, node)
    );
  }
  
  return node;
};`;

  // useState Hook Implementation
  const useStateCode = `
let hookIndex = 0;
let currentRenderingNode: ReactViewTreeNode | undefined;

export const useState = <T>(initialState: T): [T, (value: T) => void] => {
  if (!currentRenderingNode) throw new Error('Hooks must be called within components');
  
  const node = currentRenderingNode;
  const currentIndex = hookIndex++;
  
  if (!node.hasRendered) {
    node.hooks[currentIndex] = initialState;
  }

  const setState = (newValue: T) => {
    node.hooks[currentIndex] = newValue;
    scheduleReRender(node);
  };

  return [node.hooks[currentIndex], setState];
};`;

  // Reconciliation Algorithm
  const reconciliationCode = `
function reconcile(
  parentDom: HTMLElement,
  oldNode: ReactViewTreeNode,
  newNode: ReactViewTreeNode
) {
  // Key-based matching
  const oldChildren = oldNode.childNodes;
  const newChildren = newNode.childNodes;
  
  const keyMap = new Map();
  oldChildren.forEach(child => {
    if (child.metadata.props.key) {
      keyMap.set(child.metadata.props.key, child);
    }
  });

  newChildren.forEach((newChild, index) => {
    const key = newChild.metadata.props?.key;
    const oldChild = key ? keyMap.get(key) : oldChildren[index];
    
    if (!oldChild || !isSameNodeType(oldChild, newChild)) {
      // Create new node
      const domNode = createDomNode(newChild);
      parentDom.appendChild(domNode);
    } else {
      // Update existing node
      updateDomProperties(
        oldChild.domElement,
        oldChild.metadata.props,
        newChild.metadata.props
      );
      reconcile(oldChild.domElement, oldChild, newChild);
    }
  });
  
  // Remove old nodes
  oldChildren.forEach(oldChild => {
    if (!newChildren.some(newChild => newChild.id === oldChild.id)) {
      parentDom.removeChild(oldChild.domElement);
    }
  });
}`;

  // useEffect Implementation
  const useEffectCode = `
export const useEffect = (create: () => (void | (() => void)), deps: any[]) => {
  if (!currentRenderingNode) throw new Error('Hooks must be called within components');
  
  const node = currentRenderingNode;
  const currentIndex = hookIndex++;
  const prevDeps = node.hooks[currentIndex]?.deps;

  if (!node.hasRendered || !shallowEqual(deps, prevDeps)) {
    // Cleanup previous effect
    if (node.hooks[currentIndex]?.cleanup) {
      node.hooks[currentIndex].cleanup();
    }

    // Schedule new effect
    queueMicrotask(() => {
      const cleanup = create();
      node.hooks[currentIndex] = { deps, cleanup };
    });
  }
};`;

  // Context API Implementation
  const contextCode = `
const contextRegistry = new Map<string, any>();

export const createContext = <T>(defaultValue: T) => {
  const contextId = crypto.randomUUID();
  contextRegistry.set(contextId, defaultValue);

  return {
    _id: contextId,
    Provider: ({ value, children }: { value: T; children: any }) => {
      return createElement('context-provider', { 
        contextId, 
        value 
      }, children);
    },
    Consumer: ({ children }: { children: (value: T) => any }) => {
      return createElement('context-consumer', { 
        contextId 
      }, [children]);
    }
  };
};`;

const entryPointExample = `
// React Entry Point
import ReactDOM from 'react-dom/client';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(<div>My React App</div>);`;

  const fiberDefinition = `
// Fiber Structure
interface Fiber {
  tag: WorkTag, // Type of Fiber (e.g., FunctionComponent, ClassComponent).
  key: null | string, // Unique identifier.
  type: any, // Component type (function, class, or DOM element).
  stateNode: any, // Reference to the DOM node.
  child: Fiber | null, // First child Fiber.
  sibling: Fiber | null, // Next sibling Fiber.
  return: Fiber | null, // Parent Fiber.
  memoizedProps: any, // Current props.
  pendingProps: any, // New props.
  memoizedState: any, // Current state.
  updateQueue: mixed, // Queue of state updates.
  alternate: Fiber | null, // Alternate Fiber for updates.
  flags: Flags, // Phase/state flags.
  lanes: Lanes, // Priority lanes.
}`;

  const reconciliationExample = `
// Reconciliation Process
function reconcileChildren(current, workInProgress, nextChildren, renderLanes) {
  if (current === null) {
    workInProgress.child = mountChildFibers(workInProgress, null, nextChildren, renderLanes);
  } else {
    workInProgress.child = reconcileChildFibers(workInProgress, current.child, nextChildren, renderLanes);
  }
}`;

  const lifecyclePhases = `
// React Lifecycle Phases
1. Begin Phase: Determine component type and mount/update status.
2. Render Phase: Build the Virtual Tree.
3. Commit Phase: Prepare and apply changes.
4. Layout Phase: Bind to the real DOM and finalize updates.`;

  return (
    <>
     <div className="flex flex-col gap-3">
      <h1 className="scroll-m-20 text-4xl font-extrabold tracking-tight lg:text-5xl mb-[20px]">
        React Internals: Reconciliation, Renderers, Fiber, and Virtual Tree
      </h1>

      <section>
        <h2 className="text-2xl font-bold mb-4">Entry Point</h2>
        <div className="mb-[20px]">
          <CodeHighlighter code={entryPointExample} lang="javascript" theme="vitesse-dark" />
          <p className="text-sm text-gray-600 mt-2">
            The entry point for React applications is the <code>ReactDOM.createRoot</code> method, which initializes the root container and starts the rendering process.
          </p>
        </div>
      </section>

      <section>
        <h2 className="text-2xl font-bold mb-4">Reconciliation</h2>
        <div className="mb-[20px]">
          <p className="mb-4">
            Reconciliation is the process of comparing the Virtual DOM with the real DOM and applying changes efficiently. React uses a <strong>Fiber</strong> architecture to manage this process.
          </p>
          <CodeHighlighter code={reconciliationExample} lang="javascript" theme="vitesse-dark" />
        </div>
      </section>

      <section>
        <h2 className="text-2xl font-bold mb-4">Fiber Architecture</h2>
        <div className="mb-[20px]">
          <CodeHighlighter code={fiberDefinition} lang="typescript" theme="vitesse-dark" />
          <p className="text-sm text-gray-600 mt-2">
            A <strong>Fiber</strong> is a lightweight object representing a unit of work in React. It contains information about the component, its props, state, and relationships with other Fibers.
          </p>
        </div>
      </section>

      <section>
        <h2 className="text-2xl font-bold mb-4">Renderers</h2>
        <div className="mb-[20px]">
          <p className="mb-4">
            React uses different renderers for various platforms:
          </p>
          <ul className="list-disc pl-6 space-y-2">
            <li><strong>React DOM</strong>: For web applications.</li>
            <li><strong>React Native</strong>: For mobile applications.</li>
            <li><strong>React ART</strong>: For vector graphics.</li>
          </ul>
        </div>
      </section>

      <section>
        <h2 className="text-2xl font-bold mb-4">Lifecycle Phases</h2>
        <div className="mb-[20px]">
          <CodeHighlighter code={lifecyclePhases} lang="markdown" theme="vitesse-dark" />
          <p className="text-sm text-gray-600 mt-2">
            React's lifecycle is divided into four phases: Begin, Render, Commit, and Layout. Each phase handles specific tasks in the rendering process.
          </p>
        </div>
      </section>

      <section>
        <h2 className="text-2xl font-bold mb-4">Virtual Tree</h2>
        <div className="mb-[20px]">
          <p className="mb-4">
            The <strong>Virtual Tree</strong> is an in-memory representation of the UI. React builds this tree during the Render phase and applies changes to the real DOM during the Commit phase.
          </p>
        </div>
      </section>

      <section>
        <h2 className="text-2xl font-bold mb-4">Summary</h2>
        <div className="p-4 bg-purple-50 rounded-lg">
          <ul className="list-disc pl-6 space-y-2">
            <li>React uses a <strong>Fiber</strong> architecture to manage rendering and updates.</li>
            <li>The <strong>Reconciliation</strong> process compares the Virtual DOM with the real DOM and applies changes efficiently.</li>
            <li>React supports multiple renderers for different platforms (e.g., Web, Mobile, ART).</li>
            <li>The rendering process is divided into four phases: Begin, Render, Commit, and Layout.</li>
          </ul>
        </div>
      </section>
    </div>    
    <div className="flex flex-col gap-3">
      <h1 className="scroll-m-20 text-4xl font-extrabold tracking-tight lg:text-5xl mb-[20px]">
        Building React From Scratch
      </h1>

      {/* Core Architecture Section */}
      <section>
        <h2 className="text-2xl font-bold mb-4">Core Type Definitions</h2>
        <div className="mb-[20px]">
          <CodeHighlighter 
            code={componentTypes} 
            lang="typescript" 
            theme="vitesse-dark" 
          />
        </div>
      </section>

      {/* Virtual DOM Section */}
      <section>
        <h2 className="text-2xl font-bold mb-4">Virtual DOM Implementation</h2>
        <div className="mb-[20px]">
          <CodeHighlighter 
            code={createElementCode} 
            lang="typescript" 
            theme="vitesse-dark" 
          />
        </div>
        <div className="mb-[20px]">
          <CodeHighlighter 
            code={renderFunctionCode} 
            lang="typescript" 
            theme="vitesse-dark" 
          />
        </div>
      </section>

      {/* Hooks System Section */}
      <section>
        <h2 className="text-2xl font-bold mb-4">Hooks Implementation</h2>
        <div className="mb-[20px]">
          <CodeHighlighter 
            code={useStateCode} 
            lang="typescript" 
            theme="vitesse-dark" 
          />
        </div>
        <div className="mb-[20px]">
          <CodeHighlighter 
            code={useEffectCode} 
            lang="typescript" 
            theme="vitesse-dark" 
          />
        </div>
      </section>

      {/* Reconciliation Section */}
      <section>
        <h2 className="text-2xl font-bold mb-4">Reconciliation Algorithm</h2>
        <div className="mb-[20px]">
          <CodeHighlighter 
            code={reconciliationCode} 
            lang="typescript" 
            theme="vitesse-dark" 
          />
        </div>
      </section>

      {/* Context API Section */}
      <section>
        <h2 className="text-2xl font-bold mb-4">Context System</h2>
        <div className="mb-[20px]">
          <CodeHighlighter 
            code={contextCode} 
            lang="typescript" 
            theme="vitesse-dark" 
          />
        </div>
      </section>

      {/* Performance Considerations */}
      <section>
        <h2 className="text-2xl font-bold mb-4">Optimization Strategies</h2>
        <div className="grid gap-4">
          <div className="p-4 bg-gray-100 rounded-lg">
            <h3 className="font-bold mb-2">Key-based Reconciliation</h3>
            <p className="text-sm">
              Keys help React identify items that have changed/added/removed.
              Should be stable, predictable, and unique.
            </p>
          </div>
          
          <div className="p-4 bg-gray-100 rounded-lg">
            <h3 className="font-bold mb-2">Batched Updates</h3>
            <pre className="text-sm bg-white p-2 rounded">
              {`const scheduleReRender = debounce(performReRender, 16);`}
            </pre>
          </div>
        </div>
      </section>

      {/* Conclusion */}
      <section className="mt-8">
        <h2 className="text-2xl font-bold mb-4">Key Insights</h2>
        <ul className="list-disc pl-6 space-y-2">
          <li>Component trees are constructed through recursive createElement calls</li>
          <li>Hook state is stored per-component-instance using execution order</li>
          <li>Reconciliation uses dual-pass diffing (keys + index fallback)</li>
          <li>Context uses registry pattern with component tree traversal</li>
        </ul>
      </section>
    </div>
    </>
  );
}