import React, { forwardRef } from "react";

type Value = {
  value?: {
    href?: string;
    reference?: { _ref: string };
  };
  children: React.ReactNode;
};

const Phone = forwardRef<HTMLAnchorElement, Value>(
  ({ value, children }, ref) => (
    <a ref={ref} href={value?.href || "#"}>
      {children}
    </a>
  ),
);
Phone.displayName = "Phone";

export default Phone;
