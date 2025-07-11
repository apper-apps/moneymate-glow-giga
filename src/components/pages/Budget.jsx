import React, { useState, useEffect } from "react";
import { cn } from "@/utils/cn";
import { toast } from "react-toastify";
import { budgetService } from "@/services/api/budgetService";
import { expenseService } from "@/services/api/expenseService";
import { formatCurrency } from "@/utils/formatters";
import Button from "@/components/atoms/Button";
import BudgetList from "@/components/organisms/BudgetList";
import BudgetModal from "@/components/organisms/BudgetModal";
import FloatingActionButton from "@/components/molecules/FloatingActionButton";
import Loading from "@/components/ui/Loading";
import Error from "@/components/ui/Error";
import Empty from "@/components/ui/Empty";
import ApperIcon from "@/components/ApperIcon";

const Budget = ({ className }) => {
  const [budgets, setBudgets] = useState([]);
  const [expenses, setExpenses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [showModal, setShowModal] = useState(false);
  const [editingBudget, setEditingBudget] = useState(null);

  const loadData = async () => {
    setLoading(true);
    setError("");
    
    try {
      const [budgetsData, expensesData] = await Promise.all([
        budgetService.getAll(),
        expenseService.getAll()
      ]);
      setBudgets(budgetsData);
      setExpenses(expensesData);
    } catch (err) {
      setError("Failed to load budget data. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadData();
  }, []);

  const handleAddBudget = async (budgetData) => {
    const newBudget = await budgetService.create(budgetData);
    setBudgets(prev => [newBudget, ...prev]);
  };

  const handleEditBudget = async (budgetData) => {
    const updatedBudget = await budgetService.update(editingBudget.Id, budgetData);
    setBudgets(prev => prev.map(budget => 
      budget.Id === editingBudget.Id ? updatedBudget : budget
    ));
    setEditingBudget(null);
  };

  const handleDeleteBudget = async (budgetId) => {
    if (window.confirm("Are you sure you want to delete this budget?")) {
      try {
        await budgetService.delete(budgetId);
        setBudgets(prev => prev.filter(budget => budget.Id !== budgetId));
        toast.success("Budget deleted successfully!");
      } catch (err) {
        toast.error("Failed to delete budget. Please try again.");
      }
    }
  };

  const openAddModal = () => {
    setEditingBudget(null);
    setShowModal(true);
  };

  const openEditModal = (budget) => {
    setEditingBudget(budget);
    setShowModal(true);
  };

  const closeModal = () => {
    setShowModal(false);
    setEditingBudget(null);
  };

  const totalBudgets = budgets.reduce((sum, budget) => sum + budget.limit, 0);

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
          <h1 className="text-3xl font-bold text-gray-900">Budget</h1>
          <p className="text-gray-600 mt-1">Plan and track your spending limits</p>
        </div>
        <div className="mt-4 sm:mt-0 flex items-center space-x-4">
          <div className="text-right">
            <p className="text-sm text-gray-500">Total Budget</p>
            <p className="text-2xl font-bold text-gray-900">{formatCurrency(totalBudgets)}</p>
          </div>
          <Button 
            onClick={openAddModal}
            variant="primary"
            className="flex items-center"
          >
            <ApperIcon name="Plus" size={16} className="mr-2" />
            Add Budget
          </Button>
        </div>
      </div>

      {/* Budget List */}
      {budgets.length === 0 ? (
        <Empty
          title="No budgets set"
          description="Start managing your finances by creating your first budget"
          actionLabel="Add Budget"
          onAction={openAddModal}
          icon="PieChart"
        />
      ) : (
        <BudgetList
          budgets={budgets}
          expenses={expenses}
          onEdit={openEditModal}
          onDelete={handleDeleteBudget}
        />
      )}

      {/* Floating Action Button */}
      <FloatingActionButton 
        onClick={openAddModal}
        icon="Plus"
      />

      {/* Budget Modal */}
      <BudgetModal
        isOpen={showModal}
        onClose={closeModal}
        onSubmit={editingBudget ? handleEditBudget : handleAddBudget}
        budget={editingBudget}
        title={editingBudget ? "Edit Budget" : "Add New Budget"}
      />
    </div>
  );
};

export default Budget;