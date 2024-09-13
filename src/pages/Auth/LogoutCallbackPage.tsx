import { Button } from "@/components/ui/button";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { LogoutImage } from "@/components/Images/logout";

export default function LogoutCallbackPage() {
  const [timeLeft, setTimeLeft] = useState(5);
  const navigate = useNavigate();

  useEffect(() => {
    const id = setInterval(() => {
      if (timeLeft <= 0) {
        clearInterval(id);
        navigate("/");
      } else {
        setTimeLeft((x) => x - 1);
      }
    }, 1000);

    return () => {
      clearInterval(id);
    };
  }, [navigate, timeLeft]);

  return (
    <div className="flex min-h-screen flex-col justify-center align-middle">
      <div className="flex flex-col items-center justify-center text-center">
        <p className="mb-2 text-xl">Você saiu do sistema!</p>
        <LogoutImage />
        <p className="text-sm font-light italic">
          Em <strong>{timeLeft}</strong> segundos você será direcionado para a
          home.
        </p>
        <div className="mt-5" onClick={() => navigate("/")}>
          <Button>Ir para a home</Button>
        </div>
      </div>
    </div>
  );
}
