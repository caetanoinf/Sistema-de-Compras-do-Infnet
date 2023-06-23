import { Delete, Edit } from "@mui/icons-material";
import {
  Alert,
  CircularProgress,
  IconButton,
  Stack,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from "@mui/material";
import { useState } from "react";
import { ContactEditFormModal } from "./forms";

export function ContactList({ suppliers, data, isLoading, onDelete, onEdit }) {
  const [edittingData, setEdittingData] = useState(null);

  if (isLoading) {
    return (
      <Stack alignItems="center" justifyContent="center" sx={{ flex: 1 }}>
        <CircularProgress size={32} />;
      </Stack>
    );
  }

  const handleOpenEdit = (data) => {
    setEdittingData(data);
  };

  return (
    <Stack direction="column" spacing={2}>
      {data?.length === 0 ? <Alert severity="info">Nenhum fornecedor cadastrado ainda.</Alert> : null}

      {data?.length && data?.length > 0 ? (
        <TableContainer>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Nome</TableCell>
                <TableCell>Telefone</TableCell>
                <TableCell>Fornecedor</TableCell>
                <TableCell>Ações</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {data.map((contact) => (
                <TableRow key={contact.id}>
                  <TableCell>{contact.name}</TableCell>
                  <TableCell>{contact.phone}</TableCell>
                  <TableCell>{contact.supplier.name}</TableCell>
                  <TableCell>
                    <Stack direction="row" spacing={1}>
                      <IconButton size="small" onClick={() => handleOpenEdit(contact)}>
                        <Edit />
                      </IconButton>

                      <IconButton
                        size="small"
                        onClick={() =>
                          onDelete({
                            contactId: contact.id,
                            supplierId: contact.supplier.id,
                          })
                        }
                      >
                        <Delete />
                      </IconButton>
                    </Stack>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      ) : null}

      <ContactEditFormModal
        suppliers={suppliers}
        contact={edittingData}
        onSubmit={(newData) =>
          onEdit({
            contactId: edittingData.id,
            supplierId: edittingData.supplier.id,
            data: {
              name: newData.name,
              phone: newData.phone,
            },
          })
        }
        onClose={() => setEdittingData(null)}
      />
    </Stack>
  );
}
