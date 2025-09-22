import React from "react";
import InternalServerError from "./internal-server-error";
import Cookie from "./cookie";
import NoInternetConnection from "./no-internet-connection";

export default function Distractions() {
  return (
    <div>
      <Cookie showTime={3} stayTime={10} />
      <NoInternetConnection showTime={21} stayTime={10} />
      <InternalServerError showTime={60} stayTime={10} />
    </div>
  );
}
