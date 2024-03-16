import React, { useEffect, useState } from "react";
import S from "./Style";

interface LayoutProps {
  children: React.ReactNode;
}

const Layout = ({ children }: LayoutProps) => {
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);

  useEffect(() => {
    const handleResize = () => {
      setWindowWidth(window.innerWidth);
    };

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  useEffect(() => {
    if (windowWidth >= 770) {
      throw new Error("모바일 화면에서만 사용 가능한 페이지입니다.");
    }
  }, [windowWidth]);

  return <S.Container>{children}</S.Container>;
};

export default Layout;
