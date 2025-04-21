import React, { forwardRef } from "react";

type Children = { children?: React.ReactNode };

const QuoteBlock = forwardRef<HTMLQuoteElement, Children>(
  ({ children }, ref) => <blockquote ref={ref}>{children}</blockquote>,
);
QuoteBlock.displayName = "QuoteBlock";

export default QuoteBlock;
