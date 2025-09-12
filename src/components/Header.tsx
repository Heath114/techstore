import React from 'react';
import Link from 'next/link';
import Image from 'next/image';

export default function Header() {
    return (
        <header className="bg-white shadow fixed w-full z-9999">
            <div className="flex justify-between items-center p-4">
                <Link href="/">
                    <Image src="/images/logos/logo.png" alt="TechShop Logo" width={120} height={40} />
                </Link>
                {searchBar()}
            </div>
        
        </header>
    )
}

function searchBar() {
    return (
        <div className="flex-1 mx-4">
            <input
                type="text"
                placeholder="Search products..."
                className="w-full border text-black border-gray-300 rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
        </div>
    );
}