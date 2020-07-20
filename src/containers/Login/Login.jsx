import React from "react";
// import PropTypes from "prop-types";
import {
  makeStyles,
  Grid,
  TextField,
  Button,
} from "@material-ui/core";

const useStyles = makeStyles(() => ({
  root: {
    "& > *": {
      maxWidth: "55ch",
      width: "100%",
      desplay: "inline-flex",
      justifyContent: "center",
      alignItems: "center",
    },
  },
  container: {
    height: "100%",
    paddingTop: "100px",
  },
}));

const Login = () => {
  const classes = useStyles();

  return (
    <>
      <Grid
        container
        direction="column"
        justify="center"
        alignItems="center"

        className={classes.container}
      >
        <form noValidate autoComplete="off" style={{ height: "100%" }}>
          <TextField
            id="email"
            label="E-mail"
            variant="outlined"
            fullWidth
            type="email"
          />
          <TextField
            id="password"
            label="Senha"
            variant="outlined"
            margin="normal"
            fullWidth
            type="password"
          />
          <Button
            variant="contained"
            size="medium"
            color="primary"
            margin="normal"
            fullWidth
          >
            Fazer Login
          </Button>
          <Button
            variant="contained"
            size="medium"
            fullWidth
            margin="normal"
          >
            Criar conta
          </Button>

        </form>
      </Grid>
    </>
  );
};

Login.propTypes = {

};

export default Login;
