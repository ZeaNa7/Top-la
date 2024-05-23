import React from 'react';
import Online from '../components/online';
import Navbar from '../layouts/navbar';
import HomeComponent from '../components/home';
import ReceiveCodeComponent from '../components/web-otp';

function HomePage() {
    return (
    <>
      <Navbar />
      <Online />
      <HomeComponent />
      <ReceiveCodeComponent />
    </>
  );
}

export default HomePage;
