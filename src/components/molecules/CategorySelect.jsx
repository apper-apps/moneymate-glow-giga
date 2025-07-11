import React from "react";
import { cn } from "@/utils/cn";
import Select from "@/components/atoms/Select";
import ApperIcon from "@/components/ApperIcon";

const CategorySelect = ({ 
  value, 
  onChange, 
  className,
  ...props 
}) => {
  const categories = [
    { value: "Food", label: "Food & Dining", icon: "UtensilsCrossed" },
    { value: "Transport", label: "Transportation", icon: "Car" },
    { value: "Bills", label: "Bills & Utilities", icon: "Receipt" },
    { value: "Entertainment", label: "Entertainment", icon: "Music" },
    { value: "Shopping", label: "Shopping", icon: "ShoppingBag" },
    { value: "Health", label: "Health & Fitness", icon: "Heart" },
    { value: "Education", label: "Education", icon: "BookOpen" },
    { value: "Travel", label: "Travel", icon: "Plane" },
    { value: "Other", label: "Other", icon: "MoreHorizontal" },
  ];

  return (
    <div className={cn("relative", className)}>
      <Select
        value={value}
        onChange={onChange}
        {...props}
      >
        <option value="">Select a category</option>
        {categories.map((category) => (
          <option key={category.value} value={category.value}>
            {category.label}
          </option>
        ))}
      </Select>
      <ApperIcon 
        name="ChevronDown" 
        size={20} 
        className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 pointer-events-none" 
      />
    </div>
  );
};

export default CategorySelect;