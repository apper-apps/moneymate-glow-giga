import React, { useState } from "react";
import { cn } from "@/utils/cn";
import { formatCurrency, getCategoryIcon, getCategoryColor } from "@/utils/formatters";
import Button from "@/components/atoms/Button";
import Badge from "@/components/atoms/Badge";
import SearchBar from "@/components/molecules/SearchBar";
import ApperIcon from "@/components/ApperIcon";

const BudgetList = ({ 
  budgets, 
  expenses,
  onEdit, 
  onDelete, 
  className 
}) => {
  const [searchTerm, setSearchTerm] = useState("");

  const filteredBudgets = budgets.filter(budget => {
    return budget.category.toLowerCase().includes(searchTerm.toLowerCase());
  });

  const getBudgetProgress = (budget) => {
    const categoryExpenses = expenses.filter(expense => expense.category === budget.category);
    const totalSpent = categoryExpenses.reduce((sum, expense) => sum + expense.amount, 0);
    const percentage = (totalSpent / budget.limit) * 100;
    
    return {
      spent: totalSpent,
      percentage: Math.min(percentage, 100),
      remaining: Math.max(budget.limit - totalSpent, 0),
      isOverBudget: totalSpent > budget.limit
    };
  };

  const getProgressColor = (percentage, isOverBudget) => {
    if (isOverBudget) return "bg-red-500";
    if (percentage >= 80) return "bg-yellow-500";
    if (percentage >= 60) return "bg-blue-500";
    return "bg-accent-500";
  };

  return (
    <div className={cn("space-y-6", className)}>
      {/* Search */}
      <SearchBar
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        placeholder="Search budgets..."
      />

      {/* Budget List */}
      <div className="space-y-4">
        {filteredBudgets.length === 0 ? (
          <div className="bg-white rounded-xl shadow-lg border border-gray-100 p-8 text-center">
            <ApperIcon name="PieChart" size={48} className="mx-auto text-gray-400 mb-4" />
            <h3 className="text-lg font-medium text-gray-900 mb-2">No budgets found</h3>
            <p className="text-gray-500">
              {searchTerm ? "Try adjusting your search" : "Add your first budget to get started"}
            </p>
          </div>
        ) : (
          filteredBudgets.map((budget) => {
            const progress = getBudgetProgress(budget);
            
            return (
              <div key={budget.Id} className="bg-white rounded-xl shadow-lg border border-gray-100 p-6 hover:shadow-xl transition-all duration-300">
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center space-x-4">
                    <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-primary-100 to-secondary-100 flex items-center justify-center">
                      <ApperIcon 
                        name={getCategoryIcon(budget.category)} 
                        size={20} 
                        className={getCategoryColor(budget.category)}
                      />
                    </div>
                    <div>
                      <h3 className="font-medium text-gray-900">{budget.category}</h3>
                      <div className="flex items-center space-x-2 mt-1">
                        <Badge variant="primary" className="text-xs">
                          {budget.period}
                        </Badge>
                        {progress.isOverBudget && (
                          <Badge variant="error" className="text-xs">
                            Over Budget
                          </Badge>
                        )}
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => onEdit(budget)}
                      className="p-2"
                    >
                      <ApperIcon name="Edit" size={16} />
                    </Button>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => onDelete(budget.Id)}
                      className="p-2 text-red-600 hover:text-red-700 hover:bg-red-50"
                    >
                      <ApperIcon name="Trash2" size={16} />
                    </Button>
                  </div>
                </div>

                {/* Progress Bar */}
                <div className="mb-4">
                  <div className="flex justify-between text-sm text-gray-600 mb-2">
                    <span>Spent: {formatCurrency(progress.spent)}</span>
                    <span>Limit: {formatCurrency(budget.limit)}</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div 
                      className={cn(
                        "h-2 rounded-full transition-all duration-300",
                        getProgressColor(progress.percentage, progress.isOverBudget)
                      )}
                      style={{ width: `${progress.percentage}%` }}
                    />
                  </div>
                  <div className="flex justify-between text-xs text-gray-500 mt-1">
                    <span>{progress.percentage.toFixed(1)}% used</span>
                    <span>
                      {progress.isOverBudget ? "Over by " : "Remaining: "}
                      {formatCurrency(progress.isOverBudget ? progress.spent - budget.limit : progress.remaining)}
                    </span>
                  </div>
                </div>

                {/* Budget Details */}
                <div className="grid grid-cols-3 gap-4 text-center">
                  <div>
                    <p className="text-2xl font-bold text-gray-900">{formatCurrency(progress.spent)}</p>
                    <p className="text-xs text-gray-500">Spent</p>
                  </div>
                  <div>
                    <p className="text-2xl font-bold text-gray-900">{formatCurrency(budget.limit)}</p>
                    <p className="text-xs text-gray-500">Budget</p>
                  </div>
                  <div>
                    <p className={cn(
                      "text-2xl font-bold",
                      progress.isOverBudget ? "text-red-600" : "text-accent-600"
                    )}>
                      {formatCurrency(progress.isOverBudget ? progress.spent - budget.limit : progress.remaining)}
                    </p>
                    <p className="text-xs text-gray-500">
                      {progress.isOverBudget ? "Over" : "Remaining"}
                    </p>
                  </div>
                </div>
              </div>
            );
          })
        )}
      </div>
    </div>
  );
};

export default BudgetList;