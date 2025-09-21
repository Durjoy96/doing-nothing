import React from "react";
import InternalServerError from "./internal-server-error";
import Cookie from "./cookie";

export default function Distractions() {
  return (
    <div>
      <Cookie showTime={3} stayTime={7} />
      <InternalServerError showTime={20} stayTime={7} />
    </div>
  );
}
