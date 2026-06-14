import React, { useEffect ,useMemo,useState } from "react";
import swal from "sweetalert";

("react");
import { Link } from "react-router-dom";
import {
  MaterialReactTable,
  createMRTColumnHelper,
  useMaterialReactTable,
} from "material-react-table";
import { Box, Button } from "@mui/material";
import FileDownloadIcon from "@mui/icons-material/FileDownload";
import { mkConfig, generateCsv } from "export-to-csv"; // Removed 'download' import
// import { data } from "./LedgerData.js";
import { baseUrl } from "../../../constants/apiUrl.js";
import axios from "axios";


const columnHelper = createMRTColumnHelper();

const columns = [
  columnHelper.accessor("id", {
    header: "S.No",
    size: 20,
  }),

  columnHelper.accessor("userid", {
    header: "User Id",
    size: 80,
  }),

  columnHelper.accessor("subscription", {
    header: "Total Payment By The User (Subscription)",
    size: 300,
  }),

  columnHelper.accessor("quiz", {
    header: "Total Payment User (Paid Quiz)",
    size: 300,
  }),

  columnHelper.accessor("payment", { // Assuming you meant a total payment field
    header: "Total Payment By The User",
    size: 300,
  }),

  columnHelper.accessor("income", {
    header: "Income",
    size: 40,
  }),

];

const csvConfig = mkConfig({
  fieldSeparator: ",",
  decimalSeparator: ".",
  useKeysAsHeaders: true,
});

const LedgerManage = () => {

  const [data, setdata] = useState([]);
  const [filterdata , setfilterdata] = useState([]);

  const handleExportRows = (rows) => {
    const rowData = rows.map((row) => row.original);
    const csv = generateCsv(csvConfig)(rowData);
    downloadCsv(csv, "export.csv"); // Use the downloadCsv function
  };

  const handleExportData = () => {
    const csv = generateCsv(csvConfig)(data);
    downloadCsv(csv, "export.csv"); // Use the downloadCsv function
  };

  const downloadCsv = (csv, filename) => {
    const blob = new Blob([csv], { type: "text/csv" });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.style.display = "none";
    a.href = url;
    a.download = filename;
    document.body.appendChild(a);
    a.click();
    window.URL.revokeObjectURL(url);
  };

  const getalldata = async () => {
    axios.get(baseUrl + "transaction").then((response) => {
      console.log(response.data);
      if (response.data) {
        setdata(response.data);
      }
    });
  };

  useEffect(() => {
    getalldata();
  }, []);

  useEffect(() => {
    const sortedData = arrangeData(data);
    setfilterdata(sortedData);
  }, [data]);


  const arrangeData = (data) => {
    let userMap = new Map();

    data.forEach((d) => {
      if (!userMap.has(d.userId)) {
        userMap.set(d.userId, {
          id: userMap.size + 1,
          userid: d.userId,
          payment: 0,
          income: 0,
          persentepaidtoowner: 0,
          count: 0, // To keep track of the number of entries for averaging
          quiz: 0, // Initialize quiz field
          subscription: 0, // Initialize subscription field
          // Add other transaction types as needed
        });
      }

      let userData = userMap.get(d.userId);
      userData.payment += parseFloat(d.amount);
      userData.persentepaidtoowner += parseFloat(d.persentepaidtoowner);
      userData.count += 1;

      // Update specific transaction type fields
      const transactionType = d.type || 'Unknown'; // Default to 'Unknown' if transactionType is undefined
      if (transactionType === 'quiz') {
        userData.quiz += parseFloat(d.amount);
      } else if (transactionType === 'subscription') {
        userData.subscription += parseFloat(d.amount);
      }
      // Add other transaction types as needed

      userMap.set(d.userId, userData);
    });

    // Calculate the average persentepaidtoowner and income
    userMap.forEach((userData) => {
      userData.persentepaidtoowner /= userData.count;
      userData.income = userData.payment * (userData.persentepaidtoowner / 100);
      delete userData.count; // Remove the count property as it's no longer needed
    });

    return Array.from(userMap.values());
  };

  useMemo (() => {
    const sortedData = arrangeData(data);
    setfilterdata(sortedData);
  }, [data]);
  console.log(filterdata);


  const table = useMaterialReactTable({
    columns,
    data: filterdata,
    enableRowSelection: true,
    columnFilterDisplayMode: "popover",
    paginationDisplayMode: "pages",
    positionToolbarAlertBanner: "bottom",
    renderTopToolbarCustomActions: ({ table }) => (
      <Box
        sx={{
          display: "flex",
          gap: "16px",
          padding: "8px",
          flexWrap: "wrap",
        }}
      >
        <Button onClick={handleExportData} startIcon={<FileDownloadIcon />}>
          Export All Data
        </Button>
        <Button
          disabled={table.getPrePaginationRowModel().rows.length === 0}
          onClick={() =>
            handleExportRows(table.getPrePaginationRowModel().rows)
          }
          startIcon={<FileDownloadIcon />}
        >
          Export All Rows
        </Button>
        <Button
          disabled={table.getRowModel().rows.length === 0}
          onClick={() => handleExportRows(table.getRowModel().rows)}
          startIcon={<FileDownloadIcon />}
        >
          Export Page Rows
        </Button>
        <Button
          disabled={
            !table.getIsSomeRowsSelected() && !table.getIsAllRowsSelected()
          }
          onClick={() => handleExportRows(table.getSelectedRowModel().rows)}
          startIcon={<FileDownloadIcon />}
        >
          Export Selected Rows
        </Button>
      </Box>
    ),
  });

  return <MaterialReactTable table={table} />;
};

export default LedgerManage;
