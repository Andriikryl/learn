"use client";
import CodeHighlighter from "@/components/CodeHighlighter";

export default function ClientVsServerRendering() {
  return (
    <div className="flex flex-col gap-6">
      {/* Header */}
      <div>
        <h1 className="scroll-m-20 text-4xl font-extrabold tracking-tight lg:text-5xl">
          Client vs. Server Rendering
        </h1>
      </div>

      {/* Introduction */}
      <section>
        <p>
          Earlier in the course we built a Toast Playground project (using Parcel) to
          demonstrate client-side rendering. Let’s dig into what happens when a user visits
          this page.
        </p>
      </section>

      {/* Performance Profiling */}
      <section>
        <h2 className="text-2xl font-bold mb-4">Performance Profiling</h2>
        <p>
          In the “Performance” tab (with network throttled to “Fast 3G”), we record a profile.
          The very first thing that happens is a request for the HTML file – taking around 698ms.
        </p>
        <p>
          (Imagine here a close-up screenshot showing that the HTML file took 698ms to download.)
        </p>
      </section>

      {/* Initial HTML and Bundle Download */}
      <section>
        <h2 className="text-2xl font-bold mb-4">
          Initial HTML and Bundle Download
        </h2>
        <p>
          When you “View Source” of the page, the initial HTML is very spartan – containing only
          the metadata, a link to Google Fonts, and a <code>&lt;script&gt;</code> tag for the JS
          bundle:
        </p>
        <CodeHighlighter
          code={`<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="utf-8" />
    <link rel="icon" href="/favicon.png?v=1" />
    <meta name="viewport" content="width=device-width, initial-scale=1" />
    <title>Toast Playground</title>
    <link rel="preconnect" href="https://fonts.googleapis.com" />
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
    <link href="https://fonts.googleapis.com/css2?family=Lato:wght@400;700&display=swap" rel="stylesheet" />
    <script defer src="/static/js/bundle.js"></script>
  </head>
  <body>
    <div id="root"></div>
  </body>
</html>`}
          lang="html"
          theme="vitesse-dark"
        />
        <p>
          After the HTML downloads, the browser begins fetching resources. The largest is the JS
          bundle – which takes about 2.68 seconds. During this time, the user sees a blank white
          screen.
        </p>
        <p>
          In fact, if JavaScript is disabled, the user never sees the application content – just a
          blank page.
        </p>
      </section>

      {/* Server Side Rendering (SSR) */}
      <section>
        <h2 className="text-2xl font-bold mb-4">Server Side Rendering (SSR)</h2>
        <p>
          Contrast this with our course platform. When you disable JavaScript and refresh, you see a
          fully-formed HTML page with all of the content.
        </p>
        <p>
          How is that possible? We use Server Side Rendering (SSR) to perform the first React render
          on the server. Instead of an empty HTML file, the server sends a complete HTML document.
        </p>
        <p>Here’s an oversimplified example of SSR:</p>
        <CodeHighlighter
          code={`/* /src/server/index.js */
            import renderToString from 'react-dom/server';
            import App from './components/App';

            export function handleRequest(request, response) {
            const appContent = renderToString(<App />);
            
            response.send(\`
            <html>
            <body>
                \${appContent}
            </body>
            </html>
            \`);
            }`}
          lang="javascript"
          theme="vitesse-dark"
        />
        <p>
          In this example, <code>renderToString</code> recursively renders the React components to
          an HTML string that is then embedded into a complete HTML file and sent to the client.
        </p>
      </section>

      {/* Graphing the Rendering Strategies */}
      <section>
        <h2 className="text-2xl font-bold mb-4">Graphing the Rendering Strategies</h2>
        <p>
          To understand the timeline, we can visualize two flows:
        </p>
        <ul className="list-disc pl-6 space-y-2">
          <li>
            <strong>SSR Flow:</strong> The server renders the application (e.g., “Render
            application” takes 8 units), sends the full HTML to the client, and while the JS bundle
            downloads (16 units), the user can already see the content (Content Paint / LCP).
          </li>
          <li>
            <strong>CSR Flow:</strong> The server sends an empty HTML file; the client downloads the
            JS bundle (e.g., 12 units), then renders the application (another 12 units). This delay
            can result in a blank screen until the JS loads.
          </li>
        </ul>
        <p>
          These graphs are abstract approximations meant to illustrate the sequence of events and
          their performance implications.
        </p>
      </section>

      {/* Command Palette (Extra Info) */}
      <section>
        <h2 className="text-2xl font-bold mb-4">Extra: Command Palette</h2>
        <p>
          In the video, I use the Chrome command palette (Ctrl + Shift + P) to disable JavaScript.
          This tool is a handy alternative to digging through sub-menus.
        </p>
      </section>

      {/* Conclusion */}
      <section>
        <h2 className="text-2xl font-bold mb-4">Conclusion</h2>
        <p>
          Server Side Rendering delivers fully-formed HTML to the client, allowing users to start
          reading content in less than 1.5 seconds – even though the JavaScript bundle might take
          6+ seconds to load. This can improve user experience dramatically for content-heavy sites.
        </p>
        <p>
          In the next lesson, we’ll dive deeper into hydration – the process that “wakes up” the SSR
          content once the JS bundle loads.
        </p>
      </section>

      {/* Navigation */}
      <footer>
        <p className="text-sm text-gray-600">Submit Feedback • Next up: Hydration</p>
      </footer>
    </div>
  );
}
