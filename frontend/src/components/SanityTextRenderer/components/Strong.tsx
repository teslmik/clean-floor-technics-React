import React, { forwardRef } from "react";

type Children = { children?: React.ReactNode };

const Strong = forwardRef<HTMLElement, Children>(({ children }, ref) => (
  <strong ref={ref}>{children}</strong>
));
Strong.displayName = "Strong";

export default Strong;
