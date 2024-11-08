import { Button } from "@/components/ui/button";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { variables } from "@/data/variables";
import { cn } from "@/lib/utils";
import { useCurrentState } from "@/store/station.store";
import * as RadixTooltip from "@radix-ui/react-tooltip";

export const VariableSelector = () => {
  const { currentVariable, setCurrentVariable } = useCurrentState();

  const handleVariableClick = (variable: (typeof variables)[number]) => {
    setCurrentVariable(variable.value);
  };

  return (
    <div className="bg-clip-padding backdrop-filter backdrop-blur-md rounded-lg text-black bg-neutral-50/50 dark:bg-neutral-800/70 shadow-md dark:text-white">
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
                    "grid place-items-center hover:shadow-sm",
                    variable.value === currentVariable &&
                      "bg-neutral-100 shadow-sm",
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

export default VariableSelector;
