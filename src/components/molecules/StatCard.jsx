import React from "react";
import { cn } from "@/utils/cn";
import Card from "@/components/atoms/Card";
import ApperIcon from "@/components/ApperIcon";

const StatCard = ({ 
  title, 
  value, 
  icon, 
  trend, 
  trendValue, 
  className,
  variant = "default",
  ...props 
}) => {
  const getTrendColor = () => {
    if (trend === "up") return "text-accent-600";
    if (trend === "down") return "text-red-600";
    return "text-gray-600";
  };

  const getTrendIcon = () => {
    if (trend === "up") return "TrendingUp";
    if (trend === "down") return "TrendingDown";
    return "Minus";
  };

  return (
    <Card 
      variant={variant}
      className={cn(
        "p-6 hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1",
        className
      )}
      {...props}
    >
      <div className="flex items-center justify-between">
        <div className="flex-1">
          <p className="text-sm font-medium text-gray-600 mb-1">{title}</p>
          <p className="text-2xl font-bold text-gray-900">{value}</p>
          {trend && (
            <div className={cn("flex items-center mt-2", getTrendColor())}>
              <ApperIcon name={getTrendIcon()} size={16} className="mr-1" />
              <span className="text-sm font-medium">{trendValue}</span>
            </div>
          )}
        </div>
        {icon && (
          <div className="flex-shrink-0">
            <div className="w-12 h-12 bg-gradient-to-br from-primary-100 to-primary-200 rounded-lg flex items-center justify-center">
              <ApperIcon name={icon} size={24} className="text-primary-600" />
            </div>
          </div>
        )}
      </div>
    </Card>
  );
};

export default StatCard;