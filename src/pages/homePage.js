import React from 'react';
import Navbar from '../layouts/navbar';
import HomeComponent from '../components/home';

function HomePage() {
    return (
    <div className='bg-paleOrange'>
      <Navbar />
      <HomeComponent />
    </div>
  );
}

export default HomePage;
