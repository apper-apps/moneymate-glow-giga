import React, { useState, useEffect } from "react";
import { cn } from "@/utils/cn";
import { toast } from "react-toastify";
import Button from "@/components/atoms/Button";
import Input from "@/components/atoms/Input";
import Label from "@/components/atoms/Label";
import FormField from "@/components/molecules/FormField";
import ApperIcon from "@/components/ApperIcon";

const DebtModal = ({ 
  isOpen, 
  onClose, 
  onSubmit, 
  debt = null,
  title = "Add Debt"
}) => {
  const [formData, setFormData] = useState({
    personName: "",
    amount: "",
    description: "",
    dueDate: "",
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errors, setErrors] = useState({});

  useEffect(() => {
    if (debt) {
      setFormData({
        personName: debt.personName,
        amount: debt.amount.toString(),
        description: debt.description,
        dueDate: debt.dueDate ? debt.dueDate.split('T')[0] : "",
      });
    } else {
      setFormData({
        personName: "",
        amount: "",
        description: "",
        dueDate: "",
      });
    }
    setErrors({});
  }, [debt, isOpen]);

  const validateForm = () => {
    const newErrors = {};
    
    if (!formData.personName.trim()) {
      newErrors.personName = "Please enter a person's name";
    }
    
    if (!formData.amount || isNaN(formData.amount) || parseFloat(formData.amount) <= 0) {
      newErrors.amount = "Please enter a valid amount";
    }
    
    if (!formData.description.trim()) {
      newErrors.description = "Please enter a description";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!validateForm()) {
      return;
    }

    setIsSubmitting(true);
    
    try {
      const debtData = {
        ...formData,
        amount: parseFloat(formData.amount),
        dueDate: formData.dueDate ? new Date(formData.dueDate).toISOString() : null,
      };

      await onSubmit(debtData);
      
      toast.success(debt ? "Debt updated successfully!" : "Debt added successfully!");
      onClose();
    } catch (error) {
      toast.error("Failed to save debt. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    
    // Clear error when user starts typing
    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: ""
      }));
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-xl shadow-2xl max-w-md w-full max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="p-6 border-b border-gray-200">
          <div className="flex items-center justify-between">
            <h2 className="text-xl font-semibold text-gray-900">{title}</h2>
            <Button
              variant="ghost"
              size="sm"
              onClick={onClose}
              className="p-2"
            >
              <ApperIcon name="X" size={20} />
            </Button>
          </div>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="p-6 space-y-6">
          <FormField
            label="Person's Name"
            error={errors.personName}
          >
            <Input
              type="text"
              name="personName"
              value={formData.personName}
              onChange={handleChange}
              placeholder="Enter person's name"
            />
          </FormField>

          <FormField
            label="Amount"
            error={errors.amount}
          >
            <Input
              type="number"
              name="amount"
              value={formData.amount}
              onChange={handleChange}
              placeholder="0.00"
              step="0.01"
              min="0"
            />
          </FormField>

          <FormField
            label="Description"
            error={errors.description}
          >
            <Input
              type="text"
              name="description"
              value={formData.description}
              onChange={handleChange}
              placeholder="Enter description"
            />
          </FormField>

          <FormField
            label="Due Date (Optional)"
            error={errors.dueDate}
          >
            <Input
              type="date"
              name="dueDate"
              value={formData.dueDate}
              onChange={handleChange}
            />
          </FormField>

          {/* Actions */}
          <div className="flex gap-3 pt-4">
            <Button
              type="button"
              variant="outline"
              onClick={onClose}
              className="flex-1"
            >
              Cancel
            </Button>
            <Button
              type="submit"
              variant="primary"
              disabled={isSubmitting}
              className="flex-1"
            >
              {isSubmitting ? (
                <>
                  <ApperIcon name="Loader2" size={16} className="mr-2 animate-spin" />
                  Saving...
                </>
              ) : (
                debt ? "Update" : "Add Debt"
              )}
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default DebtModal;