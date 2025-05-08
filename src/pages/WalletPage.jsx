import React from "react";
import WalletGrid from "../components/Wallet";
import { Footer, Navbar } from "../components";

const WalletPage = () => {
  return (
    <div className="flex flex-col justify-center items-center gap-3">
      <Navbar />
      <div className="flex flex-col justify-center items-center gap-6 my-4">
        <h2 className="font-bold text-3xl text-[#587087]">Wallets</h2>
        <p className="font-semibold text-lg text-[#587087]">
          Connect your preffered wallet.
        </p>
      </div>
      <WalletGrid />
      <div className="flex justify-center items-center py-10">
        <p className="text-sm text-gray-400">
          Open a pull request on{" "}
          <strong className="text-blue-400 cursor-pointer">Github</strong> to
          add your wallet here.
        </p>
      </div>
    </div>
  );
};

export default WalletPage;
