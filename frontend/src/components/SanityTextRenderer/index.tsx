import { PortableText, PortableTextReactComponents } from "@portabletext/react";
import React from "react";

import { BlockContent } from "@src/types/types";
import BulletList from "./components/BulletList";
import CustomImage from "./components/CustomImage";
import Heading from "./components/Heading";
import { InstagramPost } from "./components/InstagramPost";
import InternalLink from "./components/InternalLink";
import Link from "./components/Link";
import NormalBlock from "./components/NormalBlock";
import Phone from "./components/Phone";
import QuoteBlock from "./components/QuoteBlock";
import Strong from "./components/Strong";

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
    types: {
      image: CustomImage,
      instagramPost: InstagramPost,
    },
  };

  if (!content || content.length === 0) return null;

  return <PortableText value={content} components={components} />;
};

export default SanityTextRenderer;
