import React from 'react';
import Online from '../components/online';
import Navbar from '../layouts/navbar';
import HomeComponent from '../components/home';

function HomePage() {
    return (
    <div className='bg-paleOrange'>
      <Navbar />
      <Online />
      <HomeComponent />
    </div>
  );
}

export default HomePage;
