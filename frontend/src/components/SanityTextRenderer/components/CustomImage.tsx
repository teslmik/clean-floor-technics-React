import client from "@cms/lib/sanitiClient";
import imageUrlBuilder from "@sanity/image-url";
import { forwardRef } from "react";

type ImageValue = {
  value: {
    asset?: { _ref: string };
    alt?: string;
  };
};

const CustomImage = forwardRef<HTMLDivElement, ImageValue>(({ value }, ref) => {
  if (!value?.asset?._ref) return null;
  const builder = imageUrlBuilder(client);
  const imageUrl = builder.image(value.asset).width(300).height(200).url();
  return (
    <div ref={ref} style={{ maxWidth: "100%", textAlign: "center" }}>
      <img
        src={imageUrl}
        alt={value.alt || "Sanity Image"}
        width={600}
        height={400}
      />
    </div>
  );
});
CustomImage.displayName = "CustomImage";

export default CustomImage;
