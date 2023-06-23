import { useState } from "react";

import { Stack, TextField } from "@mui/material";
import { LoadingButton } from "@mui/lab";

export function LoginForm({ onSubmit, isError, isLoading, error }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = (evt) => {
    evt.preventDefault();

    onSubmit({ email, password });
  };

  return (
    <Stack direction="column" spacing={2} component="form" onSubmit={handleSubmit}>
      <TextField
        label="Email"
        error={isError}
        name="email"
        type="email"
        required
        value={email}
        onChange={(evt) => setEmail(evt.target.value)}
      />

      <TextField
        label="Senha"
        error={isError}
        name="password"
        type="password"
        required
        value={password}
        helperText={isError ? error.message : null}
        onChange={(evt) => setPassword(evt.target.value)}
      />

      <LoadingButton loading={isLoading} type="submit" variant="contained">
        Entrar
      </LoadingButton>
    </Stack>
  );
}
