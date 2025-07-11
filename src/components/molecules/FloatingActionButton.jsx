import React from "react";
import { cn } from "@/utils/cn";
import Button from "@/components/atoms/Button";
import ApperIcon from "@/components/ApperIcon";

const FloatingActionButton = ({ 
  onClick, 
  className,
  icon = "Plus",
  ...props 
}) => {
  return (
    <Button
      onClick={onClick}
      className={cn(
        "fixed bottom-6 right-6 w-14 h-14 rounded-full shadow-2xl hover:shadow-3xl z-50",
        "bg-gradient-to-r from-primary-600 to-primary-700 hover:from-primary-700 hover:to-primary-800",
        "transform hover:scale-110 transition-all duration-300",
        className
      )}
      {...props}
    >
      <ApperIcon name={icon} size={24} />
    </Button>
  );
};

export default FloatingActionButton;