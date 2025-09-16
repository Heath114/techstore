export interface Item {
    id: number;
    name: string;
    image: string;
    link?: string;
}

export const ItemList: Item[] = [
    {
        id: 1,
        name: "Smartphones",
        image: "/images/icons/mobile.webp",
        link: "/products/smartphones"
    },
    {
        id: 2,
        name: "Wearables",
        image: "/images/icons/wearables.webp",
        link: "/products/wearables"
    },
    {
        id: 3,
        name: "Laptops and Computers",
        image: "/images/icons/computer-laptop.webp",
        link: "/products/laptops"
    },
    {
        id: 4,
        name: "Accessories",
        image: "/images/icons/accessories.webp",
        link: "/products/accessories"
    },
    {
        id: 5,
        name: "Entertainment",
        image: "/images/icons/entertainment.webp",
        link: "/products/entertainment"
    },
    {
        id: 6,
        name: "Maintenance",
        image: "/images/icons/repair-services.webp",
        link: "/products/maintenance"
    },
    {
        id: 7,
        name: "Exclusive Bundles",
        image: "/images/icons/bundles.webp",
        link: "/products/bundles"
    }
];