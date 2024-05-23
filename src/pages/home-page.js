import React from 'react';
import Online from '../components/online';
import Navbar from '../layouts/navbar';
import HomeComponent from '../components/home';
import ReceiveCodeComponent from '../components/web-otp';
import SendCodeComponent from '../components/code';


function HomePage() {
    return (
    <>
      <Navbar />
      <Online />
      <HomeComponent />
      <SendCodeComponent />
      <ReceiveCodeComponent />
    </>
  );
}

export default HomePage;
