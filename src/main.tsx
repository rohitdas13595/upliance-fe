import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import { GoogleOAuthProvider } from "@react-oauth/google";

import App from "./App.tsx";
import { Provider } from "./provider.tsx";
import "@/styles/globals.css";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "sonner";
import { AuthProvider } from "./context/auth.tsx";

const client = new QueryClient();

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <Toaster position="bottom-right" richColors={true} />
    <GoogleOAuthProvider
      clientId={
        "449734718907-a8vpo98jevm5omuo538rdqqdq8usr1re.apps.googleusercontent.com"
      }
    >
      <QueryClientProvider client={client}>
        <BrowserRouter>
          <AuthProvider>
            <Provider>
              <App />
            </Provider>
          </AuthProvider>
        </BrowserRouter>
      </QueryClientProvider>
    </GoogleOAuthProvider>
  </React.StrictMode>
);
