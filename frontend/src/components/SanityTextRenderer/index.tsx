import { PortableText, PortableTextReactComponents } from "@portabletext/react";
import imageUrlBuilder from "@sanity/image-url";
import React, { forwardRef, useEffect } from "react";

import client from "@cms/lib/sanitiClient";
import { BlockContent } from "@src/types/types";

type Children = { children?: React.ReactNode };
type Value = {
  value?: {
    href?: string;
    reference?: { _ref: string };
  };
  children: React.ReactNode;
};

type ImageValue = {
  value: {
    asset?: { _ref: string };
    alt?: string;
  };
};

const Strong = forwardRef<HTMLElement, Children>(({ children }, ref) => (
  <strong ref={ref}>{children}</strong>
));
Strong.displayName = "Strong";

const Link = forwardRef<HTMLAnchorElement, Value>(
  ({ value, children }, ref) => {
    const href = value?.href || "#";
    const isAbsolute =
      href.startsWith("http://") || href.startsWith("https://");
    return (
      <a
        href={href}
        target={isAbsolute ? "_blank" : "_self"}
        rel={isAbsolute ? "noopener noreferrer" : undefined}
        ref={ref}
      >
        {children}
      </a>
    );
  },
);
Link.displayName = "Link";

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

const Phone = forwardRef<HTMLAnchorElement, Value>(
  ({ value, children }, ref) => (
    <a ref={ref} href={value?.href || "#"}>
      {children}
    </a>
  ),
);
Phone.displayName = "Phone";

const BulletList = forwardRef<HTMLUListElement, Children>(
  ({ children }, ref) => <ul ref={ref}>{children}</ul>,
);
BulletList.displayName = "BulletList";

const NormalBlock = forwardRef<HTMLParagraphElement, Children>(
  ({ children }, ref) => <p ref={ref}>{children}</p>,
);
NormalBlock.displayName = "NormalBlock";

const QuoteBlock = forwardRef<HTMLQuoteElement, Children>(
  ({ children }, ref) => <blockquote ref={ref}>{children}</blockquote>,
);
QuoteBlock.displayName = "QuoteBlock";

const Heading = forwardRef<
  HTMLElement,
  { children: React.ReactNode; level: number }
>(({ children, level }, ref) => {
  const Tag = `h${level}` as keyof JSX.IntrinsicElements;
  return React.createElement(Tag, { ref }, children);
});
Heading.displayName = "Heading";

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

const SanityTextRenderer: React.FC<{ content: BlockContent | undefined }> = ({
  content,
}) => {
  const components: Partial<PortableTextReactComponents> = {
    marks: {
      strong: Strong,
      link: Link,
      internalLink: InternalLink,
      phone: Phone,
    },
    list: {
      bullet: BulletList,
    },
    block: {
      normal: NormalBlock,
      blockquote: QuoteBlock,
      h1: ({ children }) => <Heading level={1}>{children}</Heading>,
      h2: ({ children }) => <Heading level={2}>{children}</Heading>,
      h3: ({ children }) => <Heading level={3}>{children}</Heading>,
      h4: ({ children }) => <Heading level={4}>{children}</Heading>,
    },
    types: { image: CustomImage },
  };

  if (!content || content.length === 0) return null;

  return <PortableText value={content} components={components} />;
};

export default SanityTextRenderer;
