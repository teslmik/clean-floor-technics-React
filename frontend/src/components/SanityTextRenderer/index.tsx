import { PortableText, PortableTextReactComponents } from "@portabletext/react";
import imageUrlBuilder from "@sanity/image-url";
import React, { forwardRef, useEffect } from "react";

import client from "@cms/lib/sanitiClient";
import { BlockContent } from "@src/types/types";

type Children = { children?: React.ReactNode };
type Value = { value?: any; children: React.ReactNode };

const Strong = forwardRef<HTMLElement, Children>(({ children }, ref) => (
  <strong ref={ref}>{children}</strong>
));
const Link = forwardRef<HTMLAnchorElement, Value>(
  ({ value, children }, ref) => {
    const isAbsolute =
      value?.href?.startsWith("http://") || value?.href?.startsWith("https://");
    return (
      <a
        href={value?.href}
        target={isAbsolute ? "_blank" : "_self"}
        rel={isAbsolute ? "noopener noreferrer" : undefined}
        ref={ref}
      >
        {children}
      </a>
    );
  },
);
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
      fetchLinkData(value?.reference?._ref);
    }, [value?.reference?._ref]);
    return (
      <a href={href} ref={ref}>
        {children}
      </a>
    );
  },
);
const Phone = forwardRef<HTMLAnchorElement, Value>(
  ({ value, children }, ref) => (
    <a ref={ref} href={value?.href}>
      {children}
    </a>
  ),
);
const BulletList = forwardRef<HTMLUListElement, Children>(
  ({ children }, ref) => <ul ref={ref}>{children}</ul>,
);
const NormalBlock = forwardRef<HTMLParagraphElement, Children>(
  ({ children }, ref) => <p ref={ref}>{children}</p>,
);
const QuoteBlock = forwardRef<HTMLQuoteElement, Children>(
  ({ children }, ref) => <blockquote ref={ref}>{children}</blockquote>,
);
const Heading = forwardRef<
  HTMLElement,
  { children: React.ReactNode; level: number }
>(({ children, level }, ref) => {
  const Tag = `h${level}` as keyof JSX.IntrinsicElements;
  return React.createElement(Tag, { ref }, children);
});
const CustomImage = forwardRef<HTMLDivElement, { value: any }>(
  ({ value }, ref) => {
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
  },
);

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
