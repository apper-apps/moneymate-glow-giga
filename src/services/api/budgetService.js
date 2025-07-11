import budgetsData from "@/services/mockData/budgets.json";

class BudgetService {
  constructor() {
    this.budgets = [...budgetsData];
  }

  async getAll() {
    await this.delay();
    return [...this.budgets].sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
  }

  async getById(id) {
    await this.delay();
    const budget = this.budgets.find(budget => budget.Id === id);
    if (!budget) {
      throw new Error("Budget not found");
    }
    return { ...budget };
  }

  async create(budgetData) {
    await this.delay();
    const newBudget = {
      ...budgetData,
      Id: this.getNextId(),
      createdAt: new Date().toISOString(),
    };
    this.budgets.push(newBudget);
    return { ...newBudget };
  }

  async update(id, budgetData) {
    await this.delay();
    const index = this.budgets.findIndex(budget => budget.Id === id);
    if (index === -1) {
      throw new Error("Budget not found");
    }
    this.budgets[index] = { ...this.budgets[index], ...budgetData };
    return { ...this.budgets[index] };
  }

  async delete(id) {
    await this.delay();
    const index = this.budgets.findIndex(budget => budget.Id === id);
    if (index === -1) {
      throw new Error("Budget not found");
    }
    this.budgets.splice(index, 1);
    return true;
  }

  getNextId() {
    return Math.max(...this.budgets.map(budget => budget.Id), 0) + 1;
  }

  delay() {
    return new Promise(resolve => setTimeout(resolve, 400));
  }
}

export const budgetService = new BudgetService();