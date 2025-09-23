import React, { Fragment } from "react";
import { Control, Controller, FieldErrors } from "react-hook-form";

type Props = {
  control: Control<any>;
  name: string;
  placeholder: string;
  errors: FieldErrors<any>;
};
export const InputController: React.FC<Props> = ({
  control,
  name,
  placeholder,
  errors,
}) => {
  return (
    <div className="div-input-formater">
      <Controller
        name={name}
        control={control}
        render={({ field }) => {
          return (
            <div className="div-input-formater">
              <input
                placeholder={placeholder}
                {...field}
                className="input-formater"
              />
              {errors[name]?.message && (
                <p className="error-text">{errors[name]?.message as string}</p>
              )}
            </div>
          );
        }}
      />
    </div>
  );
};
