import React from "react";
import { issues, wallets } from "../constants";
import { useNavigate } from "react-router-dom";
import { FaArrowRightArrowLeft } from "react-icons/fa6";

const Issues = () => {
  const navigate = useNavigate();

  const handleIssueClick = () => {
    // Navigate to the wallet's page or perform any action you want
    navigate(`/wallet`);
    // console.log("issue", issue);
  };

  return (
    <div className="flex justify-center items-center w-full bg-[#15212A]">
      <div className="grid grid-cols-31sm:grid-cols-1 md:grid-cols-3 md:gap-10 gap-5 p-4 rounded-md">
        {issues.map((i) => {
          const Icon = i.img; // get the icon component
          return (
            <div
              key={i.id}
              onClick={() => handleIssueClick()}
              className="flex flex-row items-center bg-[#101920] p-2 justify-start md:gap-4 gap-1 rounded-xl shadow-md cursor-pointer transition duration-300 ease-in-out transform hover:scale-105"
            >
              <div className="flex justify-center items-center p-3 border-r border-gray-300 mb-1">
                {Icon && <Icon className="text-4xl text-white" />}
              </div>
              <div className="flex flex-col justify-start items-start gap-2 p-2">
                <span className="text-[20px] font-bold text-white">
                  {i.title}
                </span>
                <p className="text-white">{i.content}</p>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Issues;
