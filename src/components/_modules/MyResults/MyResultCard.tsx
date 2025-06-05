import Image, { ImageProps } from "next/image";
import { ComponentProps } from "react";
import { twMerge } from "tailwind-merge";

function IconWrapper({ className, ...restProps }: ComponentProps<"div">) {
  return (
    <div
      className={twMerge(
        "flex items-center justify-center rounded-lg w-12 h-12 bg-gray-700 animate-fadeId",
        className
      )}
      {...restProps}
    />
  );
}

function Icon({ alt, src, ...restProps }: ImageProps) {
  return <Image alt={alt} src={src} width={24} height={24} {...restProps} />;
}

function Container({ className, ...restProps }: ComponentProps<"div">) {
  return (
    <div
      className={twMerge(["flex gap-4 items-center", className])}
      {...restProps}
    />
  );
}

function Details({ className, ...restProps }: ComponentProps<"div">) {
  return (
    <div className={twMerge(["animate-fadeId", className])} {...restProps} />
  );
}

function Title({ className, ...restProps }: ComponentProps<"h3">) {
  return (
    <h3
      className={twMerge([
        "text-base font-semibold text-white font-sans",
        className
      ])}
      {...restProps}
    />
  );
}

function Description({ className, ...restProps }: ComponentProps<"p">) {
  return (
    <p
      className={twMerge(["text-sm font-light text-[#9EADBF]", className])}
      {...restProps}
    />
  );
}

function Skeleton() {
  return (
    <div className="flex gap-4 items-center animate-pulse">
      <div className="rounded-lg w-12 h-12 bg-gray-700"></div>
      <div>
        <p className="w-32 h-6 bg-gray-700 rounded mb-2"></p>
        <p className="w-20 h-4 bg-gray-600 rounded"></p>
      </div>
    </div>
  );
}

export const MyResultCard = {
  Container,
  IconWrapper,
  Icon,
  Details,
  Title,
  Description,
  Skeleton
};
