"use client"
import { SnackbarProvider } from "notistack";

export default function LayoutLogin({
  children,
}: {
  children: React.ReactNode;
}) {
  return <SnackbarProvider maxSnack={3}>{children}</SnackbarProvider>;
}
