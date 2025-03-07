export interface Dish {
  id: number;
  name: string;
  title: string;
  category: string;
  price: number;
  image: string;
  description: string;
  isVegetarian: boolean;
  spiciness: number;
  isAlcoholic: boolean;
  ingredients: string[];
  recipe: string;
}

export interface CartItem {
  id: number;
  name: string;
  price: number;
  quantity: number;
  image: string;
}

export interface UserData {
  name: string;
  email: string;
  phone: string;
  address: string;
  comments?: string;
  ageConsent: boolean;
  preferredCategory?: string;
}

export type Theme = 'light' | 'dark' | 'green';

export interface DishFilters {
  category?: string;
  isVegetarian?: boolean;
  isAlcoholic?: boolean;
  spiciness?: number;
  priceRange?: [number, number];
  searchQuery?: string;
} 