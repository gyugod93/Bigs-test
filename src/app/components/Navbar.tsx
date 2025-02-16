"use client";

import { useEffect, useState } from "react";

type UserInfoProps = {
  username: string;
  name: string;
};

const Navbar = () => {
  const [userInfo, setUserInfo] = useState<UserInfoProps | null>(null);
  const router = useRouter();

  useEffect(() => {
    const accessToken = localStorage.getItem("access_token");
    if (accessToken) {
      const decodedToken = decodeJWT(accessToken);
      setUserInfo(decodedToken);
    }
  }, []);

  const handleLogout = () => {
    if (window.confirm("로그아웃 하시겠습니까?")) {
      localStorage.removeItem("access_token");
      localStorage.removeItem("refresh_token");
      setUserInfo(null);
      router.push("/login");
    }
  };

  return (
    <>
      <div>{userInfo?.username}</div>
      <div>{userInfo?.name}</div>{" "}
      <button
        onClick={handleLogout}
        className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600"
      >
        로그아웃
      </button>
    </>
  );
};

export default Navbar;

import React from "react";
import { decodeJWT } from "../utils/jwt";
import { useRouter } from "next/navigation";
