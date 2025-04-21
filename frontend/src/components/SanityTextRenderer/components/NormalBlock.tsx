import React, { forwardRef } from "react";

type Children = { children?: React.ReactNode };

const NormalBlock = forwardRef<HTMLParagraphElement, Children>(
  ({ children }, ref) => <p ref={ref}>{children}</p>,
);
NormalBlock.displayName = "NormalBlock";

export default NormalBlock;
