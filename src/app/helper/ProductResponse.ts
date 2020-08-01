export interface CategoryProduct{
    name: string;
  };
export interface Product{
    _id: string,
    name: string,
    mrp: number,
    salePrice: number,
    quantity: number,
    onSale: boolean,
    category: CategoryProduct
  };