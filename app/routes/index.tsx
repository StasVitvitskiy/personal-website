import { defer } from "@remix-run/node";
import { fetchPageContent } from "~/builder.io/fetchPageContent";
import { Await, useLoaderData } from "@remix-run/react";
import { Suspense } from "react";
import { BuilderPage } from "~/builder.io/BuilderPage";

export function loader() {
  return defer({
    content: fetchPageContent("/resume-index"),
  });
}

export default function Index() {
  const data = useLoaderData<typeof loader>();

  return (
    <Suspense fallback={<p>Loading page...</p>}>
      <Await resolve={data.content} errorElement={<p>Page not found!</p>}>
        {(content) => <BuilderPage content={content} />}
      </Await>
    </Suspense>
  );
}
