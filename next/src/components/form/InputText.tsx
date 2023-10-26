import { TextField } from "@mui/material";
import { PropsWithRef } from "react";
import { Control, Controller } from "react-hook-form";

export default function InputText({
  fieldName,
  label,
  control,
  ...props
}: PropsWithRef<{
  fieldName: string;
  label: string;
  control: Control<any>;
}>) {
  return (
    <Controller
      name={fieldName}
      control={control}
      render={({ field: { onChange }, formState: { errors } }) => (
        <TextField
          fullWidth
          error={errors[fieldName] ? true : false}
          helperText={errors[fieldName]?.message?.toString() || ""}
          label={label}
          id={fieldName}
          placeholder={label}
          variant="outlined"
          onChange={(e) => onChange(e.target.value)}
        />
      )}
    />
  );
}
