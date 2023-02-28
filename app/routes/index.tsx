import { defer } from "@remix-run/node";
import { fetchPageContent } from "~/builder.io/fetchPageContent";
import { Await, useLoaderData } from "@remix-run/react";
import { Suspense } from "react";
import { BuilderPage } from "~/builder.io/BuilderPage";
import { ThrowError } from "~/errorHandling/ThrowError";
import { VividSpinner } from "~/loading/VividSpinner";

export function loader() {
  return defer({
    content: fetchPageContent("/resume-index"),
  });
}

export default function IndexPageRoot() {
  const data = useLoaderData<typeof loader>();

  return (
    <Suspense fallback={<VividSpinner />}>
      <Await
        resolve={data.content}
        errorElement={<ThrowError msg="Builder.io render error" />}
      >
        {(content) => <BuilderPage content={content} />}
      </Await>
    </Suspense>
  );
}
