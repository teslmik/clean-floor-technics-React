import React, { forwardRef } from "react";

type Value = {
  value?: {
    href?: string;
    reference?: { _ref: string };
  };
  children: React.ReactNode;
};

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

export default Link;
