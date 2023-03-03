import { json, MetaFunction, V2_MetaFunction } from "@remix-run/node";
import {
  Links,
  LiveReload,
  Meta,
  Outlet,
  Scripts,
  ScrollRestoration,
  useLoaderData,
} from "@remix-run/react";
import pick from "lodash/pick";

import documentStyles from "~/document/document.css";
import vividSpinnerStyles from "~/loading/vividSpinner.css";
import { ServerErrorPage } from "~/errorHandling/serverError/ServerError";

export function links() {
  return [
    {
      rel: "stylesheet",
      href: "https://fonts.googleapis.com/css?family=Poppins%3A100%2C100italic%2C200%2C200italic%2C300%2C300italic%2C400%2C400italic%2C500%2C500italic%2C600%2C600italic%2C700%2C700italic%2C800%2C800italic%2C900%2C900italic%7CRoboto+Mono%3A100%2C100italic%2C200%2C200italic%2C300%2C300italic%2C400%2C400italic%2C500%2C500italic%2C600%2C600italic%2C700%2C700italic%2C800%2C800italic%2C900%2C900italic&display=swap",
    },
    { rel: "stylesheet", href: documentStyles },
    { rel: "stylesheet", href: vividSpinnerStyles },
    {
      rel: "apple-touch-icon",
      sizes: "180x180",
      href: "/apple-touch-icon.png",
    },
    {
      rel: "icon",
      type: "image/png",
      sizes: "32x32",
      href: "/favicon-32x32.png",
    },
    {
      rel: "icon",
      type: "image/png",
      sizes: "16x16",
      href: "/favicon-16x16.png",
    },
    { rel: "manifest", href: "/site.webmanifest" },
  ];
}

export const meta: V2_MetaFunction = () => [
  {
    charset: "utf-8",
    viewport: "width=device-width,initial-scale=1",
  },
];

export default function App() {
  const data = useLoaderData<typeof loader>();

  return (
    <html lang="en">
      <head>
        <Meta />
        <Links />
      </head>
      <body>
        <script
          dangerouslySetInnerHTML={{
            __html: `
                window.process = {
                  env: ${JSON.stringify(pick(data.ENV, "BUILDER_IO_KEY"))}
                }
              `,
          }}
        />
        <Outlet />
        <ScrollRestoration />
        <Scripts />
        <LiveReload />
      </body>
    </html>
  );
}

export function ErrorBoundary({ error }: { error: Error }) {
  return (
    <>
      <ServerErrorPage />
      <script src="https://cdnjs.cloudflare.com/ajax/libs/gsap/1.17.0/TweenMax.min.js"></script>
      <script src="/serverError.js"></script>
    </>
  );
}

export async function loader() {
  return json({
    ENV: {
      BUILDER_IO_KEY: process.env.BUILDER_IO_KEY,
      NODE_ENV: process.env.NODE_ENV,
    },
  });
}
