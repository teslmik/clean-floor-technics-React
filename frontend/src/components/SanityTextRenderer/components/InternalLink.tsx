import client from "@cms/lib/sanitiClient";
import React, { forwardRef, useEffect } from "react";

type Value = {
  value?: {
    href?: string;
    reference?: { _ref: string };
  };
  children: React.ReactNode;
};

const InternalLink = forwardRef<HTMLAnchorElement, Value>(
  ({ value, children }, ref) => {
    const [href, setHref] = React.useState<string>("/");

    useEffect(() => {
      const fetchLinkData = async (id: string) => {
        const data = await client.fetch(
          `*[_type == "products" && _id == $id][0] { slug, category }`,
          { id },
        );

        if (data) {
          setHref(`/products/${data.category}/${data.slug?.current}`);
        }
      };
      const ref = value?.reference?._ref;
      if (ref) {
        fetchLinkData(ref);
      }
    }, [value?.reference?._ref]);
    return (
      <a href={href} ref={ref}>
        {children}
      </a>
    );
  },
);
InternalLink.displayName = "InternalLink";

export default InternalLink;
