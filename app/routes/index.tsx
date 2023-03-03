import { defer, LoaderArgs, V2_MetaFunction } from "@remix-run/node";
import { fetchPageContent } from "~/builder.io/fetchPageContent";
import { Await, useLoaderData } from "@remix-run/react";
import { Suspense } from "react";
import { BuilderPage } from "~/builder.io/BuilderPage";
import { ThrowError } from "~/errorHandling/ThrowError";
import { VividSpinner } from "~/loading/VividSpinner";

export async function loader({ request }: LoaderArgs) {
  const fetchContentPromise = fetchPageContent("/resume-index");
  const page = await fetchContentPromise;

  return defer({
    content: fetchContentPromise,
    title: page?.data?.title as string,
    description: page?.data?.description as string,
  });
}

export const meta: V2_MetaFunction<typeof loader> = ({ data }): {}[] => {
  return [
    { title: data.title as string },
    { description: data.description as string },
  ];
};

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
