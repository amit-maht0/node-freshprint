export interface Apparel {
  code: string;
  sizes: { [size: string]: { price: number; quantity: number } };
}
