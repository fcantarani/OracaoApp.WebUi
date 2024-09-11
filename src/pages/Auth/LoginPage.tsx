import { useAuth } from "@/hooks/AuthHook";
import { useLocation } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { PiLockKeyOpenFill } from "react-icons/pi";
import image from "@/assets/imgs/sign-in.svg";

export default function LoginPage() {
  const auth = useAuth();
  const { state } = useLocation();

  return (
    <div className="flex min-h-screen flex-col items-center justify-center">
      {/* <img src={logo} className="mb-2 w-full max-w-xs" /> */}
      <h1 className="text-2xl">Oracoes</h1>
      {state && <div className="font-light italic text-red-400">{state}</div>}

      <img src={image} className="mb-5 max-w-sm" />

      <Button size="lg" onClick={() => auth.login()}>
        <PiLockKeyOpenFill size="60%" className="me-2" />
        Fazer login
      </Button>
    </div>
  );
}
