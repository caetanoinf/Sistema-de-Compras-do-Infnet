import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Suppliers, Login, SignUp, NotFound, Contacts } from "../pages";
import { AuthenticatedLayout } from "../components";
import { useAuth } from "../hooks";
import { CircularProgress, Stack } from "@mui/material";

const privateRoutes = (
  <>
    <Route path="/" element={<AuthenticatedLayout />}>
      <Route index element={<Suppliers />} />
      <Route path="/contacts" element={<Contacts />} />
      <Route path="/quotes" element={<h1>Cotações</h1>} />
      <Route path="/new-quote" element={<h1>Nova Cotação</h1>} />
    </Route>
  </>
);

const publicRoutes = (
  <>
    <Route path="/" element={<Login />} />
    <Route path="/signup" element={<SignUp />} />
  </>
);

export function AppRouter() {
  const { isLoggedIn, authenticating } = useAuth();

  if (authenticating) {
    return (
      <Stack direction="column" alignItems="center" justifyContent="center" sx={{ height: "100vh" }}>
        <CircularProgress size={60} />
      </Stack>
    );
  }

  return (
    <BrowserRouter>
      <Routes>
        {isLoggedIn ? privateRoutes : publicRoutes}
        <Route path="*" element={<NotFound />} />
      </Routes>
    </BrowserRouter>
  );
}
