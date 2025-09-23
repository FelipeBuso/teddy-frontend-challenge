import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import "../style/index.css";
import { InputController } from "../components/form/InputController";
export const WelcomePage = () => {
    const { control, handleSubmit, formState: { errors }, } = useForm();
    const navigate = useNavigate();
    const onSubmit = (data) => {
        localStorage.setItem("userName", data.userName);
        navigate("/clients");
    };
    return (_jsxs("div", { className: "welcome-container", children: [_jsx("h1", { className: "welcome-title", children: "Ol\u00E1, seja bem-vindo!" }), _jsxs("form", { onSubmit: handleSubmit(onSubmit), className: "welcome-form", children: [_jsx(InputController, { name: "userName", control: control, errors: errors, placeholder: "Digite seu nome:" }), _jsx("button", { type: "submit", className: "submit-button", children: "Entrar" })] })] }));
};
