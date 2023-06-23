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
import { SupplierEditFormModal } from "./forms";

export function SupplierList({ data, isLoading, onDelete, onEdit }) {
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
                <TableCell>CPF/CNPJ</TableCell>
                <TableCell>Categoria</TableCell>
                <TableCell>Endereço</TableCell>
                <TableCell>Ações</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {data.map((supplier) => (
                <TableRow key={supplier.id}>
                  <TableCell>{supplier.name}</TableCell>
                  <TableCell>{supplier.governmentId}</TableCell>
                  <TableCell>{supplier.category}</TableCell>
                  <TableCell>{supplier.address}</TableCell>
                  <TableCell>
                    <Stack direction="row" spacing={1}>
                      <IconButton size="small" onClick={() => handleOpenEdit(supplier)}>
                        <Edit />
                      </IconButton>

                      <IconButton size="small" onClick={() => onDelete(supplier.id)}>
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

      <SupplierEditFormModal
        supplier={edittingData}
        onSubmit={(newData) => onEdit({ id: edittingData.id, data: newData })}
        onClose={() => setEdittingData(null)}
      />
    </Stack>
  );
}
