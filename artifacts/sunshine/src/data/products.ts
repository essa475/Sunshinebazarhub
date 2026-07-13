import tshirtImg from "@assets/generated_images/tshirt.png";
import pantsImg from "@assets/generated_images/pants.png";
import makeupImg from "@assets/generated_images/makeup.png";
import playstationImg from "@assets/generated_images/playstation.png";
import iphoneImg from "@assets/generated_images/iphone.png";
import handbagImg from "@assets/generated_images/handbag.png";
import locketImg from "@assets/generated_images/locket.png";
import underwearImg from "@assets/generated_images/underwear.png";

export type Category = 
  | "Clothing" 
  | "Makeup & Beauty" 
  | "Electronics" 
  | "Bags & Accessories" 
  | "Jewelry" 
  | "Innerwear";

export interface Product {
  id: string;
  name: string;
  price: number;
  originalPrice?: number;
  category: Category;
  image: string;
  rating: number;
  reviews: number;
}

export const PRODUCTS: Product[] = [
  // Clothing
  {
    id: "c1",
    name: "Classic Yellow Cotton T-Shirt",
    price: 14.99,
    originalPrice: 24.99,
    category: "Clothing",
    image: tshirtImg,
    rating: 4.8,
    reviews: 342,
  },
  {
    id: "c2",
    name: "Premium Blue Denim Jeans",
    price: 39.99,
    originalPrice: 59.99,
    category: "Clothing",
    image: pantsImg,
    rating: 4.5,
    reviews: 821,
  },
  {
    id: "c3",
    name: "Comfortable Grey Hoodie",
    price: 29.99,
    category: "Clothing",
    image: "https://images.unsplash.com/photo-1556821840-3a63f95609a7?auto=format&fit=crop&q=80&w=400",
    rating: 4.7,
    reviews: 120,
  },
  {
    id: "c4",
    name: "Casual Checkered Shirt",
    price: 22.50,
    originalPrice: 35.00,
    category: "Clothing",
    image: "https://images.unsplash.com/photo-1598033129183-c4f50c736f10?auto=format&fit=crop&q=80&w=400",
    rating: 4.3,
    reviews: 89,
  },
  
  // Makeup & Beauty
  {
    id: "m1",
    name: "Vibrant Colors Eyeshadow Palette",
    price: 34.50,
    originalPrice: 45.00,
    category: "Makeup & Beauty",
    image: makeupImg,
    rating: 4.9,
    reviews: 1045,
  },
  {
    id: "m2",
    name: "Matte Liquid Lipstick - Ruby Red",
    price: 12.99,
    category: "Makeup & Beauty",
    image: "https://images.unsplash.com/photo-1586495777744-4413f21062fa?auto=format&fit=crop&q=80&w=400",
    rating: 4.6,
    reviews: 456,
  },
  {
    id: "m3",
    name: "Flawless Finish Foundation",
    price: 28.00,
    originalPrice: 35.00,
    category: "Makeup & Beauty",
    image: "https://images.unsplash.com/photo-1631214500115-598fc2cb8d2d?auto=format&fit=crop&q=80&w=400",
    rating: 4.7,
    reviews: 890,
  },

  // Electronics
  {
    id: "e1",
    name: "PlayStation 5 Console - Next Gen",
    price: 499.00,
    category: "Electronics",
    image: playstationImg,
    rating: 5.0,
    reviews: 5430,
  },
  {
    id: "e2",
    name: "iPhone 15 Pro Titanium",
    price: 999.00,
    category: "Electronics",
    image: iphoneImg,
    rating: 4.9,
    reviews: 3201,
  },
  {
    id: "e3",
    name: "Wireless Noise-Canceling Headphones",
    price: 199.99,
    originalPrice: 249.99,
    category: "Electronics",
    image: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?auto=format&fit=crop&q=80&w=400",
    rating: 4.8,
    reviews: 1102,
  },
  {
    id: "e4",
    name: "Smart Watch Series 8",
    price: 299.00,
    category: "Electronics",
    image: "https://images.unsplash.com/photo-1546868871-7041f2a55e12?auto=format&fit=crop&q=80&w=400",
    rating: 4.6,
    reviews: 876,
  },

  // Bags & Accessories
  {
    id: "b1",
    name: "Elegant Tan Leather Handbag",
    price: 89.99,
    originalPrice: 129.99,
    category: "Bags & Accessories",
    image: handbagImg,
    rating: 4.8,
    reviews: 312,
  },
  {
    id: "b2",
    name: "Minimalist Canvas Backpack",
    price: 45.00,
    category: "Bags & Accessories",
    image: "https://images.unsplash.com/photo-1553062407-98eeb64c6a62?auto=format&fit=crop&q=80&w=400",
    rating: 4.5,
    reviews: 420,
  },
  {
    id: "b3",
    name: "Aviator Sunglasses",
    price: 18.50,
    originalPrice: 25.00,
    category: "Bags & Accessories",
    image: "https://images.unsplash.com/photo-1511499767150-a48a237f0083?auto=format&fit=crop&q=80&w=400",
    rating: 4.4,
    reviews: 156,
  },

  // Jewelry
  {
    id: "j1",
    name: "Delicate Gold Locket Necklace",
    price: 149.99,
    originalPrice: 199.99,
    category: "Jewelry",
    image: locketImg,
    rating: 4.9,
    reviews: 89,
  },
  {
    id: "j2",
    name: "Sterling Silver Hoop Earrings",
    price: 34.00,
    category: "Jewelry",
    image: "https://images.unsplash.com/photo-1535632066927-ab7c9ab60908?auto=format&fit=crop&q=80&w=400",
    rating: 4.7,
    reviews: 231,
  },
  {
    id: "j3",
    name: "Diamond Engagement Ring",
    price: 899.00,
    category: "Jewelry",
    image: "https://images.unsplash.com/photo-1605100804763-247f66156eb4?auto=format&fit=crop&q=80&w=400",
    rating: 5.0,
    reviews: 45,
  },

  // Innerwear
  {
    id: "i1",
    name: "Men's Boxer Briefs (3-Pack)",
    price: 24.99,
    originalPrice: 30.00,
    category: "Innerwear",
    image: underwearImg,
    rating: 4.6,
    reviews: 512,
  },
  {
    id: "i2",
    name: "Comfort Cotton Socks (5-Pack)",
    price: 14.99,
    category: "Innerwear",
    image: "https://images.unsplash.com/photo-1586350977771-b3b0abd50c82?auto=format&fit=crop&q=80&w=400",
    rating: 4.8,
    reviews: 890,
  }
];
