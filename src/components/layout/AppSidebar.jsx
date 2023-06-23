import { Box, Drawer, List, ListItem, ListItemButton, ListItemIcon, ListItemText, ListSubheader, Typography } from "@mui/material";

import PersonIcon from "@mui/icons-material/Person";
import { useAuth } from "../../hooks";
import { Link as RouterLink, useLocation } from "react-router-dom";
import { useMemo } from "react";
import { HandshakeTwoTone, PermContactCalendarTwoTone, LogoutTwoTone, AddIcCallTwoTone } from "@mui/icons-material";

const drawerWidth = 280;

const roleLabelMap = {
  admin: "Administrador",
  manager: "Gerente de Vendas",
};

export function AppSidebar() {
  const { pathname } = useLocation();
  const { signOut, authenticatedUser } = useAuth();
  const role = authenticatedUser?.profile?.role ?? "admin";

  const links = useMemo(() => {
    const roleLinkMap = {
      admin: [
        { icon: <HandshakeTwoTone />, label: "Fornecedores", path: "/" },
        { icon: <PermContactCalendarTwoTone />, label: "Contatos", path: "/contacts" },
      ],
      manager: [{ icon: <PersonIcon />, label: "Cotações", path: "/quotes" }],
    };

    return roleLinkMap[role] ?? [];
  }, [role]);

  const handleLogout = () => {
    signOut();
  };

  return (
    <Drawer
      variant="permanent"
      anchor="left"
      sx={{
        width: drawerWidth,
        flexShrink: 0,
        "& .MuiDrawer-paper": {
          width: drawerWidth,
          boxSizing: "border-box",
          height: "100%",
          background: "linear-gradient(180deg, #FFFFFF 0%, #E5E5E5 100%)",
        },
      }}
    >
      <Box sx={{ display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", py: 2 }}>
        <img src="/logo.png" alt="Logo" width="140" />
        <Typography variant="caption" component="div" sx={{ textTransform: "uppercase", color: "grey.800", fontWeight: "bold" }}>
          Central de Fornecedores
        </Typography>
      </Box>

      <List component="nav" sx={{ flex: 1, display: "flex", flexDirection: "column" }}>
        <ListSubheader sx={{ background: "transparent" }}>{roleLabelMap[role]}</ListSubheader>

        {links.map((link) => (
          <AppSidebarItem key={link.path} link={link} pathname={pathname} />
        ))}

        <Box sx={{ flexGrow: 1 }} />

        <ListItem disablePadding>
          <ListItemButton onClick={handleLogout}>
            <ListItemIcon>
              <LogoutTwoTone />
            </ListItemIcon>
            <ListItemText primary="Sair" />
          </ListItemButton>
        </ListItem>
      </List>
    </Drawer>
  );
}

function AppSidebarItem({ link, pathname, isNested }) {
  return (
    <ListItem key={link.path} disablePadding>
      <ListItemButton
        component={RouterLink}
        to={link.path}
        selected={link.path === pathname}
        sx={{
          ...(isNested && {
            pl: 4,
          }),
        }}
      >
        <ListItemIcon>{link.icon}</ListItemIcon>
        <ListItemText primary={link.label} />
      </ListItemButton>
    </ListItem>
  );
}
