import { Outlet } from "react-router-dom";
import { MainBar } from "../../MainBar";
import { FC, ReactNode } from "react";

interface LayoutProps {
  children?: ReactNode;
}

export const Layout: FC<LayoutProps> = ({ children }) => {
  return (
    <>
      <MainBar />
      {children ? children : <Outlet />}
    </>
  );
};
