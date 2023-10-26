"use client";

import { PaperN } from "@/components/PaperN";
import Title from "@/components/Title";
import { Box, Grid, Paper, Typography } from "@mui/material";

export default function DashboardPage() {
  return (
    <Paper elevation={2}>
      <Grid container spacing={2}>
        <Grid item xs={8}>
          <Typography
            sx={{
              padding: "1em 1em 1.5em 1em",
            }}
          >
            <Title>Dashboard</Title>
          </Typography>
        </Grid>
      </Grid>
    </Paper>
  );
}
