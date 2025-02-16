"use client";

import { useEffect, useState } from "react";

type UserInfoProps = {
  username: string;
  name: string;
};

const Navbar = () => {
  const [userInfo, setUserInfo] = useState<UserInfoProps | null>(null);

  useEffect(() => {
    const accessToken = localStorage.getItem("access_token");
    if (accessToken) {
      const decodedToken = decodeJWT(accessToken);
      console.log("디코딩JWT 체크", decodedToken);
      setUserInfo(decodedToken);
    }
  }, []);

  console.log("useInfo", userInfo);

  return (
    <>
      <div>{userInfo?.username}</div>
      <div>{userInfo?.name}</div>
    </>
  );
};

export default Navbar;

import React from "react";
import { decodeJWT } from "../utils/jwt";
