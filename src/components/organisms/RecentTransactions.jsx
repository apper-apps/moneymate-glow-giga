import React from "react";
import { cn } from "@/utils/cn";
import { formatCurrency, formatDate, getCategoryIcon, getCategoryColor } from "@/utils/formatters";
import Card from "@/components/atoms/Card";
import Badge from "@/components/atoms/Badge";
import ApperIcon from "@/components/ApperIcon";

const RecentTransactions = ({ expenses, className }) => {
  const recentExpenses = expenses
    .sort((a, b) => new Date(b.date) - new Date(a.date))
    .slice(0, 5);

  return (
    <Card className={cn("p-6", className)}>
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-lg font-semibold text-gray-900">Recent Transactions</h3>
        <ApperIcon name="Clock" size={20} className="text-gray-400" />
      </div>
      
      {recentExpenses.length === 0 ? (
        <div className="text-center py-8">
          <ApperIcon name="Receipt" size={48} className="mx-auto text-gray-400 mb-4" />
          <p className="text-gray-500">No recent transactions</p>
        </div>
      ) : (
        <div className="space-y-4">
          {recentExpenses.map((expense) => (
            <div key={expense.Id} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors duration-200">
              <div className="flex items-center space-x-3">
                <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-primary-100 to-secondary-100 flex items-center justify-center">
                  <ApperIcon 
                    name={getCategoryIcon(expense.category)} 
                    size={16} 
                    className={getCategoryColor(expense.category)}
                  />
                </div>
                <div>
                  <p className="font-medium text-gray-900 text-sm">{expense.description}</p>
                  <div className="flex items-center space-x-2 mt-1">
                    <Badge variant="secondary" className="text-xs">
                      {expense.category}
                    </Badge>
                    <span className="text-xs text-gray-500">
                      {formatDate(expense.date)}
                    </span>
                  </div>
                </div>
              </div>
              <span className="font-semibold text-gray-900">
                {formatCurrency(expense.amount)}
              </span>
            </div>
          ))}
        </div>
      )}
    </Card>
  );
};

export default RecentTransactions;