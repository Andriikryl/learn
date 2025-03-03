"use client";
import CodeHighlighter from "@/components/CodeHighlighter";

export default function SlidingWindowGuide() {
  const slidingWindowCode = `
function lengthOfLongestSubstring(str) {
  const lastSeen = new Map();
  let maxLength = 0;
  let start = 0;

  for (let end = 0; end < str.length; end++) {
    const char = str[end];
    
    if (lastSeen.has(char) && lastSeen.get(char) >= start) {
      start = lastSeen.get(char) + 1;
    }

    lastSeen.set(char, end);
    maxLength = Math.max(maxLength, end - start + 1);
  }

  return maxLength;
}`;

  const naiveApproachCode = `
function naiveApproach(str) {
  let maxLength = 0;

  for (let i = 0; i < str.length; i++) {
    for (let j = i + 1; j < str.length; j++) {
      const sub = str.slice(i, j);
      if (sub.length < maxLength) continue;
      
      const charsSet = new Set(sub.split(''));
      if (sub.length !== charsSet.size) {
        break;
      }

      maxLength = Math.max(maxLength, j - i);
    }
  }
  return maxLength;
}`;

  return (
    <div className="flex flex-col gap-3">
      <h1 className="scroll-m-20 text-4xl font-extrabold tracking-tight lg:text-5xl mb-[20px]">
        Sliding Window Technique
      </h1>

      <section>
        <h2 className="text-2xl font-bold mb-4">The Problem</h2>
        <div className="mb-[20px]">
          <p className="mb-4">
            Given a string <code>s</code>, find the length of the longest substring without repeating characters.
          </p>
          <div className="grid grid-cols-2 gap-4">
            <div className="p-4 bg-blue-50 rounded-lg">
              <h3 className="font-bold mb-2">Example</h3>
              <CodeHighlighter 
                code={'Input: "abcabcbb" => Output: 3'} 
                lang="javascript" 
                theme="vitesse-dark" 
              />
            </div>
            <div className="p-4 bg-green-50 rounded-lg">
              <img 
                src="/sliding-window-visual.png" 
                alt="Sliding Window Visualization" 
                className="rounded-lg mb-2"
              />
              <p className="text-sm text-gray-600">
                Visual representation of window sliding through string
              </p>
            </div>
          </div>
        </div>
      </section>

      <section>
        <h2 className="text-2xl font-bold mb-4">Optimal Solution</h2>
        <div className="grid grid-cols-2 gap-4 mb-[20px]">
          <div>
            <CodeHighlighter 
              code={slidingWindowCode} 
              lang="javascript" 
              theme="vitesse-dark" 
            />
          </div>
          <div className="p-4 bg-purple-50 rounded-lg">
            <h3 className="font-bold mb-2">Key Features</h3>
            <ul className="list-disc pl-6 space-y-2">
              <li>Time Complexity: O(n)</li>
              <li>Space Complexity: O(min(m, n))</li>
              <li>Single pass through string</li>
              <li>Hash map tracks last seen positions</li>
            </ul>
          </div>
        </div>
      </section>

      <section>
        <h2 className="text-2xl font-bold mb-4">Why Sliding Window Wins</h2>
        <div className="grid grid-cols-2 gap-4 mb-[20px]">
          <div className="p-4 bg-red-50 rounded-lg">
            <h3 className="font-bold mb-2">Naive Approach</h3>
            <CodeHighlighter 
              code={naiveApproachCode} 
              lang="javascript" 
              theme="vitesse-dark" 
            />
            <p className="text-sm text-gray-600 mt-2">
              O(n²) time complexity - checks duplicate substrings
            </p>
          </div>
          <div className="p-4 bg-green-50 rounded-lg">
            <h3 className="font-bold mb-2">Efficiency Gains</h3>
            <ul className="list-disc pl-6 space-y-2">
              <li>Eliminates redundant checks</li>
              <li>Maintains optimal window boundaries</li>
              <li>Linear time complexity</li>
              <li>Instant position lookup via hash map</li>
            </ul>
          </div>
        </div>
      </section>

      <section className="mt-8">
        <h2 className="text-2xl font-bold mb-4">Key Principles</h2>
        <div className="grid grid-cols-3 gap-4">
          <div className="p-4 bg-blue-100 rounded-lg">
            <h3 className="font-bold mb-2">Window Management</h3>
            <p>Maintain [start, end] bounds to represent current window</p>
          </div>
          <div className="p-4 bg-green-100 rounded-lg">
            <h3 className="font-bold mb-2">Character Tracking</h3>
            <p>Use hash map for O(1) lookups of last seen positions</p>
          </div>
          <div className="p-4 bg-purple-100 rounded-lg">
            <h3 className="font-bold mb-2">Optimal Movement</h3>
            <p>Jump start pointer directly to new position when duplicates found</p>
          </div>
        </div>
      </section>

      <section className="mt-6 p-4 bg-yellow-50 rounded-lg">
        <h3 className="text-lg font-bold mb-2">💡 Pro Tip</h3>
        <div>
          Sliding window shines for array/string problems requiring:
          <ul className="list-disc pl-6 mt-2">
            <li>Subarray/substring analysis</li>
            <li>Contiguous sequence checks</li>
            <li>Minimum/maximum length calculations</li>
          </ul>
        </div>
      </section>
    </div>
  );
}