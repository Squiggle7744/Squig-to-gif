import React from "react";
import Header from "../components/header";
import InputBox from "../components/inputBox";
import Script from "next/script";

const Home = () => {
  return (
    <div>
      <Header />
      <InputBox />
      <Script src="sketch.js"></Script>
    </div>
  );
};

export default Home;
