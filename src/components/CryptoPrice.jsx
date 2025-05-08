import React, { useEffect, useState } from "react";
import axios from "axios";
import { FaCaretUp } from "react-icons/fa";
import coinmarket from "../assets/coinmarket.png";
import bitcoin from "../assets/bitcoin.svg";
import tether from "../assets/tether.svg";
import ethereum from "../assets/ethereum.png";

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
              ids: "bitcoin,ethereum,tether,ripple,binancecoin,solana,usd-coin,dogecoin",
              vs_currencies: "usd",
            },
          }
        );
        console.log("prices", res.data);
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
    <div className="flex w-full overflow-hidden bg-[#0C0E13]">
      <img src={coinmarket} className="h-[55px] z-10" alt="" srcset="" />
      <style>
        {`
      @keyframes marquee {
        0% { transform: translateX(0); }
        100% { transform: translateX(-50%); }
      }

      .marquee-track {
        display: flex;
        width: 500%;
        animation: marquee 10s linear infinite;
      }

      .marquee-inner {
        display: flex;
        width: 500%;
      }
    `}
      </style>

      <div className="marquee-track">
        <div className="marquee-inner">
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
          <CryptoItem
            name="XRP"
            symbol="XRP"
            img="https://assets.coingecko.com/coins/images/44/standard/xrp-symbol-white-128.png?1696501442"
            price={prices.ripple?.usd}
            change="0.2%"
            loading={loading}
          />
          <CryptoItem
            name="BNB"
            symbol="BNB"
            img="https://assets.coingecko.com/coins/images/825/standard/bnb-icon2_2x.png?1696501970"
            price={prices.binancecoin?.usd}
            change="2.0%"
            loading={loading}
          />
          <CryptoItem
            name="Solana"
            symbol="SOL"
            img="https://assets.coingecko.com/coins/images/4128/standard/solana.png?1718769756"
            price={prices.solana?.usd}
            change="2.3%"
            loading={loading}
          />
          <CryptoItem
            name="USDC"
            symbol="USDC"
            img="https://assets.coingecko.com/coins/images/6319/standard/usdc.png?1696506694"
            price={prices["usd-coin"]?.usd}
            change="0.0%"
            loading={loading}
          />
          <CryptoItem
            name="Dogecoin"
            symbol="DOGE"
            img="https://assets.coingecko.com/coins/images/5/standard/dogecoin.png?1696501409"
            price={prices.dogecoin?.usd}
            change="3.7%"
            loading={loading}
          />
        </div>
      </div>
    </div>
  );
};

const CryptoItem = ({ name, symbol, img, price, change, loading }) => (
  <div className="text-white flex justify-between items-center gap-4 border-r border-gray-300 p-3">
    <div className="flex justify-center items-center gap-2">
      <div className="w-[20px] h-[20px] rounded-full overflow-hidden">
        <img src={img} alt={name} className="w-full h-full" />
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
