import React from "react";
import Hero from "./Hero";
import Eco from "./Eco";
import Features from "./Features";
import Faq from "./Faq";
import Footer from "./Footer";
function Landing() {
  return (
    <div className=" overflow-x-hidden">
      <Hero />
      <Eco />
      <Features />
      <Faq />
      <Footer />
    </div>
  );
}

export default Landing;
