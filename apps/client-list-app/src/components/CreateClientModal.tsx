import React, { useState } from "react";
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
import api from "../services/api";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
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

interface IFormInput {
  name: string;
  salary: number;
  companyValuation: number;
}

const CreateClientModal: React.FC<{ refresh: () => void }> = ({ refresh }) => {
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<IFormInput>({
    resolver: yupResolver(validationSchema),
  });

  const createClient = async (values: IFormInput) => {
    setLoading(true);
    try {
      await api.post("/users", values);
      refresh();
      setOpen(false);
    } catch (error) {
      console.log({ error });
    } finally {
      setLoading(false);
    }
  };

  const onSubmit: SubmitHandler<IFormInput> = (data) => {
    createClient(data);
    reset();
  };

  return (
    <div className="modal-container">
      <Modal
        open={open}
        onClose={() => {
          setOpen(false);
        }}
        aria-labelledby="create-client-modal-title"
        aria-describedby="create-client-modal-description"
      >
        <Box sx={style}>
          <IconButton
            aria-label="close"
            onClick={() => {
              setOpen(false);
            }}
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
            id="create-client-modal-title"
            variant="h6"
            component="h2"
          >
            Criar cliente:
          </Typography>

          <Box
            component="form"
            onSubmit={handleSubmit(onSubmit)}
            sx={{ mt: 3 }}
          >
            <Grid container spacing={1}>
              <Grid size={12}>
                <TextField
                  fullWidth
                  size="small"
                  placeholder="Digite o nome:"
                  {...register("name", { required: "Nome é obrigatório" })}
                  error={!!errors.name}
                  helperText={errors.name?.message}
                />
              </Grid>

              <Grid size={12}>
                <TextField
                  size="small"
                  fullWidth
                  placeholder="Digite o salário:"
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
                  placeholder="Digite o valor da empresa:"
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
                Criar cliente
              </Button>
            </Box>
          </Box>
        </Box>
      </Modal>
      <div className="create-button-container">
        <Button
          fullWidth
          type="button"
          variant="outlined"
          color="primary"
          onClick={() => {
            setOpen(true);
          }}
        >
          Criar cliente
        </Button>
      </div>
    </div>
  );
};

export default CreateClientModal;
