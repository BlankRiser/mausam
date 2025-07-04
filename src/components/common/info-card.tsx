import { Link, LinkProps } from "@tanstack/react-router";
import { MoveUpRight } from "lucide-react";
import { Button } from "../ui/button";

export const InfoCard: React.FC<{
  name: string;
  value: string | number;
  linkValue?: LinkProps;
}> = ({ name, value, linkValue }) => {
  return (
    <div className="flex justify-between items-center px-4 py-2 rounded-sm bg-neutral-100 dark:bg-neutral-800">
      <div className="flex flex-col">
        <p className="text-xs text-neutral-500 dark:text-neutral-300">{name}</p>
        <span>{value}</span>
      </div>
      {!!linkValue && (
        <Button variant={"ghost"} asChild>
          <Link
            {...linkValue}
          >
            <MoveUpRight className="w-4 h-4 text-blue-500" />
          </Link>
        </Button>
      )}
    </div>
  );
};
