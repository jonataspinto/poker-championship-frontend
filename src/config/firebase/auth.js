import firebase from "./config";
import { register, authenticate } from "../../services";

export const Authenticated = () => {
  firebase.auth().onAuthStateChanged((user) => user || null);
};

export const GetStorageUser = () => {
  const user = localStorage.getItem("user");
  const accessToken = localStorage.getItem("accessToken");
  if (user) {
    return {...user, accessToken};
  }
  return null;
};

export const LoginGoogle = async () => {
  let validUser;
  const provider = new firebase.auth.GoogleAuthProvider();
  const result = await firebase.auth()
    .signInWithPopup(provider);

  const {
    user: {
      displayName,
      photoURL,
      email,
      uid
    },
    credential: {
      accessToken
    },
    additionalUserInfo: {
      isNewUser,
    }
  } = result;

  if(isNewUser) {
    validUser = await register({
      name: displayName,
      displayName,
      photoURL,
      email,
      uuid: uid,
    });
  } else {
    validUser = await authenticate({
      key: "email",
      value: email,
    })
  }

  localStorage.setItem("user", JSON.stringify(validUser));
  localStorage.setItem("accessToken", JSON.stringify(accessToken));

  return validUser;
};

export const LogOutGoogle = () => {
  firebase.auth().signOut().then(() => {
    localStorage.removeItem("user");
    localStorage.removeItem("accessToken");
    document.location.reload(true);
  }).catch((error) => {
    console.log(error);
  });
};
