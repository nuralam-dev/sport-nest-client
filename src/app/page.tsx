import Banner from '@/components/Banner';
import FeaturedFacilities from '@/components/FeaturedFacilities';
import PopularSports from '@/components/PopularSports';
import React from 'react';

const page = () => {
  return (
    <div>
      <Banner></Banner>
      <PopularSports></PopularSports>
      <FeaturedFacilities></FeaturedFacilities>
    </div>
  );
};

export default page;