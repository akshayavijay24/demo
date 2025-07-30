import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import CircularProgress from "@mui/material/CircularProgress";
import { Button, Box, Grid, Typography, Chip as Badge } from "@mui/material";
import { ArrowLeft, Building2 } from "lucide-react";
// import BarChartComponent from "./BarchartComp";
import PieChartComponent from "../PieChartComponent";
import NoVendor from "./comp/NoVendor";
import PerformanceMetrics from "./comp/PerformanceMetrics";
import Contracts from "./comp/Contracts";
import WorkCompletion from "./comp/WorkCompletion";

const VendorDetailsPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [vendor, setVendor] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  useEffect(() => {
    const fetchVendor = async () => {
      try {
        const res = await fetch(`http://localhost:8000/vendordetails/${id}`);
        if (!res.ok) throw new Error("Vendor not found");
        const data = await res.json();
        setVendor(data);
      } catch (err) {
        setError(true);
      } finally {
        setLoading(false);
      }
    };
    fetchVendor();
  }, [id]);

  if (loading) {
    return (
      <Box
        minHeight="100vh"
        display="flex"
        justifyContent="center"
        alignItems="center"
      >
        <CircularProgress />
      </Box>
    );
  }

  if (error || !vendor) {
    return (
      <Box
        sx={{
          minHeight: "100vh",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          bgcolor: "background.default",
          p: 2,
        }}
      >
        <NoVendor />
      </Box>
    );
  }

  const getStatusColor = (status) => {
    switch (status.toLowerCase()) {
      case "active":
        return "primary";
      case "pending":
        return "warning";
      case "inactive":
        return "error";
      default:
        return "default";
    }
  };

  return (
    <Box
      sx={{
        minHeight: "100vh",
        bgcolor: "background.default",
        py: 6,
        px: 3,
      }}
    >
      <Box
        sx={{
          maxWidth: 1200,
          mx: "auto",
        }}
      >
        <Button
          startIcon={<ArrowLeft size={20} color="black" />}
          onClick={() => navigate("/")}
          sx={{
            mb: 4,
            color: "black",
            "& .MuiButton-startIcon": {
              color: "black",
            },
          }}
        >
          Back to Dashboard
        </Button>

        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            mb: 5,
          }}
        >
          <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
            <Building2 color="primary.main" size={32} />
            <Box>
              <Typography variant="h4" fontWeight="bold" color="text.primary">
                {vendor.name}
              </Typography>
              <Typography variant="body2" color="text.secondary">
                Vendor ID: {vendor.id}
              </Typography>
            </Box>
          </Box>
          <Badge
            label={vendor.msa_status}
            color={getStatusColor(vendor.msa_status)}
            sx={{
              fontWeight: 600,
              fontSize: "0.875rem",
              px: 2,
              py: 0.5,
              borderRadius: 2,
              textTransform: "capitalize",
            }}
          />
        </Box>

        <Grid
          container
          spacing={4}
          justifyContent="center"
          sx={{ width: "100%" }}
        >
          <PerformanceMetrics />

          <Contracts />

          <WorkCompletion />
        </Grid>
      </Box>
    </Box>
  );
};

export default VendorDetailsPage;
