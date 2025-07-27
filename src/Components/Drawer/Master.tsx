import * as React from "react";
import Button from "@mui/material/Button";
import Collapse from "@mui/material/Collapse";
import List from "@mui/material/List";
import DevicesIcon from "@mui/icons-material/Devices";
import ListItem from "@mui/material/ListItem";
import ListItemText from "@mui/material/ListItemText";
import { Link, ListItemButton, ListItemIcon, Typography } from "@mui/material";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";

interface functions {
  name: string;
  path?: string;
  subFunctions?: functions[];
}
const functions: functions[] = [
  { name: "Controllers", path: "/controllers" },
  
];

const Master:React.FC=()=> {
  const [open, setOpen] = React.useState(false);

  const handleToggle = () => {
    setOpen(!open);
  };

  return (
    <div>
      {/* <Typography  >
        Master
      </Typography> */}
      <ListItemButton onClick={handleToggle}>
        <ListItemIcon>
          <DevicesIcon />
        </ListItemIcon>

        <ListItemText
          sx={{ fontSize: 16, fontFamily: "sans-serif", fontWeight: "bolder" }}
        >
          
          Master
        </ListItemText>
      </ListItemButton>
      <Collapse in={open} timeout="auto" unmountOnExit>
        {functions.map(({ name, path }, index) => (
          <ListItem key={name} disablePadding>
            <Link href={path} sx={{ textDecoration: "none", color: "black" }}>
              <ListItemButton>
                <ListItemIcon>
                  <ArrowForwardIcon />
                </ListItemIcon>

                <ListItemText
                  primary={name}
                  sx={{
                    fontSize: 16,
                    fontFamily: "sans-serif",
                    fontWeight: "bolder",
                  }}
                />
              </ListItemButton>
            </Link>
          </ListItem>
        ))}
      </Collapse>
    </div>
  );
}
export default Master;
