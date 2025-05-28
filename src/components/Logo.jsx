import React from "react";
import { useNavigate } from "react-router-dom";
function Logo({ width = "100px" }) {
  const navigate = useNavigate();
  return (
    <div className="flex flex-wrap items-center m-2 ">
      <img
        src="/icon.svg"
        width={width}
        onClick={() => navigate("/")}
        className="mr-2 hover:shadow-sm shadow-md shadow-gray-700 rounded-xl duration-100"
      />
      <h1 className="text-2xl font-bold">
        MegaBlog
      </h1>
    </div>
  );
}

export default Logo;
