import { BuilderComponent } from "@builder.io/react";
import { BuilderComponentProps } from "@builder.io/react/dist/types/src/components/builder-component.component";
import { useEffect } from "react";
import { initializeBuilder } from "./initializeBuilder";

export function BuilderPage({
  content,
}: {
  content: BuilderComponentProps["content"];
}) {
  useEffect(() => {
    initializeBuilder();
  }, []);

  return (
    <>
      <BuilderComponent model="page" content={content} />
    </>
  );
}
