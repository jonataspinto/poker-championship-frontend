import Image from "next/image";
import Link, { LinkProps } from "next/link";
import { twMerge } from "tailwind-merge";

export function BrandLogo({
  model = "default",
  className,
  ...restProps
}: Omit<LinkProps, "href"> & {
  model?: "default" | "minified" | "minimalist";
  className?: string;
} = {}) {
  const src = {
    default: "/images/logo/default.png",
    minified: "/images/logo/minified.png",
    minimalist: "/images/logo/minimalist.png"
  };

  return (
    <Link
      href="/"
      className={twMerge("relative h-[80px] w-[80px]", className)}
      {...restProps}
    >
      <Image src={src[model]} alt="Brand Logo" fill className="object-cover" />
    </Link>
  );
}
