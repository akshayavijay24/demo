import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import CircularProgress from "@mui/material/CircularProgress";
import {
  Box,
  Grid,
  Typography,
  Card,
  CardContent,
  CardHeader,
} from "@mui/material";
import { TrendingUp } from "lucide-react";

import PieChartComponent from "../../PieChartComponent";

const VendorDetailsPage = () => {
  const { id } = useParams();

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

  return (
    <Grid item xs={12} md={6}>
      <Card
        sx={{
          width: "100%",
          minHeight: 400,
        }}
        variant="outlined"
      >
        <CardHeader
          title={
            <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
              <TrendingUp color="secondary" fontSize="small" />
              <Typography variant="h6" fontWeight={600} color="text.primary">
                Work Completion
              </Typography>
            </Box>
          }
        />
        <CardContent
          sx={{
            height: 360,
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            p: 2,
          }}
        >
          <Box sx={{ width: "100%", height: "100%" }}>
            <PieChartComponent
              completed={vendor.performance_metrics.people_assigned}
              total={vendor.performance_metrics.people_requested}
            />
          </Box>
        </CardContent>
      </Card>
    </Grid>
  );
};

export default VendorDetailsPage;
