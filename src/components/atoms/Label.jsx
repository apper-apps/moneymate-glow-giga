import React from "react";
import { cn } from "@/utils/cn";

const Label = React.forwardRef(({ 
  className, 
  children, 
  ...props 
}, ref) => {
  return (
    <label
      className={cn(
        "label",
        className
      )}
      ref={ref}
      {...props}
    >
      {children}
    </label>
  );
});

Label.displayName = "Label";

export default Label;