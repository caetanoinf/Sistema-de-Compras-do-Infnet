import { useState } from "react";

import { Alert, FormControl, FormControlLabel, FormLabel, Radio, RadioGroup, Stack, TextField } from "@mui/material";
import { LoadingButton } from "@mui/lab";

export function RegisterForm({ onSubmit, isError, isLoading, error }) {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    role: "admin",
    password: "",
    passwordConfirm: "",
  });

  const hasPassword = formData.password.length > 0 && formData.passwordConfirm.length > 0;
  const isPasswordConfirmed = formData.password === formData.passwordConfirm;

  const handleChange = (evt) => {
    setFormData((prev) => ({ ...prev, [evt.target.name]: evt.target.value }));
  };

  const handleSubmit = (evt) => {
    evt.preventDefault();

    onSubmit(formData);
  };

  return (
    <Stack direction="column" spacing={2} component="form" onSubmit={handleSubmit}>
      <TextField label="Nome" error={isError} name="name" type="text" required value={formData.name} onChange={handleChange} />

      <TextField label="Email" error={isError} name="email" type="email" required value={formData.email} onChange={handleChange} />

      <FormControl error={isError}>
        <FormLabel id="role-label">Tipo de usuário</FormLabel>

        <RadioGroup aria-labelledby="role-label" name="role" value={formData.role} onChange={handleChange}>
          <FormControlLabel value="admin" control={<Radio />} label="Administrador" />
          <FormControlLabel value="manager" control={<Radio />} label="Gerente de Vendas" />
        </RadioGroup>
      </FormControl>

      <TextField label="Senha" error={isError} name="password" type="password" required value={formData.password} onChange={handleChange} />

      <TextField
        label="Confirmar Senha"
        error={isError || (hasPassword && !isPasswordConfirmed)}
        name="passwordConfirm"
        type="password"
        required
        value={formData.passwordConfirm}
        helperText={hasPassword && !isPasswordConfirmed ? "As senhas não conferem" : null}
        onChange={handleChange}
      />

      <LoadingButton loading={isLoading} type="submit" variant="contained">
        Cadastrar
      </LoadingButton>

      {isError ? (
        <Alert severity="error" sx={{ mb: 2 }}>
          {error.message}
        </Alert>
      ) : null}
    </Stack>
  );
}
