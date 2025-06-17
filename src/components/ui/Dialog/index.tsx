import { ComponentProps, forwardRef } from "react";
import { twMerge } from "tailwind-merge";
import { Overlay } from "../Overlay";
import { ClientOnlyPortal } from "../ClientOnlyPortal";

function DialogRoot({
  className,
  usePortal = false,
  selector = "#modal",
  ...restProps
}: ComponentProps<"div"> & { usePortal?: boolean; selector?: string }) {
  const classes = twMerge(
    "items-end lg:justify-end backdrop-blur-[2px]",
    "lg:grid lg:grid-cols-12 ",
    className
  );

  if (usePortal) {
    return (
      <ClientOnlyPortal selector={selector}>
        <Overlay className={classes} {...restProps} />
      </ClientOnlyPortal>
    );
  }

  return <Overlay className={classes} {...restProps} />;
}

const DialogContainer = forwardRef<HTMLDivElement, ComponentProps<"div">>(
  ({ className, ...restProps }, ref) => {
    return (
      <div
        ref={ref}
        className={twMerge([
          "bg-white",
          "lg:col-start-9 lg:col-end-13",
          "grid grid-cols-4 grid-rows-[auto_1fr_auto] gap-4",
          "sm:grid-cols-8 lg:grid-cols-1",
          "p-4 md:px-8",
          "h-fit min-h-fit max-h-[80vh] lg:max-h-full lg:h-screen",
          "w-full max-w-full",
          "rounded-2xl max-lg:rounded-b-none lg:rounded-br-none lg:rounded-tr-none",
          className
        ])}
        {...restProps}
      />
    );
  }
);

const DialogHeader = ({ className, ...restProps }: ComponentProps<"div">) => {
  return (
    <div
      className={twMerge([
        "flex items-center justify-between",
        "col-span-4 sm:col-span-8",
        "sm:col-start-2 sm:col-end-8",
        "lg:col-start-1 lg:col-end-9",
        "sticky top-0",
        className
      ])}
      {...restProps}
    />
  );
};

const DialogTitle = ({ className, ...restProps }: ComponentProps<"h3">) => (
  <h3 className={twMerge(["text-3xl", className])} {...restProps} />
);

const DialogCloseButton = ({
  children,
  ...restProps
}: ComponentProps<"button">) => (
  <button type="button" {...restProps}>
    {children || "X"}
  </button>
);

const DialogContent = ({ className, ...restProps }: ComponentProps<"div">) => (
  <div
    className={twMerge([
      "flex flex-col items-center overflow-hidden",
      "col-span-4 sm:col-span-8",
      "sm:col-start-2 sm:col-end-8",
      "lg:col-start-1 lg:col-end-9",
      className
    ])}
    {...restProps}
  />
);

const DialogActions = ({ className, ...restProps }: ComponentProps<"div">) => (
  <div
    className={twMerge([
      "flex flex-col w-full gap-3 mt-auto",
      "col-span-4 sm:col-span-8",
      "sm:col-start-2 sm:col-end-8",
      "lg:col-start-1 lg:col-end-9",
      "border-t border-solid border-neutral-light",
      className
    ])}
    {...restProps}
  />
);

DialogContainer.displayName = "DialogContainer";

export const Dialog = {
  Root: DialogRoot,
  Container: DialogContainer,
  Header: DialogHeader,
  Title: DialogTitle,
  CloseButton: DialogCloseButton,
  Content: DialogContent,
  Actions: DialogActions
};
