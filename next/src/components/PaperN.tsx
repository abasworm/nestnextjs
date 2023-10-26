import { Paper, styled } from "@mui/material";

export const PaperN = styled(Paper)(({ theme }) => ({
  ...theme.typography.body2,
  height: "auto",
  lineHeight: "60px",
}));
