"use client";

import Image, { ImageProps } from "next/image";

export function Avatar({ ...props }: ImageProps) {
  return (
    <Image
      onError={(event: React.SyntheticEvent<HTMLImageElement, Event>) => {
        (event.target as HTMLImageElement).src =
          `/api/user-image?name=${props?.title}`;
      }}
      fill
      {...props}
      alt={props.alt || "User avatar"}
    />
  );
}
