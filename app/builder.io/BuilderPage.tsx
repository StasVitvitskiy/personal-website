import { BuilderComponent } from "@builder.io/react";
import { BuilderComponentProps } from "@builder.io/react/dist/types/src/components/builder-component.component";

export function BuilderPage({
  content,
}: {
  content: BuilderComponentProps["content"];
}) {
  return (
    <>
      <BuilderComponent model="page" content={content} />
    </>
  );
}
