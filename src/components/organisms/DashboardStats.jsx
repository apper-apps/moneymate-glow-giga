import React from "react";
import { cn } from "@/utils/cn";
import { formatCurrency } from "@/utils/formatters";
import StatCard from "@/components/molecules/StatCard";

const DashboardStats = ({ expenses, debts, budgets, className }) => {
  const totalExpenses = expenses.reduce((sum, expense) => sum + expense.amount, 0);
  const totalDebts = debts.filter(debt => !debt.isPaid).reduce((sum, debt) => sum + debt.amount, 0);
  const totalBudgets = budgets.reduce((sum, budget) => sum + budget.limit, 0);
  
  const thisMonth = new Date().getMonth();
  const thisYear = new Date().getFullYear();
  const thisMonthExpenses = expenses.filter(expense => {
    const expenseDate = new Date(expense.date);
    return expenseDate.getMonth() === thisMonth && expenseDate.getFullYear() === thisYear;
  });
  const monthlyExpenses = thisMonthExpenses.reduce((sum, expense) => sum + expense.amount, 0);
  
  const budgetUsage = totalBudgets > 0 ? (monthlyExpenses / totalBudgets) * 100 : 0;
  const remainingBudget = totalBudgets - monthlyExpenses;
  
  return (
    <div className={cn("grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6", className)}>
      <StatCard
        title="Total Expenses"
        value={formatCurrency(totalExpenses)}
        icon="Receipt"
        variant="gradient"
      />
      
      <StatCard
        title="Monthly Expenses"
        value={formatCurrency(monthlyExpenses)}
        icon="Calendar"
        variant="gradient"
      />
      
      <StatCard
        title="Outstanding Debts"
        value={formatCurrency(totalDebts)}
        icon="Users"
        variant="gradient"
      />
      
      <StatCard
        title="Budget Remaining"
        value={formatCurrency(remainingBudget)}
        icon="PieChart"
        trend={budgetUsage > 80 ? "down" : budgetUsage > 50 ? "neutral" : "up"}
        trendValue={`${budgetUsage.toFixed(1)}% used`}
        variant="gradient"
      />
    </div>
  );
};

export default DashboardStats;