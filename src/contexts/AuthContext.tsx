import config from "@/config";
import { AuthProfileModel } from "@/models/AuthProfileModel";
import { UserManager } from "oidc-client-ts";
import {
  createContext,
  PropsWithChildren,
  useCallback,
  useEffect,
  useMemo,
  useState,
} from "react";

export interface AuthContextData {
  accessToken?: string;
  isLoggedIn: boolean;
  profile?: AuthProfileModel;
  login: () => Promise<void>;
  signinCallback: () => Promise<void>;
  logout: () => Promise<void>;
}

export const AuthContext = createContext({} as AuthContextData);

export default function AuthContextProvider({ children }: PropsWithChildren) {
  const [accessToken, setAccessToken] = useState<string | undefined>();
  const [profile, setProfile] = useState<AuthProfileModel | undefined>();
  const [isLoading, setIsLoading] = useState(true);

  const userManager = useMemo(() => new UserManager(config.auth), []);

  const loadUser = useCallback(async () => {
    setIsLoading(true);

    try {
      const user = await userManager.getUser();
      if (user) {
        setAccessToken(user.access_token);
        setProfile(user.profile as AuthProfileModel);
      } else {
        clearUser();
      }
    } catch (err) {
      console.error("Falha ao obter o usuário logado", err);
    } finally {
      setIsLoading(false);
    }
  }, [userManager]);

  const clearUser = () => {
    setAccessToken(undefined);
    setProfile(undefined);
  };

  useEffect(() => {
    loadUser();
  }, [loadUser]);

  const login = async () => {
    await userManager.signinRedirect();
  };

  const signinCallback = async () => {
    try {
      await userManager.signinCallback();
      await loadUser();
    } catch (err) {
      console.error("Falha ao validar o token de acesso (signinCallback)", err);
    }
  };

  const logout = async () => {
    await userManager.signoutRedirect();
  };

  return (
    <AuthContext.Provider
      value={{
        accessToken,
        isLoggedIn: !!accessToken && !!profile,
        profile,
        login,
        signinCallback,
        logout,
      }}
    >
      {isLoading ? (
        <span>Aguarde enquanto validamos o seu acesso...</span>
      ) : (
        children
      )}
    </AuthContext.Provider>
  );
}
