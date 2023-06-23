import { Stack, Typography } from "@mui/material";
import { useAuth } from "../hooks";
import { SupplierRegistrationForm } from "../components";
import { SupplierList } from "../components";
import { useSuppliers } from "../hooks/use-suppliers";
import { useMutation, useQuery } from "react-query";
import { useSnackbar } from "notistack";

export function Suppliers() {
  const { authenticatedUser } = useAuth();
  const { getSuppliers, createSupplier, deleteSupplier, updateSupplier } = useSuppliers();
  const { enqueueSnackbar } = useSnackbar();

  const suppliers = useQuery("GET_SUPPLIERS", getSuppliers);

  const editSupplierMutation = useMutation({
    mutationKey: "EDIT_SUPPLIER",
    mutationFn: ({ id, data }) => updateSupplier(id, data),
    onSuccess: () => {
      suppliers.refetch();
      enqueueSnackbar("Fornecedor atualizado com sucesso!", { variant: "success" });
    },
    onError: (error) => {
      enqueueSnackbar(error.message, { variant: "error" });
    },
  });

  const deleteSupplierMutation = useMutation({
    mutationKey: "DELETE_SUPPLIER",
    mutationFn: (id) => deleteSupplier(id),
    onSuccess: () => {
      suppliers.refetch();
      enqueueSnackbar("Fornecedor excluído com sucesso!", { variant: "success" });
    },
    onError: (error) => {
      enqueueSnackbar(error.message, { variant: "error" });
    },
  });

  const createSupplierMutation = useMutation({
    mutationKey: "CREATE_SUPPLIER",
    mutationFn: (supplier) => createSupplier(supplier),
    onSuccess: () => {
      suppliers.refetch();
      enqueueSnackbar("Fornecedor cadastrado com sucesso!", { variant: "success" });
    },
    onError: (error) => {
      enqueueSnackbar(error.message, { variant: "error" });
    },
  });

  return (
    <Stack spacing={8}>
      <Stack spacing={3}>
        <Typography variant="h4">Cadastrar novo fornecedor</Typography>
        <SupplierRegistrationForm onSubmit={createSupplierMutation.mutate} {...createSupplierMutation} />
      </Stack>

      <Stack spacing={3}>
        <Typography variant="h4">Lista de fornecedores</Typography>
        <SupplierList {...suppliers} onDelete={deleteSupplierMutation.mutate} onEdit={editSupplierMutation.mutate} />
      </Stack>
    </Stack>
  );
}
