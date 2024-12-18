// Define Product interface
export interface Product {
    id: number;
    name: string;
    description: string;
    price: number;
    discountedPrice?: number;
    image_url: string;
    quantity?: number;
    min_order: string;
    max_order: string;
  }


// Define CartItem interface
export interface CartItem {
    id: number;
    name: string;
    quantity: number;
    price: string;
    discountedPrice: string;
  }
  



  export interface Category {
    id: string;
    name: string;
  }