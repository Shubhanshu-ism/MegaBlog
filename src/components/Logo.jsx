import React from "react";
function Logo({ width = "100px" }) {

  return (
    <div className="flex flex-wrap items-center">
      <img src="/icon.svg" width={width} />
      <h1 className="text-2xl font-bold">MegaBlog</h1>
    </div>
  );
}

export default Logo;
