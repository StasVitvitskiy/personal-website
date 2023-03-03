import { builder } from "@builder.io/react";

builder.init(process.env.BUILDER_IO_KEY as string);

export async function fetchPageContent(pathname: string) {
  return builder
    .get("page", {
      url: pathname,
      prerender: true,
    })
    .promise();
}
