import { Box, Button, Dialog, DialogActions, DialogContent, DialogTitle, Modal } from "@mui/material";
import { SupplierRegistrationForm } from "./SupplierRegistrationForm";

export function SupplierEditFormModal({ supplier, onClose, onSubmit }) {
  if (!supplier) {
    return null;
  }

  const handleSubmit = (formData) => {
    onSubmit(formData);
    onClose();
  };

  return (
    <Dialog maxWidth="sm" open={true} onClose={onClose} fullWidth>
      <DialogTitle>Editar fornecedor #{supplier.id}</DialogTitle>
      <DialogContent sx={{ p: 5 }}>
        <Box sx={{ flex: 1, pt: 3 }}>
          <SupplierRegistrationForm submitLabel="Editar" onSubmit={handleSubmit} defaultValues={supplier} />
        </Box>
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose}>Cancelar</Button>
      </DialogActions>
    </Dialog>
  );
}
