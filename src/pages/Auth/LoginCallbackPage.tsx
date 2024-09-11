import { Button } from "@/components/ui/button";
import { useAuth } from "@/hooks/AuthHook";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import image from "@/assets/imgs/walking.svg";

export default function LoginCallbackPage() {
  const auth = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    auth
      .signinCallback()
      .then(() => navigate("/"))
      .catch((err) => {
        console.error("Falha ao processar o login", err);
        alert("Falha ao processar o login: " + err.message);
      });
  }, [auth, navigate]);

  return (
    <div className="flex min-h-screen flex-col items-center justify-center">
      <img src={image} alt="" className="max-w-sm" />
      <h2 className="mb-5 text-lg font-light italic">
        Aguarde enquanto estamos providenciando o seu login...
      </h2>
      <Button onClick={() => auth.logout()}>Sair</Button>
    </div>
  );
}
