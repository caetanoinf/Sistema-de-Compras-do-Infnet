import { Box, Button, Dialog, DialogActions, DialogContent, DialogTitle, Modal } from "@mui/material";
import { ContactRegistrationForm } from "./ContactRegistrationForm";

export function ContactEditFormModal({ contact, suppliers, onClose, onSubmit }) {
  if (!contact) {
    return null;
  }

  const handleSubmit = (formData) => {
    onSubmit(formData);
    onClose();
  };

  return (
    <Dialog maxWidth="sm" open={true} onClose={onClose} fullWidth>
      <DialogTitle>Editar contato #{contact.id}</DialogTitle>
      <DialogContent sx={{ p: 5 }}>
        <Box sx={{ flex: 1, pt: 3 }}>
          <ContactRegistrationForm
            disableSupplierId
            suppliers={suppliers}
            submitLabel="Editar"
            onSubmit={handleSubmit}
            defaultValues={{ ...contact, supplierId: contact.supplier.id }}
          />
        </Box>
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose}>Cancelar</Button>
      </DialogActions>
    </Dialog>
  );
}
