import { firebaseStorage } from "./config";

export const uploadFile = async (storageRef, file, setUploadProgress, callBack) => {
  const uploadTask = firebaseStorage
    .ref(`${storageRef}/${file.name}`)
    .put(file);

  uploadTask.on(
    "state_changed",
    (snapshot) => {
      const progress = Math.round(
        (snapshot.bytesTransferred / snapshot.totalBytes) * 100,
      );

      setUploadProgress(progress);
    },
    (error) => {
      console.error(error);
    },
    async () => {
      const responseUrlData = await firebaseStorage
        .ref(storageRef)
        .child(file.name)
        .getDownloadURL();

      callBack(responseUrlData);
    },
  );
};
