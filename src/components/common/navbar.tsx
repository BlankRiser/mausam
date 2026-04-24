import { Link } from '@tanstack/react-router';
import { Button } from '../ui/button';
import { Moon, Sun } from '@/assets/icons';
import { useTheme } from '@/hooks/use-theme';

export const Navbar = () => {
  const { theme, setTheme } = useTheme();

  const toggleTheme = () => {
    setTheme(theme === 'light' ? 'dark' : 'light');
  };

  return (
    <nav className='w-full border-b border-b-neutral-100 dark:border-b-neutral-900 '>
      <div className='mx-auto flex max-w-7xl items-center justify-between p-1 '>
        <Link
          to='/'
          viewTransition={{ types: ['slide-left'] }}
          className='px-2 text-center text-lg font-semibold text-blue-600 dark:text-blue-400 '
        >
          Mausam
        </Link>
        <div className='flex items-center gap-2'>
          <Link
            to='/networks'
            className='px-2 text-sm text-neutral-700 hover:text-blue-600 dark:text-neutral-300 dark:hover:text-blue-400'
            activeProps={{
              className:
                'underline underline-offset-4 data-[status=active]:text-blue-600 data-[status=active]:dark:text-blue-400',
            }}
            viewTransition={{ types: ['slide-right'] }}
          >
            Networks
          </Link>
          <Link
            to='/station'
            className='px-2 text-sm text-neutral-700 hover:text-blue-600 dark:text-neutral-300 dark:hover:text-blue-400'
            activeProps={{
              className:
                'underline underline-offset-4 data-[status=active]:text-blue-600 data-[status=active]:dark:text-blue-400',
            }}
            viewTransition={{ types: ['slide-right'] }}
          >
            Stations
          </Link>
          <Button size='icon' variant={'ghost'} onClick={toggleTheme}>
            {theme === 'light' ? <Sun /> : <Moon />}
          </Button>
        </div>
      </div>
    </nav>
  );
};
