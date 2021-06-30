import styled from "styled-components";
import {
  EmailOutlined as iconEmail,
  PhoneOutlined as iconPhone,
  UpdateOutlined as iconUpdate,
  AccountBalanceWalletOutlined as wallet,
} from "@material-ui/icons/";
import { UserImage, Typography } from "../../components/elements";

export const ProfileContainer = styled.div`
  display: flex;
  flex-direction: column;
  padding-top: 20px;
`;

export const ProfileImage = styled(UserImage)`
  width: 80px;
  height: 80px;
  margin: ${(props) => props.theme?.margin?.small};
  border-radius: 50%;
`;

export const ProfileName = styled.p`
  font-family: Montserrat;
  font-weight: 600;
  color: ${(props) => props.theme.palette.primary.main};
  margin: ${(props) => props.theme.margin?.small};
  text-transform: capitalize;
`;

export const Row = styled.div`
  display: flex;
  width: 100%;
  justify-content: flex-start;
  align-items: center;
  padding: 15px 10px;
`;

export const Label = styled(Typography)`
  font-family: Montserrat;
  color: ${(props) => props.theme.palette.grey[500]};
  margin: ${(props) => props.theme.margin?.small};
  font-size: ${(props) => props.theme.typography.fontSize};
`;

export const EmailOutlined = styled(iconEmail)`
  color: ${(props) => props.theme.palette.primary.main};
  font-size: 20px;
`;

export const PointsWallet = styled(wallet)`
  color: ${(props) => props.theme.palette.primary.main};
  font-size: 20px;
`;

export const PhoneOutlined = styled(iconPhone)`
  color: ${(props) => props.theme.palette.primary.main};
  font-size: 20px;
`;

export const UpdateOutlined = styled(iconUpdate)`
  color: ${(props) => props.theme.palette.primary.main};
  font-size: 20px;
`;

export const Text = styled(Typography).attrs(() => ({
  variant: "h2",
}))`
  font-family: Roboto;
  margin: ${(props) => props.theme.margin?.small};
  font-weight: normal;
`;
