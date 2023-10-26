"use client";
import {
  AppBar,
  Avatar,
  Box,
  Button,
  Container,
  IconButton,
  Menu,
  MenuItem,
  Toolbar,
  Tooltip,
  Typography,
  styled,
  createTheme,
  ThemeProvider,
  Drawer as MuiDrawer,
  Divider,
  List,
  ListItem,
  ListItemProps,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  CssBaseline,
  Grid,
  Paper,
  Breadcrumbs,
  Link,
  LinkProps,
} from "@mui/material";
import {
  Menu as MenuIcon,
  Adb as AdbIcon,
  ChevronLeft as ChevronLeftIcon,
  ChevronRight as ChevronRightIcon,
  Dashboard as DashboardIcon,
  Person as PersonIcon,
  People as PeopleIcon,
  Work as WorkIcon,
  ExpandLess as ExpandLessIcon,
  ExpandMore as ExpandMoreIcon,
  SvgIconComponent,
} from "@mui/icons-material";
import { useState, MouseEvent, ReactElement, Fragment } from "react";
import {
  Link as RouterLink,
  Route,
  Routes,
  MemoryRouter,
  useLocation,
} from "react-router-dom";
import Title from "@/components/Title";

interface MenuList {
  label: string;
  link: string;
  icon: ReactElement;
  children?: Array<MenuList>;
}

interface ListItemLinkProps extends ListItemProps {
  to: string;
  open?: boolean;
}

interface LinkRouterProps extends LinkProps {
  to: string;
  replace?: boolean;
}

const applicationFullName: string = "Optimus";
const applicationShortName: string = "";

const LinkRouter = (props: LinkRouterProps) => {
  return <Link {...props} component={RouterLink as any} />;
};

const pages: Array<MenuList> = [
  {
    label: "Management",
    link: "#",
    icon: <WorkIcon />,
    children: [
      {
        label: "User",
        link: "/management/user",
        icon: <PersonIcon />,
      },
      {
        label: "User Group",
        link: "/management/user-group",
        icon: <PeopleIcon />,
      },
    ],
  },
  {
    label: "User",
    link: "user",
    icon: <PersonIcon />,
  },
  {
    label: "User Group",
    link: "user-group",
    icon: <PeopleIcon />,
  },
];

const settings: Array<{ label: string; link: string }> = [
  {
    label: "Profile",
    link: "profile",
  },
  {
    label: "Logout",
    link: "logout",
  },
];

const defaultTheme = createTheme();
const drawerWidth: number = 240;

const Drawer = styled(MuiDrawer, {
  shouldForwardProp: (prop) => prop !== "open",
})(({ theme, open }) => ({
  "& .MuiDrawer-paper": {
    position: "relative",
    whiteSpace: "nowrap",
    width: drawerWidth,
    transition: theme.transitions.create("width", {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
    boxSizing: "border-box",
    ...(!open && {
      overflowX: "hidden",
      transition: theme.transitions.create("width", {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.leavingScreen,
      }),
      width: theme.spacing(7),
      [theme.breakpoints.up("sm")]: {
        width: theme.spacing(9),
      },
    }),
  },
}));

const ListItemLink = (props: ListItemLinkProps) => {
  const { to, open, ...other } = props;

  let icon = null;
  if (open != null) {
    icon = open ? <ExpandLessIcon /> : <ExpandMoreIcon />;
  }

  return (
    <li>
      <ListItem components={RouterLink as any} {...other}>
        <ListItemText />
        {icon}
      </ListItem>
    </li>
  );
};

const Page = () => {
  const location = useLocation();
  const pathnames = location.pathname.split("/").filter((x) => x);

  return (
    <Breadcrumbs aria-label="breadcrumb">
      {/* <LinkRouter underline="hover" color="inherit" to="/">
        Home
      </LinkRouter>
      {pathnames.map((value, index) => {
        const last = index === pathnames.length - 1;
        const to = `/${pathnames.slice(0, index + 1).join("/")}`;

        return last ? (
          <Typography color="text.primary" key={to}>
            {breadcrumbNameMap[to]}
          </Typography>
        ) : (
          <LinkRouter underline="hover" color="inherit" to={to} key={to}>
            {breadcrumbNameMap[to]}
          </LinkRouter>
        );
      })} */}

      {/* {pages.map((page:MenuList, idx) => (
        (page.children) ?
          <Typography color="text.primary" key={idx}>
              <ListItem>
                <ListItemIcon>{page.icon}</ListItemIcon>
                <ListItemText primary={page.label} />
            </ListItem>
          </Typography>
          { page.children.?map((pChildren:MenuList, idxx:number) => (
            <LinkRouter key={idxx} to={handleCloseNavMenu}>
              <ListItem>
                <ListItemIcon>{pChildren.icon}</ListItemIcon>
                <ListItemText primary={pChildren.label} />
              </ListItem>
            </LinkRouter>
          ))} 
        :
        <LinkRouter key={idx} to={handleCloseNavMenu}>
          <ListItem>
            <ListItemIcon>{page.icon}</ListItemIcon>
            <ListItemText primary={page.label} />
          </ListItem>
        </LinkRouter>
      ))} */}
    </Breadcrumbs>
  );
};

export default function Application() {
  const [auth, setAuth] = useState(true);
  const [anchorElNav, setAnchorElNav] = useState<null | HTMLElement>(null);
  const [anchorElUser, setAnchorElUser] = useState<null | HTMLElement>(null);
  const [open, setOpen] = useState<boolean>(false);

  const toggleDrawer = () => {
    setOpen(!open);
  };

  const handleOpenNavMenu = (event: MouseEvent<HTMLElement>) => {
    setAnchorElNav(event.currentTarget);
  };

  const handleOpenUserMenu = (event: MouseEvent<HTMLElement>) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };

  return (
    <ThemeProvider theme={defaultTheme}>
      <AppBar position="static">
        <Container maxWidth="xl">
          <Toolbar disableGutters>
            <AdbIcon sx={{ display: { xs: "none", md: "flex" }, mr: 1 }} />
            <Typography
              variant="h6"
              noWrap
              component="a"
              href="/"
              sx={{
                mr: 2,
                display: {
                  xs: "none",
                  md: "flex",
                },
                fontFamily: "monospace",
                fontWeight: 700,
                letterSpacing: ".3rem",
                color: "inherit",
                textDecoration: "none",
              }}
            >
              OPTIMUS
            </Typography>
            <Box sx={{ flexGrow: 1, display: { xs: "flex", md: "none" } }}>
              <IconButton
                size="large"
                aria-label="account of current user"
                aria-controls="menu-appbar"
                aria-haspopup="true"
                onClick={handleOpenNavMenu}
                color="inherit"
              >
                <MenuIcon />
              </IconButton>
              <Menu
                id="menu-appbar"
                anchorEl={anchorElNav}
                anchorOrigin={{
                  vertical: "bottom",
                  horizontal: "left",
                }}
                keepMounted
                transformOrigin={{
                  vertical: "top",
                  horizontal: "left",
                }}
                open={Boolean(anchorElNav)}
                onClose={handleCloseNavMenu}
                sx={{
                  display: { xs: "block", md: "none" },
                }}
              >
                {pages.map((page, idx) => (
                  <MenuItem key={idx} onClick={handleCloseNavMenu}>
                    <Typography textAlign="center">{page.label}</Typography>
                  </MenuItem>
                ))}
              </Menu>
            </Box>
            <AdbIcon sx={{ display: { xs: "flex", md: "none" }, mr: 1 }} />
            <Typography
              variant="h5"
              noWrap
              component="a"
              href="/"
              sx={{
                mr: 2,
                display: { xs: "flex", md: "none" },
                flexGrow: 1,
                fontFamily: "monospace",
                fontWeight: 700,
                letterSpacing: ".3rem",
                color: "inherit",
                textDecoration: "none",
              }}
            >
              Optimus
            </Typography>
            <Box sx={{ flexGrow: 1, display: { xs: "none", md: "flex" } }}>
              {/* {pages.map((page, idx) => (
                <Button
                  key={idx}
                  onClick={handleCloseNavMenu}
                  sx={{ my: 2, color: "white", display: "block" }}
                >
                  {page.label}
                </Button>
              ))} */}
            </Box>

            <Box sx={{ flexGrow: 0 }}>
              <Tooltip title="Open settings">
                <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                  <Avatar alt="Remy Sharp" src="/static/images/avatar/2.jpg" />
                </IconButton>
              </Tooltip>
              <Menu
                sx={{ mt: "45px" }}
                id="menu-appbar"
                anchorEl={anchorElUser}
                anchorOrigin={{
                  vertical: "top",
                  horizontal: "right",
                }}
                keepMounted
                transformOrigin={{
                  vertical: "top",
                  horizontal: "right",
                }}
                open={Boolean(anchorElUser)}
                onClose={handleCloseUserMenu}
              >
                {settings.map((setting, idx) => (
                  <MenuItem key={idx} onClick={handleCloseUserMenu}>
                    <Typography textAlign="center">{setting.label}</Typography>
                  </MenuItem>
                ))}
              </Menu>
            </Box>
          </Toolbar>
        </Container>
      </AppBar>
      <Box sx={{ display: "flex" }}>
        <CssBaseline />
        <Drawer
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
            <IconButton onClick={toggleDrawer}>
              {open ? <ChevronLeftIcon /> : <ChevronRightIcon />}
            </IconButton>
          </Toolbar>
          <Divider />
          <List component="nav">
            {pages.map((page, idx) => (
              <ListItemButton key={idx} onClick={handleCloseNavMenu}>
                <ListItemIcon>{page.icon}</ListItemIcon>
                <ListItemText primary={page.label} />
              </ListItemButton>
            ))}
            {/* {mainListItems}
          <Divider sx={{ my: 1 }} />
          {secondaryListItems} */}
          </List>
        </Drawer>
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
            <Grid container spacing={3}>
              <Grid item xs={12} md={8} lg={9}>
                <Paper
                  sx={{
                    p: 2,
                    display: "flex",
                    flexDirection: "column",
                    height: 240,
                  }}
                >
                  {/* <Fragment> */}
                  <Title>Users</Title>
                  {/* </Fragment> */}
                  <h1>Hello world</h1>
                  <Button variant="contained">Oke</Button>
                </Paper>
              </Grid>
            </Grid>
          </Container>
        </Box>
      </Box>
    </ThemeProvider>
  );
}
