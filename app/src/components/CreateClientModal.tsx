import React, { useState } from "react";
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
import api from "../services/api";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { IoCloseSharp } from "react-icons/io5";
import { normalizeNumberValue } from "../utils";
import { InputNumberMaskController } from "./form/InputNumberMaskController";
import { InputController } from "./form/InputController";

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

export interface IFormInput {
  name: string;
  salary: string;
  companyValuation: string;
}

export interface IFormSubmit {
  name: string;
  salary: number;
  companyValuation: number;
}

const CreateClientModal: React.FC<{ refresh: () => void }> = ({ refresh }) => {
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const {
    control,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(validationSchema),
  });

  const createClient = async (values: IFormSubmit) => {
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
    const payload: IFormSubmit = {
      name: data.name,
      salary: normalizeNumberValue(data.salary),
      companyValuation: normalizeNumberValue(data.companyValuation),
    };
    createClient(payload);
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
