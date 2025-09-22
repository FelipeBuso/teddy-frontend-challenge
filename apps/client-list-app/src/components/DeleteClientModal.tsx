import React from "react";
import {
  Modal,
  Box,
  Typography,
  Button,
  CircularProgress,
  IconButton,
} from "@mui/material";
import { IoCloseSharp } from "react-icons/io5";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  boxShadow: 24,
  p: 4,
  borderRadius: "8px",
};

interface DeleteClientModalProps {
  open: boolean;
  onClose: () => void;
  loading: boolean;
  clientName: string;
  onDeleteConfirm: () => void;
}

const DeleteClientModal: React.FC<DeleteClientModalProps> = ({
  open,
  onClose,
  loading,
  clientName,
  onDeleteConfirm,
}) => {
  return (
    <Modal open={open} onClose={onClose}>
      <Box sx={style}>
        <IconButton
          aria-label="close"
          onClick={onClose}
          sx={{
            position: "absolute",
            right: 8,
            top: 8,
            color: (theme) => theme.palette.grey[500],
          }}
        >
          <IoCloseSharp />
        </IconButton>
        <Typography
          id="delete-client-modal-title"
          variant="h6"
          component="h2"
          sx={{ mb: 2 }}
        >
          Excluir cliente:
        </Typography>
        <Typography sx={{ mt: 2, mb: 4 }}>
          Você está prestes a excluir o cliente: <strong>{clientName}</strong>
        </Typography>
        <Box sx={{ display: "flex", justifyContent: "center", gap: 2 }}>
          <Button
            fullWidth
            onClick={onDeleteConfirm}
            variant="contained"
            color="primary"
            disabled={loading}
            startIcon={
              loading ? (
                <CircularProgress color="inherit" size="18px" />
              ) : undefined
            }
          >
            Excluir cliente
          </Button>
        </Box>
      </Box>
    </Modal>
  );
};

export default DeleteClientModal;
