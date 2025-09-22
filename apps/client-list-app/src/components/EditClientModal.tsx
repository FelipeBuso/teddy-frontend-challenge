import React, { useEffect } from "react";
import {
  Modal,
  Box,
  Typography,
  TextField,
  Button,
  Grid,
  CircularProgress,
  IconButton,
  InputAdornment,
} from "@mui/material";
import { useForm, type SubmitHandler } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { Client } from "../types";
import { IoCloseSharp } from "react-icons/io5";

const validationSchema = yup.object({
  name: yup.string().required("Digite o nome."),
  salary: yup
    .number()
    .typeError("Informe o salário")
    .required("Digite o salário."),
  companyValuation: yup
    .number()
    .typeError("Informe valor da empresa.")
    .required("Digite o valor da empresa."),
});

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

export interface IFormInput {
  name: string;
  salary: number;
  companyValuation: number;
}

interface EditClientModalProps {
  open: boolean;
  onClose: () => void;
  loading: boolean;
  client: Client;
  onEditClient: (values: IFormInput) => void;
}

const EditClientModal: React.FC<EditClientModalProps> = ({
  open,
  onClose,
  loading,
  client,
  onEditClient,
}) => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<IFormInput>({
    resolver: yupResolver(validationSchema),
    defaultValues: {
      name: client.name,
      salary: client.salary,
      companyValuation: client.companyValuation,
    },
  });

  // Resetar o formulário quando o cliente mudar
  useEffect(() => {
    reset({
      name: client.name,
      salary: client.salary,
      companyValuation: client.companyValuation,
    });
  }, [client, reset]);

  const onSubmit: SubmitHandler<IFormInput> = (data) => {
    onEditClient(data);
  };

  return (
    <Modal
      open={open}
      onClose={onClose}
      aria-labelledby="edit-client-modal-title"
      aria-describedby="edit-client-modal-description"
    >
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
          id="edit-client-modal-title"
          variant="h6"
          component="h2"
          sx={{ mb: 2 }}
        >
          Editar cliente:
        </Typography>

        <Box component="form" onSubmit={handleSubmit(onSubmit)}>
          <Grid container spacing={1}>
            <Grid size={12}>
              <TextField
                fullWidth
                size="small"
                label="Nome"
                {...register("name")}
                error={!!errors.name}
                helperText={errors.name?.message}
              />
            </Grid>

            <Grid size={12}>
              <TextField
                size="small"
                fullWidth
                label="Salário"
                type="number"
                {...register("salary", { valueAsNumber: true })}
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">R$</InputAdornment>
                  ),
                }}
                error={!!errors.salary}
                helperText={errors.salary?.message}
              />
            </Grid>
            <Grid size={12}>
              <TextField
                size="small"
                fullWidth
                type="number"
                label="Valor da empresa"
                {...register("companyValuation", { valueAsNumber: true })}
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">R$</InputAdornment>
                  ),
                }}
                error={!!errors.companyValuation}
                helperText={errors.companyValuation?.message}
              />
            </Grid>
          </Grid>
          <Box
            sx={{
              display: "flex",
              justifyContent: "flex-end",
              mt: 3,
              gap: 1,
            }}
          >
            <Button
              fullWidth
              type="submit"
              variant="contained"
              color="primary"
              startIcon={
                loading ? (
                  <CircularProgress color="inherit" size="18px" />
                ) : undefined
              }
            >
              Salvar Alterações
            </Button>
          </Box>
        </Box>
      </Box>
    </Modal>
  );
};

export default EditClientModal;
