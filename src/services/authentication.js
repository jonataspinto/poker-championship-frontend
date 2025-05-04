import { firebaseAuthGoogle, googleProvider } from "./config";
import { createPlayer, getPlayerData } from "./players";

export const RefreshIdToken = async (callback) => {
  const response = {
    status: "failed",
  };

  const idToken = await firebaseAuthGoogle.currentUser?.getIdToken(true);

  if (idToken) {
    localStorage.setItem("idToken", JSON.stringify(idToken));
    response.status = "success";
  }

  callback(response);
};

export const LoginGoogle = async () => {
  let user;
  const result = await firebaseAuthGoogle.signInWithPopup(googleProvider);

  const {
    user: { displayName, photoURL, email, uid },
    credential: { accessToken },
    additionalUserInfo: { isNewUser },
  } = result;

  const idToken = await firebaseAuthGoogle.currentUser.getIdToken();

  if (isNewUser) {
    user = await createPlayer({
      name: displayName,
      displayName,
      photoURL,
      email,
      uuid: uid,
    });
  } else {
    user = await getPlayerData(email);
  }

  return {
    user,
    accessToken,
    idToken,
  };
};

export const LogOutGoogle = () => firebaseAuthGoogle.signOut();
