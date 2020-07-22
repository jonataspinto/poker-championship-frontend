import React from "react";
import PropTypes from "prop-types";
import { useHistory } from "react-router-dom";
import { makeStyles } from "@material-ui/core/styles";
import {
  Drawer,
  List,
  Divider,
  ListItem,
  ListItemText,
} from "@material-ui/core";
import { ExitToApp, LockOpen } from "@material-ui/icons";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import { useDispatch, useSelector } from "react-redux";
import { userActions } from "../../../store/duks";

const useStyles = makeStyles({
  list: {
    width: 250,
  },
  fullList: {
    width: "auto",
  },
});

const SideBar = ({ anchor, setAnchor }) => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const history = useHistory();
  const {
    user,
    isAuthenticated,
  } = useSelector((state) => state.userReducer);

  const list = () => (
    <div
      className={classes.list}
      role="presentation"
      onClick={setAnchor()}
      onKeyDown={setAnchor()}
    >
      <List>
        {(user && isAuthenticated)
          ? (
            <ListItem button onClick={() => dispatch(userActions.logoutGoogle())}>
              <ListItemIcon>
                <ExitToApp />
              </ListItemIcon>
              <ListItemText primary="Sair" />
            </ListItem>
          )
          : (
            <ListItem button onClick={() => history.push("/login")}>
              <ListItemIcon>
                <LockOpen />
              </ListItemIcon>
              <ListItemText primary="Fazer Login" />
            </ListItem>
          )}
      </List>
      <Divider />
    </div>
  );

  return (
    <>
      <Drawer
        anchor="left"
        open={anchor}
        onClose={setAnchor()}
      >
        {list("left")}
      </Drawer>
    </>
  );
};

SideBar.propTypes = {
  anchor: PropTypes.bool.isRequired,
  setAnchor: PropTypes.func.isRequired,
};

export default SideBar;
