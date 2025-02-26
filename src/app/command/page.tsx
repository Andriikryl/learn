"use client";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import CodeHighlighter from "@/components/CodeHighlighter";

export default function CommandPatternGuide() {
  return (
    <>    
    <div className="flex flex-col gap-6">
      <h1 className="scroll-m-20 text-4xl font-extrabold tracking-tight lg:text-5xl mb-6">
        Command Pattern
      </h1>

      {/* Introduction Section */}
      <Card>
        <CardHeader>
          <CardTitle>What is the Command Pattern?</CardTitle>
          <CardDescription>
            The Command Pattern decouples objects that execute tasks from the objects that invoke those tasks. It encapsulates a request as an object, allowing for parameterization, queuing, and logging of operations.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <p className="mb-4">
            In this example, we'll use an online food delivery platform to demonstrate how the Command Pattern can help manage orders (place, track, and cancel) in a decoupled way.
          </p>
        </CardContent>
      </Card>

      {/* Problem Section */}
      <Card>
        <CardHeader>
          <CardTitle>Problem: Tightly Coupled Code</CardTitle>
          <CardDescription>
            Directly invoking methods on an object can lead to tightly coupled code, making it difficult to maintain or extend.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <CodeHighlighter
            code={`class OrderManager {
  constructor() {
    this.orders = [];
  }

  placeOrder(order, id) {
    this.orders.push(id);
    return \`You have successfully ordered \${order} (\${id})\`;
  }

  trackOrder(id) {
    return \`Your order \${id} will arrive in 20 minutes.\`;
  }

  cancelOrder(id) {
    this.orders = this.orders.filter(order => order.id !== id);
    return \`You have canceled your order \${id}\`;
  }
}

const manager = new OrderManager();
manager.placeOrder("Pad Thai", "1234");
manager.trackOrder("1234");
manager.cancelOrder("1234");`}
            lang="javascript"
            theme="vitesse-dark"
          />
          <p className="mt-4">
            In this tightly coupled approach, renaming or modifying methods would require changes across the entire codebase.
          </p>
        </CardContent>
      </Card>

      {/* Solution Section */}
      <Card>
        <CardHeader>
          <CardTitle>Solution: Command Pattern</CardTitle>
          <CardDescription>
            By encapsulating each operation as a command, we can decouple the invoker from the receiver.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <CodeHighlighter
            code={`class OrderManager {
  constructor() {
    this.orders = [];
  }

  execute(command, ...args) {
    return command.execute(this.orders, ...args);
  }
}

class Command {
  constructor(execute) {
    this.execute = execute;
  }
}

function PlaceOrderCommand(order, id) {
  return new Command((orders) => {
    orders.push(id);
    return \`You have successfully ordered \${order} (\${id})\`;
  });
}

function CancelOrderCommand(id) {
  return new Command((orders) => {
    orders = orders.filter((order) => order.id !== id);
    return \`You have canceled your order \${id}\`;
  });
}

function TrackOrderCommand(id) {
  return new Command(() => \`Your order \${id} will arrive in 20 minutes.\`);
}`}
            lang="javascript"
            theme="vitesse-dark"
          />
          <p className="mt-4">
            Now, the <code>OrderManager</code> doesn't need to know the details of each operation. It simply executes commands.
          </p>
        </CardContent>
      </Card>

      {/* Usage Section */}
      <Card>
        <CardHeader>
          <CardTitle>Using the Command Pattern</CardTitle>
          <CardDescription>
            Here's how you can use the refactored <code>OrderManager</code> with commands.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <CodeHighlighter
            code={`const manager = new OrderManager();

manager.execute(new PlaceOrderCommand("Pad Thai", "1234"));
manager.execute(new TrackOrderCommand("1234"));
manager.execute(new CancelOrderCommand("1234"));`}
            lang="javascript"
            theme="vitesse-dark"
          />
          <p className="mt-4">
            This approach makes the code more flexible and easier to maintain.
          </p>
        </CardContent>
      </Card>

      {/* Pros and Cons Section */}
      <Card>
        <CardHeader>
          <CardTitle>Pros and Cons</CardTitle>
          <CardDescription>
            Advantages and disadvantages of using the Command Pattern.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <h3 className="font-bold mb-2">Pros</h3>
              <ul className="list-disc pl-6 space-y-2">
                <li>Decouples the invoker from the receiver.</li>
                <li>Supports queuing, logging, and undo operations.</li>
                <li>Makes the code more modular and extensible.</li>
              </ul>
            </div>
            <div>
              <h3 className="font-bold mb-2">Cons</h3>
              <ul className="list-disc pl-6 space-y-2">
                <li>Adds boilerplate code.</li>
                <li>Overkill for simple use cases.</li>
              </ul>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* References Section */}
      <Card>
        <CardHeader>
          <CardTitle>References</CardTitle>
          <CardDescription>
            Learn more about the Command Pattern from these resources.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <ul className="list-disc pl-6 space-y-2">
            <li>
              <a
                href="https://sourcemaking.com/design_patterns/command"
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-500 hover:underline"
              >
                Command Design Pattern - SourceMaking
              </a>
            </li>
            <li>
              <a
                href="https://refactoring.guru/design-patterns/command"
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-500 hover:underline"
              >
                Command Pattern - Refactoring Guru
              </a>
            </li>
            <li>
              <a
                href="https://carloscaballero.io/command-pattern/"
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-500 hover:underline"
              >
                Command Pattern - Carlos Caballero
              </a>
            </li>
          </ul>
        </CardContent>
      </Card>
    </div>
    <div className="flex flex-col gap-6">
      <h1 className="scroll-m-20 text-4xl font-extrabold tracking-tight lg:text-5xl mb-6">
        Command Pattern
      </h1>

      {/* Intent Section */}
      <Card>
        <CardHeader>
          <CardTitle>Intent</CardTitle>
          <CardDescription>
            Encapsulate a request as an object, allowing parameterization, queuing, logging, and undo operations.
          </CardDescription>
        </CardHeader>
      </Card>

      {/* Problem Section */}
      <Card>
        <CardHeader>
          <CardTitle>Problem</CardTitle>
          <CardDescription>
            Tight coupling between GUI elements and business logic operations.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <CodeHighlighter
            code={`// Tightly coupled implementation
class Button {
  onClick() {
    // Direct business logic access
    new CopyOperation().execute();
  }
}`}
            lang="javascript"
            theme="vitesse-dark"
          />
          <p className="mt-4">
            Direct method calls lead to rigid code structure and code duplication.
          </p>
        </CardContent>
      </Card>

      {/* Solution Section */}
      <Card>
        <CardHeader>
          <CardTitle>Solution</CardTitle>
          <CardDescription>
            Decouple senders and receivers through command objects.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <CodeHighlighter
            code={`interface Command {
  execute(): void;
  undo(): void;
}

class CopyCommand implements Command {
  constructor(private receiver: Editor) {}
  
  execute() { this.receiver.copy(); }
  undo() { this.receiver.undoCopy(); }
}`}
            lang="typescript"
            theme="vitesse-dark"
          />
        </CardContent>
      </Card>

      {/* Structure Section */}
      <Card>
        <CardHeader>
          <CardTitle>Structure</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-4 gap-4 text-sm">
            <div className="border p-2">
              <h3 className="font-bold">Sender</h3>
              <p>(Invoker)</p>
              <p>Triggers commands</p>
            </div>
            <div className="border p-2">
              <h3 className="font-bold">Command</h3>
              <p>Declares execution interface</p>
            </div>
            <div className="border p-2">
              <h3 className="font-bold">Concrete Command</h3>
              <p>Implements execute/undo</p>
            </div>
            <div className="border p-2">
              <h3 className="font-bold">Receiver</h3>
              <p>Performs actual work</p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Implementation Section */}
      <Card>
        <CardHeader>
          <CardTitle>Implementation</CardTitle>
        </CardHeader>
        <CardContent>
          <CodeHighlighter
            code={`// Command Interface
interface Command {
  execute(): boolean;
  undo(): void;
}

// Concrete Command
class CutCommand implements Command {
  private backup: string;
  
  constructor(private editor: Editor, private app: Application) {}
  
  execute() {
    this.backup = this.editor.getSelection();
    this.app.clipboard = this.backup;
    this.editor.deleteSelection();
    return true;
  }
  
  undo() {
    this.editor.replaceSelection(this.backup);
  }
}

// Invoker
class Button {
  constructor(private command: Command) {}
  
  click() {
    if (this.command.execute()) {
      CommandHistory.push(this.command);
    }
  }
}`}
            lang="typescript"
            theme="vitesse-dark"
          />
        </CardContent>
      </Card>

      {/* Applicability Section */}
      <Card>
        <CardHeader>
          <CardTitle>When to Use</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <h3 className="font-bold mb-2">Use When</h3>
              <ul className="list-disc pl-6">
                <li>Need undo/redo functionality</li>
                <li>Want to queue operations</li>
                <li>Need to decouple UI from business logic</li>
              </ul>
            </div>
            <div>
              <h3 className="font-bold mb-2">Avoid When</h3>
              <ul className="list-disc pl-6">
                <li>Simple operations without need for history</li>
                <li>Performance-critical applications</li>
              </ul>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Relations Section */}
      <Card>
        <CardHeader>
          <CardTitle>Relations with Other Patterns</CardTitle>
        </CardHeader>
        <CardContent>
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b">
                <th className="text-left p-2">Pattern</th>
                <th className="text-left p-2">Relationship</th>
              </tr>
            </thead>
            <tbody>
              <tr className="border-b">
                <td className="p-2">Memento</td>
                <td className="p-2">Used together for undo operations</td>
              </tr>
              <tr className="border-b">
                <td className="p-2">Strategy</td>
                <td className="p-2">Both parameterize objects, but different intent</td>
              </tr>
              <tr className="border-b">
                <td className="p-2">Observer</td>
                <td className="p-2">Alternative for event handling</td>
              </tr>
            </tbody>
          </table>
        </CardContent>
      </Card>

      {/* Pros/Cons Section */}
      <Card>
        <CardHeader>
          <CardTitle>Advantages & Disadvantages</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 gap-4">
            <div className="bg-green-50 p-4 rounded">
              <h3 className="font-bold mb-2">Pros</h3>
              <ul className="list-disc pl-6">
                <li>Single Responsibility Principle</li>
                <li>Open/Closed Principle</li>
                <li>Undo/Redo operations</li>
              </ul>
            </div>
            <div className="bg-red-50 p-4 rounded">
              <h3 className="font-bold mb-2">Cons</h3>
              <ul className="list-disc pl-6">
                <li>Increased complexity</li>
                <li>Potential memory overhead</li>
              </ul>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
    </>
  );
}