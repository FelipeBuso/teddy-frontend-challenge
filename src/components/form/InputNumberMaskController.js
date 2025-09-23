import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { Fragment } from "react";
import { Controller } from "react-hook-form";
import { NumericFormat } from "react-number-format";
export const InputNumberMaskController = ({ control, name, placeholder, errors, }) => {
    return (_jsx(Fragment, { children: _jsx(Controller, { name: name, control: control, render: ({ field }) => {
                console.log({ field });
                return (_jsxs("div", { className: "div-input-formater", children: [_jsx(NumericFormat, { ...field, thousandSeparator: ".", decimalSeparator: ",", prefix: "R$ ", decimalScale: 2, placeholder: placeholder, fixedDecimalScale: true, className: "input-formater", allowNegative: false }), errors[name]?.message && (_jsx("p", { className: "error-text", children: errors[name]?.message }))] }));
            } }) }));
};
