import React, { forwardRef } from "react";

const Heading = forwardRef<
  HTMLElement,
  { children: React.ReactNode; level: number }
>(({ children, level }, ref) => {
  const Tag = `h${level}` as keyof JSX.IntrinsicElements;
  return React.createElement(Tag, { ref }, children);
});
Heading.displayName = "Heading";

export default Heading;
