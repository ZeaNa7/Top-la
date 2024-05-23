import React from 'react';
import Online from '../components/online';
import Navbar from '../layouts/navbar';
import HomeComponent from '../components/home';

function HomePage() {
    return (
    <>
      <Navbar />
      <Online />
      <HomeComponent />
    </>
  );
}

export default HomePage;
