import { useEffect, useState } from "react";
import { styled, useTheme, Theme, CSSObject } from "@mui/material/styles";
import Box from "@mui/material/Box";
import MuiDrawer from "@mui/material/Drawer";
import MuiAppBar, { AppBarProps as MuiAppBarProps } from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import List from "@mui/material/List";
import Typography from "@mui/material/Typography";
import Divider from "@mui/material/Divider";
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import { ILayout, IPayloadToken } from "@/interface";
import "./styles.scss";
import LogoutIcon from "@mui/icons-material/Logout";
import removeCookies from "../../services/cookies/removeCookies";
import { loginRoutes } from "@/routes";
import { useNavigate } from "react-router-dom";
import { links } from "@/data";
import { Tooltip } from "@mui/material";
import { getStorage, pipe, removeStorage } from "@/util";

const prefix = "c-layout";

const drawerWidth = 240;

const openedMixin = (theme: Theme): CSSObject => ({
  width: drawerWidth,
  transition: theme.transitions.create("width", {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.enteringScreen,
  }),
  overflowX: "hidden",
});

const closedMixin = (theme: Theme): CSSObject => ({
  transition: theme.transitions.create("width", {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  overflowX: "hidden",
  width: `calc(${theme.spacing(7)} + 1px)`,
  [theme.breakpoints.up("sm")]: {
    width: `calc(${theme.spacing(8)} + 1px)`,
  },
});

const DrawerHeader = styled("div")(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  justifyContent: "space-between",
  padding: theme.spacing(0, 1),
  ...theme.mixins.toolbar,
}));

interface AppBarProps extends MuiAppBarProps {
  open?: boolean;
}

const AppBar = styled(MuiAppBar, {
  shouldForwardProp: (prop) => prop !== "open",
})<AppBarProps>(({ theme }) => ({
  zIndex: theme.zIndex.drawer + 1,
  transition: theme.transitions.create(["width", "margin"], {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  variants: [
    {
      props: ({ open }) => open,
      style: {
        marginLeft: drawerWidth,
        width: `calc(100% - ${drawerWidth}px)`,
        transition: theme.transitions.create(["width", "margin"], {
          easing: theme.transitions.easing.sharp,
          duration: theme.transitions.duration.enteringScreen,
        }),
      },
    },
  ],
}));

const Drawer = styled(MuiDrawer, {
  shouldForwardProp: (prop) => prop !== "open",
})(({ theme }) => ({
  width: drawerWidth,
  flexShrink: 0,
  whiteSpace: "nowrap",
  boxSizing: "border-box",
  variants: [
    {
      props: ({ open }) => open,
      style: {
        ...openedMixin(theme),
        "& .MuiDrawer-paper": openedMixin(theme),
      },
    },
    {
      props: ({ open }) => !open,
      style: {
        ...closedMixin(theme),
        "& .MuiDrawer-paper": closedMixin(theme),
      },
    },
  ],
}));

export const Layout = ({ children }: ILayout) => {
  const theme = useTheme();
  const [open, setOpen] = useState(false);
  const [isAdmin, setIsAdmin] = useState(false);
  const [name, setName] = useState("");
  const navigate = useNavigate();

  const handleDrawerOpen = () => setOpen(true);

  const handleDrawerClose = () => setOpen(false);

  const navigateView = (path: string) => navigate(path);

  const closeSession = () => {
    removeCookies("token");
    removeStorage("user");
    navigate(loginRoutes.signIn);
  };

  const parseObject = (objet: string) => JSON.parse(objet);

  const setNames = (data: IPayloadToken) => {
    const names = data.name?.split(" ");
    const lastname = data.lastName?.split(" ");
    setName(`${names[0]} ${lastname[0]}`);
    return data;
  };

  const setAdmin = (data: IPayloadToken) => {
    setIsAdmin(data.isAdmin);
    return data;
  };

  useEffect(() => {
    const local = getStorage("user");
    pipe(setNames, setAdmin)(parseObject(local!));
  }, []);

  return (
    <Box>
      <AppBar position="fixed" open={open}>
        <Toolbar>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            onClick={handleDrawerOpen}
            edge="start"
            sx={[
              {
                marginRight: 5,
              },
              open && { display: "none" },
            ]}
          >
            <MenuIcon />
          </IconButton>
          <Box className={`${prefix}__appbar`}>
            <Typography variant="h6" noWrap component="div">
              {name}
            </Typography>
            <IconButton
              color="inherit"
              aria-label="cerrar sesión"
              onClick={closeSession}
              edge="start"
            >
              <LogoutIcon />
            </IconButton>
          </Box>
        </Toolbar>
      </AppBar>
      <Drawer variant="permanent" open={open}>
        <DrawerHeader>
          <IconButton onClick={handleDrawerClose}>
            {theme.direction === "rtl" ? (
              <ChevronRightIcon />
            ) : (
              <ChevronLeftIcon />
            )}
          </IconButton>
        </DrawerHeader>
        <Divider />
        <List>
          {links
            .filter(({ adminOnly }) => isAdmin || !adminOnly)
            .map(({ text, icon, path }, index) => (
              <div key={index}>
                <Tooltip placement="right" title={open ? "" : text}>
                  <ListItem disablePadding sx={{ display: "block" }}>
                    <ListItemButton
                      onClick={() => navigateView(path)}
                      sx={[
                        { minHeight: 48, px: 2.5 },
                        open
                          ? { justifyContent: "initial" }
                          : { justifyContent: "space-between" },
                      ]}
                    >
                      <ListItemIcon
                        sx={[
                          { minWidth: 0, justifyContent: "center" },
                          open ? { mr: 3 } : { mr: "auto" },
                        ]}
                      >
                        {icon}
                      </ListItemIcon>
                      <ListItemText
                        primary={text}
                        sx={[open ? { opacity: 1 } : { opacity: 0 }]}
                      />
                    </ListItemButton>
                  </ListItem>
                </Tooltip>
              </div>
            ))}
        </List>
      </Drawer>
      <Box
        component="main"
        p={{ xs: 1, sm: 2, lg: 3 }}
        ml={{ xs: "56px", sm: "64px" }}
      >
        <DrawerHeader />
        {children}
      </Box>
    </Box>
  );
};
