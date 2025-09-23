import React, { useEffect } from "react";
import {
  Modal,
  Box,
  Typography,
  Button,
  Grid,
  CircularProgress,
  IconButton,
} from "@mui/material";
import { useForm, type SubmitHandler } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { Client } from "../types";
import { IoCloseSharp } from "react-icons/io5";
import { InputController } from "./form/InputController";
import { InputNumberMaskController } from "./form/InputNumberMaskController";
import { IFormInput, IFormSubmit } from "./CreateClientModal";
import { normalizeNumberValue } from "../utils";

const validationSchema = yup.object({
  name: yup.string().required("Digite o nome."),
  salary: yup.string().required("Digite o salário."),
  companyValuation: yup.string().required("Digite o valor da empresa."),
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

interface EditClientModalProps {
  open: boolean;
  onClose: () => void;
  loading: boolean;
  client: Client;
  onEditClient: (values: IFormSubmit) => void;
}

const EditClientModal: React.FC<EditClientModalProps> = ({
  open,
  onClose,
  loading,
  client,
  onEditClient,
}) => {
  const {
    control,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<IFormInput>({
    resolver: yupResolver(validationSchema),
    defaultValues: {
      name: client.name,
      salary: client.salary.toString(),
      companyValuation: client.companyValuation.toString(),
    },
  });

  // Resetar o formulário quando o cliente mudar
  useEffect(() => {
    reset({
      name: client.name,
      salary: client.salary.toString(),
      companyValuation: client.companyValuation.toString(),
    });
  }, [client, reset]);

  const onSubmit: SubmitHandler<IFormInput> = (data) => {
    const payload: IFormSubmit = {
      name: data.name,
      salary: normalizeNumberValue(data.salary),
      companyValuation: normalizeNumberValue(data.companyValuation),
    };
    onEditClient(payload);
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
              <InputController
                name="name"
                placeholder="Digite o nome:"
                control={control}
                errors={errors}
              />
            </Grid>

            <Grid size={12}>
              <InputNumberMaskController
                name="salary"
                placeholder="Digite o salário:"
                control={control}
                errors={errors}
              />
            </Grid>
            <Grid size={12}>
              <InputNumberMaskController
                name="companyValuation"
                placeholder="Digite o valor da empresa:"
                control={control}
                errors={errors}
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
