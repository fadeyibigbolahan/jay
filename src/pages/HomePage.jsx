import React, { useState } from "react";
import styles from "../style";
import { Navbar, Hero, Footer } from "../components";
import WalletGrid from "../components/Wallet";
import HowItWorks from "../components/HowItWorks";
import Issues from "../components/Issues";
import CryptoPrices from "../components/CryptoPrice";

const HomePage = () => {
  return (
    <div className="bg-primary w-full overflow-hidden">
      <div className={`${styles.flexStart}`}>
        <div className={`${styles.boxWidth}`}>
          <CryptoPrices />
          <Hero />
        </div>
      </div>
      <div className="bg-[#15212A]">
        <div className={`py-8 ${styles.paddingX} ${styles.flexCenter}`}>
          <div className={`${styles.boxWidth}`}>
            <h1 className="text-white text-4xl md:text-6xl font-bold text-center mt-10 mb-5">
              Select the issue you are experiencing below
            </h1>
          </div>
        </div>
        <div className={`${styles.flexStart}`}>
          <div className={`${styles.boxWidth}`}>
            <p className="text-white text-lg text-center mb-10">
              You can also connect your wallet by selecting any of the option
              below.
            </p>
          </div>
        </div>
        <div className={`${styles.paddingX} ${styles.flexCenter}`}>
          <div className={`${styles.boxWidth}`}>
            <Issues />
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default HomePage;
