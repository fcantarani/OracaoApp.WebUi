import { useAuth } from "@/hooks/AuthHook";
import { PropsWithChildren } from "react";
import { Badge } from "../ui/badge";

interface IProps extends PropsWithChildren {
  roles?: string[];
}

export default function ProtectedRoute({ roles, children }: IProps) {
  const auth = useAuth();

  const isInRole = (arr: string[], target: string[]) =>
    target.every((v) => arr.includes(v));

  if (!auth.isLoggedIn) {
    return (
      <div>
        Você não está autenticado. Para acessar essa página é necessário entrar
        com seu usuário e senha.
      </div>
    );
  }

  if (roles) {
    if (!isInRole(auth.profile?.roles ?? [], roles))
      return (
        <div>
          <p>Você não está autorizado a acessar essa funcionalidade.</p>
          <div>
            Para acessar será necessário possuir as permissões:{" "}
            {roles.map((role, idx) => (
              <Badge key={idx} className="me-2">
                {role}
              </Badge>
            ))}
          </div>
        </div>
      );
  }

  return children;
}
