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
      <div className="w-16 h-16 bg-purple-800 rounded-lg flex items-center justify-center mb-4">
        {icon}
      </div>
      <h3 className="text-2xl font-semibold text-gray-700 mb-3 leading-none">
        {title}
      </h3>
      <p className="text-gray-500 text-2xl font-light leading-none">
        {description}
      </p>
    </div>
  );
};

const WhyChooseUs: React.FC = () => {
  const features = [
    {
      icon: <Headphones className="w-8 h-8 text-white" />,
      title: "Excellent customer service",
      description: "Support team ready to answer all your questions and assist you."
    },
    {
      icon: <PackageSearch className="w-8 h-8 text-white" />,
      title: "Track your order with ease",
      description: "Stay informed on the status of your question one step closer to getting it resolved."
    },
    {
      icon: <RefreshCcw className="w-8 h-8 text-white" />,
      title: "Easy returns and exchanges",
      description: "We offer a flexible return and exchange policy to ensure your complete satisfaction."
    },
    {
      icon: <BadgeDollarSign className="w-8 h-8 text-white" />,
      title: "Best offers and prices",
      description: "Discover unique products at the lowest prices with quality assurance."
    },
    {
      icon: <Wallet className="w-8 h-8 text-white" />,
      title: "Various payment options",
      description: "Enjoy flexible payment methods that suit your needs and make your purchases easier."
    }
  ];

  return (
    <section className="pb-16 pt-8 w-[75%] mx-auto rounded-lg shadow-lg my-16 bg-gray-100">
      <div className="max-w-7xl mx-auto">
        <h2 className="text-3xl font-bold text-center text-gray-800 mb-12">
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