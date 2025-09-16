
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