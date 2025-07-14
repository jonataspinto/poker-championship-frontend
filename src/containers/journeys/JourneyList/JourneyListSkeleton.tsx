import { ComponentProps } from "react";

import { twMerge } from "tailwind-merge";

function Skeleton({
  className,
  ...restProps
}: ComponentProps<"div"> & { iconClassName?: string }) {
  return (
    <div
      className={twMerge([
        "flex gap-4 justify-between items-center w-full animate-pulse",
        className
      ])}
      {...restProps}
    >
      <div>
        <p className="w-32 h-6 bg-gray-600 rounded mb-2"></p>
        <p className="w-48 h-4 bg-gray-700 rounded"></p>
      </div>
      <div className="w-4 h-4 bg-gray-600 rounded" />
    </div>
  );
}

export function JourneyListSkeleton() {
  return (
    <>
      <Skeleton />
      <Skeleton />
      <Skeleton />
      <Skeleton />
      <Skeleton />
    </>
  );
}
