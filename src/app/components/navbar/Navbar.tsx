"use client";

import { useEffect, useState } from "react";
import { useRouter, usePathname } from "next/navigation";
import { decodeJWT } from "@/app/utils/auth/jwt";
import {
  NavContainer,
  NavContent,
  LeftSection,
  RightSection,
  UserInfo,
  LogoutButton,
  BackButton,
} from "./Navbar.styles";
import { Button } from "../common/CommonStyles";

type UserInfoProps = {
  username: string;
  name: string;
};

const Navbar = () => {
  const [userInfo, setUserInfo] = useState<UserInfoProps | null>(null);
  const router = useRouter();
  const pathname = usePathname();

  // 현재 경로가 게시글 상세 페이지인지 확인
  const isPostDetailPage = pathname?.startsWith("/post/");

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
    <NavContainer>
      <NavContent>
        <LeftSection>
          {isPostDetailPage && (
            <Button variant="secondary" onClick={() => router.back()}>
              뒤로가기
            </Button>
          )}
        </LeftSection>
        <RightSection>
          {userInfo && (
            <UserInfo>
              <span>{userInfo.name}</span>
              <span>({userInfo.username})</span>
            </UserInfo>
          )}
          <Button variant="danger" onClick={handleLogout}>
            로그아웃
          </Button>
        </RightSection>
      </NavContent>
    </NavContainer>
  );
};

export default Navbar;
