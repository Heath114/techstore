'use client';

import React from 'react'
import { collection, doc, addDoc, query, where, getDocs, setDoc, serverTimestamp } from 'firebase/firestore';
import { db } from '@/lib/firebase';


export default function NumberInputComponent() {
    const [phoneNumber, setPhoneNumber] = React.useState('');
    const [isSubmitting, setIsSubmitting] = React.useState(false);
    const [message, setMessage] = React.useState('');
  
    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
      e.preventDefault();
      
      // Validation
      if (!phoneNumber.trim()) {
        setMessage('Please enter a phone number');
        return;
      }
      
      if (phoneNumber.length < 10) {
        setMessage('Please enter a valid phone number (at least 10 digits)');
        return;
      }
  
      setIsSubmitting(true);
      setMessage('');
  
      try {
        
        const sanitizedPhoneNumber = phoneNumber.replace(/\D/g, '');
        const subscriberDocRef = doc(db, 'subscribers', sanitizedPhoneNumber);
  
      
        // Add new subscriber to Firestore
        await setDoc(subscriberDocRef, {
          phoneNumber: sanitizedPhoneNumber,
          subscribedAt: serverTimestamp(),
          source: 'website_footer',
          status: 'active'
        }, { merge: true });
        
        setMessage('Success! You are now subscribed to our deals list.');
        setPhoneNumber('');
        
        // Optional: Log success to console for debugging
        console.log('New subscriber added:', phoneNumber);
        
      } catch (error) {
        console.error('Error adding subscriber:', error);
        setMessage('Something went wrong. Please try again.');
      } finally {
        setIsSubmitting(false);
      }
    };
  
    return (
      <form onSubmit={handleSubmit} className="flex flex-col gap-2 w-full max-w-sm mb-4">
        <h3 className={`mb-2 sm:mb-4 uppercase text-gray-400 font-semibold lg:text-4xl`}>
          Join our Deals List
        </h3>
        <h4 className="mb-4 md:mb-6 text-gray-400 font-medium">Join our email list for exclusive offers and early access to sales.</h4>
        <div className="relative w-full">
          <input
            type="tel"
            placeholder="Enter phone number"
            value={phoneNumber}
            onChange={(e) => {
              // Only allow numbers and common phone characters
              const value = e.target.value.replace(/[^\d+\-\s()]/g, '');
              setPhoneNumber(value);
            }}
            disabled={isSubmitting}
            className="w-full border-b border-gray-600 text-black bg-gray-100 py-4 px-10 text-2xl text-center placeholder-gray-600 focus:outline-none focus:border-black disabled:opacity-50"
          />
          <button
            type="submit"
            disabled={isSubmitting}
            className="absolute right-0 top-1/2 -translate-y-1/2 text-black hover:translate-x-1 transition-transform disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isSubmitting ? (
              <div className="w-8 h-8 border-2 mr-2 border-black border-t-transparent rounded-full animate-spin"></div>
            ) : (
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={2}
                stroke="currentColor"
                className="w-10 h-10 text-black pr-2"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M5 12h14m-7-7l7 7-7 7"
                />
              </svg>
            )}
          </button>
        </div>
        {message && (
          <p className={`text-xl mt-2 ${
            message.includes('Success') ? 'text-green-400' : 
            message.includes('already') ? 'text-yellow-400' : 
            'text-red-400'
          }`}>
            {message}
          </p>
        )}
      </form>
    );
  }