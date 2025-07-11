import debtsData from "@/services/mockData/debts.json";

class DebtService {
  constructor() {
    this.debts = [...debtsData];
  }

  async getAll() {
    await this.delay();
    return [...this.debts].sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
  }

  async getById(id) {
    await this.delay();
    const debt = this.debts.find(debt => debt.Id === id);
    if (!debt) {
      throw new Error("Debt not found");
    }
    return { ...debt };
  }

  async create(debtData) {
    await this.delay();
    const newDebt = {
      ...debtData,
      Id: this.getNextId(),
      isPaid: false,
      createdAt: new Date().toISOString(),
    };
    this.debts.push(newDebt);
    return { ...newDebt };
  }

  async update(id, debtData) {
    await this.delay();
    const index = this.debts.findIndex(debt => debt.Id === id);
    if (index === -1) {
      throw new Error("Debt not found");
    }
    this.debts[index] = { ...this.debts[index], ...debtData };
    return { ...this.debts[index] };
  }

  async delete(id) {
    await this.delay();
    const index = this.debts.findIndex(debt => debt.Id === id);
    if (index === -1) {
      throw new Error("Debt not found");
    }
    this.debts.splice(index, 1);
    return true;
  }

  getNextId() {
    return Math.max(...this.debts.map(debt => debt.Id), 0) + 1;
  }

  delay() {
    return new Promise(resolve => setTimeout(resolve, 350));
  }
}

export const debtService = new DebtService();