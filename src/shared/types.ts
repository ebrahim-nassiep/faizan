export interface Category {
  id: number;
  name: string;
  slug: string;
  description: string;
  image_url: string;
  created_at: string;
  updated_at: string;
}

export interface Product {
  id: number;
  category_id: number;
  name: string;
  slug: string;
  description: string;
  price: number;
  image_url: string;
  images: string;
  sizes: string;
  colors: string;
  is_featured: number;
  stock_quantity: number;
  created_at: string;
  updated_at: string;
}

export interface CartItem {
  id: number;
  session_id: string;
  product_id: number;
  quantity: number;
  size: string;
  color: string;
  name: string;
  price: number;
  image_url: string;
  created_at: string;
  updated_at: string;
}

export interface Order {
  id: number;
  order_number: string;
  customer_name: string;
  customer_email: string;
  customer_phone: string;
  shipping_address: string;
  total_amount: number;
  status: string;
  created_at: string;
  updated_at: string;
}
