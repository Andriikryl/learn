"use client";
import CodeHighlighter from "@/components/CodeHighlighter";

export default function DataFetchingGuide() {
  const basicFetchExample = `
async function handleSubmit(event) {
  event.preventDefault();
  
  const response = await fetch('https://api.example.com/contact', {
    method: 'POST',
    body: JSON.stringify({ email, message }),
  });
  const json = await response.json();
  console.log(json);
}`;

  const statusManagementExample = `
function ContactForm() {
  const [status, setStatus] = React.useState('idle'); // idle|loading|success|error
  
  async function handleSubmit() {
    setStatus('loading');
    try {
      const response = await fetch(ENDPOINT, { ... });
      if (response.ok) {
        setStatus('success');
      } else {
        setStatus('error');
      }
    } catch {
      setStatus('error');
    }
  }
}`;

  const fullImplementation = `
function ContactForm() {
  const [email, setEmail] = React.useState('');
  const [message, setMessage] = React.useState('');
  const [status, setStatus] = React.useState('idle');

  async function handleSubmit(event) {
    event.preventDefault();
    setStatus('loading');
    
    try {
      const response = await fetch(ENDPOINT, {
        method: 'POST',
        body: JSON.stringify({ email, message }),
      });
      const json = await response.json();
      
      if (json.ok) {
        setStatus('success');
        setMessage('');
      } else {
        setStatus('error');
      }
    } catch (error) {
      setStatus('error');
    }
  }

  return (
    <form onSubmit={handleSubmit}>
      {/* Inputs with disabled={status === 'loading'} */}
      {status === 'error' && <ErrorDisplay />}
      {status === 'success' && <SuccessMessage />}
    </form>
  );
}`;

const swrImplementation = `
import useSWR from 'swr';

function WeatherWidget() {
  const { data, isLoading, error } = useSWR(
    '/api/weather',
    fetcher
  );

  if (isLoading) return <LoadingSpinner />;
  if (error) return <ErrorDisplay />;

  return <TemperatureDisplay temp={data.temperature} />;
}`;

  const fetcherExample = `
async function fetcher(endpoint) {
  const response = await fetch(endpoint);
  const json = await response.json();

  if (!json.ok) throw json;
  return json;
}`;

  const errorHandling = `
function App() {
  const { error } = useSWR('/api/data', fetcher);

  if (error) {
    return (
      <div className="error">
        {error.message || 'Failed to load data'}
      </div>
    );
  }
}`;


  return (
    <>  
    <div className="flex flex-col gap-3">
      <h1 className="scroll-m-20 text-4xl font-extrabold tracking-tight lg:text-5xl mb-[20px]">
        React Data Fetching Guide
      </h1>

      <section>
        <h2 className="text-2xl font-bold mb-4">Core Fetching Concepts</h2>
        <div className="grid grid-cols-3 gap-4 mb-4">
          <div className="p-4 bg-blue-50 rounded-lg">
            <h3 className="font-bold mb-2">Loading States</h3>
            <p>Disable inputs during submission</p>
          </div>
          <div className="p-4 bg-green-50 rounded-lg">
            <h3 className="font-bold mb-2">Error Handling</h3>
            <p>Graceful degradation</p>
          </div>
          <div className="p-4 bg-purple-50 rounded-lg">
            <h3 className="font-bold mb-2">Success States</h3>
            <p>Clear user feedback</p>
          </div>
        </div>
      </section>

      <section>
        <h2 className="text-2xl font-bold mb-4">Basic Fetch Implementation</h2>
        <CodeHighlighter 
          code={basicFetchExample} 
          lang="javascript" 
          theme="vitesse-dark" 
        />
        <div className="mt-4 p-4 bg-yellow-50 rounded-lg">
          <p className="font-semibold">Key requirements:</p>
          <ul className="list-disc pl-6 space-y-2 mt-2">
            <li>Async/await pattern</li>
            <li>Proper HTTP method</li>
            <li>JSON body handling</li>
          </ul>
        </div>
      </section>

      <section>
        <h2 className="text-2xl font-bold mb-4">Status Management</h2>
        <div className="grid grid-cols-2 gap-4 mb-[20px]">
          <div>
            <h3 className="font-bold mb-2">State Setup</h3>
            <CodeHighlighter 
              code={statusManagementExample} 
              lang="javascript" 
              theme="vitesse-dark" 
            />
          </div>
          <div className="p-4 bg-red-50 rounded-lg">
            <h3 className="font-bold mb-2">UI Feedback</h3>
            <ul className="list-disc pl-6 space-y-2">
              <li>Disable form during submission</li>
              <li>Show loading indicators</li>
              <li>Display error messages</li>
            </ul>
          </div>
        </div>
      </section>

      <section>
        <h2 className="text-2xl font-bold mb-4">Complete Implementation</h2>
        <CodeHighlighter 
          code={fullImplementation} 
          lang="javascript" 
          theme="vitesse-dark" 
        />
        <div className="mt-4 grid grid-cols-2 gap-4">
          <div className="p-4 bg-green-100 rounded-lg">
            <h3 className="font-bold mb-2">Success Handling</h3>
            <ul className="list-disc pl-6 space-y-2">
              <li>Clear form on success</li>
              <li>Show confirmation message</li>
              <li>Reset status after timeout</li>
            </ul>
          </div>
          <div className="p-4 bg-red-100 rounded-lg">
            <h3 className="font-bold mb-2">Error Recovery</h3>
            <ul className="list-disc pl-6 space-y-2">
              <li>Maintain form data</li>
              <li>Retry mechanism</li>
              <li>Clear error messages</li>
            </ul>
          </div>
        </div>
      </section>

      <section className="mt-8">
        <h2 className="text-2xl font-bold mb-4">Best Practices</h2>
        <div className="grid grid-cols-3 gap-4">
          <div className="p-4 bg-blue-100 rounded-lg">
            <h3 className="font-bold mb-2">Validation</h3>
            <p>Client + server validation</p>
          </div>
          <div className="p-4 bg-purple-100 rounded-lg">
            <h3 className="font-bold mb-2">Abort Controller</h3>
            <p>Cancel in-flight requests</p>
          </div>
          <div className="p-4 bg-green-100 rounded-lg">
            <h3 className="font-bold mb-2">Error Logging</h3>
            <p>Track failed requests</p>
          </div>
        </div>
      </section>

      <section>
        <h2 className="text-2xl font-bold mb-4">Test API Details</h2>
        <div className="p-4 bg-gray-50 rounded-lg">
          <ul className="list-disc pl-6 space-y-2">
            <li>Artificial 1-2s delay</li>
            <li>Add ?simulatedError=true for errors</li>
            <li>Randomized/fake data responses</li>
          </ul>
        </div>
      </section>
    </div>

    <div className="flex flex-col gap-3">
      <h1 className="scroll-m-20 text-4xl font-extrabold tracking-tight lg:text-5xl mb-[20px]">
        Data Fetching on Mount with SWR
      </h1>

      <section>
        <h2 className="text-2xl font-bold mb-4">Why SWR?</h2>
        <div className="grid grid-cols-3 gap-4 mb-4">
          <div className="p-4 bg-blue-50 rounded-lg">
            <h3 className="font-bold mb-2">Automatic Revalidation</h3>
            <p>Fresh data on focus/tab switch</p>
          </div>
          <div className="p-4 bg-green-50 rounded-lg">
            <h3 className="font-bold mb-2">Request Deduping</h3>
            <p>Prevent duplicate requests</p>
          </div>
          <div className="p-4 bg-purple-50 rounded-lg">
            <h3 className="font-bold mb-2">Error Handling</h3>
            <p>Built-in error states</p>
          </div>
        </div>
      </section>

      <section>
        <h2 className="text-2xl font-bold mb-4">Basic Implementation</h2>
        <div className="grid grid-cols-2 gap-4 mb-[20px]">
          <div>
            <CodeHighlighter 
              code={swrImplementation} 
              lang="javascript" 
              theme="vitesse-dark" 
            />
          </div>
          <div className="p-4 bg-yellow-50 rounded-lg">
            <h3 className="font-bold mb-2">Key Components</h3>
            <ul className="list-disc pl-6 space-y-2">
              <li>Unique endpoint as cache key</li>
              <li>Custom fetcher function</li>
              <li>Built-in loading state</li>
            </ul>
          </div>
        </div>
      </section>

      <section>
        <h2 className="text-2xl font-bold mb-4">Fetcher Function</h2>
        <div className="grid grid-cols-2 gap-4">
          <div>
            <CodeHighlighter 
              code={fetcherExample} 
              lang="javascript" 
              theme="vitesse-dark" 
            />
          </div>
          <div className="p-4 bg-red-50 rounded-lg">
            <h3 className="font-bold mb-2">Error Handling</h3>
            <ul className="list-disc pl-6 space-y-2">
              <li>Check response status</li>
              <li>Throw meaningful errors</li>
              <li>Handle in component</li>
            </ul>
          </div>
        </div>
      </section>

      <section>
        <h2 className="text-2xl font-bold mb-4">Advanced Features</h2>
        <div className="grid grid-cols-3 gap-4 mb-[20px]">
          <div className="p-4 bg-green-100 rounded-lg">
            <h3 className="font-bold mb-2">Auto Revalidate</h3>
            <CodeHighlighter 
              code={`useSWR('/api/data', fetcher, {\n  refreshInterval: 3000\n})`} 
              lang="javascript" 
              theme="vitesse-dark" 
            />
          </div>
          <div className="p-4 bg-blue-100 rounded-lg">
            <h3 className="font-bold mb-2">Fallback Data</h3>
            <CodeHighlighter 
              code={`useSWR('/api/data', fetcher, {\n  fallbackData: initialData\n})`} 
              lang="javascript" 
              theme="vitesse-dark" 
            />
          </div>
          <div className="p-4 bg-purple-100 rounded-lg">
            <h3 className="font-bold mb-2">Error Retry</h3>
            <CodeHighlighter 
              code={`useSWR('/api/data', fetcher, {\n  shouldRetryOnError: false\n})`} 
              lang="javascript" 
              theme="vitesse-dark" 
            />
          </div>
        </div>
      </section>

      <section>
        <h2 className="text-2xl font-bold mb-4">Error Handling</h2>
        <div className="grid grid-cols-2 gap-4">
          <div>
            <CodeHighlighter 
              code={errorHandling} 
              lang="javascript" 
              theme="vitesse-dark" 
            />
          </div>
          <div className="p-4 bg-red-100 rounded-lg">
            <h3 className="font-bold mb-2">Error Simulation</h3>
            <CodeHighlighter 
              code="const ENDPOINT = '/api/data?simulatedError=true'" 
              lang="javascript" 
              theme="vitesse-dark" 
            />
            <p className="mt-2 text-sm">
              Add query param to trigger server errors
            </p>
          </div>
        </div>
      </section>

      <section className="mt-8">
        <h2 className="text-2xl font-bold mb-4">Best Practices</h2>
        <div className="grid grid-cols-3 gap-4">
          <div className="p-4 bg-green-100 rounded-lg">
            <h3 className="font-bold mb-2">Centralize Fetchers</h3>
            <p>Reuse across components</p>
          </div>
          <div className="p-4 bg-blue-100 rounded-lg">
            <h3 className="font-bold mb-2">Type Safety</h3>
            <p>Use TypeScript interfaces</p>
          </div>
          <div className="p-4 bg-purple-100 rounded-lg">
            <h3 className="font-bold mb-2">Cache Strategy</h3>
            <p>Set appropriate TTLs</p>
          </div>
        </div>
      </section>

      <section>
        <h2 className="text-2xl font-bold mb-4">SWR Benefits</h2>
        <div className="p-4 bg-gray-50 rounded-lg">
          <ul className="list-disc pl-6 space-y-2">
            <li>Stale-while-revalidate caching</li>
            <li>Automatic retry on error</li>
            <li>Window focus revalidation</li>
            <li>Deduped simultaneous requests</li>
          </ul>
        </div>
      </section>
    </div>
    </>
  );
}