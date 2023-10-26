import { MenuList } from "@/types/MenuList";
import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import CssBaseline from "@mui/material/CssBaseline";
import Divider from "@mui/material/Divider";
import Grid from "@mui/material/Grid";
import IconButton from "@mui/material/IconButton";
import style from "./sidebar.module.css";

import {
  List,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Paper,
  Toolbar,
  Typography,
  styled,
} from "@mui/material";
import {
  PropsWithRef,
  ReactElement,
  useState,
  ReactNode,
  MouseEvent,
} from "react";
import { SidebarDrawer } from "./drawerComponents";
import {
  ChevronLeft as ChevronLeftIcon,
  ChevronRight as ChevronRightIcon,
} from "@mui/icons-material";
import { useRouter } from "next/navigation";
import Link from "next/link";

const applicationFullName: string = "Optimus";
const applicationShortName: string = "";

export default function LayoutSidebar({
  pages,
  handleCloseNavMenu,
  children,
  open,
  toggleDrawer,
  ...props
}: PropsWithRef<{
  pages: Array<MenuList>;
  handleCloseNavMenu: () => void;
  children: ReactNode;
  open: boolean;
  toggleDrawer: () => void;
}>): ReactElement {
  const router = useRouter();
  return (
    <Box sx={{ display: "flex" }}>
      <CssBaseline />
      <SidebarDrawer
        variant="permanent"
        open={open}
        sx={{ display: { xs: "none", md: "block" } }}
      >
        <Toolbar
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "flex-end",
            px: [1],
          }}
        >
          <Typography>
            {open ? applicationFullName : applicationShortName}
          </Typography>
          <IconButton onClick={() => toggleDrawer()}>
            {open ? <ChevronLeftIcon /> : <ChevronRightIcon />}
          </IconButton>
        </Toolbar>
        <Divider />
        <List component="nav">
          {pages.map((page, idx) => (
            <Link key={idx} href={page.link} className={style.menuLink}>
              <ListItemButton onClick={() => handleCloseNavMenu()}>
                <ListItemIcon>{page.icon}</ListItemIcon>
                <ListItemText primary={page.label} />
              </ListItemButton>
            </Link>
          ))}
          {/* {mainListItems}
          <Divider sx={{ my: 1 }} />
          {secondaryListItems} */}
        </List>
      </SidebarDrawer>
      <Box
        component="main"
        sx={{
          backgroundColor: (theme) =>
            theme.palette.mode === "light"
              ? theme.palette.grey[100]
              : theme.palette.grey[900],
          height: "100vh",
          overflow: "auto",
          flexGrow: 1,
        }}
      >
        <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
          {children}
        </Container>
      </Box>
    </Box>
  );
}
