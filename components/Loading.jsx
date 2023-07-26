import React from "react";
import Image from "next/image";
import LoadingIcon from "../public/loading-bar.gif";

const Loading = () => {
  const loadingStyle = {
    width: 500,
    height: 300,
    display: "block",
    marginLeft: "auto",
    marginRight: "auto",
    position: "fixed",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)"
  };

  return (
    <>
      <Image style={loadingStyle} src={LoadingIcon} alt="load" />
    </>
  );
};

export default Loading;
