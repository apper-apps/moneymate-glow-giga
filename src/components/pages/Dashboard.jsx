import React, { useState, useEffect } from "react";
import { cn } from "@/utils/cn";
import { expenseService } from "@/services/api/expenseService";
import { debtService } from "@/services/api/debtService";
import { budgetService } from "@/services/api/budgetService";
import DashboardStats from "@/components/organisms/DashboardStats";
import RecentTransactions from "@/components/organisms/RecentTransactions";
import FloatingActionButton from "@/components/molecules/FloatingActionButton";
import ExpenseModal from "@/components/organisms/ExpenseModal";
import Loading from "@/components/ui/Loading";
import Error from "@/components/ui/Error";

const Dashboard = ({ className }) => {
  const [expenses, setExpenses] = useState([]);
  const [debts, setDebts] = useState([]);
  const [budgets, setBudgets] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [showExpenseModal, setShowExpenseModal] = useState(false);

  const loadData = async () => {
    setLoading(true);
    setError("");
    
    try {
      const [expensesData, debtsData, budgetsData] = await Promise.all([
        expenseService.getAll(),
        debtService.getAll(),
        budgetService.getAll()
      ]);
      
      setExpenses(expensesData);
      setDebts(debtsData);
      setBudgets(budgetsData);
    } catch (err) {
      setError("Failed to load dashboard data. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadData();
  }, []);

  const handleAddExpense = async (expenseData) => {
    const newExpense = await expenseService.create(expenseData);
    setExpenses(prev => [newExpense, ...prev]);
  };

  if (loading) {
    return <Loading className={className} />;
  }

  if (error) {
    return <Error message={error} onRetry={loadData} className={className} />;
  }

  return (
    <div className={cn("space-y-8", className)}>
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Dashboard</h1>
          <p className="text-gray-600 mt-1">Track your finances and stay on budget</p>
        </div>
        <div className="mt-4 sm:mt-0">
          <p className="text-sm text-gray-500">
            Last updated: {new Date().toLocaleDateString()}
          </p>
        </div>
      </div>

      {/* Stats Cards */}
      <DashboardStats 
        expenses={expenses}
        debts={debts}
        budgets={budgets}
      />

      {/* Recent Transactions */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <RecentTransactions expenses={expenses} />
        
        <div className="bg-white rounded-xl shadow-lg border border-gray-100 p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Quick Actions</h3>
          <div className="space-y-3">
            <button 
              onClick={() => setShowExpenseModal(true)}
              className="w-full p-4 text-left bg-gradient-to-r from-primary-50 to-secondary-50 rounded-lg hover:from-primary-100 hover:to-secondary-100 transition-all duration-200 border border-primary-200"
            >
              <div className="flex items-center">
                <div className="w-10 h-10 bg-gradient-to-br from-primary-600 to-secondary-600 rounded-lg flex items-center justify-center mr-3">
                  <span className="text-white font-bold">+</span>
                </div>
                <div>
                  <p className="font-medium text-gray-900">Add Expense</p>
                  <p className="text-sm text-gray-600">Record a new expense</p>
                </div>
              </div>
            </button>
            
            <div className="grid grid-cols-2 gap-3">
              <div className="p-3 bg-gray-50 rounded-lg text-center">
                <p className="text-2xl font-bold text-gray-900">{expenses.length}</p>
                <p className="text-xs text-gray-500">Total Expenses</p>
              </div>
              <div className="p-3 bg-gray-50 rounded-lg text-center">
                <p className="text-2xl font-bold text-gray-900">{debts.filter(d => !d.isPaid).length}</p>
                <p className="text-xs text-gray-500">Active Debts</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Floating Action Button */}
      <FloatingActionButton 
        onClick={() => setShowExpenseModal(true)}
        icon="Plus"
      />

      {/* Expense Modal */}
      <ExpenseModal
        isOpen={showExpenseModal}
        onClose={() => setShowExpenseModal(false)}
        onSubmit={handleAddExpense}
        title="Add New Expense"
      />
    </div>
  );
};

export default Dashboard;