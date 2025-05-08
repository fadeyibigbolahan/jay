import { useState } from "react";
import { Link } from "react-router-dom";

import { close, menu } from "../assets";
import { navLinks } from "../constants";
import wallet from "../assets/wallet.png";

const Navbar = () => {
  const [active, setActive] = useState("Home");
  const [toggle, setToggle] = useState(false);

  return (
    <nav className="w-full flex p-6 px-12 justify-between items-center navbar">
      <Link to="#">
        <p className="text-blue-700 font-semibold text-lg cursor-pointer">
          Wallets
        </p>
      </Link>
      <img src={wallet} alt="wallet" className="h-[60px]" />
      <Link to="#">
        <p className="text-blue-700 font-semibold text-lg cursor-pointer">
          dApps
        </p>
      </Link>
    </nav>
  );
};

export default Navbar;
