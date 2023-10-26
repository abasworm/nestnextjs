"use client";
import Title from "@/components/Title";
import {
  AppBar,
  Box,
  Button,
  CircularProgress,
  Grid,
  Paper,
  TextField,
  Toolbar,
  Typography,
} from "@mui/material";
import styles from "@/styles/login.module.css";
import { FieldErrors, useForm } from "react-hook-form";
import { VariantType, useSnackbar } from "notistack";
import { UserSchemaLogin } from "@/schema/User";
import InputText from "@/components/form/InputText";
import InputPassword from "@/components/form/InputPassword";
import { useContext, useEffect, useState } from "react";
import axios from "axios";
import { useRouter } from "next/navigation";
import { Context } from "@/store";
import { LoginType } from "@/types/Login";

export default function LoginPage() {
  const [loading, setLoading] = useState(false);
  const { store } = useContext(Context);
  const router = useRouter();

  const {
    handleSubmit,
    control,
    formState: { errors },
  } = useForm({
    resolver: UserSchemaLogin,
  });

  const { enqueueSnackbar } = useSnackbar();

  const handleOnSubmit = async (data: LoginType) => {
    setLoading(true);
    console.log(data);
    try {
      // const results = await axios.post("/api/login", {
      //   email: data.email,
      //   password: data.password,
      // });
      const results = await store.login(data);
      if (!results) throw Error("Your Password or Email is Not Registered.");
      // console.log(results);
      //setButtonDisabled(true); // uncoment this for disabled button when finished

      enqueueSnackbar("Success Login. Please wait..", { variant: "success" });
      router.push("/dashboard");
    } catch (err) {
      console.log(err);
      enqueueSnackbar("Your Password or Email is Not Registered.", {
        variant: "error",
      });
      setLoading(false);
    }
  };

  const handleInvalidSubmit = (
    data: FieldErrors<{ email: string; password: string }>,
  ) => {
    console.log(data);
    enqueueSnackbar("Please fill the input with carefully.", {
      variant: "error",
    });
    if (data?.email)
      enqueueSnackbar(data.email?.message, {
        variant: "error",
      });
    if (data?.password)
      enqueueSnackbar(data.password?.message, {
        variant: "error",
      });
  };
  return (
    <body className={styles.body}>
      <AppBar position="static" sx={{ m: "0 0 3em 0" }}>
        <Toolbar>
          <Grid container justifyContent={"center"} wrap="wrap">
            <Grid item>
              <Typography variant="h6">Optimus</Typography>
            </Grid>
          </Grid>
        </Toolbar>
      </AppBar>

      <Grid container spacing={0} justifyItems={"center"}>
        <Grid item md={4}></Grid>
        <Grid item>
          <Paper elevation={4}>
            <form onSubmit={handleSubmit(handleOnSubmit, handleInvalidSubmit)}>
              <Grid
                container
                spacing={2}
                sx={{ p: "0 1em 0 0" }}
                justifyContent={"center"}
              >
                <Grid item>
                  <Title>Login</Title>
                </Grid>
              </Grid>
              <Grid container spacing={2} sx={{ p: "1em 1em" }}>
                <Grid item>
                  <InputText
                    control={control}
                    fieldName="email"
                    label="Email"
                  />
                </Grid>
                <Grid item>
                  <InputPassword
                    control={control}
                    fieldName="password"
                    label="Password"
                  />
                </Grid>
              </Grid>
              <Grid container spacing={0} sx={{ p: "1em 1em" }}>
                <Grid item>
                  <Box sx={{ m: 1, position: "relative" }}>
                    <Button
                      disabled={loading}
                      type="submit"
                      variant="contained"
                      color="primary"
                    >
                      Login
                    </Button>
                    {loading && (
                      <CircularProgress
                        size={24}
                        sx={{
                          position: "absolute",
                          top: "50%",
                          left: "50%",
                          marginTop: "-12px",
                          marginLeft: "-12px",
                        }}
                      />
                    )}
                  </Box>
                </Grid>
              </Grid>
            </form>
          </Paper>
        </Grid>
      </Grid>
    </body>
  );
}
