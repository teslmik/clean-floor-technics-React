export interface ICartItem {
  id: string;
  category: string;
  imageUrl: string;
  title: string;
  oldPrice: string;
  price: number;
  count: number;
}

export interface ICartSliseState {
  totalPrice: number;
  items: ICartItem[];
}