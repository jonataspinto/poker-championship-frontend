import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import IconButton from "@material-ui/core/IconButton";
import MenuIcon from "@material-ui/icons/Menu";
import { useLocation } from "react-router-dom";

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  title: {
    flexGrow: 1,
  },
  displayNoneHeader: {
    display: "none"
  }
}));

interface HeaderProps {
  setSideBar: Function,
  hiden: boolean
}

export const Header = ({ setSideBar, hiden, ...rest }: HeaderProps) => {
  const classes = useStyles();

  const { pathname } = useLocation();

  return (
    <AppBar position="sticky" {...rest} className={hiden ? classes.displayNoneHeader : ""}>
      <Toolbar>
        <IconButton
          edge="start"
          className={classes.menuButton}
          color="inherit"
          aria-label="menu"
          onClick={setSideBar()}
        >
          <MenuIcon />
        </IconButton>
        <Typography variant="h6" className={classes.title}>
          {(pathname === "/") ? "Classificação Geral" : pathname.replace("/", "").toUpperCase().replace("-", " ")}
        </Typography>
      </Toolbar>
    </AppBar>
  );
};
