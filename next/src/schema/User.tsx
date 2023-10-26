import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";

export const UserSchemaInsert = yupResolver(
  yup.object({
    email: yup.string().email().required(),
    password: yup.string().required().min(8),
    confirmPassword: yup.string().required().min(8),
    fullname: yup.string().min(4),
    isActive: yup.boolean(),
  }),
);

export const UserSchemaUpdate = yupResolver(
  yup.object({
    email: yup.string().email().required(),
    isActive: yup.string().required(),
    fullname: yup.string().min(4),
  }),
);

export const UserSchemaLogin = yupResolver(
  yup.object({
    email: yup.string().email().required(),
    password: yup.string().required().min(8),
  }),
);
