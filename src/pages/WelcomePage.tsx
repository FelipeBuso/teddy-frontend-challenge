import { useForm, type SubmitHandler } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import "../style/index.css";
import { InputController } from "../components/form/InputController";

type FormInputs = {
  userName: string;
};

export const WelcomePage = () => {
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<FormInputs>();
  const navigate = useNavigate();

  const onSubmit: SubmitHandler<FormInputs> = (data) => {
    localStorage.setItem("userName", data.userName);
    navigate("/clients");
  };

  return (
    <div className="welcome-container">
      <h1 className="welcome-title">Olá, seja bem-vindo!</h1>
      <form onSubmit={handleSubmit(onSubmit)} className="welcome-form">
        <InputController
          name="userName"
          control={control}
          errors={errors}
          placeholder="Digite seu nome:"
        />
        <button type="submit" className="submit-button">
          Entrar
        </button>
      </form>
    </div>
  );
};
