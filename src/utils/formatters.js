import { format } from "date-fns";

export const formatCurrency = (amount) => {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  }).format(amount);
};

export const formatDate = (date) => {
  return format(new Date(date), "MMM dd, yyyy");
};

export const formatRelativeDate = (date) => {
  const now = new Date();
  const targetDate = new Date(date);
  const diffInDays = Math.ceil((targetDate - now) / (1000 * 60 * 60 * 24));
  
  if (diffInDays === 0) return "Today";
  if (diffInDays === 1) return "Tomorrow";
  if (diffInDays === -1) return "Yesterday";
  if (diffInDays > 1) return `In ${diffInDays} days`;
  if (diffInDays < -1) return `${Math.abs(diffInDays)} days ago`;
  
  return formatDate(date);
};

export const formatCompactCurrency = (amount) => {
  if (amount >= 1000000) {
    return `$${(amount / 1000000).toFixed(1)}M`;
  }
  if (amount >= 1000) {
    return `$${(amount / 1000).toFixed(1)}K`;
  }
  return formatCurrency(amount);
};

export const getCategoryIcon = (category) => {
  const icons = {
    Food: "UtensilsCrossed",
    Transport: "Car",
    Bills: "Receipt",
    Entertainment: "Music",
    Shopping: "ShoppingBag",
    Health: "Heart",
    Education: "BookOpen",
    Travel: "Plane",
    Other: "MoreHorizontal",
  };
  return icons[category] || "MoreHorizontal";
};

export const getCategoryColor = (category) => {
  const colors = {
    Food: "text-orange-600",
    Transport: "text-blue-600",
    Bills: "text-red-600",
    Entertainment: "text-purple-600",
    Shopping: "text-pink-600",
    Health: "text-green-600",
    Education: "text-indigo-600",
    Travel: "text-yellow-600",
    Other: "text-gray-600",
  };
  return colors[category] || "text-gray-600";
};