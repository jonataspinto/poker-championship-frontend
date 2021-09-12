import React, { useEffect, useState, ReactNode } from "react";
import { Container, Typography } from "@material-ui/core";
import { useLocation } from "react-router-dom";
import { Header } from "../Header";
import { SideBar } from "..";
import { useSeason } from "../../../contexts";

interface LayoutProps {
  children: ReactNode
}

export const Layout = ({ children }: LayoutProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const { season, seasons, loadOpenedSeason } = useSeason();

  const { pathname } = useLocation();

  const toggleDrawer = () => (event: any) => {
    if (event.type === "keydown" && (event.key === "Tab" || event.key === "Shift")) {
      return;
    }

    setIsOpen(!isOpen);
  };

  useEffect(() => {
    if(seasons.length) loadOpenedSeason()
  }, [
    loadOpenedSeason,
    seasons
  ])

  return (
    <>
      <Header setSideBar={toggleDrawer} hiden={(pathname === "/login")}/>
      <Container
        component="main"
        maxWidth={(pathname === "/login") ? "xs" : "lg"}
        style={{ paddingTop: "20px", paddingBottom: "20px" }}
      >
        <Typography
          variant="h5"
          style={{
            marginBottom: "24px"
          }}
        >
          {`Temporada #${season?.tag || ""} - Guaratiba Série A`}
        </Typography>
        {children}
        <SideBar anchor={isOpen} setAnchor={toggleDrawer} />
      </Container>
    </>
  );
}
