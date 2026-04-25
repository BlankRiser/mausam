import { Tooltip as RadixTooltip } from 'radix-ui';
import { Button } from '@/components/ui/button';
import { Tooltip, TooltipContent, TooltipTrigger } from '@/components/ui/tooltip';
import { variables } from '@/data/variables';
import { cn } from '@/lib/utils';
import { useCurrentState } from '@/store/station.store';

export const VariableSelector = () => {
  const { currentVariable, setCurrentVariable } = useCurrentState();

  const handleVariableClick = (variable: (typeof variables)[number]) => {
    setCurrentVariable(variable.value);
  };

  return (
    <div className='flex rounded-lg bg-neutral-50/50 bg-clip-padding text-black shadow-md backdrop-blur-md backdrop-filter dark:bg-neutral-900 dark:text-white'>
      {variables.map((variable) => {
        return (
          <div key={variable.label} className='p-1'>
            <Tooltip delayDuration={0}>
              <TooltipTrigger asChild>
                <Button
                  variant='ghost'
                  size='icon'
                  onClick={() => handleVariableClick(variable)}
                  className={cn([
                    'grid place-items-center hover:shadow-xs',
                    variable.value === currentVariable &&
                      'bg-blue-500 shadow-xs dark:bg-blue-900 [&_svg]:text-white [&_svg]:hover:text-blue-500 [&_svg]:dark:hover:text-white',
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
