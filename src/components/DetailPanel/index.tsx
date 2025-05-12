import { twMerge } from "tailwind-merge";
import { ComponentProps } from "react";

const DetailPanelRoot = ({
  className,
  ...detailsProps
}: ComponentProps<"details">) => (
  <details
    className={twMerge("[&_summary>svg]:open:-rotate-90", className)}
    {...detailsProps}
  />
);

const DetailPanelSummary = ({
  className,
  ...summaryProps
}: ComponentProps<"summary">) => (
  <summary
    className={twMerge(
      "flex cursor-pointer list-none items-center justify-between gap-6 tracking-[-0.32px] py-2 font-bold",
      className
    )}
    {...summaryProps}
  />
);

const DetailPanelContent = ({ className, ...props }: ComponentProps<"div">) => (
  <div className={twMerge("mt-2", className)} {...props} />
);

export const DetailPanel = {
  Root: DetailPanelRoot,
  Summary: DetailPanelSummary,
  Content: DetailPanelContent
};
