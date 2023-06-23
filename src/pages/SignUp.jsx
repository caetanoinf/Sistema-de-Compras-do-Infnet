import { Container, Link, Stack, Typography } from "@mui/material";
import { useAuth } from "../hooks/use-auth";
import { useMutation } from "react-query";
import { RegisterForm } from "../components/forms";
import { Link as RouterLink, useNavigate } from "react-router-dom";

export function SignUp() {
  const auth = useAuth();
  const navigate = useNavigate();

  const signUpMutation = useMutation({
    mutationKey: "signUp",
    mutationFn: auth.signUp,
    onSuccess: () => {
      navigate("/");
    },
  });

  const handleSubmit = (data) => {
    signUpMutation.mutate(data);
  };

  return (
    <Container maxWidth="sm" sx={{ alignItems: "center", justifyContent: "center", height: "100%", display: "flex" }}>
      <Stack direction="column" flex="1" spacing={2}>
        <img src="/logo.png" alt="Logo" width={180} />
        <Typography variant="h2">Cadastre-se</Typography>

        <Typography variant="subtitle1">Preencha os campos abaixo para criar sua conta</Typography>

        <RegisterForm onSubmit={handleSubmit} {...signUpMutation} />

        <Link component={RouterLink} to="/">
          Já tem uma conta? Entre
        </Link>
      </Stack>
    </Container>
  );
}
