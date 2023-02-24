import builder from "@builder.io/react";

const initPromise = Promise.resolve(
  builder.init(process.env.BUILDER_IO_KEY as string)
);

export async function fetchPageContent(pathname: string) {
  return initPromise.then(() => {
    return builder
      .get("page", {
        url: pathname,
      })
      .promise()
      .then((content) => content || "");
  });
}
