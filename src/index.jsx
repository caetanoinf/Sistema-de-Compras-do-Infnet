import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";

import { SessionProvider } from "./contexts";

import { QueryClientProvider, QueryClient } from "react-query";
import { CssBaseline } from "@mui/material";

import "@fontsource/roboto";
import { SnackbarProvider } from "notistack";

const queryClient = new QueryClient();

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <QueryClientProvider client={queryClient}>
      <CssBaseline />

      <SessionProvider>
        <SnackbarProvider>
          <App />
        </SnackbarProvider>
      </SessionProvider>
    </QueryClientProvider>
  </React.StrictMode>
);
