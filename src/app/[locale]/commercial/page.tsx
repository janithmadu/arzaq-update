import React from 'react';
import Commercial from '../components/Commercials/Commercial';
import { Metadata } from 'next';

export const metadata: Metadata = {
    title:
      "Commercial Ads - Explore Business Opportunities & Services in Kuwait | Q8ARZAQ",
    description:
      "Browse commercial ads on Q8ARZAQ to discover the best business opportunities, services, and products in Kuwait. Post your commercial ad today and connect with a wide audience for maximum exposure!",
  };
  

const Page = () => {
    return (
        <div>
            <Commercial/>
        </div>
    );
}

export default Page;
