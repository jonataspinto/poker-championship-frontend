import React, { useState, useEffect } from "react";
import * as S from "./ProfileStyled";
import { Helmet } from "react-helmet";
import { IPlayer } from "../../shared/interfaces";
import { useAuth, useModal } from "../../contexts";
import { EditProfileModal } from "./Sections/EditProfileModal";
import { updatePlayerProfile } from "../../services/players";

export const Profile = () => {
  const [currentUserProfile, setCurrentUserProfile] = useState<IPlayer>({} as IPlayer)
  const { user } = useAuth();
  const { showModal } = useModal()

  const {
    points,
    email,
    name,
    photoURL,
  } = currentUserProfile;

  useEffect(() => {
    setCurrentUserProfile(user)
  }, [user])

  const actionsEditProfileModal = {
    agree: () => {updatePlayerProfile(currentUserProfile)},
    disAgree: () => setCurrentUserProfile(currentUserProfile)
  };

  return (
    <S.ProfileContainer>
      <Helmet>
        <title>{`Poker | ${name}`}</title>
      </Helmet>
      <S.ProfileImage
        src={photoURL}
        alt="Imagem do usuário"
        onClick={() => showModal(
          <EditProfileModal
            currentUserProfile={currentUserProfile}
            setCurrentUserProfile={setCurrentUserProfile}
          />
          ,
          actionsEditProfileModal
        )}
      />
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
