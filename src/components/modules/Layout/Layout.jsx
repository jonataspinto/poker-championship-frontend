import React, { useState } from "react";
import PropTypes from "prop-types";
import { Container } from "@material-ui/core";
import { useLocation } from "react-router-dom";
import Header from "../Header";
import { SideBar } from "..";

function Layout({ children }) {
  const [isOpen, setIsOpen] = useState(false);

  const { pathname } = useLocation();

  const toggleDrawer = () => (event) => {
    if (event.type === "keydown" && (event.key === "Tab" || event.key === "Shift")) {
      return;
    }

    setIsOpen(!isOpen);
  };

  return (
    <>
      <Header setSideBar={toggleDrawer} style={{ display: (pathname === "/login") && "none" }} />
      <Container
        component="main"
        maxWidth={(pathname === "/login") ? "xs" : "lg"}
        style={{ paddingTop: "20px", paddingBottom: "20px" }}
      >
        {children}
        <SideBar anchor={isOpen} setAnchor={toggleDrawer} />
      </Container>
    </>
  );
}

Layout.propTypes = {
  children: PropTypes.node.isRequired,
};

export default Layout;
