import builder from "@builder.io/react";

export function initializeBuilder() {
  if (!builder.apiKey) {
    builder.init(process.env.BUILDER_IO_KEY as string);
  }

  return builder;
}
