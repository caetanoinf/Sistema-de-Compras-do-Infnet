import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { Suppliers, Login, SignUp, NotFound } from "../pages";
import { AuthenticatedLayout } from "../components";
import { useAuth } from "../hooks";

const privateRoutes = (
  <>
    <Route path="/" element={<AuthenticatedLayout />}>
      <Route index element={<Suppliers />} />
      <Route path="/contacts" element={<h1>Contatos</h1>} />
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
    return <h1>Loading...</h1>;
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
