import categoriesData from "@/services/mockData/categories.json";

class CategoryService {
  constructor() {
    this.categories = [...categoriesData];
  }

  async getAll() {
    await this.delay();
    return [...this.categories];
  }

  async getById(id) {
    await this.delay();
    const category = this.categories.find(category => category.Id === id);
    if (!category) {
      throw new Error("Category not found");
    }
    return { ...category };
  }

  delay() {
    return new Promise(resolve => setTimeout(resolve, 200));
  }
}

export const categoryService = new CategoryService();