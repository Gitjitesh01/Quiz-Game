import React from "react";
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
import { dataService } from "./discountData.js";
import { useEffect, useState } from "react";
import { baseUrl, discount } from "../../../constants/apiUrl.js";
import axios from "axios";
import { IconButton } from "@mui/material";
import { Edit as EditIcon, Delete as DeleteIcon } from "@mui/icons-material";

import { DiscountForm } from "../../../views/admin/default/components/discountModal.jsx";
// import { DiscountForm } from "views/admin/default/component/discountModal.jsx";
const columnHelper = createMRTColumnHelper();

const csvConfig = mkConfig({
  fieldSeparator: ",",
  decimalSeparator: ".",
  useKeysAsHeaders: true,
});

const DiscountManage = () => {
  const [data, setData] = useState([]);
  const [discountOpen, setDialogOpen] = useState(false);

  const fetchData = async () => {
    axios
      .get(baseUrl + discount.getAllDiscount)
      .then((response) => {
        setData(response.data);
      })
      .catch((error) => {
        console.error("Error fetching user data:", error);
        swal("Error", "There was an error fetching the data!", "error");
      });
  };

  useEffect(() => {
    fetchData();
  }, []); // Empty dependency array ensures this runs once
  const [selectedRow, setSelectedRow] = useState(null);

  const handleDialogClose = () => {
    setDialogOpen(false);
    setSelectedRow(null); // Reset the selected row after closing the dialog
    fetchData();
  };
  const handleCouponAdd = () => {
    setDialogOpen(true);
    fetchData();

  };
  const handleEdit = (row) => {
    console.log("Edit clicked for row:", row);
    setSelectedRow(row.original); // Save the selected row data
    setDialogOpen(true); // Open the dialog
    fetchData();

  };

  const handleDelete = async (row) => {
    console.log("Delete clicked for row:", row);
    const response = await axios.post(
      baseUrl + "delete-discount/" + row.original._id
    );
    fetchData();
    console.log(response.data);
  };

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

  const columns = [
    columnHelper.accessor("id", {
      header: "S.No",
      size: 20,
    }),
    columnHelper.accessor("code", {
      header: "Code",
      size: 80,
    }),
    columnHelper.accessor("type", {
      header: "Type",
      size: 80,
    }),
    columnHelper.accessor("applyTo", {
      header: "applyon",
      size: 40,
    }),
    columnHelper.accessor("value", {
      header: "Value",
      size: 30,
    }),
    columnHelper.accessor("status", {
      header: "Status",
      size: 40,
    }),
    
    columnHelper.accessor("action", {
      header: "Action",
      size: 40,
      Cell: ({ row }) => (
        <div>
          <IconButton onClick={() => handleDelete(row)}>
            <DeleteIcon />
          </IconButton>
        </div>
      ),
    }),
  ];
  const table = useMaterialReactTable({
    columns,
    data,
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

  return (
    <div className="container  ">
      <div className="mb-4">
        <DiscountForm selectedRow={selectedRow} open={discountOpen} onClose={handleDialogClose} />
      </div>
      <div className="flex">
        <h2 className="mb-4 text-2xl font-bold tracking-tight text-gray-900">
          Add new Discount Coupon
        </h2>
        <button
          onClick={handleCouponAdd}
          style={{ backgroundColor: "skyblue" }}
          className="mx-5 mb-4 rounded bg-sky-700 bg-sky-700 px-4 py-2 font-bold text-white  "
        >
          Add Coupon
        </button>
      </div>
      <div>
        <MaterialReactTable table={table} />
      </div>
    </div>
  );
};

export default DiscountManage;
