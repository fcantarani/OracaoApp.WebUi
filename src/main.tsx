import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./main.css";
import { ThemeProvider } from "./contexts/ThemeContext.tsx";
import { RouterProvider } from "react-router-dom";
import { routes } from "./routes/index.tsx";
import AuthContextProvider from "./contexts/AuthContext.tsx";

import moment from "moment";
import "moment/dist/locale/pt-br";

moment.locale("pt-br");

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <ThemeProvider defaultTheme="dark" storageKey="pray-ui-theme">
      <AuthContextProvider>
        <RouterProvider router={routes} />
      </AuthContextProvider>
    </ThemeProvider>
  </StrictMode>,
);
