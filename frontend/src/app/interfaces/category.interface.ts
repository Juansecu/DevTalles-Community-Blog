export interface Category {
  categoryId: number;
  name: string;
  addedBy: {
    userId: number;
    firstName: string;
    lastName: string;
    username: string;
  };
  addedAt: Date;
  updatedAt: Date;
}

export interface CategoriesResponse {
  categories: Category[];
  total: number;
  page: number;
  limit: number;
  totalPages: number;
}

export interface CreateCategoryDto {
  name: string;
  addedBy: number;
}

export interface UpdateCategoryDto {
  name?: string;
}
