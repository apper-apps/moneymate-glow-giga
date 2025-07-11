import expensesData from "@/services/mockData/expenses.json";

class ExpenseService {
  constructor() {
    this.expenses = [...expensesData];
  }

  async getAll() {
    await this.delay();
    return [...this.expenses].sort((a, b) => new Date(b.date) - new Date(a.date));
  }

  async getById(id) {
    await this.delay();
    const expense = this.expenses.find(expense => expense.Id === id);
    if (!expense) {
      throw new Error("Expense not found");
    }
    return { ...expense };
  }

  async create(expenseData) {
    await this.delay();
    const newExpense = {
      ...expenseData,
      Id: this.getNextId(),
      createdAt: new Date().toISOString(),
    };
    this.expenses.push(newExpense);
    return { ...newExpense };
  }

  async update(id, expenseData) {
    await this.delay();
    const index = this.expenses.findIndex(expense => expense.Id === id);
    if (index === -1) {
      throw new Error("Expense not found");
    }
    this.expenses[index] = { ...this.expenses[index], ...expenseData };
    return { ...this.expenses[index] };
  }

  async delete(id) {
    await this.delay();
    const index = this.expenses.findIndex(expense => expense.Id === id);
    if (index === -1) {
      throw new Error("Expense not found");
    }
    this.expenses.splice(index, 1);
    return true;
  }

  getNextId() {
    return Math.max(...this.expenses.map(expense => expense.Id), 0) + 1;
  }

  delay() {
    return new Promise(resolve => setTimeout(resolve, 300));
  }
}

export const expenseService = new ExpenseService();