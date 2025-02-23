"use client";
import CodeHighlighter from "@/components/CodeHighlighter";

export default function EffectCleanupGuide() {
  const problemExample = `
// Problem: Lingering event listener
function MouseTracker() {
  const [position, setPosition] = React.useState({ x: 0, y: 0 });

  React.useEffect(() => {
    const handler = (e) => setPosition({ x: e.clientX, y: e.clientY });
    window.addEventListener('mousemove', handler);
  }, []);

  return <div>{position.x}, {position.y}</div>;
}`;

  const solutionExample = `
// Solution: Cleanup function
function MouseTracker() {
  const [position, setPosition] = React.useState({ x: 0, y: 0 });

  React.useEffect(() => {
    const handler = (e) => setPosition({ x: e.clientX, y: e.clientY });
    window.addEventListener('mousemove', handler);
    
    return () => window.removeEventListener('mousemove', handler);
  }, []);

  return <div>{position.x}, {position.y}</div>;
}`;

  const dependencyExample = `
// Dependency-driven cleanup
function ToggleTracker() {
  const [isTracking, setIsTracking] = React.useState(true);
  const [position, setPosition] = React.useState({ x: 0, y: 0 });

  React.useEffect(() => {
    if (!isTracking) return;
    
    const handler = (e) => setPosition({ x: e.clientX, y: e.clientY });
    window.addEventListener('mousemove', handler);
    
    return () => window.removeEventListener('mousemove', handler);
  }, [isTracking]);

  return (
    <div>
      <button onClick={() => setIsTracking(!isTracking)}>
        {isTracking ? 'Stop' : 'Start'} Tracking
      </button>
      {isTracking && <div>{position.x}, {position.y}</div>}
    </div>
  );
}`;

  const executionFlow = `
// Effect lifecycle diagram
1. Mount: Run effect
2. Update: Cleanup old effect → Run new effect
3. Unmount: Cleanup effect`;

  const bestPractices = `
// Best Practices Checklist
- Always return cleanup functions for subscriptions
- Include all dependencies in dependency array
- Handle conditional effects within useEffect
- Cleanup timers, listeners, and connections
- Test component unmount behavior`;

const windowSizeSolution = `
// Window Dimensions Cleanup
React.useEffect(() => {
  function handleResize() {
    setWindowDimensions({
      width: window.innerWidth,
      height: window.innerHeight,
    });
  }

  window.addEventListener('resize', handleResize);
  
  return () => window.removeEventListener('resize', handleResize);
}, []);`;

  const toastySolution = `
// IntersectionObserver Cleanup
React.useEffect(() => {
  const observer = new IntersectionObserver((entries) => {
    const [entry] = entries;
    setIsShown(entry.isIntersecting);
  });

  observer.observe(wrapperRef.current);
  
  return () => observer.disconnect();
}, []);`;

  const clockSolution = `
// Digital Clock Interval Cleanup
React.useEffect(() => {
  const intervalId = setInterval(() => {
    setTime(new Date());
  }, 1000);

  return () => clearInterval(intervalId);
}, []);`;

  const uselessMachineSolution = `
// Useless Machine Timeout Cleanup
React.useEffect(() => {
  if (isOn) return;

  const timeoutId = setTimeout(() => setIsOn(true), 500);
  
  return () => clearTimeout(timeoutId);
}, [isOn]);`;

  const earlyReturnExample = `
// Early Return Pattern
async function logInUser(email, password) {
  const user = await findUser(email);
  if (!user) return { error: 'User not found' };

  const isValid = await validatePassword(user, password);
  if (!isValid) return { error: 'Invalid password' };

  await startSession(user);
  return { user };
}`;

const initialEffectExample = `
React.useEffect(() => {
  function handleKeyDown(event) {
    if (event.code === 'Space') {
      // TODO: Play or pause
    }
  }

  window.addEventListener('keydown', handleKeyDown);

  return () => {
    window.removeEventListener('keydown', handleKeyDown);
  };
}, []);
`;

  const togglePlayingExample = `
function togglePlaying() {
  if (isPlaying) {
    audioRef.current.pause();
  } else {
    audioRef.current.play();
  }

  setIsPlaying(!isPlaying);
}
`;

  const secondEffectExample = `
React.useEffect(() => {
  if (isPlaying) {
    audioRef.current.play();
  } else {
    audioRef.current.pause();
  }
}, [isPlaying])
`;

  const buttonOnClickExample = `
<button
  onClick={() => {
    setIsPlaying(!isPlaying);
  }}
>
`;

  const useEffectKeydownExample = `
React.useEffect(() => {
  function handleKeyDown(event) {
    if (event.code === 'Space') {
      setIsPlaying(!isPlaying);
    }
  }

  window.addEventListener('keydown', handleKeyDown);

  return () => {
    window.removeEventListener('keydown', handleKeyDown);
  };
}, [isPlaying]);
`;

  const callbackEscapeHatchExample = `
React.useEffect(() => {
  function handleKeyDown(event) {
    if (event.code === 'Space') {
      setIsPlaying(currentIsPlaying => {
        return !currentIsPlaying;
      });
    }
  }

  window.addEventListener('keydown', handleKeyDown);

  return () => {
    window.removeEventListener('keydown', handleKeyDown);
  };
}, []);
`;

  const stopPropagationExample = `
<button
  onKeyDown={(event) => {
    if (event.code === 'Space') {
      event.stopPropagation();
    }
  }}
  onClick={() => {
    setIsPlaying(!isPlaying);
  }}
>
`;

  const stateSetterExample = `
const [count, setCount] = React.useState(0);

// sets \`count\` to \`100\`
setCount(100);

// sets \`count\` to \`100\`:
setCount(() => {
  return 100;
});

setCount((currentCount) => {
  return currentCount + 1;
});
`;

  const solution1 = `
import React from 'react';
import { Play, Pause } from 'react-feather';

import VisuallyHidden from './VisuallyHidden';

function MediaPlayer({ src }) {
  const [isPlaying, setIsPlaying] = React.useState(false);

  const audioRef = React.useRef();

  React.useEffect(() => {
    function handleKeyDown(event) {
      if (event.code === 'Space') {
        setIsPlaying(!isPlaying);
      }
    }

    window.addEventListener('keydown', handleKeyDown);

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [isPlaying]);

  React.useEffect(() => {
    if (isPlaying) {
      audioRef.current.play();
    } else {
      audioRef.current.pause();
    }
  }, [isPlaying]);

  return (
    <div className="wrapper">
      <div className="media-player">
        <img alt="" src="https://sandpack-bundler.vercel.app/img/take-it-easy.png" />
        <div className="summary">
          <h2>Take It Easy</h2>
          <p>Bvrnout ft. Mia Vaile</p>
        </div>
        <button
          onClick={() => {
            setIsPlaying(!isPlaying);
          }}
        >
          {isPlaying ? <Pause /> : <Play />}
          <VisuallyHidden>Toggle playing</VisuallyHidden>
        </button>

        <audio
          ref={audioRef}
          src={src}
          onEnded={() => {
            setIsPlaying(false);
          }}
        />
      </div>
    </div>
  );
}

export default MediaPlayer;
`;

  const solution2 = `
import React from 'react';
import { Play, Pause } from 'react-feather';

import VisuallyHidden from './VisuallyHidden';

function MediaPlayer({ src }) {
  const [isPlaying, setIsPlaying] = React.useState(false);

  const audioRef = React.useRef();

  React.useEffect(() => {
    function handleKeyDown(event) {
      if (event.code === 'Space') {
        setIsPlaying((currentIsPlaying) => {
          return !currentIsPlaying;
        });
      }
    }

    window.addEventListener('keydown', handleKeyDown);

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, []);

  React.useEffect(() => {
    if (isPlaying) {
      audioRef.current.play();
    } else {
      audioRef.current.pause();
    }
  }, [isPlaying]);

  return (
    <div className="wrapper">
      <div className="media-player">
        <img alt="" src="https://sandpack-bundler.vercel.app/img/take-it-easy.png" />
        <div className="summary">
          <h2>Take It Easy</h2>
          <p>Bvrnout ft. Mia Vaile</p>
        </div>
        <button
          onClick={() => {
            setIsPlaying(!isPlaying);
          }}
        >
          {isPlaying ? <Pause /> : <Play />}
          <VisuallyHidden>Toggle playing</VisuallyHidden>
        </button>

        <audio
          ref={audioRef}
          src={src}
          onEnded={() => {
            setIsPlaying(false);
          }}
        />
      </div>
    </div>
  );
}

export default MediaPlayer;
`;
  return (
    <>
    <div className="flex flex-col gap-3">
      <h1 className="scroll-m-20 text-4xl font-extrabold tracking-tight lg:text-5xl mb-[20px]">
        Managing Effect Cleanup in React
      </h1>

      <section>
        <h2 className="text-2xl font-bold mb-4">The Cleanup Problem</h2>
        <div className="mb-[20px]">
          <CodeHighlighter code={problemExample} lang="javascript" theme="vitesse-dark" />
          <div className="p-4 bg-red-50 rounded-lg mt-4">
            <h3 className="font-bold mb-2">⚠️ Memory Leak Risks</h3>
            <ul className="list-disc pl-6">
              <li>Lingering event listeners</li>
              <li>Uncleaned timers/intervals</li>
              <li>Orphaned DOM references</li>
            </ul>
          </div>
        </div>
      </section>

      <section>
        <h2 className="text-2xl font-bold mb-4">Cleanup Solution</h2>
        <div className="grid grid-cols-2 gap-4 mb-[20px]">
          <div>
            <CodeHighlighter code={solutionExample} lang="javascript" theme="vitesse-dark" />
          </div>
          <div className="p-4 bg-green-50 rounded-lg">
            <h3 className="font-bold mb-2">Cleanup Mechanics</h3>
            <ul className="list-disc pl-6">
              <li>Return function from useEffect</li>
              <li>Runs before unmount/re-render</li>
              <li>Synchronous cleanup operations</li>
            </ul>
          </div>
        </div>
      </section>

      <section>
        <h2 className="text-2xl font-bold mb-4">Dependency Management</h2>
        <div className="grid grid-cols-2 gap-4 mb-[20px]">
          <div>
            <CodeHighlighter code={dependencyExample} lang="javascript" theme="vitesse-dark" />
          </div>
          <div className="p-4 bg-blue-50 rounded-lg">
            <h3 className="font-bold mb-2">Dependency Rules</h3>
            <ul className="list-disc pl-6">
              <li>Declare all used values</li>
              <li>Empty array = run once</li>
              <li>Cleanup runs before each re-render</li>
            </ul>
          </div>
        </div>
      </section>

      <section>
        <h2 className="text-2xl font-bold mb-4">Execution Flow</h2>
        <div className="mb-[20px]">
          <CodeHighlighter code={executionFlow} lang="javascript" theme="vitesse-dark" />
          <div className="p-4 bg-purple-50 rounded-lg mt-4">
            <pre className="whitespace-pre-wrap">
              {`Mount → Effect Setup\nUpdate → Cleanup → Effect Setup\nUnmount → Cleanup`}
            </pre>
          </div>
        </div>
      </section>

      <section>
        <h2 className="text-2xl font-bold mb-4">Best Practices</h2>
        <div className="mb-[20px]">
          <CodeHighlighter code={bestPractices} lang="javascript" theme="vitesse-dark" />
          <div className="p-4 bg-yellow-50 rounded-lg mt-4">
            <h3 className="font-bold mb-2">Pro Tips</h3>
            <ul className="list-disc pl-6">
              <li>Use linter rules for dependencies</li>
              <li>Test cleanup with strict mode</li>
              <li>Abstract complex cleanup to hooks</li>
            </ul>
          </div>
        </div>
      </section>

      <section className="mt-8">
        <h2 className="text-2xl font-bold mb-4">Key Takeaways</h2>
        <div className="grid grid-cols-3 gap-4">
          <div className="p-4 bg-blue-100 rounded-lg">
            <h3 className="font-bold mb-2">Essential Cleanup</h3>
            <p>Always clean subscriptions, listeners, and timers</p>
          </div>
          <div className="p-4 bg-green-100 rounded-lg">
            <h3 className="font-bold mb-2">Dependency Awareness</h3>
            <p>Proper dependency arrays prevent stale closures</p>
          </div>
          <div className="p-4 bg-purple-100 rounded-lg">
            <h3 className="font-bold mb-2">Lifecycle Order</h3>
            <p>Cleanup runs before each effect re-run or unmount</p>
          </div>
        </div>
      </section>
    </div>
    <div className="flex flex-col gap-3">
      <h1 className="scroll-m-20 text-4xl font-extrabold tracking-tight lg:text-5xl mb-[20px]">
        Effect Cleanup Exercises
      </h1>

      <section>
        <h2 className="text-2xl font-bold mb-4">Window Dimensions</h2>
        <div className="mb-[20px]">
          <CodeHighlighter code={windowSizeSolution} lang="javascript" theme="vitesse-dark" />
          <div className="p-4 bg-blue-50 rounded-lg mt-4">
            <h3 className="font-bold mb-2">Key Fix</h3>
            <p>Added cleanup function to remove resize listener</p>
          </div>
        </div>
      </section>

      <section>
        <h2 className="text-2xl font-bold mb-4">Toasty Observer</h2>
        <div className="mb-[20px]">
          <CodeHighlighter code={toastySolution} lang="javascript" theme="vitesse-dark" />
          <div className="p-4 bg-green-50 rounded-lg mt-4">
            <h3 className="font-bold mb-2">Observer Management</h3>
            <p>Properly disconnect IntersectionObserver on unmount</p>
          </div>
        </div>
      </section>

      <section>
        <h2 className="text-2xl font-bold mb-4">Digital Clock</h2>
        <div className="grid grid-cols-2 gap-4 mb-[20px]">
          <div>
            <CodeHighlighter code={clockSolution} lang="javascript" theme="vitesse-dark" />
          </div>
          <div className="p-4 bg-purple-50 rounded-lg">
            <h3 className="font-bold mb-2">Interval Handling</h3>
            <ul className="list-disc pl-6">
              <li>1 second updates</li>
              <li>Clear interval on unmount</li>
              <li>Empty dependencies (run once)</li>
            </ul>
          </div>
        </div>
      </section>

      <section>
        <h2 className="text-2xl font-bold mb-4">Useless Machine</h2>
        <div className="grid grid-cols-2 gap-4 mb-[20px]">
          <div>
            <CodeHighlighter code={uselessMachineSolution} lang="javascript" theme="vitesse-dark" />
          </div>
          <div className="p-4 bg-red-50 rounded-lg">
            <h3 className="font-bold mb-2">Timeout Management</h3>
            <ul className="list-disc pl-6">
              <li>500ms auto-toggle</li>
              <li>Cleanup previous timeout</li>
              <li>Dependent on isOn state</li>
            </ul>
          </div>
        </div>
      </section>

      <section>
        <h2 className="text-2xl font-bold mb-4">Early Return Pattern</h2>
        <div className="mb-[20px]">
          <CodeHighlighter code={earlyReturnExample} lang="javascript" theme="vitesse-dark" />
          <div className="p-4 bg-yellow-50 rounded-lg mt-4">
            <h3 className="font-bold mb-2">Benefits</h3>
            <ul className="list-disc pl-6">
              <li>Reduces nesting</li>
              <li>Clear error handling</li>
              <li>Emphasizes primary flow</li>
            </ul>
          </div>
        </div>
      </section>

      <section className="mt-8">
        <h2 className="text-2xl font-bold mb-4">Cleanup Principles</h2>
        <div className="grid grid-cols-3 gap-4">
          <div className="p-4 bg-blue-100 rounded-lg">
            <h3 className="font-bold mb-2">1:1 Matching</h3>
            <p>Every effect setup needs corresponding cleanup</p>
          </div>
          <div className="p-4 bg-green-100 rounded-lg">
            <h3 className="font-bold mb-2">Dependency Awareness</h3>
            <p>Cleanup runs before effect re-execution</p>
          </div>
          <div className="p-4 bg-purple-100 rounded-lg">
            <h3 className="font-bold mb-2">Resource Management</h3>
            <p>Prevent memory leaks from abandoned processes</p>
          </div>
        </div>
      </section>
    </div>

    <div className="flex flex-col gap-3">
      <h1 className="scroll-m-20 text-4xl font-extrabold tracking-tight lg:text-5xl mb-[20px]">
        Dealing with Stale Values in React Effects
      </h1>

      <section>
        <h2 className="text-2xl font-bold mb-4">The Problem: Spacebar to Play/Pause</h2>
        <p className="mb-4">
          Implementing a spacebar shortcut to play/pause a media player seems simple, but it can be surprisingly tricky due to how React handles state within effects.
        </p>
        <h3 className="font-bold mb-2">Initial Effect Setup</h3>
        <CodeHighlighter code={initialEffectExample} lang="javascript" theme="vitesse-dark" />
        <p className="mb-4">
          This sets up a basic keydown event listener, but the challenge lies in correctly managing the interplay between React state and the DOM's audio state.
        </p>
      </section>

      <section>
        <h2 className="text-2xl font-bold mb-4">Managing State</h2>
        <div className="grid grid-cols-1 gap-4 mb-[20px]">
          <div className="p-4 bg-blue-50 rounded-lg">
            <h3 className="font-bold mb-2">Naive Toggle Function</h3>
            <CodeHighlighter code={togglePlayingExample} lang="javascript" theme="vitesse-dark" />
            <p className="mb-2">
              A straightforward approach might be to create a function to toggle both the React `isPlaying` state and the audio element's play/pause state.  However, this can lead to inconsistencies.
            </p>
          </div>
          <div className="p-4 bg-green-50 rounded-lg">
            <h3 className="font-bold mb-2">Separate useEffect for Audio State</h3>
            <CodeHighlighter code={secondEffectExample} lang="javascript" theme="vitesse-dark" />
            <p className="mb-2">
              A better solution is to use a separate `useEffect` to keep the audio DOM node's state in sync with the `isPlaying` state variable.
            </p>
          </div>
        </div>
      </section>

      <section>
        <h2 className="text-2xl font-bold mb-4">The Stale Value Problem</h2>
        <p className="mb-4">
          The initial implementation of the `keydown` callback suffers from the "stale value" problem. The effect captures the initial value of `isPlaying` (which is `false`) and never updates.
        </p>
        <h3 className="font-bold mb-2">Incorrect Button OnClick</h3>
        <CodeHighlighter code={buttonOnClickExample} lang="jsx" theme="vitesse-dark" />
        <h3 className="font-bold mb-2">Incorrect useEffect Keydown</h3>
        <CodeHighlighter code={useEffectKeydownExample} lang="jsx" theme="vitesse-dark" />
      </section>

      <section>
        <h2 className="text-2xl font-bold mb-4">Solution 1: Adding the Dependency</h2>
        <p className="mb-4">
          One way to solve this is to add `isPlaying` to the dependency array of the `useEffect` hook.  This forces the effect to re-run whenever `isPlaying` changes, ensuring the callback always has the latest value.
        </p>
        <CodeHighlighter code={useEffectKeydownExample} lang="javascript" theme="vitesse-dark" />
      </section>

      <section>
        <h2 className="text-2xl font-bold mb-4">Solution 2: Callback Escape Hatch</h2>
        <p className="mb-4">
          Another approach is to use the "callback escape hatch."  Instead of directly using the `isPlaying` variable, we pass a function to `setIsPlaying`.  React will invoke this function with the most up-to-date value of the state.
        </p>
        <CodeHighlighter code={callbackEscapeHatchExample} lang="javascript" theme="vitesse-dark" />
      </section>

      <section>
        <h2 className="text-2xl font-bold mb-4">Event Bubbling and stopPropagation</h2>
        <p className="mb-4">
          A related issue is event bubbling.  When a button is focused, pressing Space triggers both the `onClick` handler and the global `keydown` listener, causing the state to flip back and forth rapidly.
        </p>
        <p className="mb-4">
          To prevent this, we can use `event.stopPropagation()` in the button's `onKeyDown` handler.
        </p>
        <CodeHighlighter code={stopPropagationExample} lang="jsx" theme="vitesse-dark" />
      </section>

      <section>
        <h2 className="text-2xl font-bold mb-4">The State-Setter Callback in Depth</h2>
        <p className="mb-4">
          The state-setter callback is a powerful tool for ensuring you always have access to the most recent state, especially within effects.
        </p>
        <CodeHighlighter code={stateSetterExample} lang="javascript" theme="vitesse-dark" />
      </section>

      <section>
        <h2 className="text-2xl font-bold mb-4">Complete Solutions</h2>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
          <div>
            <h3 className="font-bold mb-2">Solution 1: Adding the Dependency</h3>
            <CodeHighlighter code={solution1} lang="javascript" theme="vitesse-dark" />
          </div>
          <div>
            <h3 className="font-bold mb-2">Solution 2: Callback Form</h3>
            <CodeHighlighter code={solution2} lang="javascript" theme="vitesse-dark" />
          </div>
        </div>
      </section>
    </div>
    </>
  );
}