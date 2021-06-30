import React, { /* useState, */ useEffect } from "react";
import { /* Link, */ useHistory } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import {
  makeStyles,
  // Grid,
  // TextField,
  Button,
  // InputAdornment,
  // IconButton,
  Avatar,
  Typography,
} from "@material-ui/core";
// import {
//   Visibility,
//   VisibilityOff,
// } from "@material-ui/icons";
import { Google } from "styled-icons/boxicons-logos";
import { UserTie } from "styled-icons/fa-solid";

import { userActions } from "../../store/duks";

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
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
  google: {
    margin: theme.spacing(0, 0, 2),
  },
}));

const Login = () => {
  const classes = useStyles();
  const history = useHistory();
  const dispatch = useDispatch();

  const {
    user,
    isAuthenticated,
  } = useSelector((state) => state.userReducer);

  useEffect(() => {
    dispatch(userActions.get());
  }, [dispatch]);

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

  // const [showPassword, setShowPassword] = useState(false);

  return (
    <>
      <div className={classes.paper}>
        <Avatar className={classes.avatar}>
          <UserTie style={{ width: "100%" }} />
        </Avatar>
        <Typography component="h3" variant="h5">
          Faça login na sua conta
        </Typography>
        <form className={classes.form} noValidate>
          {/* <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            id="email"
            label="E-mail"
            name="email"
            autoComplete="email"
            autoFocus
          />
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            label="Senha"
            name="password"
            type={showPassword ? "text" : "password"}
            id="password"
            autoComplete="current-password"
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton
                    aria-label="toggle password visibility"
                    onClick={() => setShowPassword(!showPassword)}
                    onMouseDown={() => setShowPassword(!showPassword)}
                  >
                    {showPassword ? <Visibility /> : <VisibilityOff />}
                  </IconButton>
                </InputAdornment>
              ),
            }}
          />
          <Button
            variant="contained"
            size="medium"
            color="primary"
            margin="normal"
            fullWidth
            className={classes.submit}
          >
            fazer login
          </Button> */}
          <Button
            variant="contained"
            size="medium"
            color="secondary"
            margin="normal"
            fullWidth
            onClick={() => dispatch(userActions.authGoogle())}
            className={classes.google}
          >
            <Google style={{ width: "24px", marginRight: "10px" }} />
            login com google
          </Button>
          {/* <Grid container>
            <Grid item xs>
              <Link to="/">
                Esqueceu sua conta?
              </Link>
            </Grid>
            <Grid item>
              <Link to="/">
                Criar conta
              </Link>
            </Grid>
          </Grid> */}
        </form>
      </div>
    </>
  );
};

export default Login;
