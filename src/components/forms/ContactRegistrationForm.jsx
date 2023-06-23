import { LoadingButton } from "@mui/lab";
import { Alert, FormControl, FormLabel, MenuItem, Select, Stack, TextField } from "@mui/material";
import React, { useState } from "react";

export function ContactRegistrationForm({ onSubmit, isLoading, isError, error }) {
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    supplierId: "",
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

      <TextField label="Telefone" error={isError} name="phone" type="text" required value={formData.phone} onChange={handleChange} />

      <FormControl>
        <FormLabel id="supplier-label">Fornecedor</FormLabel>
        <Select aria-labelledby="supplier-label" name="supplierId" value={formData.supplierId} onChange={handleChange}>
          <MenuItem value={1}>Fornecedor 1</MenuItem>
          <MenuItem value={2}>Fornecedor 2</MenuItem>
        </Select>
      </FormControl>

      <LoadingButton loading={isLoading} type="submit" variant="contained">
        Cadastrar
      </LoadingButton>

      {isError ? <Alert severity="error">{error.message}</Alert> : null}
    </Stack>
  );
}
