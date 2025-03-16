import React from "react";
import { PortableText, PortableTextReactComponents } from "@portabletext/react";
import imageUrlBuilder from "@sanity/image-url";

import { BlockContent } from "../../@types/types";
import client from "../../../cms/lib/sanitiClient";

type Children = { children?: React.ReactNode };
type Value = { value?: any; children: React.ReactNode };

const Strong: React.FC<{ children: React.ReactNode }> = ({ children }) => (
  <strong>{children}</strong>
);
const Link: React.FC<Value> = ({ value, children }) => {
  const isAbsolute =
    value?.href?.startsWith("http://") || value?.href?.startsWith("https://");
  return (
    <a
      href={value?.href}
      target={isAbsolute ? "_blank" : "_self"}
      rel={isAbsolute ? "noopener noreferrer" : undefined}
    >
      {children}
    </a>
  );
};
const Phone: React.FC<Value> = ({ value, children }) => (
  <a href={value?.href}>{children}</a>
);
const BulletList: React.FC<Children> = ({ children }) => <ul>{children}</ul>;
const NormalBlock: React.FC<Children> = ({ children }) => <p>{children}</p>;
const QuoteBlock: React.FC<Children> = ({ children }) => (
  <blockquote>{children}</blockquote>
);
const Heading: React.FC<{ children: React.ReactNode; level: number }> = ({
  children,
  level,
}) => {
  const Tag = `h${level}` as keyof JSX.IntrinsicElements;
  return <Tag>{children}</Tag>;
};
const CustomImage: React.FC<{ value: any }> = ({ value }) => {
  if (!value?.asset?._ref) return null;
  const builder = imageUrlBuilder(client);
  const imageUrl = builder.image(value.asset).width(300).height(200).url();
  return (
    <div style={{ maxWidth: "100%", textAlign: "center" }}>
      <img
        src={imageUrl}
        alt={value.alt || "Sanity Image"}
        width={600}
        height={400}
      />
    </div>
  );
};

const SanityTextRenderer: React.FC<{ content?: BlockContent }> = ({
  content,
}) => {
  const components: Partial<PortableTextReactComponents> = {
    marks: {
      strong: Strong,
      link: Link,
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
