import { BuilderComponent } from "@builder.io/react";
import { BuilderComponentProps } from "@builder.io/react/dist/types/src/components/builder-component.component";
import React from "react";

export function BuilderPage({
  url,
}: {
  content: BuilderComponentProps["content"];
  url: string;
}) {
  return (
    <>
      <BuilderComponent
        apiKey={process.env.BUILDER_IO_KEY}
        model="page"
        url={url}
      />
    </>
  );
}
