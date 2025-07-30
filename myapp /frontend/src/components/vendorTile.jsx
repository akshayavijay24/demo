import { Card, CardContent, Typography, Chip, Box } from "@mui/material";
import BusinessIcon from "@mui/icons-material/Business";
import AssignmentIcon from "@mui/icons-material/Assignment";

function VendorTile({ vendor, onClick }) {
  const getStatusColor = (status) => {
    switch (status.toLowerCase()) {
      case "active":
        return "success";
      case "pending":
        return "info";
      case "inactive":
        return "error";
      default:
        return "default";
    }
  };
  return (
    <Card
      sx={{
        width: 300,
        height: 180,
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
        p: 1,
        m: 1,
        cursor: "pointer",
        transition: "0.2s",
        "&:hover": { boxShadow: 6, borderColor: "primary.main" },
        border: 1,
        borderColor: "grey.300",
      }}
      onClick={onClick}
    >
      <CardContent>
        <Box display="flex" alignItems="center" mb={1}>
          <BusinessIcon color="primary" sx={{ mr: 1 }} />
          <Typography variant="h6" noWrap>
            {vendor.name}
          </Typography>
        </Box>
        <Typography variant="body2" color="text.secondary">
          Vendor ID: {vendor.id}
        </Typography>
        <Box mt={1} mb={1}>
          <Chip
            label={vendor.msa_status}
            color={getStatusColor(vendor.msa_status)}
            size="small"
          />
        </Box>
        <Typography variant="body2" color="text.secondary">
          Quality Score: <b>{vendor.performance_metrics.quality_score}</b>
        </Typography>
      </CardContent>
    </Card>
  );
}

export default VendorTile;
