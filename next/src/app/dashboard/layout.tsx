"use client";
import LayoutHeader from "@/components/layout/header";
import createTheme from "@mui/material/styles/createTheme";
import ThemeProvider from "@mui/material/styles/ThemeProvider";
import { MenuList } from "@/types/MenuList";
import { useContext, useEffect, useState } from "react";
import {
  Work as WorkIcon,
  Person as PersonIcon,
  People as PeopleIcon,
  Home as HomeIcon,
} from "@mui/icons-material";
import LayoutSidebar from "@/components/layout/sidebar";
import { Context } from "@/store";
import { useRouter } from "next/navigation";
import PrePageProgress from "@/components/PrePageProgress";
// menu from database
const menuLists: Array<MenuList> = [
  {
    label: "Dashboard",
    link: "/dashboard",
    icon: <HomeIcon />,
  },
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
    link: "/dashboard/user",
    icon: <PersonIcon />,
  },
  {
    label: "User Group",
    link: "user-group",
    icon: <PeopleIcon />,
  },
];

const settingLists: Array<{ label: string; link: string }> = [
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

export default function LayoutDashboard({
  children,
}: {
  children: React.ReactNode;
}) {
  const [open, setOpen] = useState<boolean>(true);
  const [anchorElNav, setAnchorElNav] = useState<null | HTMLElement>(null);
  const [anchorElUser, setAnchorElUser] = useState<null | HTMLElement>(null);
  const [showPrePage, setShowPrePage] = useState(true);

  const { store } = useContext(Context);
  const router = useRouter();
  const checkAuth = async () => {
    if (await store.checkAuth()) router.push("/login");
  };

  useEffect(() => {
    if (!store.isAuth) {
      checkAuth();
    }

    setShowPrePage(false);
    return () => {};
  }, []);

  useEffect(() => {}, [router]);

  const toggleDrawer = () => {
    setOpen(!open);
  };
  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };

  return (
    <ThemeProvider theme={defaultTheme}>
      <PrePageProgress show={showPrePage} />
      <LayoutHeader pages={menuLists} settings={settingLists} />
      <LayoutSidebar
        open={open}
        toggleDrawer={() => toggleDrawer()}
        pages={menuLists}
        handleCloseNavMenu={() => handleCloseNavMenu()}
      >
        {children}
      </LayoutSidebar>
    </ThemeProvider>
  );
}
