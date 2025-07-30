import { Button, Typography, Card, CardContent } from "@mui/material";
import { Building2 } from "lucide-react";
// import BarChartComponent from "./BarchartComp";

const NoVendor = () => {

  return (
    <Card sx={{ width: 360 }}>
      <CardContent sx={{ textAlign: "center", py: 6 }}>
        <Building2 color="gray" size={48} />
        <Typography variant="h6" fontWeight="600" mt={2} mb={1}>
          Vendor Not Found
        </Typography>
        <Typography color="text.secondary" mb={3}>
          The vendor you're looking for doesn't exist.
        </Typography>
        <Button variant="contained" onClick={() => navigate("/")}>
          Return to Dashboard
        </Button>
      </CardContent>
    </Card>
  );
};

export default NoVendor;
