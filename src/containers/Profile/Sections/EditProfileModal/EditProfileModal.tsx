import React, { Dispatch, SetStateAction, useState } from "react"
import { DialogTitle, DialogContent, Divider, Box } from "@material-ui/core"
import { IPlayer } from "../../../../interfaces"
import { uploadFile } from "../../../../services"

interface EditProfileModalProps {
  currentUserProfile: IPlayer;
  setCurrentUserProfile: Dispatch<SetStateAction<IPlayer>>
}

export const EditProfileModal = ({ currentUserProfile, setCurrentUserProfile }: EditProfileModalProps) => {
  const [uploadProgress, setUploadProgrees] = useState<number>(0);
  console.log("currentUserProfile ::: ", currentUserProfile)
  console.log("uploadProgress =>>", uploadProgress)

  const handleSetProfileImage = async (file: any) => {
    const image = file.target.files[0];

    if(image) {
      await uploadFile(
        "images",
        image,
        setUploadProgrees,
        (url: string) => {
          setCurrentUserProfile((prevState) => ({
            ...prevState,
            photoURL: url
          }))
        }
      )
    }
  }

  return (
    <>
      <DialogTitle>
        Editar Perfil.
      </DialogTitle>
        <Divider />
      <DialogContent>
        <Box
          display="flex"
          flexWrap="wrap"
          gridGap={16}
        >
          <input
            placeholder="file file"
            type="file"
            onChange={handleSetProfileImage}
          />
        </Box>
      </DialogContent>
    </>
  );
}
