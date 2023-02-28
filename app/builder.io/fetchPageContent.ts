import { initializeBuilder } from "./initializeBuilder";

const initPromise = Promise.resolve(initializeBuilder());

export async function fetchPageContent(pathname: string) {
  return initPromise.then((builder) => {
    return builder
      .get("page", {
        url: pathname,
      })
      .promise()
      .then((content) => content || "");
  });
}
