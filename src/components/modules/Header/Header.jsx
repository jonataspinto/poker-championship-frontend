import React from "react";
import PropTypes from "prop-types";
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
}));

const Header = ({ setSideBar, ...rest }) => {
  const classes = useStyles();

  const { pathname } = useLocation();

  return (
    <AppBar position="sticky" {...rest}>
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
          {(pathname === "/") ? "Home" : pathname.replace("/", "").toUpperCase()}
        </Typography>
      </Toolbar>
    </AppBar>
  );
};

Header.propTypes = {
  setSideBar: PropTypes.func,
};

export default Header;
