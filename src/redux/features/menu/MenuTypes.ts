// Category type
export interface Category {
  _id: string;
  name: string;
  description: string;
  createdAt: string;
  updatedAt: string;
  __v: number;
}

export interface IVariation {
  size: string;
  price: number;
}

// Menu item type
export interface MenuItem {
  hasVariants: boolean;
  slug: string;
  _id: string;
  id: string; // e.g. "M-101"
  name: string;
  description: string;
  variations?: IVariation[] | undefined;
  basePrice?: number | undefined;
  category: Category;
  image: string;
  available: boolean;
  totalSold: number;
  label: string; // e.g. "regular", "new", "most-popular"
  estimatedTime: number;
  createdAt: string;
  updatedAt: string;
  __v: number;
}

// Meta info for pagination
export interface Meta {
  total: number;
  page: number;
  limit: number;
}

// API response type
export interface MenuApiResponse {
  statusCode: number;
  success: boolean;
  message: string;
  meta: Meta;
  data: MenuItem[];
}
