import { Tooltip as RadixTooltip } from "radix-ui";
import { Button } from "@/components/ui/button";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { variables } from "@/data/variables";
import { cn } from "@/lib/utils";
import { useCurrentState } from "@/store/station.store";

export const VariableSelector = () => {
  const { currentVariable, setCurrentVariable } = useCurrentState();

  const handleVariableClick = (variable: (typeof variables)[number]) => {
    setCurrentVariable(variable.value);
  };

  return (
    <div className="flex bg-clip-padding backdrop-filter backdrop-blur-md rounded-lg text-black bg-neutral-50/50 dark:bg-neutral-900 shadow-md dark:text-white">
      {variables.map((variable) => {
        return (
          <div key={variable.label} className="p-1">
            <Tooltip delayDuration={0}>
              <TooltipTrigger asChild>
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => handleVariableClick(variable)}
                  className={cn([
                    "grid place-items-center hover:shadow-xs",
                    variable.value === currentVariable &&
                      "bg-neutral-100 shadow-xs dark:bg-neutral-900",
                  ])}
                >
                  {variable.icon}
                </Button>
              </TooltipTrigger>
              <RadixTooltip.Portal>
                <TooltipContent>
                  <p>{variable.label}</p>
                </TooltipContent>
              </RadixTooltip.Portal>
            </Tooltip>
          </div>
        );
      })}
    </div>
  );
};
