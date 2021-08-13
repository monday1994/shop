// user model

export interface OrderDTO {
  id?: string;
  name: string;
  price: string;
  address: string;
  productsIds: string[];
  userId: string;
}
