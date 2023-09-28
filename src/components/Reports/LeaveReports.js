import { useResource } from "../../Common/useResource";
import moment from "moment";
import DatePicker from "react-datepicker";
import React, { useState, useRef, useCallback, useMemo } from "react";
import DataTable from "react-data-table-component";
import { AgGridReact } from "ag-grid-react";
import "ag-grid-community/styles/ag-theme-balham.css";
import { FaFileCsv } from "react-icons/fa";
import "./report.css";

function LeaveReports() {
  const [startDate, setStartDate] = useState(new Date());
  const year = moment(startDate).format("yyyy");

  const gridRef = useRef();
  const rowSpan = (params) => {
    var count = 1;
    var user = params.data ? params.data.user_id : undefined;
    console.log(user);
    const keys = Object.keys(countsByCs);
    keys.forEach((key) => {
      if (key === user) {
        count = countsByCs[key];
        return count;
      }
    });
    console.log(count);
    return count;
  };

  var filterParams = {
    comparator: (filterLocalDateAtMidnight, cellValue) => {
      var dateAsString = cellValue;
      if (dateAsString == null) return -1;
      var dateParts = dateAsString.split("/");
      var cellDate = new Date(
        Number(dateParts[2]),
        Number(dateParts[1]) - 1,
        Number(dateParts[0])
      );
      if (filterLocalDateAtMidnight.getTime() === cellDate.getTime()) {
        return 0;
      }
      if (cellDate < filterLocalDateAtMidnight) {
        return -1;
      }
      if (cellDate > filterLocalDateAtMidnight) {
        return 1;
      }
      return 0;
    },
  };
  const [rowData, setRowData] = useState();
  const [columnDefs, setColumnDefs] = useState([
    {
      headerName: "User",
      field: "user_id",
      rowSpan: rowSpan,
      cellClassRules: { "show-cell": "value !== undefined" },
      resizable: true,
      filter: true,
    },
    { field: "leave_type", resizable: true, filter: true },
    {
      headerName: "Range",
      children: [
        {
          field: "start_date",
          headerName: "Start",
          filter: "agDateColumnFilter",
          // filterParams: filterParams,
        },
        { field: "end_date", headerName: "End", filter: "agDateColumnFilter" },
      ],
    },

    { field: "amount" },
    { field: "status", filter: true },
  ]);
  const defaultColDef = useMemo(() => {
    return {
      resizable: true,
    };
  }, []);

  function onFirstDataRendered(params) {
    params.api.sizeColumnsToFit();
  }
  const countsByCs = {};
  const onGridReady = useCallback((params) => {
    fetch("index.php/report/allLeave")
      .then((resp) => resp.json())
      .then((data) => {
        data.forEach(({ user_id }) => {
          countsByCs[user_id] = (countsByCs[user_id] || 0) + 1;
        });
        console.log(countsByCs);
        data.forEach((obj) => {
          !data[obj.user_id] ? (data[obj.user_id] = true) : delete obj.user_id;
        });
        setRowData(data);
      });
  }, []);

  const onBtnExport = useCallback(() => {
    gridRef.current.api.exportDataAsCsv();
  }, []);

  return (
    <>
      <div className="top-row">
        {/* <div className="form-group ">
          <DatePicker
            className="form-control"
            selected={startDate}
            onChange={(date) => setStartDate(date)}
            dateFormat="MM/yyyy"
            maxDate={new Date()}
            showMonthYearPicker
            showFullMonthYearPicker
            showTwoColumnMonthYearPicker
          />
        </div> */}
        <div style={{ color: "transparent" }}>cdcs</div>

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
    </>
  );
}

export default LeaveReports;
