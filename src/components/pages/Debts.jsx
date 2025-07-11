import React, { useState, useEffect } from "react";
import { cn } from "@/utils/cn";
import { toast } from "react-toastify";
import { debtService } from "@/services/api/debtService";
import { formatCurrency } from "@/utils/formatters";
import Button from "@/components/atoms/Button";
import DebtList from "@/components/organisms/DebtList";
import DebtModal from "@/components/organisms/DebtModal";
import FloatingActionButton from "@/components/molecules/FloatingActionButton";
import Loading from "@/components/ui/Loading";
import Error from "@/components/ui/Error";
import Empty from "@/components/ui/Empty";
import ApperIcon from "@/components/ApperIcon";

const Debts = ({ className }) => {
  const [debts, setDebts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [showModal, setShowModal] = useState(false);
  const [editingDebt, setEditingDebt] = useState(null);

  const loadDebts = async () => {
    setLoading(true);
    setError("");
    
    try {
      const data = await debtService.getAll();
      setDebts(data);
    } catch (err) {
      setError("Failed to load debts. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadDebts();
  }, []);

  const handleAddDebt = async (debtData) => {
    const newDebt = await debtService.create(debtData);
    setDebts(prev => [newDebt, ...prev]);
  };

  const handleEditDebt = async (debtData) => {
    const updatedDebt = await debtService.update(editingDebt.Id, debtData);
    setDebts(prev => prev.map(debt => 
      debt.Id === editingDebt.Id ? updatedDebt : debt
    ));
    setEditingDebt(null);
  };

  const handleDeleteDebt = async (debtId) => {
    if (window.confirm("Are you sure you want to delete this debt?")) {
      try {
        await debtService.delete(debtId);
        setDebts(prev => prev.filter(debt => debt.Id !== debtId));
        toast.success("Debt deleted successfully!");
      } catch (err) {
        toast.error("Failed to delete debt. Please try again.");
      }
    }
  };

  const handleMarkPaid = async (debtId) => {
    try {
      const debt = debts.find(d => d.Id === debtId);
      const updatedDebt = await debtService.update(debtId, { ...debt, isPaid: true });
      setDebts(prev => prev.map(d => 
        d.Id === debtId ? updatedDebt : d
      ));
      toast.success("Debt marked as paid!");
    } catch (err) {
      toast.error("Failed to update debt status. Please try again.");
    }
  };

  const openAddModal = () => {
    setEditingDebt(null);
    setShowModal(true);
  };

  const openEditModal = (debt) => {
    setEditingDebt(debt);
    setShowModal(true);
  };

  const closeModal = () => {
    setShowModal(false);
    setEditingDebt(null);
  };

  const totalUnpaidDebts = debts
    .filter(debt => !debt.isPaid)
    .reduce((sum, debt) => sum + debt.amount, 0);

  if (loading) {
    return <Loading className={className} />;
  }

  if (error) {
    return <Error message={error} onRetry={loadDebts} className={className} />;
  }

  return (
    <div className={cn("space-y-8", className)}>
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Debts</h1>
          <p className="text-gray-600 mt-1">Track money owed to you</p>
        </div>
        <div className="mt-4 sm:mt-0 flex items-center space-x-4">
          <div className="text-right">
            <p className="text-sm text-gray-500">Outstanding Debts</p>
            <p className="text-2xl font-bold text-gray-900">{formatCurrency(totalUnpaidDebts)}</p>
          </div>
          <Button 
            onClick={openAddModal}
            variant="primary"
            className="flex items-center"
          >
            <ApperIcon name="Plus" size={16} className="mr-2" />
            Add Debt
          </Button>
        </div>
      </div>

      {/* Debt List */}
      {debts.length === 0 ? (
        <Empty
          title="No debts recorded"
          description="Start tracking money owed to you by adding your first debt"
          actionLabel="Add Debt"
          onAction={openAddModal}
          icon="Users"
        />
      ) : (
        <DebtList
          debts={debts}
          onEdit={openEditModal}
          onDelete={handleDeleteDebt}
          onMarkPaid={handleMarkPaid}
        />
      )}

      {/* Floating Action Button */}
      <FloatingActionButton 
        onClick={openAddModal}
        icon="Plus"
      />

      {/* Debt Modal */}
      <DebtModal
        isOpen={showModal}
        onClose={closeModal}
        onSubmit={editingDebt ? handleEditDebt : handleAddDebt}
        debt={editingDebt}
        title={editingDebt ? "Edit Debt" : "Add New Debt"}
      />
    </div>
  );
};

export default Debts;