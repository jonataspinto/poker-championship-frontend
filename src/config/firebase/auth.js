import firebase from "./config";
import { authentication } from "../../services";

export const Authenticated = () => {
  firebase.auth().onAuthStateChanged((user) => user || null);
};

export const GetStorageUser = () => {
  const user = localStorage.getItem("user");
  if (user) {
    return user;
  }
  return null;
};

export const LoginGoogle = async () => {
  const provider = new firebase.auth.GoogleAuthProvider();
  const result = await firebase.auth()
    .signInWithPopup(provider);

  const {
    displayName,
    photoURL,
    email,
    uid,
  } = result.user;

  const validUser = await authentication({
    displayName,
    photoURL,
    email,
    uid,
  });

  // console.log("dados google", result);
  // console.log("dados da api", validUser);

  localStorage.setItem("user", JSON.stringify(validUser));

  return validUser;
};

export const LogOutGoogle = () => {
  firebase.auth().signOut().then(() => {
    localStorage.removeItem("user");
    document.location.reload(true);
  }).catch((error) => {
    console.log(error);
  });
};
