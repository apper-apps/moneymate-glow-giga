import React, { useState, useEffect } from "react";
import { cn } from "@/utils/cn";
import { toast } from "react-toastify";
import { expenseService } from "@/services/api/expenseService";
import { formatCurrency } from "@/utils/formatters";
import Button from "@/components/atoms/Button";
import ExpenseList from "@/components/organisms/ExpenseList";
import ExpenseModal from "@/components/organisms/ExpenseModal";
import FloatingActionButton from "@/components/molecules/FloatingActionButton";
import Loading from "@/components/ui/Loading";
import Error from "@/components/ui/Error";
import Empty from "@/components/ui/Empty";
import ApperIcon from "@/components/ApperIcon";

const Expenses = ({ className }) => {
  const [expenses, setExpenses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [showModal, setShowModal] = useState(false);
  const [editingExpense, setEditingExpense] = useState(null);

  const loadExpenses = async () => {
    setLoading(true);
    setError("");
    
    try {
      const data = await expenseService.getAll();
      setExpenses(data);
    } catch (err) {
      setError("Failed to load expenses. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadExpenses();
  }, []);

  const handleAddExpense = async (expenseData) => {
    const newExpense = await expenseService.create(expenseData);
    setExpenses(prev => [newExpense, ...prev]);
  };

  const handleEditExpense = async (expenseData) => {
    const updatedExpense = await expenseService.update(editingExpense.Id, expenseData);
    setExpenses(prev => prev.map(expense => 
      expense.Id === editingExpense.Id ? updatedExpense : expense
    ));
    setEditingExpense(null);
  };

  const handleDeleteExpense = async (expenseId) => {
    if (window.confirm("Are you sure you want to delete this expense?")) {
      try {
        await expenseService.delete(expenseId);
        setExpenses(prev => prev.filter(expense => expense.Id !== expenseId));
        toast.success("Expense deleted successfully!");
      } catch (err) {
        toast.error("Failed to delete expense. Please try again.");
      }
    }
  };

  const openAddModal = () => {
    setEditingExpense(null);
    setShowModal(true);
  };

  const openEditModal = (expense) => {
    setEditingExpense(expense);
    setShowModal(true);
  };

  const closeModal = () => {
    setShowModal(false);
    setEditingExpense(null);
  };

  const totalExpenses = expenses.reduce((sum, expense) => sum + expense.amount, 0);

  if (loading) {
    return <Loading className={className} />;
  }

  if (error) {
    return <Error message={error} onRetry={loadExpenses} className={className} />;
  }

  return (
    <div className={cn("space-y-8", className)}>
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Expenses</h1>
          <p className="text-gray-600 mt-1">Track and manage your spending</p>
        </div>
        <div className="mt-4 sm:mt-0 flex items-center space-x-4">
          <div className="text-right">
            <p className="text-sm text-gray-500">Total Expenses</p>
            <p className="text-2xl font-bold text-gray-900">{formatCurrency(totalExpenses)}</p>
          </div>
          <Button 
            onClick={openAddModal}
            variant="primary"
            className="flex items-center"
          >
            <ApperIcon name="Plus" size={16} className="mr-2" />
            Add Expense
          </Button>
        </div>
      </div>

      {/* Expense List */}
      {expenses.length === 0 ? (
        <Empty
          title="No expenses recorded"
          description="Start tracking your spending by adding your first expense"
          actionLabel="Add Expense"
          onAction={openAddModal}
          icon="Receipt"
        />
      ) : (
        <ExpenseList
          expenses={expenses}
          onEdit={openEditModal}
          onDelete={handleDeleteExpense}
        />
      )}

      {/* Floating Action Button */}
      <FloatingActionButton 
        onClick={openAddModal}
        icon="Plus"
      />

      {/* Expense Modal */}
      <ExpenseModal
        isOpen={showModal}
        onClose={closeModal}
        onSubmit={editingExpense ? handleEditExpense : handleAddExpense}
        expense={editingExpense}
        title={editingExpense ? "Edit Expense" : "Add New Expense"}
      />
    </div>
  );
};

export default Expenses;