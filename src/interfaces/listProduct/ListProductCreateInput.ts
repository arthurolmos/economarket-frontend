export interface ListProductCreateInput {
  name: string;
  price: number;
  quantity: number;
  purchased: boolean;
  brand?: string;
  market?: string;
}
