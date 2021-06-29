import { firebaseAuthGoogle, googleProvider } from "./config";
import { api } from "./api";

export const register = async (player) => {
  const response = await api.post("users", { ...player });
  return response.data;
};

export const authenticate = async (data) => {
  const response = await api.get(
    "user-by-key",
    {
      params: {
        ...data,
      },
    },
  );

  return response.data;
};

// export const RefreshIdToken = (userId) => {

// };

export const GetStorageUser = () => {
  const user = JSON.parse(localStorage.getItem("user"));
  const accessToken = localStorage.getItem("accessToken");
  const idToken = localStorage.getItem("idToken").replaceAll("\"", "");
  if (user) {
    return { ...user, accessToken, idToken };
  }
  return null;
};

export const LoginGoogle = async () => {
  let validUser;
  const result = await firebaseAuthGoogle.signInWithPopup(googleProvider);

  const {
    user: {
      displayName,
      photoURL,
      email,
      uid,
    },
    credential: {
      accessToken,
    },
    additionalUserInfo: {
      isNewUser,
    },
  } = result;

  if (isNewUser) {
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
    });
  }

  const idToken = await firebaseAuthGoogle.currentUser.getIdToken();

  localStorage.setItem("user", JSON.stringify(validUser));
  localStorage.setItem("accessToken", JSON.stringify(accessToken));
  localStorage.setItem("idToken", JSON.stringify(idToken));

  return validUser;
};

export const LogOutGoogle = () => {
  firebaseAuthGoogle.signOut().then(() => {
    localStorage.removeItem("user");
    localStorage.removeItem("accessToken");
    localStorage.removeItem("idToken");
    document.location.reload(true);
  }).catch((error) => {
    console.log(error);
  });
};
