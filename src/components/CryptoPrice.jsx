import React, { useEffect, useState } from "react";
import axios from "axios";
import { FaCaretUp } from "react-icons/fa";
import coinmarket from "../assets/coinmarket.png";
import bitcoin from "../assets/bitcoin.svg";
import tether from "../assets/tether.svg";
import ethereum from "../assets/ethereum.svg";

const CryptoPrices = () => {
  const [prices, setPrices] = useState({});
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPrices = async () => {
      try {
        const res = await axios.get(
          "https://api.coingecko.com/api/v3/simple/price",
          {
            params: {
              ids: "bitcoin,ethereum,tether",
              vs_currencies: "usd",
            },
          }
        );
        setPrices(res.data);
      } catch (err) {
        console.error("Failed to fetch crypto prices:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchPrices();

    // Optional: Refresh prices every 60 seconds
    const interval = setInterval(fetchPrices, 60000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="w-full overflow-hidden bg-[#0C0E13]">
      <style>
        {`
          @keyframes marquee {
            0% { transform: translateX(100%); }
            100% { transform: translateX(-100%); }
          }

          .marquee {
            display: inline-flex;
            animation: marquee 10s linear infinite;
            white-space: nowrap;
          }
        `}
      </style>

      <div className="marquee gap-4">
        <img src={coinmarket} className="h-[50px]" alt="" srcset="" />
        <CryptoItem
          name="Bitcoin"
          symbol="BTC"
          img={bitcoin}
          price={prices.bitcoin?.usd}
          change="1.01%"
          loading={loading}
        />
        <CryptoItem
          name="Tether"
          symbol="USDT"
          img={tether}
          price={prices.tether?.usd}
          change="0.0%"
          loading={loading}
        />
        <CryptoItem
          name="Ethereum"
          symbol="ETH"
          img={ethereum}
          price={prices.ethereum?.usd}
          change="0.6%"
          loading={loading}
        />
      </div>
    </div>
  );
};

const CryptoItem = ({ name, symbol, img, price, change, loading }) => (
  <div className="text-white flex justify-between items-center gap-4 border-r border-gray-300 p-3">
    <div className="flex justify-center items-center gap-2">
      <div className="w-[20px] h-[20px] rounded-full overflow-hidden">
        <img src={img} alt={name} className="w-full h-full" loading="lazy" />
      </div>
      <div>
        <p className="font-bold text-xs">{name}</p>
        <p className="text-xs text-gray-500">{symbol}</p>
      </div>
    </div>
    <div className="flex flex-col items-end">
      {loading ? (
        <>
          <div className="w-10 h-3 bg-gray-700 animate-pulse rounded"></div>
          <div className="w-6 h-2 bg-gray-600 animate-pulse rounded mt-1"></div>
        </>
      ) : (
        <>
          <p className="text-xs font-bold">${price}</p>
          <p className="flex items-center justify-center text-xs text-green-500 font-bold">
            <FaCaretUp />
            {change}
          </p>
        </>
      )}
    </div>
  </div>
);

export default CryptoPrices;
