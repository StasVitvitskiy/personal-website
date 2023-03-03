import { LoaderArgs, V2_MetaFunction } from "@remix-run/node";
import { fetchPageContent } from "~/builder.io/fetchPageContent";
import { useLoaderData } from "@remix-run/react";
import { BuilderPage } from "~/builder.io/BuilderPage";

export async function loader({ request }: LoaderArgs) {
  const url = new URL(request.url);
  const page = await fetchPageContent(url.pathname);

  return {
    content: page,
    title: page?.data?.title as string,
    description: page?.data?.description as string,
    url,
  };
}

export const meta: V2_MetaFunction<typeof loader> = ({ data }): {}[] => {
  return [
    { title: data.title as string },
    { description: data.description as string },
  ];
};

export default function BuilderPageRoot() {
  const data = useLoaderData<typeof loader>();

  return <BuilderPage url={data.url} content={data.content} />;
}
