import React from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import {
  Drawer,
  List,
  Divider,
  ListItem,
  ListItemText,
  ListItemIcon,
  Avatar,
  makeStyles,
} from "@material-ui/core";
import {
  ExitToApp,
  LockOpen,
  HomeOutlined,
  StyleOutlined,
  VerifiedUser,
} from "@material-ui/icons";
import { useAuth } from "../../../contexts";

const useStyles = makeStyles(() => ({
  list: {
    width: 250,
  },
  link: {
    display: "flex",
  },
  fullList: {
    width: "auto",
  },
}));

export const SideBar = ({ anchor, setAnchor }) => {
  const classes = useStyles();

  const {
    user,
    isAuthenticated,
    logoutGoogle,
  } = useAuth();

  const list = () => (
    <div
      className={classes.list}
      role="presentation"
      onClick={setAnchor()}
      onKeyDown={setAnchor()}
    >
      <List>
        {user?.name && (
          <ListItem button>
            <Link to="/meu-perfil" className={classes.link}>
              <ListItemIcon>
                <Avatar
                  src={user?.photoURL && user?.photoURL}
                  alt={`imagem de ${user?.name}`}
                  imgProps={{
                    style: {
                      borderRadius: "50%",
                    },
                  }}
                >
                  {!user?.photoURL && <VerifiedUser style={{ width: "100%" }} />}
                </Avatar>
              </ListItemIcon>
              <ListItemText primary={user?.name} />
            </Link>
          </ListItem>
        )}

        <ListItem button>
          <Link to="/" className={classes.link}>
            <ListItemIcon>
              <HomeOutlined />
            </ListItemIcon>
            <ListItemText primary="Classificação" />
          </Link>
        </ListItem>

        <ListItem button>
          <Link to="/rodadas" className={classes.link}>
            <ListItemIcon>
              <StyleOutlined />
            </ListItemIcon>
            <ListItemText primary="Rodadas" />
          </Link>
        </ListItem>

        <Divider />

        {(user && isAuthenticated)
          ? (
            <ListItem button onClick={() => logoutGoogle()}>
              <ListItemIcon>
                <ExitToApp />
              </ListItemIcon>
              <ListItemText primary="Sair" />
            </ListItem>
          )
          : (
            <ListItem button>
              <Link to="/login" className={classes.link}>
                <ListItemIcon>
                  <LockOpen />
                </ListItemIcon>
                <ListItemText primary="Fazer Login" />
              </Link>
            </ListItem>
          )}
      </List>
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
