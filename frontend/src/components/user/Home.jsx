import React from 'react';
import HeroCarousel from './HeroCarousel';
import Categories from './Categories';
import TrendingOffers from './TrendingOffers';
import TrendingBanner from './TrendingBanner';
import FeaturedProducts from './FeaturedProducts';
import OffersBanner from './OffersBanner';
import BestSellers from './BestSellers';
import WhyChoose from './WhyChoose';
import Testimonials from './Testimonials';
import InstagramGallery from './InstagramGallery';
import Newsletter from './Newsletter';

const Home = () => {
  return (
    <>
      <HeroCarousel />
      <Categories />
      <TrendingOffers />
      <FeaturedProducts />
      <OffersBanner />
      <BestSellers />
      <WhyChoose />
      <Testimonials />
      <InstagramGallery />
      <Newsletter />
    </>
  );
};

export default Home;
