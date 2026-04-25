import { cn } from '@/lib/utils';

type DrawerProps = React.ComponentProps<'div'> & {
  label?: string;
};

export const DeniedAccess = ({
  label = 'You do not have permission to view this content.',
  className,
  ...props
}: DrawerProps) => {
  return (
    <div className={cn(['grid h-full place-items-center rounded-md bg-muted p-2', className])} {...props}>
      <span>{label}</span>
    </div>
  );
};
