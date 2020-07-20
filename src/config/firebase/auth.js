import firebase from "./config";

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
  } = result.user;

  localStorage.setItem("user", JSON.stringify({
    displayName,
    photoURL,
    email,
  }));

  return {
    displayName,
    photoURL,
    email,
  };
};

export const LogOutGoogle = () => {
  firebase.auth().signOut().then(() => {
    localStorage.removeItem("user");
    document.location.reload(true);
  }).catch((error) => {
    console.log(error);
  });
};
