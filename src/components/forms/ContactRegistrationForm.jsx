import { LoadingButton } from "@mui/lab";
import { Alert, FormControl, FormLabel, MenuItem, Select, Stack, TextField } from "@mui/material";
import React, { useState } from "react";

export function ContactRegistrationForm({
  disableSupplierId,
  defaultValues = {},
  submitLabel = "Cadastrar",
  suppliers,
  onSubmit,
  isLoading,
  isError,
  error,
}) {
  const [formData, setFormData] = useState({
    name: defaultValues?.name || "",
    phone: defaultValues?.phone || "",
    supplierId: defaultValues?.supplierId || "",
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

      <FormControl disabled={disableSupplierId} required error={isError}>
        <FormLabel id="supplier-label">Fornecedor</FormLabel>
        <Select aria-labelledby="supplier-label" name="supplierId" value={formData.supplierId} onChange={handleChange}>
          {suppliers.map((supplier) => (
            <MenuItem key={supplier.id} value={supplier.id}>
              {supplier.name}
            </MenuItem>
          ))}
        </Select>
      </FormControl>

      <LoadingButton loading={isLoading} type="submit" variant="contained">
        {submitLabel}
      </LoadingButton>

      {isError ? <Alert severity="error">{error.message}</Alert> : null}
    </Stack>
  );
}
