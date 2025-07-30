import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setVendors } from "./store/store";
import axios from "axios";
import { Grid, Box, Stack } from "@mui/material";
import VendorTile from "./components/vendorTile";
import VendorDetailsPage from "./components/vendorDetailPage/VendorDetailsPage";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  useNavigate,
} from "react-router-dom";
import AppHeader from "./components/AppHeader";
// import Sidebar from "./components/Sidebar";

function VendorList() {
  const dispatch = useDispatch();
  const vendors = useSelector((state) => state.vendors.list);
  const navigate = useNavigate();
  const [search, setSearch] = useState("");

  useEffect(() => {
    axios.get("http://localhost:8000/vendors").then((res) => {
      dispatch(setVendors(res.data));
    });
  }, [dispatch]);

  const filtered = vendors.filter((v) =>
    v.name.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <Box sx={{ background: "#f7f9fb", minHeight: "100vh", pb: 6 }}>
      <Box sx={{ maxWidth: 1100, mx: "auto" }}>
        <Stack
          direction="row"
          spacing={3}
          sx={{
            mb: 3,
            justifyContent: "center",
            textAlign: "center",
          }}
        ></Stack>
        <Grid container spacing={2} justifyContent="center">
          {filtered.map((vendor) => (
            <Grid item xs={12} sm={6} md={3} key={vendor.id}>
              <VendorTile
                vendor={vendor}
                onClick={() => navigate(`/vendor/${vendor.id}`)}
              />
            </Grid>
          ))}
        </Grid>
      </Box>
    </Box>
  );
}

function App() {
  return (
    <Router>
      <AppHeader />
      {/* <Sidebar /> */}
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          bgcolor: "#f7f9fb",
          minHeight: "100vh",
          p: 3,
          ml: "240px",
        }}
      >
        <Routes>
          <Route path="/" element={<VendorList />} />
          <Route path="/vendor/:id" element={<VendorDetailsPage />} />
        </Routes>
      </Box>
    </Router>
  );
}

export default App;
