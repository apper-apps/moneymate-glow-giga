import React from "react";
import { cn } from "@/utils/cn";
import Card from "@/components/atoms/Card";
import Button from "@/components/atoms/Button";
import ApperIcon from "@/components/ApperIcon";

const Empty = ({ 
  title = "No data found", 
  description = "Get started by adding your first item", 
  actionLabel = "Add Item", 
  onAction, 
  icon = "Inbox",
  className,
  ...props 
}) => {
  return (
    <Card 
      className={cn(
        "p-12 text-center bg-gradient-to-br from-blue-50 to-purple-50 border-blue-200",
        className
      )}
      {...props}
    >
      <div className="w-20 h-20 bg-gradient-to-br from-blue-100 to-purple-100 rounded-full flex items-center justify-center mx-auto mb-6">
        <ApperIcon name={icon} size={36} className="text-blue-600" />
      </div>
      
      <h3 className="text-xl font-semibold text-gray-900 mb-2">
        {title}
      </h3>
      
      <p className="text-gray-600 mb-8 max-w-md mx-auto">
        {description}
      </p>
      
      {onAction && (
        <Button 
          onClick={onAction}
          variant="primary"
          className="inline-flex items-center"
        >
          <ApperIcon name="Plus" size={16} className="mr-2" />
          {actionLabel}
        </Button>
      )}
    </Card>
  );
};

export default Empty;