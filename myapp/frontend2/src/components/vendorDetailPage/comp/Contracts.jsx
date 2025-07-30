import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import CircularProgress from "@mui/material/CircularProgress";
import {
  Box,
  Grid,
  Typography,
  Card,
  CardContent,
  CardHeader,
  Chip as Badge,
} from "@mui/material";
import { Calendar, FileText } from "lucide-react";

const Contracts = () => {
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

  return (
    <Grid item xs={12} md={8}>
      <Card variant="outlined" sx={{ height: "100%" }}>
        <CardHeader
          title={
            <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
              <FileText color="#1976d2" size={20} />
              <Typography variant="h6" fontWeight="600" color="text.primary">
                Contracts
              </Typography>
            </Box>
          }
        />
        <CardContent sx={{ pt: 0 }}>
          <Box sx={{ display: "flex", flexDirection: "column", gap: 3 }}>
            {vendor.contracts.map((contract, index) => (
              <Box
                key={index}
                sx={{
                  p: 3,
                  border: 1,
                  borderColor: "divider",
                  borderRadius: 2,
                  bgcolor: "background.paper",
                }}
              >
                <Box
                  sx={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "flex-start",
                    mb: 2,
                  }}
                >
                  <Typography
                    variant="subtitle1"
                    fontWeight="600"
                    color="text.primary"
                  >
                    {contract.name}
                  </Typography>
                  <Badge
                    label={contract.rate_card}
                    variant="outlined"
                    color="primary"
                    sx={{
                      fontWeight: 600,
                      fontSize: "0.75rem",
                      py: 0.5,
                      px: 1.5,
                    }}
                  />
                </Box>

                <Grid container spacing={2} mb={2}>
                  <Grid
                    item
                    xs={6}
                    sm={3}
                    sx={{ display: "flex", alignItems: "center", gap: 1 }}
                  >
                    <Calendar color="#6b7280" size={16} />
                    <Box>
                      <Typography
                        variant="caption"
                        fontWeight={600}
                        color="text.secondary"
                        display="block"
                      >
                        Start Date
                      </Typography>
                      <Typography variant="body2" color="text.secondary">
                        {contract.start_date}
                      </Typography>
                    </Box>
                  </Grid>
                  <Grid
                    item
                    xs={6}
                    sm={3}
                    sx={{ display: "flex", alignItems: "center", gap: 1 }}
                  >
                    <Calendar color="#6b7280" size={16} />
                    <Box>
                      <Typography
                        variant="caption"
                        fontWeight={600}
                        color="text.secondary"
                        display="block"
                      >
                        End Date
                      </Typography>
                      <Typography variant="body2" color="text.secondary">
                        {contract.end_date}
                      </Typography>
                    </Box>
                  </Grid>
                </Grid>

                <Box mb={2}>
                  <Typography variant="subtitle2" fontWeight={600} gutterBottom>
                    Scope of Work
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    {contract.scope_of_work}
                  </Typography>
                </Box>

                <Box>
                  <Typography variant="subtitle2" fontWeight={600} gutterBottom>
                    Deliverables
                  </Typography>
                  <Box sx={{ display: "flex", flexWrap: "wrap", gap: 1 }}>
                    {contract.deliverables.map((deliverable, idx) => (
                      <Badge
                        key={idx}
                        label={deliverable}
                        variant="outlined"
                        sx={{
                          fontSize: "0.75rem",
                          fontWeight: 500,
                          px: 1.5,
                          py: 0.5,
                        }}
                      />
                    ))}
                  </Box>
                </Box>
              </Box>
            ))}
          </Box>
        </CardContent>
      </Card>
    </Grid>
  );
};

export default Contracts;
