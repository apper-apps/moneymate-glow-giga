import React from "react";
import { cn } from "@/utils/cn";

const Select = React.forwardRef(({ 
  className, 
  children, 
  ...props 
}, ref) => {
  return (
    <select
      className={cn(
        "input-field appearance-none bg-white",
        className
      )}
      ref={ref}
      {...props}
    >
      {children}
    </select>
  );
});

Select.displayName = "Select";

export default Select;