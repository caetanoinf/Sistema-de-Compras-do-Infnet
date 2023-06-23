import { Stack } from "@mui/material";
import { Outlet } from "react-router-dom";
import { AppSidebar } from "./AppSidebar";

export function AuthenticatedLayout() {
  return (
    <Stack alignItems="center" justifyContent="center" direction="row">
      <AppSidebar />

      <Stack direction="column" sx={{ flex: 1, height: "100%", p: 6 }}>
        <Outlet />
      </Stack>
    </Stack>
  );
}
