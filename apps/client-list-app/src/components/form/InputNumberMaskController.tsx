import React, { Fragment } from "react";
import { Control, Controller, FieldErrors } from "react-hook-form";
import { NumericFormat } from "react-number-format";

type Props = {
  control: Control<any>;
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
          console.log({ field });
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
                allowNegative={false}
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
