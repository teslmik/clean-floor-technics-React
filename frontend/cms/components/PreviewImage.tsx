import imageUrlBuilder from "@sanity/image-url";
import { SanityImageSource } from "@sanity/image-url/lib/types/types";
import React from "react";
import { useClient } from "sanity";

export const PreviewImage = React.forwardRef<
  HTMLImageElement,
  {
    value: string | SanityImageSource;
    objectFit?: React.CSSProperties["objectFit"];
  }
>(({ value, objectFit = "cover" }, ref) => {
  const client = useClient({ apiVersion: "2023-01-01" });
  const builder = imageUrlBuilder(client);

  let src: string | undefined;

  if (typeof value === "string") {
    src = value;
  } else if ("asset" in value && (value.asset?._ref || value.asset?._id)) {
    src = builder.image(value).width(300).url();
  } else if (
    typeof value === "object" &&
    value !== null &&
    "_upload" in value &&
    (value as any)._upload?.previewImage
  ) {
    src = (value as any)._upload.previewImage;
  }

  if (!src) return null;

  return <img ref={ref} src={src} alt="preview" style={{ objectFit }} />;
});
