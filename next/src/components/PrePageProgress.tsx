import { CircularProgress } from "@mui/material";
import { PropsWithRef, useEffect, useState } from "react";
import style from "./PrePageProgresss.module.css";

export default function PrePageProgress({
  show,
  ...props
}: PropsWithRef<{ show: boolean | undefined }>) {
  return (
    <div
      className={[
        show ? style.loaderContainerShow : style.loaderContainerHide,
      ].join(" ")}
    >
      <CircularProgress color="primary" />
    </div>
  );
}
