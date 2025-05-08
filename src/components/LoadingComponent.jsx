import React from "react";

const LoadingComponent = ({ message = "Loading..." }) => {
  return (
    <div className="flex items-center justify-center min-h-screen bg-primary">
      <div className="flex flex-col items-center space-y-4">
        <div className="w-16 h-16 border-4 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
        <p className="text-lg text-gray-600">{message}</p>
      </div>
    </div>
  );
};

export default LoadingComponent;
