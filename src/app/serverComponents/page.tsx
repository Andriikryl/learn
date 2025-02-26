"use client";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import CodeHighlighter from "@/components/CodeHighlighter";

const approachComparison = [
  {
    approach: "PHP",
    type: "Server-side",
    dataFetching: "Direct in template",
    interactivity: "Requires JS",
    bundleSize: "Zero client JS",
  },
  {
    approach: "Client-Side React (SWR)",
    type: "Client-side",
    dataFetching: "API endpoints",
    interactivity: "Full client control",
    bundleSize: "Large (incl. React + SWR)",
  },
  {
    approach: "Next.js (getServerSideProps)",
    type: "Hybrid",
    dataFetching: "Server-side props",
    interactivity: "Hydration required",
    bundleSize: "Medium (partial hydration)",
  },
  {
    approach: "React Server Components",
    type: "Server-first",
    dataFetching: "Direct in component",
    interactivity: "Selective hydration",
    bundleSize: "Minimal (zero JS for RSCs)",
  },
];

export function ApproachComparisonTable() {
  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>Approach</TableHead>
          <TableHead>Type</TableHead>
          <TableHead>Data Fetching</TableHead>
          <TableHead>Interactivity</TableHead>
          <TableHead>JS Bundle</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {approachComparison.map((approach) => (
          <TableRow key={approach.approach}>
            <TableCell className="font-medium">{approach.approach}</TableCell>
            <TableCell>{approach.type}</TableCell>
            <TableCell>{approach.dataFetching}</TableCell>
            <TableCell>{approach.interactivity}</TableCell>
            <TableCell>{approach.bundleSize}</TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}

export default function ReactServerComponentsGuide() {
  return (
    <div className="flex flex-col gap-6">
      <h1 className="scroll-m-20 text-4xl font-extrabold tracking-tight lg:text-5xl mb-6">
        React Server Components (RSC)
      </h1>

      {/* Introduction Section */}
      <Card>
        <CardHeader>
          <CardTitle>What Are React Server Components?</CardTitle>
          <CardDescription>
            React Server Components (RSC) is a new paradigm that allows React components to run exclusively on the server. This enables powerful features like reduced client-side JavaScript and seamless data fetching.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <p className="mb-4">
            RSC combines the best of server-side rendering (SSR) and client-side rendering (CSR). It allows developers to write components that fetch data directly on the server, eliminating the need for client-side data fetching and reducing JavaScript bundle size.
          </p>
          <ApproachComparisonTable />
        </CardContent>
      </Card>

      {/* PHP vs RSC Section */}
      <Card>
        <CardHeader>
          <CardTitle>Traditional PHP vs RSC</CardTitle>
          <CardDescription>
            PHP-style server rendering with React component benefits
          </CardDescription>
        </CardHeader>
        <CardContent>
          <p className="mb-4">
            PHP has long been a popular choice for server-rendered applications. It allows developers to embed server-side logic directly in HTML templates. However, PHP lacks the component model and interactivity that React provides.
          </p>
          <CodeHighlighter
            code={`<?php
  $data = mysqli_query($link, "SELECT * FROM products");
  while ($item = mysqli_fetch_array($data)) {
    echo "<article>";
    echo "<h2>{$item['title']}</h2>";
    echo "</article>";
  }
?>`}
            lang="php"
            theme="vitesse-dark"
          />
          <p className="mt-4">
            React Server Components bring a similar server-side rendering approach but with the added benefits of React's component model and interactivity.
          </p>
        </CardContent>
      </Card>

      {/* Client-Side React Section */}
      <Card>
        <CardHeader>
          <CardTitle>Client-Side React Limitations</CardTitle>
          <CardDescription>
            Traditional React data fetching requires client-side orchestration
          </CardDescription>
        </CardHeader>
        <CardContent>
          <p className="mb-4">
            In client-side React, data fetching is typically done using libraries like SWR or React Query. This requires a network request and a loading state, which can impact performance and user experience.
          </p>
          <CodeHighlighter
            code={`function Products() {
  const { data, isLoading } = useSWR('/api/products', fetcher);
  
  if (isLoading) return <Loader />;
  
  return data.map(item => (
    <ProductCard key={item.id} {...item} />
  ));
}`}
            lang="javascript"
            theme="vitesse-dark"
          />
          <p className="mt-4">
            This approach works well for interactive applications but can lead to larger JavaScript bundles and slower initial page loads.
          </p>
        </CardContent>
      </Card>

      {/* RSC Implementation Section */}
      <Card>
        <CardHeader>
          <CardTitle>RSC Solution</CardTitle>
          <CardDescription>
            Server Components enable direct data access with automatic bundling
          </CardDescription>
        </CardHeader>
        <CardContent>
          <p className="mb-4">
            React Server Components allow you to fetch data directly in your components, similar to PHP. The key difference is that RSCs are still React components, meaning they can be composed and reused like any other React component.
          </p>
          <CodeHighlighter
            code={`async function Products() {
  const data = await db.query('SELECT * FROM products');
  
  return (
    {data.map(item => (
      <ProductCard key={item.id} {...item} />
    ))}
  );
}`}
            lang="javascript"
            theme="vitesse-dark"
          />
          <p className="mt-4">
            This approach eliminates the need for client-side data fetching and reduces the amount of JavaScript sent to the browser.
          </p>
        </CardContent>
      </Card>

      {/* Feature Comparison Section */}
      <Card>
        <CardHeader>
          <CardTitle>Key Features Comparison</CardTitle>
          <CardDescription>
            Fundamental differences between rendering approaches
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Feature</TableHead>
                <TableHead>PHP</TableHead>
                <TableHead>Client React</TableHead>
                <TableHead>RSC</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              <TableRow>
                <TableCell className="font-medium">Data Fetching</TableCell>
                <TableCell>Direct DB access</TableCell>
                <TableCell>API endpoints</TableCell>
                <TableCell>Direct DB access</TableCell>
              </TableRow>
              <TableRow>
                <TableCell className="font-medium">Hydration</TableCell>
                <TableCell>None</TableCell>
                <TableCell>Full hydration</TableCell>
                <TableCell>Partial hydration</TableCell>
              </TableRow>
              <TableRow>
                <TableCell className="font-medium">Bundle Size</TableCell>
                <TableCell>None</TableCell>
                <TableCell>100-300kb</TableCell>
                <TableCell>10-50kb</TableCell>
              </TableRow>
              <TableRow>
                <TableCell className="font-medium">Interactivity</TableCell>
                <TableCell>JS required</TableCell>
                <TableCell>Built-in</TableCell>
                <TableCell>Selective</TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      {/* Summary Section */}
      <Card>
        <CardHeader>
          <CardTitle>Summary</CardTitle>
          <CardDescription>
            Key takeaways about React Server Components
          </CardDescription>
        </CardHeader>
        <CardContent>
          <ul className="list-disc pl-6 space-y-2">
            <li>
              React Server Components (RSC) enable server-side rendering for
              specific components.
            </li>
            <li>
              RSC reduces client-side JavaScript and improves performance.
            </li>
            <li>
              Client Components are marked with <code>'use client'</code> and run
              on both server and client.
            </li>
            <li>
              RSC and SSR work together to optimize rendering and data fetching.
            </li>
          </ul>
        </CardContent>
      </Card>
    </div>
  );
}