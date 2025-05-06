import React, { useState, ReactNode } from "react";
import { Container, Typography } from "@material-ui/core";
import { useLocation } from "react-router-dom";
import { Header } from "../Header";
import { SideBar } from "..";
import { useSeason } from "../../../contexts";

interface LayoutProps {
  children: ReactNode;
}

export const Layout = ({ children }: LayoutProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const { season } = useSeason();

  const { pathname } = useLocation();

  const toggleDrawer = () => (event: any) => {
    if (
      event.type === "keydown" &&
      (event.key === "Tab" || event.key === "Shift")
    ) {
      return;
    }

    setIsOpen(!isOpen);
  };

  return (
    <>
      <Header setSideBar={toggleDrawer} hidden={pathname === "/login"} />
      <Container
        component="main"
        maxWidth={pathname === "/login" ? "xs" : "lg"}
        style={{ paddingTop: "20px", paddingBottom: "20px" }}
      >
        <Typography variant="h5">Guaratiba Série A</Typography>
        <Typography
          variant="subtitle2"
          style={{
            marginBottom: "24px"
          }}
        >
          {season?.tag && `Temporada #${season?.tag}`}
        </Typography>
        {children}
        <SideBar anchor={isOpen} setAnchor={toggleDrawer} />
      </Container>
    </>
  );
};
