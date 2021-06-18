import firebase from "./config";
import { register, authenticate } from "../../services";

export const RefreshIdToken = (userId) => {

};

export const GetStorageUser = () => {
  const user = JSON.parse(localStorage.getItem("user"));
  const accessToken = localStorage.getItem("accessToken");
  const idToken = localStorage.getItem("idToken").replaceAll('"', "");
  if (user) {
    return {...user, accessToken, idToken};
  }
  return null;
};

export const LoginGoogle = async () => {
  let validUser;
  const provider = new firebase.auth.GoogleAuthProvider();
  const result = await firebase.auth().signInWithPopup(provider);

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

  const idToken = await firebase.auth().currentUser.getIdToken();

  localStorage.setItem("user", JSON.stringify(validUser));
  localStorage.setItem("accessToken", JSON.stringify(accessToken));
  localStorage.setItem("idToken", JSON.stringify(idToken));

  return validUser;
};

export const LogOutGoogle = () => {
  firebase.auth().signOut().then(() => {
    localStorage.removeItem("user");
    localStorage.removeItem("accessToken");
    localStorage.removeItem("idToken");
    document.location.reload(true);
  }).catch((error) => {
    console.log(error);
  });
};
