import React from "react";
import * as S from "./ProfileStyled";
import { useSelector } from "react-redux";

export const Profile = () => {
  const {
    user,
    // isAuthenticated,
  } = useSelector((state) => state.userReducer);

  const {
    // uuid,
    points,
    email,
    name,
    photoURL,
    // dateBirth,
    // id
   } = user;

  return (
    <S.ProfileContainer>
      {/* <Head>
        <title>Profile</title>
      </Head> */}
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
      {/* <S.Row>
        <S.PhoneOutlined />
        <div>
          <S.Label>WHATSAPP</S.Label>
          <S.Text>{whatsapp}</S.Text>
        </div>
      </S.Row> */}
      {/* <S.Row>
        <S.UpdateOutlined />
        <div>
          <S.Label>Última atualização</S.Label>
          <S.Text>{updated_at && formatDate(updatedAt, "EEEE, dd 'de' MMMM 'de' yyyy")}</S.Text>
        </div>
      </S.Row> */}
    </S.ProfileContainer>
  );
};
