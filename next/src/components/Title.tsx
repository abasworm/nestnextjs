import { Typography } from "@mui/material";
import { ReactNode } from "react";

interface TitleProps {
  children?: ReactNode;
}
export default function Title(props: TitleProps) {
  return (
    <Typography variant="h6" color="primary" gutterBottom>
      {props.children}
    </Typography>
  );
}
