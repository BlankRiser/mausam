import { Link, LinkProps } from "@tanstack/react-router";
import { MoveUpRight } from "lucide-react";
import { motion } from "motion/react";
import { Button } from "../ui/button";

export const InfoCard: React.FC<{
  name: string;
  value: string | number;
  linkValue?: LinkProps;
}> = ({ name, value, linkValue }) => {
  if (!value) {
    return null;
  }

  const animationKey = `${value}-${JSON.stringify(linkValue)}`;

  return (
    <div className="flex justify-between items-center px-4 py-2 rounded-sm bg-neutral-100 dark:bg-neutral-800">
      <div className="flex flex-col">
        <p className="text-xs text-neutral-500 dark:text-neutral-300">{name}</p>
        <motion.span
          key={animationKey}
          initial={{ opacity: 0, y: 5 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 5 }}
        >
          {value}
        </motion.span>
      </div>
      {!!linkValue && (
        <Button variant={"ghost"} asChild>
          <Link {...linkValue}>
            <MoveUpRight className="w-4 h-4 text-blue-500" />
          </Link>
        </Button>
      )}
    </div>
  );
};
