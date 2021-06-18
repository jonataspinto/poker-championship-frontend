import styled, { css } from "styled-components";

const mutedStyle = () => css`
  color: ${(props) => props.theme.palette.text.disabled};
`;

const h1 = styled.h1`
  font-size: ${(props) => props.theme.typography.h1?.fontSize};
  color: ${(props) => props.color || props.theme.palette.text.primary};
  font-family: ${(props) =>
    `${props.theme.typography.h1?.fontFamily}${props?.weight || ""}${
      props?.italic ? "Italic" : ""
    }`};
  ${(props) => props.muted && mutedStyle()}
`;

const h2 = styled.h2`
  font-size: ${(props) => props.theme.typography.h2?.fontSize};
  color: ${(props) => props.color || props.theme.palette.text.primary};
  font-family: ${(props) =>
    `${props.theme.typography.h2?.fontFamily}${props?.weight || ""}${
      props?.italic ? "Italic" : ""
    }`};
  ${(props) => props.muted && mutedStyle()}
`;

const body1 = styled.p`
  font-size: ${(props) => props.theme.typography.body1?.fontSize};
  color: ${(props) => props.color || props.theme.palette.text.secondary};
  font-family: ${(props) =>
    `${props.theme.typography.body1?.fontFamily}${props?.weight || ""}${
      props?.italic ? "Italic" : ""
    }`};
  ${(props) => props.muted && mutedStyle()}
`;

const body2 = styled.p`
  font-size: ${(props) => props.theme.typography.body2?.fontSize};
  color: ${(props) => props.color || props.theme.palette.text.secondary};
  font-family: ${(props) =>
    `${props.theme.typography.body2?.fontFamily}${props?.weight || ""}${
      props?.italic ? "Italic" : ""
    }`};
  ${(props) => props.muted && mutedStyle()}
`;

const Typographies = {
  h1,
  h2,
  body1,
  body2,
};

export { Typographies };
