import React, { useEffect, useState } from "react";
import axios from "axios";
import { FaCaretUp } from "react-icons/fa";

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
  }, []);

  if (loading) return <p>Loading...</p>;

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
            animation: marquee 20s linear infinite;
            white-space: nowrap;
          }
        `}
      </style>

      <div className="marquee gap-4">
        <CryptoItem
          name="Bitcoin"
          symbol="BTC"
          img="https://assets.coingecko.com/coins/images/1/standard/bitcoin.png?1696501400"
          price={prices.bitcoin?.usd}
          change="1.01%"
        />
        <CryptoItem
          name="Tether"
          symbol="USDT"
          img="https://assets.coingecko.com/coins/images/325/standard/Tether.png?1696501661"
          price={prices.tether?.usd}
          change="0.0%"
        />
        <CryptoItem
          name="Ethereum"
          symbol="ETH"
          img="https://assets.coingecko.com/coins/images/279/standard/ethereum.png?1696501628"
          price={prices.ethereum?.usd}
          change="0.6%"
        />
        {/* You can duplicate for continuous scrolling effect */}
      </div>
    </div>
  );
};

const CryptoItem = ({ name, symbol, img, price, change }) => (
  <div className="text-white flex justify-between items-center gap-4 border-r border-gray-300 p-3">
    <div className="flex justify-center items-center gap-2">
      <div className="w-[20px] h-[20px] rounded-full overflow-hidden">
        <img src={img} className="w-full h-full" />
      </div>
      <div>
        <p className="font-bold text-xs">{name}</p>
        <p className="text-xs text-gray-500">{symbol}</p>
      </div>
    </div>
    <div className="flex flex-col items-end">
      <p className="text-xs font-bold">${price}</p>
      <p className="flex items-center justify-center text-xs text-green-500 font-bold">
        <FaCaretUp />
        {change}
      </p>
    </div>
  </div>
);

export default CryptoPrices;
