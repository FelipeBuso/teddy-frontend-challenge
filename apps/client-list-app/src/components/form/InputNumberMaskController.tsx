import React, { Fragment } from "react";
import { Control, Controller, FieldErrors } from "react-hook-form";
import { TextField } from "@mui/material";
import { currencyFormater } from "../../utils";
import { IFormInput } from "../EditClientModal";
import { NumericFormat } from "react-number-format";

type Props = {
  control: any;
  name: string;
  placeholder: string;
  errors: FieldErrors<any>;
};
export const InputNumberMaskController: React.FC<Props> = ({
  control,
  name,
  placeholder,
  errors,
}) => {
  return (
    <Fragment>
      <Controller
        name={name}
        control={control}
        render={({ field }) => {
          console.log({ errors });
          return (
            <Fragment>
              <NumericFormat
                {...field}
                thousandSeparator="."
                decimalSeparator=","
                prefix="R$ "
                decimalScale={2}
                placeholder={placeholder}
                fixedDecimalScale
                className="input-formater"
              />
              {errors[name]?.message && (
                <p className="error-text">{errors[name]?.message as string}</p>
              )}
            </Fragment>
          );
        }}
      />
    </Fragment>
  );
};
