import { Button, Container, Link, Stack, Typography } from "@mui/material";
import { LoginForm } from "../components/forms";
import { useAuth } from "../hooks";
import { useMutation } from "react-query";
import { Link as RouterLink } from "react-router-dom";

export function Login() {
  const auth = useAuth();

  const signInMutation = useMutation({
    mutationKey: "signIn",
    mutationFn: auth.signIn,
  });

  const handleSubmit = ({ email, password }) => {
    signInMutation.mutate({ email, password });
  };

  return (
    <Container maxWidth="sm" sx={{ alignItems: "center", justifyContent: "center", height: "100%", display: "flex" }}>
      <Stack direction="column" flex="1" spacing={2}>
        <img src="/logo.png" alt="Logo" width={180} />

        <Typography variant="h2">Entrar na sua conta</Typography>

        <Typography variant="subtitle1">Informe suas credenciais para continuar</Typography>

        <LoginForm onSubmit={handleSubmit} {...signInMutation} />

        <Link component={RouterLink} to="/signup">
          Não tem uma conta? Cadastre-se
        </Link>
      </Stack>
    </Container>
  );
}
