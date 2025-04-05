export interface ICartItem {
  _id: string;
  category: string;
  title: string;
  oldPrice?: number | null;
  price: number;
  count: number;
  slug?: string;
  imageUrl: string;
}

export interface ICartSliseState {
  totalPrice: number;
  items: ICartItem[];
}
