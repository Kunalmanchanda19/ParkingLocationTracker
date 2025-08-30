import { Box, Card, CardContent, Grid, Link, Typography } from "@mui/material";
import React, { JSX } from "react";
import SearchIcon from "@mui/icons-material/Search";
import DirectionsCarIcon from "@mui/icons-material/DirectionsCar";

const Dashboard: React.FC = () => {
  interface functions {
    name: string;
    path?: string;
    icon: JSX.Element;
    subFunctions?: functions[];
  }


const functions: functions[] = [
  { name: "Search Vehicle", path: "/search", icon: <DirectionsCarIcon sx={{ fontSize: 80 }} /> },
];

  return (
    <Grid
      container
      spacing={2}
      sx={{ paddingX: 4, paddingY: 2 }}
      className=""
    >
      {functions.map((item, idx) => (
        <Grid
          item
          key={idx}
          xs={12}
          md={3}
          className="p-2"
        >
          <Link
            href={item.path}
            sx={{ textDecoration: "none", color: "black" }}
          >
            <Card
              elevation={3}
              sx={{
                transition: "all 1.5s eaase -in-out",
                '&:hover': {
                  transform: "scale(1.03)",
                  boxShadow: 10
                },
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                height: 180,
              }}
            >
              <CardContent
                sx={{
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  justifyContent: "center",
                  gap: 1,
                }}
              >
                <Box>{item.icon}</Box>
                <Typography variant="subtitle1" fontWeight="bold" textAlign="center">
                  {item.name}
                </Typography>
              </CardContent>
            </Card>
          </Link>
        </Grid>
      ))}
    </Grid>
  );
};

export default Dashboard;
