import React, { useEffect } from "react";
import { useHistory } from "react-router-dom";
import {
  makeStyles,
  Button,
  Avatar,
  Typography,
} from "@material-ui/core";
import { Google } from "styled-icons/boxicons-logos";
import { UserTie } from "styled-icons/fa-solid";

import { Helmet } from "react-helmet";

import { useAuth } from "../../contexts";

const useStyles = makeStyles((theme) => ({
  avatar: {
    margin: theme.spacing(1),
    padding: theme.spacing(1),
    width: "60px",
    height: "60px",
  },
  paper: {
    marginTop: theme.spacing(8),
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },
  form: {
    width: "100%", // Fix IE 11 issue.
    marginTop: theme.spacing(1),
  },
  google: {
    margin: theme.spacing(0, 0, 2),
  },
}));

const Login = () => {
  const classes = useStyles();
  const history = useHistory();

  const {
    user,
    isAuthenticated,
    loginGoogle,
  } = useAuth();

  useEffect(() => {
    if (user && isAuthenticated) {
      const redirectPath = "/";

      history.push(redirectPath);
    }
  }, [
    user,
    isAuthenticated,
    history,
  ]);

  return (
    <>
      <Helmet>
        <title>Poker | Login</title>
      </Helmet>
      <div className={classes.paper}>
        <Avatar className={classes.avatar}>
          <UserTie style={{ width: "100%" }} />
        </Avatar>
        <Typography component="h3" variant="h5">
          Faça login na sua conta
        </Typography>
        <form className={classes.form} noValidate>
          <Button
            variant="contained"
            size="medium"
            color="secondary"
            margin="normal"
            fullWidth
            onClick={() => loginGoogle()}
            className={classes.google}
          >
            <Google style={{ width: "24px", marginRight: "10px" }} />
            login com google
          </Button>
        </form>
      </div>
    </>
  );
};

export default Login;
