import { BuilderComponent } from "@builder.io/react";
import { BuilderComponentProps } from "@builder.io/react/dist/types/src/components/builder-component.component";

export function BuilderPage({
  content,
}: {
  content: BuilderComponentProps["content"];
}) {
  return (
    <>
      <BuilderComponent
        apiKey={process.env.BUILDER_IO_KEY}
        model="page"
        content={content}
      />
    </>
  );
}
