export interface Usuario {
  id: number;
  username: string;
}

export interface Comment {
  id: number;
  content: string;
  productId: number;
  userId: number;
  user: Usuario;
}

export interface Product {
  id: number;
  name: string;
  description: string;
  comments: Comment[];
}
