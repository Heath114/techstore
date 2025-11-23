'use client';

import React from 'react';
import Link from 'next/link';
import { useParams } from 'next/navigation';
import { CheckCircle, Package, Truck, Mail, ArrowRight } from 'lucide-react';

export default function OrderConfirmationPage() {
  const params = useParams();
  const lang = params.locale || 'en';
  
  // Generate a random order number
  const orderNumber = `TS${Math.random().toString(36).substring(2, 9).toUpperCase()}`;
  const estimatedDelivery = new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toLocaleDateString('en-US', {
    month: 'long',
    day: 'numeric',
    year: 'numeric'
  });

  return (
    <div className="min-h-screen pt-24 pb-16 px-4 bg-gray-50">
      <div className="max-w-3xl mx-auto">
        {/* Success Icon */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-20 h-20 bg-green-100 rounded-full mb-6">
            <CheckCircle className="w-12 h-12 text-green-600" />
          </div>
          <h1 className="text-3xl md:text-4xl font-medium text-gray-900 mb-4">
            Order Confirmed!
          </h1>
          <p className="text-lg text-gray-600">
            Thank you for your purchase. Your order has been received.
          </p>
        </div>

        {/* Order Details Card */}
        <div className="bg-white p-6 md:p-8 mb-6">
          <div className="grid md:grid-cols-2 gap-6 mb-8">
            <div>
              <p className="text-sm text-gray-600 mb-1">Order Number</p>
              <p className="text-lg font-medium text-gray-900">{orderNumber}</p>
            </div>
            <div>
              <p className="text-sm text-gray-600 mb-1">Estimated Delivery</p>
              <p className="text-lg font-medium text-gray-900">{estimatedDelivery}</p>
            </div>
          </div>

          <div className="border-t border-gray-200 pt-6">
            <h2 className="text-lg font-medium text-gray-900 mb-4">What&apos;s Next?</h2>
            <div className="space-y-4">
              <div className="flex gap-4">
                <div className="flex-shrink-0 w-10 h-10 bg-gray-100 rounded-full flex items-center justify-center">
                  <Mail className="w-5 h-5 text-gray-600" />
                </div>
                <div>
                  <p className="font-medium text-gray-900">Order Confirmation Email</p>
                  <p className="text-sm text-gray-600">
                    We&apos;ve sent a confirmation email with your order details.
                  </p>
                </div>
              </div>
              <div className="flex gap-4">
                <div className="flex-shrink-0 w-10 h-10 bg-gray-100 rounded-full flex items-center justify-center">
                  <Package className="w-5 h-5 text-gray-600" />
                </div>
                <div>
                  <p className="font-medium text-gray-900">Processing Your Order</p>
                  <p className="text-sm text-gray-600">
                    We&apos;re preparing your items for shipment.
                  </p>
                </div>
              </div>
              <div className="flex gap-4">
                <div className="flex-shrink-0 w-10 h-10 bg-gray-100 rounded-full flex items-center justify-center">
                  <Truck className="w-5 h-5 text-gray-600" />
                </div>
                <div>
                  <p className="font-medium text-gray-900">Shipping Updates</p>
                  <p className="text-sm text-gray-600">
                    You&apos;ll receive tracking information once your order ships.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Need Help Card */}
        <div className="bg-white p-6 md:p-8 mb-6">
          <h2 className="text-lg font-medium text-gray-900 mb-4">Need Help?</h2>
          <p className="text-gray-600 mb-4">
            If you have any questions about your order, feel free to contact our customer support team.
          </p>
          <div className="flex flex-col sm:flex-row gap-4">
            <a
              href="mailto:support@techstore.com"
              className="flex-1 text-center px-6 py-3 border border-gray-300 text-gray-700 hover:bg-gray-50 transition-colors"
            >
              Email Support
            </a>
            <a
              href="tel:+1234567890"
              className="flex-1 text-center px-6 py-3 border border-gray-300 text-gray-700 hover:bg-gray-50 transition-colors"
            >
              Call Us
            </a>
          </div>
        </div>

        {/* CTA Buttons */}
        <div className="flex flex-col sm:flex-row gap-4">
          <Link
            href={`/${lang}`}
            className="flex-1 inline-flex items-center justify-center gap-2 bg-gray-900 text-white px-6 py-4 font-medium hover:bg-gray-800 transition-colors"
          >
            Continue Shopping
            <ArrowRight size={20} />
          </Link>
          <Link
            href={`/${lang}/orders/${orderNumber}`}
            className="flex-1 text-center px-6 py-4 border border-gray-300 text-gray-700 hover:bg-gray-50 transition-colors"
          >
            View Order Details
          </Link>
        </div>

        {/* Additional Info */}
        <div className="mt-8 text-center text-sm text-gray-600">
          <p>Order number: <span className="font-medium text-gray-900">{orderNumber}</span></p>
          <p className="mt-2">A confirmation email has been sent to your email address.</p>
        </div>
      </div>
    </div>
  );
}
