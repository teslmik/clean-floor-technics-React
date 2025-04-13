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

  return (
    <img
      ref={ref}
      src={
        typeof value === "string"
          ? value
          : builder.image(value).width(300).url()
      }
      alt="preview"
      style={{ objectFit }}
    />
  );
});
