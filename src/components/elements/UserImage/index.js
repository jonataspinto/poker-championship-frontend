import React from "react";
import * as S from "./UserImageStyled";

export const UserImage = ({ src, ...props }) => (
  <S.UserImage
    src={src}
    alt="Imagem do usuário"
    // onError={(event) => {
    //   event.target.src = "./avatar.svg";
    // }}
    {...props}
  />
);
