import React, { useState, useEffect } from "react";
import { RadioTile, RadioTileGroup, Divider } from "rsuite";
import ReportType from "./ReportType";

function ReportMainPage() {
  const [type, setType] = useState("leaves");

  const handleType = (e) => {
    console.log(e);
    setType(e);
  };
  return (
    <>
      <RadioTileGroup defaultValue="leaves" inline aria-label="Leaves">
        <RadioTile
          label="Leaves"
          value="leaves"
          onChange={(e) => handleType("leaves")}
        ></RadioTile>
        <RadioTile
          label="Annual Situation"
          value="annual"
          onChange={(e) => handleType("annual")}
        ></RadioTile>
        <RadioTile
          label="Graph"
          value="graph"
          onChange={(e) => handleType("graph")}
        ></RadioTile>
      </RadioTileGroup>
      <Divider />
      <ReportType type={type}></ReportType>
    </>
  );
}

export default ReportMainPage;
