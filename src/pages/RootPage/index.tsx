import HeaderComponent from "@/components/Header";
import { useAuth } from "@/hooks/AuthHook";
import { useEffect } from "react";
import { Outlet, useNavigate } from "react-router-dom";

export default function RootPage() {
  const auth = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (!auth.isLoggedIn)
      navigate("/login", {
        state: "Você precisa estar logado para acessar esse recurso!",
      });
  }, [auth.isLoggedIn, navigate]);

  return (
    <div className="flex flex-col">
      <HeaderComponent />
      <div className="flex h-[calc(100vh-64px)]">
        <div className="h-full w-full overflow-y-auto px-4 py-2">
          <Outlet />
        </div>
      </div>
    </div>
  );
}
