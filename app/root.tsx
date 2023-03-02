import { json, MetaFunction } from "@remix-run/node";
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

export const meta: MetaFunction = () => ({
  charset: "utf-8",
  title: "New Remix App",
  viewport: "width=device-width,initial-scale=1",
});

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
