import { cn } from "@/lib/utils";

type DrawerProps = React.ComponentProps<"div"> & {
  label?: string;
};

export const DeniedAccess = ({
  label = "You do not have permission to view this content.",
  className,
  ...props
}: DrawerProps) => {
  return (
    <div
      className={cn([
        "p-2 bg-muted rounded-md h-full grid place-items-center",
        className,
      ])}
      {...props}
    >
      <span>{label}</span>
    </div>
  );
};
