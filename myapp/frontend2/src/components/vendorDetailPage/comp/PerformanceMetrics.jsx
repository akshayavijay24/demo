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
  Divider as Separator,
} from "@mui/material";
import { TrendingUp } from "lucide-react";

const PerformanceMetrics = () => {
  const { id } = useParams();

  const [vendor, setVendor] = useState(null);
  const [loading, setLoading] = useState(true);

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
    <Grid item xs={12} md={4}>
      <Card variant="outlined" sx={{ height: "100%" }}>
        <CardHeader
          title={
            <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
              <TrendingUp color="#1976d2" size={20} />
              <Typography variant="h6" fontWeight="600" color="text.primary">
                Performance Metrics
              </Typography>
            </Box>
          }
        />
        <CardContent sx={{ pt: 0 }}>
          <Box sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
            <Box
              sx={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
              }}
            >
              <Typography
                variant="body2"
                fontWeight={500}
                color="text.secondary"
              >
                People Requested
              </Typography>
              <Typography variant="h6" fontWeight="700" color="text.primary">
                {vendor.performance_metrics.people_requested}
              </Typography>
            </Box>
            <Box
              sx={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
              }}
            >
              <Typography
                variant="body2"
                fontWeight={500}
                color="text.secondary"
              >
                People Assigned
              </Typography>
              <Typography variant="h6" fontWeight="700" color="text.primary">
                {vendor.performance_metrics.people_assigned}
              </Typography>
            </Box>
            <Separator sx={{ my: 2 }} />
            <Box
              sx={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
              }}
            >
              <Typography
                variant="body2"
                fontWeight={500}
                color="text.secondary"
              >
                Quality Score
              </Typography>
              <Typography variant="h6" fontWeight="700" color="text.primary">
                {vendor.performance_metrics.quality_score}%
              </Typography>
            </Box>
            <Box
              sx={{
                width: "100%",
                height: 12,
                bgcolor: "grey.300",
                borderRadius: 6,
                overflow: "hidden",
                mt: 0.5,
              }}
            >
              <Box
                sx={{
                  height: "100%",
                  bgcolor: "primary.main",
                  width: `${vendor.performance_metrics.quality_score}%`,
                }}
              />
            </Box>
          </Box>
        </CardContent>
      </Card>
    </Grid>
  );
};

export default PerformanceMetrics;
