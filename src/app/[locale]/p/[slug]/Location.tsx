'use client';

import React from 'react';

export default function Location() {
    // Change these coordinates to your exact location
    const latitude = 37.7749;
    const longitude = -122.4194;
    const placeName = "TechStore Main Location";

    // This generates a Google Maps embed with a marker at the specified coordinates
    const mapUrl = `https://maps.google.com/maps?q=${latitude},${longitude}&t=&z=15&ie=UTF8&iwloc=&output=embed`;

    return (
        <section className="w-full max-w-[1440px] mx-auto lg:px-0 px-4 py-24 bg-white" id="location">
            <div className="text-center mb-8">
                <h3 className="text-4xl text-gray-900 mb-12 text-center">Visit Our Store</h3>
            </div>
            <div className="w-full h-[600px] my-10">
                <iframe
                    src={mapUrl}
                    width="100%"
                    height="100%"
                    style={{ border: 0 }}
                    allowFullScreen={true}
                    loading="lazy"
                    referrerPolicy="no-referrer-when-downgrade"
                ></iframe>
            </div>
        </section>
    );
}
