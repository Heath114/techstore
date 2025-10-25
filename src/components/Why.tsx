// Relative path: /src/components/Why.tsxx
'use client';
import React from 'react';
import { Headphones, PackageSearch, RefreshCcw, BadgeDollarSign, Wallet  } from 'lucide-react';

interface FeatureCardProps {
  icon: React.ReactNode;
  title: string;
  description: string;
}

const FeatureCard: React.FC<FeatureCardProps> = ({ icon, title, description }) => {
  return (
    <div className="flex flex-col items-center text-center">
      <div className="w-12 h-12 bg-gray-900 rounded-lg flex items-center justify-center mb-4">
        {icon}
      </div>
      <h3 className="text-base font-medium text-gray-900 mb-2 leading-tight">
        {title}
      </h3>
      <p className="text-gray-600 text-sm leading-relaxed">
        {description}
      </p>
    </div>
  );
};

const WhyChooseUs: React.FC = () => {
  const features = [
    {
      icon: <Headphones className="w-6 h-6 text-white" />,
      title: "Excellent customer service",
      description: "Support team ready to answer all your questions and assist you."
    },
    {
      icon: <PackageSearch className="w-6 h-6 text-white" />,
      title: "Track your order with ease",
      description: "Stay informed on the status of your question one step closer to getting it resolved."
    },
    {
      icon: <RefreshCcw className="w-6 h-6 text-white" />,
      title: "Easy returns and exchanges",
      description: "We offer a flexible return and exchange policy to ensure your complete satisfaction."
    },
    {
      icon: <BadgeDollarSign className="w-6 h-6 text-white" />,
      title: "Best offers and prices",
      description: "Discover unique products at the lowest prices with quality assurance."
    },
    {
      icon: <Wallet className="w-6 h-6 text-white" />,
      title: "Various payment options",
      description: "Enjoy flexible payment methods that suit your needs and make your purchases easier."
    }
  ];

  return (
    <section className="pb-16 pt-16 w-[75%] mx-auto my-16 bg-gray-50 border border-gray-200">
      <div className="max-w-7xl mx-auto px-8">
        <h2 className="text-3xl font-medium text-gray-900 mb-12 text-center tracking-wide">
          Why choose to buy from This Techshop?
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-8">
          {features.map((feature, index) => (
            <FeatureCard
              key={index}
              icon={feature.icon}
              title={feature.title}
              description={feature.description}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default WhyChooseUs;