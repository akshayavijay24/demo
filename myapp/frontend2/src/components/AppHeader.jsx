import React from "react";
import {
  AppBar,
  Toolbar,
  Typography,
  Box,
  Container,
  TextField,
} from "@mui/material";
import { Business } from "@mui/icons-material";
// import { useState } from "react";

const AppHeader = () => {
  // const [search, setSearch] = useState("");

  return (
    <AppBar
      position="sticky"
      sx={{
        background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
        backdropFilter: "blur(10px)",
        borderBottom: "1px solid rgba(255, 255, 255, 0.12)",
        zIndex: 50,
      }}
    >
      <Container maxWidth="xl">
        <Toolbar
          sx={{
            minHeight: "64px !important",
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
          }}
        >
          <Box sx={{ display: "flex", alignItems: "center", gap: 1.5 }}>
            <Business
              sx={{
                fontSize: 24,
                color: "primary.contrastText",
              }}
            />
            <Typography
              variant="h6"
              component="h1"
              sx={{
                fontWeight: 600,
                color: "primary.contrastText",
                fontSize: "1.25rem",
              }}
            >
              Vendor Dashboard
            </Typography>
          </Box>
          {/* <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
            <TextField
              placeholder="Search vendors..."
              variant="outlined"
              size="small"
              sx={{
                width: 250,
                backgroundColor: "#fff",
                borderRadius: 1,
              }}
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
          </Box> */}

        </Toolbar>
      </Container>
    </AppBar>
  );
};

export default AppHeader;
