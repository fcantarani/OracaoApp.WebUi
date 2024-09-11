import { Link } from "react-router-dom";
import DrawerMenuComponent from "../DrawerMenu";
import ThemeToggleComponent from "../ThemeToggle";
import { useAuth } from "@/hooks/AuthHook";
import { MdOutlineExitToApp } from "react-icons/md";

export default function HeaderComponent() {
  const auth = useAuth();

  return (
    <div className="flex h-16 w-full items-center justify-between bg-primary px-4 text-primary-foreground">
      <div className="md:hidden">
        <DrawerMenuComponent />
      </div>
      <h1>Oracao</h1>
      <div className="hidden items-center gap-8 text-[0.85rem] md:flex">
        <span className="hover:cursor-pointer hover:rounded-md hover:bg-secondary/25 hover:px-2 hover:py-1 hover:text-secondary-foreground">
          <Link to="/home">Home</Link>
        </span>
        <span className="hover:cursor-pointer hover:rounded-md hover:bg-secondary/25 hover:px-2 hover:py-1 hover:text-secondary-foreground">
          Orando por...
        </span>
        <span className="hover:cursor-pointer hover:rounded-md hover:bg-secondary/25 hover:px-2 hover:py-1 hover:text-secondary-foreground">
          <Link to="/my-prayers">Minhas orações</Link>
        </span>
        <span className="hover:cursor-pointer hover:rounded-md hover:bg-secondary/25 hover:px-2 hover:py-1 hover:text-secondary-foreground">
          Testemunhos
        </span>
        <span className="hover:cursor-pointer hover:rounded-md hover:bg-secondary/25 hover:px-2 hover:py-1 hover:text-secondary-foreground">
          Administração
        </span>
      </div>
      <div className="flex items-center gap-4">
        <ThemeToggleComponent />
        <span>{auth.profile?.name} </span>
        <div
          className="flex items-center gap-1 hover:cursor-pointer"
          onClick={() => auth.logout()}
        >
          <MdOutlineExitToApp size={16} />
          <span>Sair</span>
        </div>
      </div>
    </div>
  );
}
