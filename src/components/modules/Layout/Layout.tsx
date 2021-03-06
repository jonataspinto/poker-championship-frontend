import React, { useEffect, useState, SyntheticEvent, ReactNode } from "react";
import { Container, Snackbar } from "@material-ui/core";
import { useLocation } from "react-router-dom";
import { Header } from "../Header";
import { Toast } from "../../elements/Toast/Toast";
import { SideBar } from "..";

interface LayoutProps {
  children: ReactNode
}

export const Layout = ({ children }: LayoutProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const [openToast, setOpenToast] = useState(false);
  const notify = {
    message: "",
    type: "success"
  }

  const { pathname } = useLocation();

  const toggleDrawer = () => (event: any) => {
    if (event.type === "keydown" && (event.key === "Tab" || event.key === "Shift")) {
      return;
    }

    setIsOpen(!isOpen);
  };

  function handleClose(event?: SyntheticEvent, reason?: string) {
    if (reason === "clickaway") {
      return;
    }

    setOpenToast(false);
  }

  useEffect(() => {
    if(notify?.message){
      setOpenToast(true)
    }
  }, [notify])

  return (
    <>
      <Header setSideBar={toggleDrawer} hiden={(pathname === "/login")}/>
      <Container
        component="main"
        maxWidth={(pathname === "/login") ? "xs" : "lg"}
        style={{ paddingTop: "20px", paddingBottom: "20px" }}
      >
        {children}
        <SideBar anchor={isOpen} setAnchor={toggleDrawer} />
      </Container>
      <Snackbar
        anchorOrigin={{
          vertical: "bottom",
          horizontal: "center",
        }}
        open={openToast}
        autoHideDuration={3000}
        onClose={handleClose}
      >
        <Toast
          onClose={handleClose}
          variant={notify?.type as "success" | "warning" | "error" | "info"}
          message={notify?.message}
        />
      </Snackbar>
    </>
  );
}
