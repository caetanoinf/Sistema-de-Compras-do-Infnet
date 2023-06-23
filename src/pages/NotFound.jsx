import { Stack, Typography } from "@mui/material";

export function NotFound() {
  return (
    <Stack
      sx={{
        height: "100vh",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <Typography variant="h6">Ops...</Typography>
      <Typography variant="h1">404</Typography>
      <Typography variant="h4">Página não encontrada</Typography>
    </Stack>
  );
}
