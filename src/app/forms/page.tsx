"use client";
import CodeHighlighter from "@/components/CodeHighlighter";

export default function InputCheatsheet() {
  const textInputExample = `
function TextInput() {
  const [text, setText] = React.useState('');
  
  return (
    <input
      type="text"
      value={text}
      onChange={(e) => setText(e.target.value)}
    />
  );
}`;

  const textareaExample = `
function TextArea() {
  const [content, setContent] = React.useState('');
  
  return (
    <textarea
      value={content}
      onChange={(e) => setContent(e.target.value)}
    />
  );
}`;

  const radioExample = `
function RadioGroup() {
  const [selected, setSelected] = React.useState('option1');
  
  return (
    <>
      <input
        type="radio"
        id="option1"
        checked={selected === 'option1'}
        onChange={() => setSelected('option1')}
      />
      <input
        type="radio"
        id="option2"
        checked={selected === 'option2'}
        onChange={() => setSelected('option2')}
      />
    </>
  );
}`;

  const checkboxExample = `
function CheckboxExample() {
  const [checked, setChecked] = React.useState(false);
  
  return (
    <input
      type="checkbox"
      checked={checked}
      onChange={(e) => setChecked(e.target.checked)}
    />
  );
}`;

  const multiCheckboxExample = `
function MultiCheckbox() {
  const [toppings, setToppings] = React.useState({
    pepperoni: false,
    mushrooms: false,
    olives: false
  });

  return (
    <>
      {Object.keys(toppings).map((topping) => (
        <input
          key={topping}
          type="checkbox"
          checked={toppings[topping]}
          onChange={(e) => setToppings(prev => ({
            ...prev,
            [topping]: e.target.checked
          }))}
        />
      ))}
    </>
  );
}`;

  const selectExample = `
function SelectExample() {
  const [age, setAge] = React.useState('20-30');
  const options = [
    { value: '0-18', label: 'Under 18' },
    { value: '19-30', label: '19-30' },
    { value: '31-50', label: '31-50' }
  ];
  
  return (
    <select
      value={age}
      onChange={(e) => setAge(e.target.value)}
    >
      {options.map(opt => (
        <option key={opt.value} value={opt.value}>
          {opt.label}
        </option>
      ))}
    </select>
  );
}`;

  const rangeExample = `
function RangeInput() {
  const [value, setValue] = React.useState(50);
  
  return (
    <input
      type="range"
      min="0"
      max="100"
      value={value}
      onChange={(e) => setValue(e.target.value)}
    />
  );
}`;

  const colorExample = `
function ColorPicker() {
  const [color, setColor] = React.useState('#ff0000');
  
  return (
    <input
      type="color"
      value={color}
      onChange={(e) => setColor(e.target.value)}
    />
  );
}`;

  return (
    <div className="flex flex-col gap-6">
      <h1 className="scroll-m-20 text-4xl font-extrabold tracking-tight lg:text-5xl mb-6">
        React Input Cheatsheet
      </h1>

      {/* Text Input */}
      <div className="p-6 bg-blue-50 rounded-lg">
        <h2 className="text-2xl font-bold mb-4">Text Input</h2>
        <CodeHighlighter code={textInputExample} lang="javascript" theme="vitesse-dark" />
        <div className="mt-4 p-4 bg-yellow-100 rounded">
          <h3 className="font-bold mb-2">🚫 Common Mistake</h3>
          <p>Initialize with empty string, not undefined:</p>
          <code className="block mt-2 p-2 bg-white rounded">
            const [text, setText] = React.useState('');
          </code>
        </div>
      </div>

      {/* Textarea */}
      <div className="p-6 bg-green-50 rounded-lg">
        <h2 className="text-2xl font-bold mb-4">Textarea</h2>
        <CodeHighlighter code={textareaExample} lang="javascript" theme="vitesse-dark" />
      </div>

      {/* Radio Buttons */}
      <div className="p-6 bg-purple-50 rounded-lg">
        <h2 className="text-2xl font-bold mb-4">Radio Buttons</h2>
        <CodeHighlighter code={radioExample} lang="javascript" theme="vitesse-dark" />
        <div className="mt-4 p-4 bg-yellow-100 rounded">
          <h3 className="font-bold mb-2">💡 Pro Tip</h3>
          <p>Use dynamic generation for radio groups:</p>
          <code className="block mt-2 p-2 bg-white rounded">
            {`{options.map(opt => <input type="radio" key={opt.id} ... />)}`}
          </code>
        </div>
      </div>

      {/* Checkboxes */}
      <div className="p-6 bg-pink-50 rounded-lg">
        <h2 className="text-2xl font-bold mb-4">Checkboxes</h2>
        <div className="grid md:grid-cols-2 gap-6">
          <div>
            <h3 className="text-xl font-semibold mb-2">Single Checkbox</h3>
            <CodeHighlighter code={checkboxExample} lang="javascript" theme="vitesse-dark" />
          </div>
          <div>
            <h3 className="text-xl font-semibold mb-2">Multiple Checkboxes</h3>
            <CodeHighlighter code={multiCheckboxExample} lang="javascript" theme="vitesse-dark" />
          </div>
        </div>
      </div>

      {/* Select */}
      <div className="p-6 bg-indigo-50 rounded-lg">
        <h2 className="text-2xl font-bold mb-4">Select Dropdown</h2>
        <CodeHighlighter code={selectExample} lang="javascript" theme="vitesse-dark" />
        <div className="mt-4 p-4 bg-yellow-100 rounded">
          <h3 className="font-bold mb-2">⚠️ Important</h3>
          <p>Match initial value to one of the option values:</p>
          <code className="block mt-2 p-2 bg-white rounded">
            const [age, setAge] = React.useState('20-30');
          </code>
        </div>
      </div>

      {/* Specialty Inputs */}
      <div className="p-6 bg-orange-50 rounded-lg">
        <h2 className="text-2xl font-bold mb-4">Specialty Inputs</h2>
        <div className="grid md:grid-cols-2 gap-6">
          <div>
            <h3 className="text-xl font-semibold mb-2">Range Slider</h3>
            <CodeHighlighter code={rangeExample} lang="javascript" theme="vitesse-dark" />
          </div>
          <div>
            <h3 className="text-xl font-semibold mb-2">Color Picker</h3>
            <CodeHighlighter code={colorExample} lang="javascript" theme="vitesse-dark" />
          </div>
        </div>
      </div>

      <div className="p-6 bg-red-50 rounded-lg mt-6">
        <h2 className="text-2xl font-bold mb-4">Universal Rules</h2>
        <ul className="list-disc pl-6 space-y-3">
          <li>Use <code>value</code> prop for controlled inputs</li>
          <li>Always initialize state with proper type</li>
          <li>Avoid switching between controlled/uncontrolled</li>
          <li>Use <code>onChange</code> for user input handling</li>
          <li>Prevent default form submission behavior</li>
        </ul>
      </div>
    </div>
  );
}