import {
  Drawer,
  List,
  ListItem,
  ListItemText,
  Toolbar,
  Box,
} from "@mui/material";
import { useNavigate } from "react-router-dom";

const drawerWidth = 240;

function Sidebar() {
  const navigate = useNavigate();

  return (
    <Drawer
      variant="permanent"
      sx={{
        width: drawerWidth,
        flexShrink: 0,
        [`& .MuiDrawer-paper`]: {
          width: drawerWidth,
          boxSizing: "border-box",
          paddingTop:16
        },
      }}
    >
      <Toolbar />
      <Box sx={{ overflow: "auto" }}>
        <List>
          <ListItem button onClick={() => navigate("/")}>
            <ListItemText primary="Dashboard" />
          </ListItem>
        </List>
      </Box>
    </Drawer>
  );
}

export default Sidebar;
