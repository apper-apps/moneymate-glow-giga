import React, { useState } from "react";
import { cn } from "@/utils/cn";
import { formatCurrency, formatRelativeDate } from "@/utils/formatters";
import Button from "@/components/atoms/Button";
import Badge from "@/components/atoms/Badge";
import SearchBar from "@/components/molecules/SearchBar";
import ApperIcon from "@/components/ApperIcon";

const DebtList = ({ 
  debts, 
  onEdit, 
  onDelete, 
  onMarkPaid,
  className 
}) => {
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("");

  const filteredDebts = debts.filter(debt => {
    const matchesSearch = debt.personName.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         debt.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = statusFilter === "" || 
                         (statusFilter === "paid" && debt.isPaid) ||
                         (statusFilter === "unpaid" && !debt.isPaid);
    return matchesSearch && matchesStatus;
  });

  const getStatusBadge = (debt) => {
    if (debt.isPaid) {
      return <Badge variant="success">Paid</Badge>;
    }
    
    if (debt.dueDate) {
      const dueDate = new Date(debt.dueDate);
      const now = new Date();
      const diffInDays = Math.ceil((dueDate - now) / (1000 * 60 * 60 * 24));
      
      if (diffInDays < 0) {
        return <Badge variant="error">Overdue</Badge>;
      } else if (diffInDays <= 7) {
        return <Badge variant="warning">Due Soon</Badge>;
      }
    }
    
    return <Badge variant="default">Pending</Badge>;
  };

  return (
    <div className={cn("space-y-6", className)}>
      {/* Filters */}
      <div className="flex flex-col sm:flex-row gap-4">
        <SearchBar
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          placeholder="Search debts..."
          className="flex-1"
        />
        <select
          value={statusFilter}
          onChange={(e) => setStatusFilter(e.target.value)}
          className="input-field sm:w-48"
        >
          <option value="">All Status</option>
          <option value="unpaid">Unpaid</option>
          <option value="paid">Paid</option>
        </select>
      </div>

      {/* Debt List */}
      <div className="bg-white rounded-xl shadow-lg border border-gray-100 overflow-hidden">
        {filteredDebts.length === 0 ? (
          <div className="p-8 text-center">
            <ApperIcon name="Users" size={48} className="mx-auto text-gray-400 mb-4" />
            <h3 className="text-lg font-medium text-gray-900 mb-2">No debts found</h3>
            <p className="text-gray-500">
              {searchTerm || statusFilter ? "Try adjusting your filters" : "Add your first debt to get started"}
            </p>
          </div>
        ) : (
          <div className="divide-y divide-gray-100">
            {filteredDebts.map((debt) => (
              <div key={debt.Id} className="p-6 hover:bg-gray-50 transition-colors duration-200">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-4">
                    <div className={cn(
                      "w-10 h-10 rounded-lg flex items-center justify-center",
                      debt.isPaid 
                        ? "bg-gradient-to-br from-accent-100 to-green-100" 
                        : "bg-gradient-to-br from-yellow-100 to-orange-100"
                    )}>
                      <ApperIcon 
                        name={debt.isPaid ? "CheckCircle" : "Clock"} 
                        size={20} 
                        className={debt.isPaid ? "text-accent-600" : "text-yellow-600"}
                      />
                    </div>
                    <div>
                      <h3 className="font-medium text-gray-900">{debt.personName}</h3>
                      <p className="text-sm text-gray-600 mb-1">{debt.description}</p>
                      <div className="flex items-center space-x-2">
                        {getStatusBadge(debt)}
                        {debt.dueDate && (
                          <span className="text-xs text-gray-500">
                            Due {formatRelativeDate(debt.dueDate)}
                          </span>
                        )}
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center space-x-3">
                    <span className="text-lg font-semibold text-gray-900">
                      {formatCurrency(debt.amount)}
                    </span>
                    <div className="flex items-center space-x-2">
                      {!debt.isPaid && (
                        <Button
                          variant="success"
                          size="sm"
                          onClick={() => onMarkPaid(debt.Id)}
                          className="px-3 py-1 text-xs"
                        >
                          Mark Paid
                        </Button>
                      )}
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => onEdit(debt)}
                        className="p-2"
                      >
                        <ApperIcon name="Edit" size={16} />
                      </Button>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => onDelete(debt.Id)}
                        className="p-2 text-red-600 hover:text-red-700 hover:bg-red-50"
                      >
                        <ApperIcon name="Trash2" size={16} />
                      </Button>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default DebtList;