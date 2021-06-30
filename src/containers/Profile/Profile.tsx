import React from "react";
import * as S from "./ProfileStyled";
import { useSelector } from "react-redux";
import { Helmet } from "react-helmet";
import { RootState } from "../../store";
import { IPlayer } from "../../shared/interfaces";
export const Profile = () => {
  const {
    user,
  } = useSelector((state: RootState) => state.userReducer);

  const {
    points,
    email,
    name,
    photoURL,
   } = user;

  return (
    <S.ProfileContainer>
      <Helmet>
        <title>{`Poker | ${user?.name}`}</title>
      </Helmet>
      <S.ProfileImage src={photoURL} alt="Imagem do usuário" />
      <S.ProfileName>{name}</S.ProfileName>
      <S.Row>
        <S.EmailOutlined />
        <div>
          <S.Label>E-MAIL</S.Label>
          <S.Text>{email}</S.Text>
        </div>
      </S.Row>
      <S.Row>
        <S.PointsWallet />
        <div>
          <S.Label>Pontos</S.Label>
          <S.Text>{points}</S.Text>
        </div>
      </S.Row>
    </S.ProfileContainer>
  );
};
