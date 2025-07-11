import React, { useState, useEffect } from "react";
import { cn } from "@/utils/cn";
import { toast } from "react-toastify";
import Button from "@/components/atoms/Button";
import Input from "@/components/atoms/Input";
import Label from "@/components/atoms/Label";
import FormField from "@/components/molecules/FormField";
import CategorySelect from "@/components/molecules/CategorySelect";
import ApperIcon from "@/components/ApperIcon";

const BudgetModal = ({ 
  isOpen, 
  onClose, 
  onSubmit, 
  budget = null,
  title = "Add Budget"
}) => {
  const [formData, setFormData] = useState({
    category: "",
    limit: "",
    period: "monthly",
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errors, setErrors] = useState({});

  useEffect(() => {
    if (budget) {
      setFormData({
        category: budget.category,
        limit: budget.limit.toString(),
        period: budget.period,
      });
    } else {
      setFormData({
        category: "",
        limit: "",
        period: "monthly",
      });
    }
    setErrors({});
  }, [budget, isOpen]);

  const validateForm = () => {
    const newErrors = {};
    
    if (!formData.category) {
      newErrors.category = "Please select a category";
    }
    
    if (!formData.limit || isNaN(formData.limit) || parseFloat(formData.limit) <= 0) {
      newErrors.limit = "Please enter a valid budget limit";
    }
    
    if (!formData.period) {
      newErrors.period = "Please select a period";
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
      const budgetData = {
        ...formData,
        limit: parseFloat(formData.limit),
      };

      await onSubmit(budgetData);
      
      toast.success(budget ? "Budget updated successfully!" : "Budget added successfully!");
      onClose();
    } catch (error) {
      toast.error("Failed to save budget. Please try again.");
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
            label="Category"
            error={errors.category}
          >
            <CategorySelect
              name="category"
              value={formData.category}
              onChange={handleChange}
            />
          </FormField>

          <FormField
            label="Budget Limit"
            error={errors.limit}
          >
            <Input
              type="number"
              name="limit"
              value={formData.limit}
              onChange={handleChange}
              placeholder="0.00"
              step="0.01"
              min="0"
            />
          </FormField>

          <FormField
            label="Period"
            error={errors.period}
          >
            <select
              name="period"
              value={formData.period}
              onChange={handleChange}
              className="input-field"
            >
              <option value="weekly">Weekly</option>
              <option value="monthly">Monthly</option>
              <option value="yearly">Yearly</option>
            </select>
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
                budget ? "Update" : "Add Budget"
              )}
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default BudgetModal;