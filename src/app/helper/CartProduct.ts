export interface CartDetail {
    _id: string,
    quantity: number,
    product: ProductCart
};

export interface ProductCart {
    _id: string,
    name: string,
    mrp: number,
    salePrice: number,
    quantity: number,
    onSale: boolean
}