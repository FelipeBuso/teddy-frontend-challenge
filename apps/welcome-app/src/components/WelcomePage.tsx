import { useForm, type SubmitHandler } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import "./WelcomePage.css";

type FormInputs = {
  userName: string;
};

export const WelcomePage = () => {
  const {
    register,
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
        <input
          id="userName"
          type="text"
          className="form-input"
          placeholder="Digite seu nome:"
          {...register("userName", { required: "Nome é obrigatório" })}
        />
        {errors.userName && (
          <span className="error-message">{errors.userName.message}</span>
        )}
        <button type="submit" className="submit-button">
          Entrar
        </button>
      </form>
    </div>
  );
};
