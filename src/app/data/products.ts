// src/app/data/products.ts
interface BaseProduct {
    id: number;
    name: string;
    description?: string;
    image?: string;
    images: string[];
    inStock?: boolean;
    stock?: number;
    category?: string;
    rating?: number;
    reviews?: number;
    features?: string[];
    slug?: string;
    brand?: string;
    warranty?: string;
    colors?: string[];
    specifications?: {
        [key: string]: string
    };
    tags?: string[];
    whatsInTheBox?: string[];
}

export type Product = BaseProduct & (
    | { isSale?: false; price: number }
    | { isSale: true; originalPrice: number; discount: number; price?: number }
);

// Helper function to get the actual price of a product
export function getProductPrice(product: Product): number {
    if (product.isSale) {
        // If price is provided, use it; otherwise calculate from originalPrice and discount
        return product.price ?? product.originalPrice * (1 - product.discount / 100);
    }
    return product.price;
}

export const ProductList: Product[] = [
    {
        id: 1,
        name: "Wirelessww Mouse",
        description: "A highprecision wireless mouse with ergonomic design.",
        image: "/images/products/1.webp",
        brand: "Logitech",
        category: "Accessories",
        colors: ["Black", "White", "Blue"],
        features: [
            "Ergonomic Design",
            "Adjustable DPI",
        ],
        specifications: {
            Connectivity: "Wireless 2.4GHz",
            Battery: "AA Battery (included)",
            Compatibility: "Windows, macOS, Linux",
            Weight: "100g",
            Dimensions: "4.5 x 2.5 x 1.5 inches"
        },
        warranty: "2 Year Manufacturer Warranty",
        whatsInTheBox: [
            "Wireless Mouse",
            "USB Receiver",
            "AA Battery",
            "User Manual"
        ],
        images: ["/images/products/img2.jpg", "/images/products/img3.jpg", "/images/products/img1.jpg", "/images/products/placeholder.png"],
        slug: "wireless-mouse",
        isSale: true,
        originalPrice: 29.99,
        discount: 10,
    },
    {
        id: 2,
        name: "Wireless Mouse",
        description: "A highprecision wireless mouse with ergonomic design.",
        image: "/images/products/2.webp",
        brand: "Logitech",
        category: "Accessories",
        colors: ["Black", "White", "Blue"],
        features: [
            "Ergonomic Design",
            "Adjustable DPI",
        ],
        specifications: {
            Connectivity: "Wireless 2.4GHz",
            Battery: "AA Battery (included)",
            Compatibility: "Windows, macOS, Linux",
            Weight: "100g",
            Dimensions: "4.5 x 2.5 x 1.5 inches"
        },
        warranty: "2 Year Manufacturer Warranty",
        whatsInTheBox: [
            "Wireless Mouse",
            "USB Receiver",
            "AA Battery",
            "User Manual"
        ],
        price: 26.99,
        images: ["/images/products/img2.jpg", "/images/products/img3.jpg", "/images/products/img1.jpg", "/images/products/placeholder.png"],
        slug: "wireless-mouse",
        isSale: true,
        originalPrice: 29.99,
        discount: 10,
    },
    {
        id: 3,
        name: "v Mouse",
        description: "A highprecision wireless mouse with ergonomic design.",
        image: "/images/products/3.webp",
        brand: "Logitech",
        category: "Accessories",
        colors: ["Black", "White", "Blue"],
        features: [
            "Ergonomic Design",
            "Adjustable DPI",
            "Customizable Buttons",
            "Long Battery Life",
            "Smooth Tracking",
            "Compact and Portable",
            "Lightweight Design",
            "Easy Setup"

        ],
        specifications: {
            Connectivity: "Wireless 2.4GHz",
            Battery: "AA Battery (included)",
            Compatibility: "Windows, macOS, Linux",
            Weight: "100g",
            Dimensions: "4.5 x 2.5 x 1.5 inches",
            display: "6.55 inch, 120Hz AMOLED",
            Processor: "Qualcomm Snapdragon 888",
            RAM: "8GB / 12GB",
            Storage: "128GB / 256GB",
            OS: "OxygenOS based on Android 11",
            Cameras: "48MP + 50MP + 2MP Rear, 16MP Front",

        },
        warranty: "2 Year Manufacturer Warranty",
        whatsInTheBox: [
            "Wireless Mouse",
            "USB Receiver",
            "AA Battery",
            "User Manual",
            "Warp Charge 65 Power Adapter",
            "USB Type-C Cable",
            "Quick Start Guide"

        ],
        price: 1292.99,
        images: ["/images/products/img2.jpg", "/images/products/img2.jpg", "/images/products/img3.jpg", "/images/products/img1.jpg", "/images/products/placeholder.png"],
        slug: "bwadwd"
    },
    {
        id: 4,
        name: "Wireless Mouse",
        description: "A highprecision wireless mouse with ergonomic design.",
        image: "/images/products/4.webp",
        brand: "Logitech",
        category: "Accessories",
        colors: ["Black", "White", "Blue"],
        features: [
            "Ergonomic Design",
            "Adjustable DPI",
        ],
        specifications: {
            Connectivity: "Wireless 2.4GHz",
            Battery: "AA Battery (included)",
            Compatibility: "Windows, macOS, Linux",
            Weight: "100g",
            Dimensions: "4.5 x 2.5 x 1.5 inches"
        },
        warranty: "2 Year Manufacturer Warranty",
        whatsInTheBox: [
            "Wireless Mouse",
            "USB Receiver",
            "AA Battery",
            "User Manual"
        ],
        price: 29.99,
        images: ["/images/products/img2.jpg", "/images/products/img3.jpg", "/images/products/img1.jpg", "/images/products/placeholder.png"],
        slug: "wireless-mouse"
    },
  {
        id: 5,
        name: "Wireless Mouse",
        description: "A highprecision wireless mouse with ergonomic design.",
        image: "/images/products/img1.jpg",
        brand: "Logitech",
        category: "Accessories",   
        colors: ["Black", "White", "Blue"],
        features: [
            "Ergonomic Design",
            "Adjustable DPI",
        ],
        specifications: {
            Connectivity: "Wireless 2.4GHz",
            Battery: "AA Battery (included)",
            Compatibility: "Windows, macOS, Linux",
            Weight: "100g",
            Dimensions: "4.5 x 2.5 x 1.5 inches"
        },
        warranty: "2 Year Manufacturer Warranty",
        whatsInTheBox: [
            "Wireless Mouse",
            "USB Receiver",
            "AA Battery",
            "User Manual"
        ],
        price: 29.99,
        images: ["/images/products/img2.jpg", "/images/products/img3.jpg", "/images/products/img1.jpg", "/images/products/placeholder.png"],
        slug: "wireless-mouse"
    },
    {
        id: 6,
        name: "Samsung Galaxy S21",
        description: "The latest Samsung Galaxy smartphone with features.",
        price: 799.99,
        brand: "Samsung",
        image: "/images/products/img2.jpg",
        category: "Smartphones",
        colors: ["Phantom Gray", "Phantom White", "Phantom Violet", "Phantom Pink"],
        features: [
            "6.2-inch Dynamic AMOLED 2X Display",
            "Exynos 2100 / Snapdragon 888 Processor",
            "Triple Rear Camera System",
            "4000mAh Battery with Fast Charging",
            "5G Capable"
        ],
        specifications: {
            Display: "6.2 inch, 120Hz AMOLED",
            Processor: "Exynos 2100 / Snapdragon 888",
            RAM: "8GB",
            Storage: "128GB / 256GB",
            Battery: "4000mAh", 
            OS: "Android 11",
            Cameras: "12MP + 64MP + 12MP Rear, 10MP Front",
        },
        warranty: "1 Year Manufacturer Warranty",
        whatsInTheBox: [
            "Samsung Galaxy S21 Device",
            "USB Type-C Cable",
            "Quick Start Guide",
            "Ejection Pin"
        ],
        images: ["/images/products/img2.jpg", "/images/products/img3.jpg", "/images/products/img4.jpg", "/images/products/img1.jpg"],
        slug: "samsung-galaxy-s21"
    },
    {
        id: 7,
        name: "Google Pixel 6",
        description: "Google's flagship smartphone with excellent camera performance.",
        price: 699.99,
        image: "/images/products/img3.jpg",
        brand: "Google",
        category: "Smartphones",
        colors: ["Stormy Black", "Kinda Coral", "Sorta Seafoam", "Cloudy White"],
        features: [
            "6.4-inch OLED Display",
            "Google Tensor Processor",
            "Adaptive Battery",
            "Titan M2 Security Chip",
            "5G Capable"
        ],
        specifications: {
            Display: "6.4 inch, 90Hz OLED",
            Processor: "Google Tensor",
            RAM: "8GB",
            Storage: "128GB / 256GB",
            Battery: "4614mAh",
            OS: "Android 12",
            Cameras: "50MP + 12MP Rear, 8MP Front",
        },
        warranty: "1 Year Manufacturer Warranty",
        whatsInTheBox: [
            "Google Pixel 6 Device",
            "USB Type-C Cable",
            "Quick Start Guide",
        ],
        images: ["/images/products/img4.jpg", "/images/products/img1.jpg", "/images/products/img2.jpg", "/images/products/placeholder.png"],
        slug: "google-pixel-6"
    },
    {
        id: 8,
        name: "OnePlus 9",
        description: "A high-performance smartphone with a smooth user experience.",
        price: 729.99,
        image: "/images/products/img4.jpg",
        slug: "oneplus-9",
        brand: "OnePlus",
        category: "Smartphones",
        colors: ["Black", "Arctic Sky", "Winter Mist"],
        images: [
            "/images/products/img1.jpg",
            "/images/products/img3.jpg",
            "/images/products/img2.jpg",
        ],
        features: [
            "120Hz Fluid AMOLED Display",
            "Hasselblad Triple Camera System",
            "Snapdragon 888 Processor",
            "65W Warp Charge + 15W Wireless Charging",
            "5G Ready"
        ],
        specifications: {
            Display: "6.55 inch, 120Hz AMOLED",
            Processor: "Qualcomm Snapdragon 888",
            RAM: "8GB / 12GB",
            Storage: "128GB / 256GB",
            Battery: "4500mAh",
            OS: "OxygenOS based on Android 11",
            Cameras: "48MP + 50MP + 2MP Rear, 16MP Front",
        },
        warranty: "1 Year Manufacturer Warranty",
        whatsInTheBox: [
            "OnePlus 9 Device",
            "Warp Charge 65 Power Adapter",
            "USB Type-C Cable",
            "Quick Start Guide",
            "Protective Case",
        ]
    },
    {
        id: 9,
        name: "Wireless Mouse",
        description: "A highprecision wireless mouse with ergonomic design.",
        image: "/images/products/img1.jpg",
        brand: "Logitech",
        category: "Accessories",
        colors: ["Black", "White", "Blue"],
        features: [
            "Ergonomic Design",
            "Adjustable DPI",
        ],
        specifications: {
            Connectivity: "Wireless 2.4GHz",
            Battery: "AA Battery (included)",
            Compatibility: "Windows, macOS, Linux",
            Weight: "100g",
            Dimensions: "4.5 x 2.5 x 1.5 inches"
        },
        warranty: "2 Year Manufacturer Warranty",
        whatsInTheBox: [
            "Wireless Mouse",
            "USB Receiver",
            "AA Battery",
            "User Manual"
        ],
        price: 29.99,
        images: ["/images/products/img2.jpg", "/images/products/img3.jpg", "/images/products/img1.jpg", "/images/products/placeholder.png"],
        slug: "wireless-mouse"
    },
    {
        id: 10,
        name: "Wireless Mouse",
        description: "A highprecision wireless mouse with ergonomic design.",
        image: "/images/products/img1.jpg",
        brand: "Logitech",
        category: "Accessories",
        colors: ["Black", "White", "Blue"],
        features: [
            "Ergonomic Design",
            "Adjustable DPI",
        ],
        specifications: {
            Connectivity: "Wireless 2.4GHz",
            Battery: "AA Battery (included)",
            Compatibility: "Windows, macOS, Linux",
            Weight: "100g",
            Dimensions: "4.5 x 2.5 x 1.5 inches"
        },
        warranty: "2 Year Manufacturer Warranty",
        whatsInTheBox: [
            "Wireless Mouse",
            "USB Receiver",
            "AA Battery",
            "User Manual"
        ],
        price: 29.99,
        images: ["/images/products/img2.jpg", "/images/products/img3.jpg", "/images/products/img1.jpg", "/images/products/placeholder.png"],
        slug: "wireless-mouse"
    }
];







export interface Brand {
    id: number;
    name: string;
    image: string;
    website?: string;
}

export const BrandList: Brand[] = [
    {
        id: 1,
        name: "Apple",
        image: "/images/brands/apple.webp",
        website: "https://www.apple.com"
    },
    {
        id: 2,
        name: "Samsung",
        image: "/images/brands/samsung.webp",
        website: "https://www.samsung.com"
    },
    {
        id: 3,
        name: "Anker",
        image: "/images/brands/anker.webp",
        website: "https://www.anker.com"
    },
    {
        id: 4,
        name: "Huawei",
        image: "/images/brands/huawei.webp",
        website: "https://www.huawei.com"
    },
    {
        id: 5,
        name: "Infinix",
        image: "/images/brands/infinix.webp",
        website: "https://www.infinixmobility.com"
    },
    {
        id: 6,
        name: "tecno",
        image: "/images/brands/tecno.webp",
        website: "https://www.tecno-mobile.com"
    },
    {
        id: 7,
        name: "Xiaomi",
        image: "/images/brands/xiaomi.webp",
        website: "https://www.mi.com"
    }
];