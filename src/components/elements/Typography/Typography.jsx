import React from "react";
import * as S from "./TypographyStyled";

export const Typography = ({
  children,
  weight,
  italic = false,
  muted = false,
  variant = "body1",
  ...otherStyles
}) => {
  const Element = S.Typographies[variant];

  if (!children) return <></>;

  return (
    <Element weight={weight} italic={italic} muted={muted} {...otherStyles}>
      {children}
    </Element>
  );
};
