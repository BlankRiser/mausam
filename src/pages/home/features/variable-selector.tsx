import { Check, Ellipsis, Search } from 'lucide-react';
import { Tooltip as RadixTooltip } from 'radix-ui';
import { useMemo, useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { Tooltip, TooltipContent, TooltipTrigger } from '@/components/ui/tooltip';
import { getVariableIcon, variables } from '@/data/variables';
import { cn } from '@/lib/utils';
import { useGlobalDataStore } from '@/store/global-data.store';
import { useCurrentState } from '@/store/station.store';

interface VariableOption {
  key: string;
  label: string;
  unit?: string;
}

export const VariableSelector = () => {
  const currentVariable = useCurrentState((s) => s.currentVariable);
  const setCurrentVariable = useCurrentState((s) => s.setCurrentVariable);
  const variableLabels = useGlobalDataStore((s) => s.variableLabels);

  const [open, setOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');

  const allVariableOptions = useMemo<Array<VariableOption>>(() => {
    const entries = Object.entries(variableLabels);
    if (entries.length === 0) {
      return variables.map((v) => ({
        key: v.value,
        label: v.label,
      }));
    }

    return entries
      .map(([key, item]) => ({
        key,
        label: item?.long_name || key,
        unit: item?.unit,
      }))
      .sort((a, b) => a.label.localeCompare(b.label));
  }, [variableLabels]);

  const filteredVariables = useMemo(() => {
    const q = searchQuery.trim().toLowerCase();
    if (!q) return allVariableOptions;
    return allVariableOptions.filter(
      (item) =>
        item.label.toLowerCase().includes(q) ||
        item.key.toLowerCase().includes(q) ||
        (item.unit && item.unit.toLowerCase().includes(q))
    );
  }, [allVariableOptions, searchQuery]);

  const isPresetSelected = useMemo(
    () => variables.some((v) => v.value === currentVariable),
    [currentVariable]
  );

  const activeOverflowLabel = useMemo(() => {
    if (isPresetSelected) return 'More variables';
    return variableLabels[currentVariable as string]?.long_name ?? String(currentVariable);
  }, [isPresetSelected, variableLabels, currentVariable]);

  const handleSelectVariable = (variableKey: string) => {
    setCurrentVariable(variableKey);
    setOpen(false);
  };

  return (
    <div className='flex items-center rounded-lg bg-neutral-50/50 bg-clip-padding text-black shadow-md backdrop-blur-md backdrop-filter dark:bg-neutral-900 dark:text-white'>
      {variables.map((variable) => (
        <div key={variable.label} className='p-1'>
          <Tooltip delayDuration={0}>
            <TooltipTrigger asChild>
              <Button
                variant='ghost'
                size='icon'
                onClick={() => setCurrentVariable(variable.value)}
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
      ))}

      <div className='border-l border-neutral-200/60 p-1 dark:border-neutral-800'>
        <Popover open={open} onOpenChange={setOpen}>
          <Tooltip delayDuration={0}>
            <TooltipTrigger asChild>
              <PopoverTrigger asChild>
                <Button
                  variant='ghost'
                  size='icon'
                  aria-label='All weather variables'
                  className={cn([
                    'grid place-items-center hover:shadow-xs',
                    !isPresetSelected &&
                      'bg-blue-500 text-white shadow-xs dark:bg-blue-900 [&_svg]:text-white [&_svg]:hover:text-blue-500 [&_svg]:dark:hover:text-white',
                  ])}
                >
                  <Ellipsis className='size-5 text-neutral-800 dark:text-neutral-200' />
                </Button>
              </PopoverTrigger>
            </TooltipTrigger>
            <RadixTooltip.Portal>
              <TooltipContent>
                <p>{activeOverflowLabel}</p>
              </TooltipContent>
            </RadixTooltip.Portal>
          </Tooltip>

          <PopoverContent side='top' align='end' sideOffset={8} className='w-80 p-2 bg-secondary'>
            <div className='relative mb-2'>
              <Search className='pointer-events-none absolute top-1/2 left-2.5 size-4 -translate-y-1/2 text-muted-foreground' />
              <Input
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder='Search variables...'
                className='h-8 pl-8 text-xs'
              />
            </div>

            <div className='max-h-64 overflow-y-auto pr-0.5'>
              {filteredVariables.length === 0 ? (
                <p className='py-6 text-center text-xs text-muted-foreground'>No variables found.</p>
              ) : (
                <div className='flex flex-col gap-0.5'>
                  {filteredVariables.map((item) => {
                    const isSelected = item.key === currentVariable;
                    return (
                      <button
                        key={item.key}
                        type='button'
                        onClick={() => handleSelectVariable(item.key)}
                        className={cn(
                          'flex w-full items-center gap-2.5 rounded-sm px-2 py-1.5 text-left text-xs transition-colors hover:bg-neutral-300 dark:hover:bg-neutral-700',
                          isSelected &&
                            'bg-blue-100 font-medium text-blue-600 dark:bg-blue-900 dark:text-blue-400'
                        )}
                      >
                        <span className='flex size-5 shrink-0 items-center justify-center text-neutral-700 dark:text-neutral-300'>
                          {getVariableIcon(item.key)}
                        </span>
                        <div className='min-w-0 flex-1'>
                          <p className='truncate'>{item.label}</p>
                          <p className='truncate text-[10px] text-muted-foreground'>
                            {item.key}
                            {item.unit ? ` • ${item.unit}` : ''}
                          </p>
                        </div>
                        {isSelected && <Check className='size-3.5 shrink-0 text-blue-500' />}
                      </button>
                    );
                  })}
                </div>
              )}
            </div>
          </PopoverContent>
        </Popover>
      </div>
    </div>
  );
};
