import {
  FormControl,
  FormGroup,
  FormControlLabel,
  Switch,
  FormHelperText,
  Checkbox,
} from "@mui/material";
import { PropsWithRef } from "react";
import { Control, Controller } from "react-hook-form";

export default function SwitchYesNo({
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
      render={({ field: { onChange }, formState: { errors } }) => {
        return (
          <FormControl>
            <FormGroup>
              <FormControlLabel
                control={
                  <Switch
                    name={fieldName}
                    onChange={(e) =>
                      onChange(e.target.value == "on" ? true : false)
                    }
                  />
                }
                label={label}
              />
            </FormGroup>
            {errors[fieldName] && (
              <FormHelperText error>
                {errors[fieldName]?.message?.toString()}
              </FormHelperText>
            )}
          </FormControl>
        );
      }}
    />
  );
}
