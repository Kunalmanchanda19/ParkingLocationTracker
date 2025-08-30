import { Backdrop } from "@mui/material";
import { CircularProgressbarWithChildren } from "react-circular-progressbar";
import RadialSeparators from "./RadialSeparators";
import "react-circular-progressbar/dist/styles.css";
import React from "react";

interface AppBackdropProps {
  show: boolean;
}

const AppBackdrop: React.FC<AppBackdropProps> = ({ show }) => {
  return (
    <Backdrop
      sx={{
        color: "#4200f7ff",
        zIndex: (theme) => theme.zIndex.drawer + 1,
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
      open={show}
    >
      <div style={{ width: 40, height: 140, position: "relative" }}>
        <CircularProgressbarWithChildren
          value={100}
          styles={{
            path: { stroke: "#1505f1ff" },
            trail: { stroke: "#eee" },
          }}
        >
          <RadialSeparators
            count={40}
            style={{
              background: "#4b11e9ff",
              width: "2px",
              height: "10px",
            }}
          />
        </CircularProgressbarWithChildren>
      </div>
    </Backdrop>
  );
};

export default AppBackdrop;
