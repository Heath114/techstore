interface Product {
    id: number;
    name: string;
    description?: string;
    price: number;
    image: string;
    inStock?: boolean;
    stock?: number;
    category?: string;
    rating?: number;
    reviews?: number;
    features?: string[];
}

export const ProductList: Product[] = [
    {
        id: 1,
        name: "Wireless Mouse",
        description: "A high-precision wireless mouse with ergonomic design.",
        price: 29.99,
        image: "/images/products/img5.jpg"
    },
    {
        id: 2,
        name: "Mechanical Keyboard",
        description: "A durable mechanical keyboard with customizable RGB lighting.",
        price: 89.99,
        image: "/images/products/img5.jpg"
    },
    {
        id: 3,
        name: "Gaming Headset",
        description: "A comfortable gaming headset with immersive sound quality.",
        price: 59.99,
        image: "/images/products/img5.jpg"
    },

    {
        id: 4,
        name: "Wireless Charger",
        description: "A fast wireless charger compatible with all Qi-enabled devices.",
        price: 39.99,
        image: "/images/products/img5.jpg"
    },

    {
        id: 5,
        name: "iPhone 13",
        description: "The latest iPhone with A15 Bionic chip and 5G capability.",
        price: 999.99,
        image: "/images/products/img5.jpg"
    },
    {
        id: 6,
        name: "Samsung Galaxy S21",
        description: "The latest Samsung Galaxy smartphone with cutting-edge features.",
        price: 799.99,
        image: "/images/products/img5.jpg"
    },
    {
        id: 7,
        name: "Google Pixel 6",
        description: "Google's flagship smartphone with excellent camera performance.",
        price: 699.99,
        image: "/images/products/img5.jpg"
    },
    {
        id: 8,
        name: "OnePlus 9",
        description: "A high-performance smartphone with a smooth user experience.",
        price: 729.99,
        image: "/images/products/img5.jpg"
    },
    {
        id: 9,
        name: "Sony WH-1000XM4",
        description: "Industry-leading noise-canceling headphones with superior sound quality.",
        price: 349.99,
        image: "/images/products/img5.jpg"
    },
    {
        id: 10,
        name: "Bose QuietComfort 35 II",
        description: "Comfortable noise-canceling headphones with Alexa voice control.",
        price: 299.99,
        image: "/images/products/img5.jpg"
    }
]