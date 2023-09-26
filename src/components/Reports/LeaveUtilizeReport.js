import moment from "moment";
import React, { useState, useRef, useCallback, useMemo } from "react";
import DatePicker from "react-datepicker";
import { AgGridReact } from "ag-grid-react";
import { FaCalendarAlt } from "react-icons/fa";
import "./report.css";
function LeaveUtilizeReport() {
  const [startDate, setStartDate] = useState(new Date());

  const year = moment(startDate).format("yyyy");

  const gridRef = useRef();
  const [rowData, setRowData] = useState();
  const [columnDefs, setColumnDefs] = useState([
    {
      headerName: "User",
      field: "user_id",
      cellClassRules: { "show-cell": "value !== undefined" },
      resizable: true,
      filter: true,
    },
    {
      field: "year",
      headerName: "Year",
      filter: true,
    },
    {
      headerName: "Annual Leave",
      children: [
        { field: "annual_used", headerName: "Used" },
        { field: "annual_leave_balance", headerName: "Available" },
        { field: "total_annual_leave", headerName: "Total" },
      ],
    },
    {
      headerName: "Sick Leave",
      children: [
        { field: "sick_used", headerName: "Used" },
        { field: "sick_leave_balance", headerName: "Available" },
        { field: "total_sick_leave", headerName: "Total" },
      ],
    },
    {
      headerName: "Unpaid Leave",
      children: [
        {
          field: "unpaid_used",
          headerName: "Used",
        },
        { field: "unpaid_leave_balance", headerName: "Available" },
        { field: "total_unpaid_leave", headerName: "Total" },
      ],
    },
  ]);
  const defaultColDef = useMemo(() => {
    return {
      resizable: true,
    };
  }, []);

  function onFirstDataRendered(params) {
    params.api.sizeColumnsToFit();
  }

  const onGridReady = useCallback((params) => {
    fetch("report/annualSituation")
      .then((resp) => resp.json())
      .then((data) => {
        console.log(data);
        setRowData(data);
      });
  }, []);

  const onBtnExport = useCallback(() => {
    gridRef.current.api.exportDataAsCsv();
  }, []);
  return (
    <>
      <div>
        <div
          style={{
            display: "flex",
            flexDirection: "row-reverse",
            paddingBottom: "10px",
          }}
        >
          <button className="export-btn" onClick={onBtnExport}>
            <span>Export to CSV</span>
          </button>
        </div>
        <div
          className="ag-theme-balham"
          style={{ height: "500px", width: "100%" }}
        >
          <AgGridReact
            ref={gridRef}
            rowData={rowData}
            columnDefs={columnDefs}
            defaultColDef={defaultColDef}
            suppressRowTransform={true}
            onGridReady={onGridReady}
            onFirstDataRendered={onFirstDataRendered}
          />
        </div>
      </div>
    </>
  );
}

export default LeaveUtilizeReport;
