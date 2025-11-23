// Relative path: /src/components/Why.tsxx
'use client';
import React from 'react';
import { Headphones, PackageSearch, RefreshCcw, BadgeDollarSign, Wallet  } from 'lucide-react';
import { useParams } from 'next/navigation';
import { getTranslations } from '@/lib/i18n';
import { Locale } from '@/locales/business-config';

interface FeatureCardProps {
  icon: React.ReactNode;
  title: string;
  description: string;
}

const FeatureCard: React.FC<FeatureCardProps> = ({ icon, title, description }) => {
  return (
    <div className="flex flex-col items-center text-center">
      <div className="w-10 h-10 md:w-11 md:h-11 lg:w-12 lg:h-12 2xl:w-12 2xl:h-12 bg-gray-900 rounded-lg flex items-center justify-center mb-4">
        {icon}
      </div>
      <h3 className="text-base md:text-base lg:text-base 2xl:text-base font-medium text-gray-900 mb-2 leading-tight">
        {title}
      </h3>
      <p className="text-gray-600 text-sm md:text-sm lg:text-sm leading-relaxed">
        {description}
      </p>
    </div>
  );
};

const WhyChooseUs: React.FC = () => {
  const params = useParams();
  const locale = (params.locale as Locale) || 'en';
  const t = getTranslations(locale, 'common');
  
  const features = [
    {
      icon: <Headphones className="w-6 h-6 text-white" />,
      title: t.why.customer_service.title,
      description: t.why.customer_service.description
    },
    {
      icon: <PackageSearch className="w-6 h-6 text-white" />,
      title: t.why.track_order.title,
      description: t.why.track_order.description
    },
    {
      icon: <RefreshCcw className="w-6 h-6 text-white" />,
      title: t.why.returns.title,
      description: t.why.returns.description
    },
    {
      icon: <BadgeDollarSign className="w-6 h-6 text-white" />,
      title: t.why.best_offers.title,
      description: t.why.best_offers.description
    },
    {
      icon: <Wallet className="w-6 h-6 text-white" />,
      title: t.why.payment.title,
      description: t.why.payment.description
    }
  ];

  return (
    <section className="pb-16 mb-12 md:pb-20 lg:pb-24 2xl:pb-16 pt-16 md:pt-20 lg:pt-24 2xl:pt-16 w-[90%] md:w-[96%] lg:w-[80%] 2xl:w-[75%] mx-auto my-0 md:my-8 lg:my-12 2xl:my-16 bg-gray-50 border border-gray-200">
      <div className="max-w-7xl mx-auto px-8">
        <h2 className="text-xl md:text-2xl lg:text-2xl 2xl:text-3xl font-medium text-gray-900 mb-12 text-center tracking-wide">
          {t.why.title}
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-6 md:gap-7 lg:gap-8">
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

