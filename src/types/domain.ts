export interface Comment {
  id: number;
  content: string;
  productId: number;
}

export interface Product {
  id: number;
  name: string;
  description: string;
  comments: Comment[];
}
