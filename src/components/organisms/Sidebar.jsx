import React, { useState } from "react";
import { NavLink, useLocation } from "react-router-dom";
import { cn } from "@/utils/cn";
import ApperIcon from "@/components/ApperIcon";

const Sidebar = ({ className }) => {
  const location = useLocation();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const navigation = [
    { name: "Dashboard", href: "/", icon: "LayoutDashboard" },
    { name: "Expenses", href: "/expenses", icon: "Receipt" },
    { name: "Debts", href: "/debts", icon: "Users" },
    { name: "Budget", href: "/budget", icon: "PieChart" },
  ];

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  return (
    <>
      {/* Mobile Menu Button */}
      <button
        className="lg:hidden fixed top-4 left-4 z-50 p-2 bg-white rounded-lg shadow-lg border border-gray-200"
        onClick={toggleMobileMenu}
      >
        <ApperIcon name={isMobileMenuOpen ? "X" : "Menu"} size={24} className="text-gray-600" />
      </button>

      {/* Mobile Overlay */}
      {isMobileMenuOpen && (
        <div 
          className="lg:hidden fixed inset-0 bg-black bg-opacity-50 z-40"
          onClick={toggleMobileMenu}
        />
      )}

      {/* Desktop Sidebar */}
      <div className={cn(
        "hidden lg:block w-64 bg-white border-r border-gray-200 shadow-lg",
        className
      )}>
        <div className="flex flex-col h-full">
          {/* Logo */}
          <div className="p-6 border-b border-gray-200">
            <div className="flex items-center">
              <div className="w-8 h-8 bg-gradient-to-br from-primary-600 to-secondary-600 rounded-lg flex items-center justify-center mr-3">
                <ApperIcon name="DollarSign" size={20} className="text-white" />
              </div>
              <h1 className="text-xl font-bold text-gradient">MoneyMate</h1>
            </div>
          </div>

          {/* Navigation */}
          <nav className="flex-1 p-4 space-y-2">
            {navigation.map((item) => (
              <NavLink
                key={item.name}
                to={item.href}
                className={({ isActive }) =>
                  cn(
                    "flex items-center px-4 py-3 text-sm font-medium rounded-lg transition-all duration-200",
                    "hover:bg-gradient-to-r hover:from-primary-50 hover:to-secondary-50",
                    "hover:text-primary-700 hover:shadow-md transform hover:scale-105",
                    isActive
                      ? "bg-gradient-to-r from-primary-100 to-secondary-100 text-primary-700 shadow-md"
                      : "text-gray-600"
                  )
                }
              >
                <ApperIcon name={item.icon} size={20} className="mr-3" />
                {item.name}
              </NavLink>
            ))}
          </nav>

          {/* User Section */}
          <div className="p-4 border-t border-gray-200">
            <div className="flex items-center p-3 bg-gradient-to-r from-gray-50 to-blue-50 rounded-lg">
              <div className="w-8 h-8 bg-gradient-to-br from-primary-600 to-secondary-600 rounded-full flex items-center justify-center mr-3">
                <ApperIcon name="User" size={16} className="text-white" />
              </div>
              <div>
                <p className="text-sm font-medium text-gray-900">Personal Account</p>
                <p className="text-xs text-gray-500">Finance Tracker</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Mobile Sidebar */}
      <div className={cn(
        "lg:hidden fixed inset-y-0 left-0 z-50 w-64 bg-white border-r border-gray-200 shadow-xl transform transition-transform duration-300",
        isMobileMenuOpen ? "translate-x-0" : "-translate-x-full"
      )}>
        <div className="flex flex-col h-full">
          {/* Logo */}
          <div className="p-6 border-b border-gray-200">
            <div className="flex items-center">
              <div className="w-8 h-8 bg-gradient-to-br from-primary-600 to-secondary-600 rounded-lg flex items-center justify-center mr-3">
                <ApperIcon name="DollarSign" size={20} className="text-white" />
              </div>
              <h1 className="text-xl font-bold text-gradient">MoneyMate</h1>
            </div>
          </div>

          {/* Navigation */}
          <nav className="flex-1 p-4 space-y-2">
            {navigation.map((item) => (
              <NavLink
                key={item.name}
                to={item.href}
                onClick={toggleMobileMenu}
                className={({ isActive }) =>
                  cn(
                    "flex items-center px-4 py-3 text-sm font-medium rounded-lg transition-all duration-200",
                    "hover:bg-gradient-to-r hover:from-primary-50 hover:to-secondary-50",
                    "hover:text-primary-700 hover:shadow-md transform hover:scale-105",
                    isActive
                      ? "bg-gradient-to-r from-primary-100 to-secondary-100 text-primary-700 shadow-md"
                      : "text-gray-600"
                  )
                }
              >
                <ApperIcon name={item.icon} size={20} className="mr-3" />
                {item.name}
              </NavLink>
            ))}
          </nav>

          {/* User Section */}
          <div className="p-4 border-t border-gray-200">
            <div className="flex items-center p-3 bg-gradient-to-r from-gray-50 to-blue-50 rounded-lg">
              <div className="w-8 h-8 bg-gradient-to-br from-primary-600 to-secondary-600 rounded-full flex items-center justify-center mr-3">
                <ApperIcon name="User" size={16} className="text-white" />
              </div>
              <div>
                <p className="text-sm font-medium text-gray-900">Personal Account</p>
                <p className="text-xs text-gray-500">Finance Tracker</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Sidebar;