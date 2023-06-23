import { LoadingButton } from "@mui/lab";
import { Alert, Stack, TextField } from "@mui/material";
import React, { useState } from "react";

export function SupplierRegistrationForm({ defaultValues = {}, submitLabel = "Cadastrar", onSubmit, isLoading, isError, error }) {
  const [formData, setFormData] = useState({
    name: defaultValues?.name || "",
    governmentId: defaultValues?.governmentId || "",
    category: defaultValues?.category || "",
    address: defaultValues?.address || "",
  });

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

      <TextField
        label="CPF/CNPJ"
        error={isError}
        name="governmentId"
        type="text"
        required
        value={formData.governmentId}
        onChange={handleChange}
      />

      <TextField label="Categoria" error={isError} name="category" type="text" required value={formData.category} onChange={handleChange} />

      <TextField label="Endereço" error={isError} name="address" type="text" required value={formData.address} onChange={handleChange} />

      <LoadingButton loading={isLoading} type="submit" variant="contained">
        {submitLabel}
      </LoadingButton>

      {isError ? <Alert severity="error">{error.message}</Alert> : null}
    </Stack>
  );
}
