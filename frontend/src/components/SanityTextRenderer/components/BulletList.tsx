import React, { forwardRef } from "react";

type Children = { children?: React.ReactNode };

const BulletList = forwardRef<HTMLUListElement, Children>(
  ({ children }, ref) => <ul ref={ref}>{children}</ul>,
);
BulletList.displayName = "BulletList";

export default BulletList;
