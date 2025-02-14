"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import MainPage from "./main/page";

const page = () => {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const accessToken = localStorage.getItem("access_token");
    if (!accessToken) {
      router.push("/login");
    } else {
      setIsLoading(false);
    }
  }, [router]);

  if (isLoading) {
    return <div>Loading...</div>;
  }

  return <MainPage />;
};

export default page;
