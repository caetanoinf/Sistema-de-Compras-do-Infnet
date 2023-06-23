import { Stack, Typography } from "@mui/material";
import { ContactList, ContactRegistrationForm } from "../components";
import { useSuppliers } from "../hooks/use-suppliers";
import { useMutation, useQuery } from "react-query";
import { useContacts } from "../hooks";
import { useMemo } from "react";
import { useSnackbar } from "notistack";

export function Contacts() {
  const { getSuppliers } = useSuppliers();
  const { addContact, removeContact, editContact } = useContacts();
  const { enqueueSnackbar } = useSnackbar();

  const suppliers = useQuery("GET_SUPPLIERS", getSuppliers);

  const contacts = useMemo(() => {
    const result = [];

    suppliers.data?.forEach((supplier) => {
      const values = supplier.contacts?.map((contact) => ({ ...contact, supplier })) ?? [];
      result.push(...values);
    });

    return result;
  }, [suppliers.data]);

  const addContactMutation = useMutation({
    mutationKey: "ADD_CONTACT",
    mutationFn: ({ supplierId, ...data }) => addContact(supplierId, data),
    onSuccess: () => {
      suppliers.refetch();
      enqueueSnackbar("Contato cadastrado com sucesso!", { variant: "success" });
    },
    onError: (error) => {
      enqueueSnackbar(error.message, { variant: "error" });
    },
  });

  const deleteContactMutation = useMutation({
    mutationKey: "DELETE_CONTACT",
    mutationFn: ({ supplierId, contactId }) => removeContact(supplierId, contactId),
    onSuccess: () => {
      suppliers.refetch();
      enqueueSnackbar("Contato excluído com sucesso!", { variant: "success" });
    },
    onError: (error) => {
      enqueueSnackbar(error.message, { variant: "error" });
    },
  });

  const editContactMutation = useMutation({
    mutationKey: "EDIT_CONTACT",
    mutationFn: ({ supplierId, contactId, data }) => editContact(supplierId, contactId, data),
    onSuccess: () => {
      suppliers.refetch();
      enqueueSnackbar("Contato atualizado com sucesso!", { variant: "success" });
    },
    onError: (error) => {
      enqueueSnackbar(error.message, { variant: "error" });
    },
  });

  return (
    <Stack spacing={8}>
      <Stack spacing={3}>
        <Typography variant="h4">Cadastrar novo contato</Typography>
        <ContactRegistrationForm suppliers={suppliers.data ?? []} onSubmit={addContactMutation.mutate} />
      </Stack>

      <Stack spacing={3}>
        <Typography variant="h4">Lista de contatos</Typography>
        <ContactList
          suppliers={suppliers.data || []}
          data={contacts}
          isLoading={suppliers.isLoading}
          onDelete={deleteContactMutation.mutate}
          onEdit={editContactMutation.mutate}
        />
      </Stack>
    </Stack>
  );
}
