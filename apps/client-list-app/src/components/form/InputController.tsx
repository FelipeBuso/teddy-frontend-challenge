import React, { Fragment } from "react";
import { Controller, FieldErrors } from "react-hook-form";

type Props = {
  control: any;
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
    <Fragment>
      <Controller
        name={name}
        control={control}
        render={({ field }) => {
          console.log({ errors });
          return (
            <Fragment>
              <input
                placeholder={placeholder}
                {...field}
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
