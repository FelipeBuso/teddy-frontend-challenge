import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { Controller } from "react-hook-form";
export const InputController = ({ control, name, placeholder, errors, }) => {
    return (_jsx("div", { className: "div-input-formater", children: _jsx(Controller, { name: name, control: control, render: ({ field }) => {
                return (_jsxs("div", { className: "div-input-formater", children: [_jsx("input", { placeholder: placeholder, ...field, className: "input-formater" }), errors[name]?.message && (_jsx("p", { className: "error-text", children: errors[name]?.message }))] }));
            } }) }));
};
