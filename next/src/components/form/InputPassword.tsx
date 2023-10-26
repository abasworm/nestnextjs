import {
  FormControl,
  FormHelperText,
  IconButton,
  InputAdornment,
  InputLabel,
  OutlinedInput,
  TextField,
} from "@mui/material";
import { PropsWithRef, useState } from "react";
import { Control, Controller } from "react-hook-form";
import {
  Visibility as EyeOpenIcon,
  VisibilityOff as EyeCloseIcon,
} from "@mui/icons-material";

export default function InputPassword({
  fieldName,
  label,
  control,
  ...props
}: PropsWithRef<{
  fieldName: string;
  label: string;
  control: Control<any>;
}>) {
  const [showPassword, setShowPassword] = useState(false);
  const handleClickShowPassword = () => {
    setShowPassword((show) => !show);
  };
  return (
    <Controller
      name={fieldName}
      control={control}
      render={({ field: { onChange }, formState: { errors } }) => (
        <FormControl fullWidth variant="outlined">
          <InputLabel htmlFor={fieldName}>{label}</InputLabel>
          <OutlinedInput
            id={fieldName}
            fullWidth
            error={errors[fieldName] ? true : false}
            onChange={(e) => onChange(e.target.value)}
            type={showPassword ? "text" : "password"}
            endAdornment={
              <InputAdornment position="end">
                <IconButton
                  aria-label="toggle show password"
                  onClick={handleClickShowPassword}
                  edge="end"
                >
                  {" "}
                  {showPassword ? <EyeCloseIcon /> : <EyeOpenIcon />}
                </IconButton>
              </InputAdornment>
            }
            label={label}
            placeholder={label}
          />
          <FormHelperText error id={[fieldName, "-helpertext"].join("-")}>
            {errors[fieldName]?.message?.toString() || ""}
          </FormHelperText>
        </FormControl>
      )}
    />
  );
}
