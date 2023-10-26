"use client";
import { MouseEvent } from "react";
import Title from "@/components/Title";
import InputPassword from "@/components/form/InputPassword";
import InputText from "@/components/form/InputText";
import SwitchYesNo from "@/components/form/SwitchYesNo";
import { UserSchemaInsert } from "@/schema/User";
import $api from "@/service/http";
import {
  Button,
  Grid,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TablePagination,
  TableRow,
  TextField,
  Typography,
} from "@mui/material";
import { useEffect, useState } from "react";
import { Controller, SubmitHandler, useForm } from "react-hook-form";
import qs from "querystring";

interface IPagination {
  rowsPerPage: number;
  page: number;
  search: string;
}

interface ITableMeta {
  hasNextPage: boolean;
  hasPreviousPage: boolean;
  itemCount: number;
  page: number;
  pageCount: number;
  take: number;
}

interface ITableDataArray {
  email: string;
  fullname: string;
  isActive: string;
}

interface ITableData {
  meta: ITableMeta;
  data: Array<ITableDataArray>;
}

// const pagination: IPagination =
export default function UserPage() {
  const [defaultValuesUserInsert, setDefaultValuesUserInsert] = useState({
    email: "",
    password: "",
    confirmPassword: "",
    fullname: "",
    isActive: false,
  });

  const [pagination, setPagination] = useState({
    rowsPerPage: 10,
    page: 1,
    search: "",
  });

  const [tableData, setTableData] = useState(({} as ITableData) || undefined);

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: UserSchemaInsert,
    defaultValues: defaultValuesUserInsert,
  });

  const handleOnSubmit = (data: any) => {
    console.log(data);
  };

  const getDataPage = async () => {
    try {
      const toSend = qs.encode(pagination);
      const result = await $api.get(`/api/user?${toSend}`);
      setTableData(result.data);
      console.log(result.data);
    } catch (error: any) {
      console.log(error.message);
    }
  };

  useEffect(() => {
    getDataPage();
  }, []);

  const handleOnPageChange = (
    e: MouseEvent<HTMLButtonElement, globalThis.MouseEvent> | null,
    pg: number,
  ) => {
    setPagination({ ...pagination, page: pg });
  };

  const handleOnRowsPerPageChange = () => {};

  return (
    <>
      <Paper elevation={2} sx={{ p: "1em 1em 1.5em 1em", m: 1 }}>
        <Title>Users</Title>
        <form onSubmit={handleSubmit(handleOnSubmit)}>
          <Grid container spacing={2}>
            <Grid item xs={12} md={5}>
              <InputText fieldName="email" label="Email" control={control} />
            </Grid>
            <Grid item xs={12} md={5}>
              <InputText
                fieldName="fullname"
                label="Fullname"
                control={control}
              />
            </Grid>
            <Grid item xs={12} md={5}>
              <InputPassword
                fieldName="password"
                label="Password"
                control={control}
              />
            </Grid>
            <Grid item xs={12} md={5}>
              <InputPassword
                fieldName="confirmPassword"
                label="Confirm Password"
                control={control}
              />
            </Grid>
            <Grid item xs={12} md={5}>
              <SwitchYesNo
                fieldName="isActive"
                label="Is Active"
                control={control}
              />
            </Grid>
            <Grid item xs={12}>
              <Button variant="contained" type="submit">
                Insert
              </Button>
            </Grid>
          </Grid>
        </form>
      </Paper>

      <Paper elevation={2} sx={{ p: "1em 1em 1.5em 1em", m: 1 }}>
        <Title>Tables</Title>
        <TextField label="Search" name="search" size="small" />
        <TableContainer sx={{ p: "1em 0em 0em 0em" }}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>No.</TableCell>
                <TableCell>Action</TableCell>
                <TableCell>Email</TableCell>
                <TableCell>Fullname</TableCell>
                <TableCell>Is Active</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {tableData &&
                tableData?.data?.map((dt, id) => (
                  <TableRow key={id}>
                    <TableCell>
                      {tableData.meta.page * tableData.meta.take -
                        (tableData.meta.page * tableData.meta.take - (id + 1))}
                    </TableCell>
                    <TableCell>
                      <Button onClick={() => {}}>Edit</Button>
                    </TableCell>
                    <TableCell>{dt.email}</TableCell>
                    <TableCell>{dt.fullname}</TableCell>
                    <TableCell>{dt.isActive}</TableCell>
                  </TableRow>
                ))}
            </TableBody>
          </Table>
        </TableContainer>
        <TablePagination
          rowsPerPageOptions={[10, 50, 100]}
          component="div"
          count={tableData?.meta?.itemCount | 0}
          rowsPerPage={pagination.rowsPerPage}
          page={pagination.page - 1}
          onPageChange={handleOnPageChange}
          onRowsPerPageChange={handleOnRowsPerPageChange}
        />
      </Paper>
    </>
  );
}
