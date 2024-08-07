import { useNavigate } from 'react-router-dom';
import { toast } from '@/components/ui/use-toast';
import { useContext } from 'react';
import { ThemeContext } from '@/context/ThemeContext';
import { AiFillMoon } from "react-icons/ai";
import { IoSunny } from "react-icons/io5";
import { HiUserCircle } from 'react-icons/hi';
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
    DropdownMenuShortcut,
} from "@/components/ui/dropdown-menu";

export function Navbar() {

  const navigate = useNavigate();

  const handleLogout = async () => {
      try {
          localStorage.removeItem('token');
          navigate('/');
      } catch (error) {
          toast({
              variant: 'destructive',
              title: 'Erro ao sair',
              description: 'Ocorreu um problema ao sair. Tente novamente mais tarde, se persistir contate o suporte!',
          });
      }
  };

  const themeContext = useContext(ThemeContext);

  if (!themeContext) {
      throw new Error('ThemeContext must be used within a ThemeProvider');
  }

  const { isDarkMode, toggleDarkMode } = themeContext;
  
  return(
    <nav className="flex justify-between items-center p-2">
        <button onClick={toggleDarkMode} className="p-2 bg-zinc-600 ms-auto rounded-full  dark:bg-gray-800">

            {isDarkMode ? <IoSunny className='text-yellow-200 text-2xl'/> :  <AiFillMoon className='text-2xl  text-gray-50' /> 
            }
        </button>
        <DropdownMenu>
            <DropdownMenuTrigger>
                <HiUserCircle className='hover:text-slate-600 text-5xl' />
            </DropdownMenuTrigger>
            <DropdownMenuContent>
                <DropdownMenuLabel>Minha conta</DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem>Perfil</DropdownMenuItem>
                <DropdownMenuItem  onClick={handleLogout}>
                    Sair
                    <DropdownMenuShortcut>⇧⌘Q</DropdownMenuShortcut>
                </DropdownMenuItem>
            </DropdownMenuContent>
        </DropdownMenu>
    </nav>
  )
}