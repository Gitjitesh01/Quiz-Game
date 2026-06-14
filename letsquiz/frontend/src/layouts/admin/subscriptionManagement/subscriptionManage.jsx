import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import {
  MaterialReactTable,
  createMRTColumnHelper,
  useMaterialReactTable,
} from "material-react-table";
import { Box, Button, IconButton } from "@mui/material";
import FileDownloadIcon from "@mui/icons-material/FileDownload";
import { mkConfig, generateCsv } from "export-to-csv";
import axios from "axios";
import { Edit as EditIcon, Delete as DeleteIcon } from "@mui/icons-material";
import { SubscriptionFormModal } from "../../../views/admin/default/components/CheckTable.jsx";
// import { SubscriptionFormModal } from "views/admin/default/component/subscriptionModal.jsx";
import { baseUrl } from "../../../constants/apiUrl.js";
import { dataService } from "./subscriptionData.js";

const columnHelper = createMRTColumnHelper();

const csvConfig = mkConfig({
  fieldSeparator: ",",
  decimalSeparator: ".",
  useKeysAsHeaders: true,
});

const SubscriptionManage = () => {
  const [data, setData] = useState([]);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [selectedRow, setSelectedRow] = useState(null);

  const columns = [
    // Your column definitions here...
    columnHelper.accessor("id", {
      header: "S.No",
      size: 20,
    }),
    columnHelper.accessor("subscriptionName", {
      header: "Subscription Name",
      size: 20,
    }),
    columnHelper.accessor("price", {
      header: "Price",
      size: 20,
    }),
    columnHelper.accessor("description", {
      header: "Description",
      size: 20,
    }),
    columnHelper.accessor("mcq", {
      header: "Multiple Choice",
      size: 80,
      Cell: ({ cell }) => (cell.getValue() ? "Yes" : "No"),
    }),
    columnHelper.accessor("fillups", {
      header: "Fill in the Blanks",
      size: 80,
      Cell: ({ cell }) => (cell.getValue() ? "Yes" : "No"),
    }),
    columnHelper.accessor("truefalse", {
      header: "True or False",
      size: 80,
      Cell: ({ cell }) => (cell.getValue() ? "Yes" : "No"),
    }),
    columnHelper.accessor("matching", {
      header: "Matching",
      size: 80,
      Cell: ({ cell }) => (cell.getValue() ? "Yes" : "No"),
    }),
    columnHelper.accessor("draganddrop", {
      header: "Drag & Drop",
      size: 80,
      Cell: ({ cell }) => (cell.getValue() ? "Yes" : "No"),
    }),
    columnHelper.accessor("shortanswer", {
      header: "Short Answers",
      size: 80,
      Cell: ({ cell }) => (cell.getValue() ? "Yes" : "No"),
    }),
    columnHelper.accessor("dropdown", {
      header: "Drop Down",
      size: 80,
      Cell: ({ cell }) => (cell.getValue() ? "Yes" : "No"),
    }),
    columnHelper.accessor("checkbox", {
      header: "Check Box",
      size: 80,
      Cell: ({ cell }) => (cell.getValue() ? "Yes" : "No"),
    }),
    columnHelper.accessor("date", {
      header: "Date",
      size: 80,
      Cell: ({ cell }) => (cell.getValue() ? "Yes" : "No"),
    }),
    columnHelper.accessor("email", {
      header: "Email",
      size: 80,
      Cell: ({ cell }) => (cell.getValue() ? "Yes" : "No"),
    }),
    columnHelper.accessor("poll", {
      header: "Poll",
      size: 80,
      Cell: ({ cell }) => (cell.getValue() ? "Yes" : "No"),
    }),
    columnHelper.accessor("wordcloud", {
      header: "Word Cloud",
      size: 80,
      Cell: ({ cell }) => (cell.getValue() ? "Yes" : "No"),
    }),
    columnHelper.accessor("imageInQuestions", {
      header: "Image in Questions",
      size: 80,
      Cell: ({ cell }) => (cell.getValue() ? "Yes" : "No"),
    }),
    columnHelper.accessor("audioInQuestions", {
      header: "Audio in Questions",
      size: 80,
      Cell: ({ cell }) => (cell.getValue() ? "Yes" : "No"),
    }),
    columnHelper.accessor("videoInQuestions", {
      header: "Video in Questions",
      size: 80,
      Cell: ({ cell }) => (cell.getValue() ? "Yes" : "No"),
    }),
    columnHelper.accessor("certificates", {
      header: "Certificates",
      size: 80,
      Cell: ({ cell }) => (cell.getValue() ? "Yes" : "No"),
    }),
    columnHelper.accessor("certificateTemplates", {
      header: "Certificate Templates",
      size: 80,
      Cell: ({ cell }) => (cell.getValue() ? "Yes" : "No"),
    }),
    columnHelper.accessor("ownCertificateTemplate", {
      header: "Own Certificate Template",
      size: 80,
      Cell: ({ cell }) => (cell.getValue() ? "Yes" : "No"),
    }),
    columnHelper.accessor("createPaidQuizzes", {
      header: "Create Paid Quizzes",
      size: 80,
      Cell: ({ cell }) => (cell.getValue() ? "Yes" : "No"),
    }),
    columnHelper.accessor("status", {
      header: "Status",
      size: 80,
    }),
    columnHelper.accessor("action", {
      header: "Action",
      size: 40,
      Cell: ({ row }) => (
        <div>
          <IconButton onClick={() => handleEdit(row)}>
            <EditIcon />
          </IconButton>
          <IconButton onClick={() => handleDelete(row)}>
            <DeleteIcon />
          </IconButton>
        </div>
      ),
    }),
  ];

  const fetchData = async () => {
    const tmpdata = await dataService();
    setData(tmpdata);
  };

  useEffect(() => {
    fetchData();
  }, []); // Empty dependency array ensures this runs once when the component mounts

  const handleDialogClose = () => {
    setDialogOpen(false);
    setSelectedRow(null); // Reset the selected row after closing the dialog
    fetchData(); // Fetch the updated data
  };

  const handleCouponAdd = () => {
    setDialogOpen(true);
  };

  const handleEdit = (row) => {
    setSelectedRow(row.original); // Save the selected row data
    setDialogOpen(true); // Open the dialog
  };

  const handleDelete = async (row) => {
    await axios.post(baseUrl + "delete-subscription/" + row.original._id, {
      isActive: false,
    });
    fetchData(); // Fetch the updated data after deletion
  };

  const handleExportRows = (rows) => {
    const rowData = rows.map((row) => row.original);
    const csv = generateCsv(csvConfig)(rowData);
    downloadCsv(csv, "export.csv");
  };

  const handleExportData = () => {
    const csv = generateCsv(csvConfig)(data);
    downloadCsv(csv, "export.csv");
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

  const table = useMaterialReactTable({
    columns,
    data,
    enableRowSelection: true,
    columnFilterDisplayMode: "popover",
    paginationDisplayMode: "pages",
    positionToolbarAlertBanner: "bottom",
    renderTopToolbarCustomActions: ({ table }) => (
      <Box
        sx={{ display: "flex", gap: "16px", padding: "8px", flexWrap: "wrap" }}
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
    <div className="container">
      <div className="mb-4">
        <SubscriptionFormModal
          open={dialogOpen}
          onClose={handleDialogClose}
          inputData={selectedRow}
        />
      </div>
      <div className="flex">
        <h2 className="mb-4 text-2xl font-bold tracking-tight text-gray-900">
          Add new Subscription Coupon
        </h2>
        <button
          onClick={handleCouponAdd}
          style={{ backgroundColor: "skyblue" }}
          className="mx-5 mb-4 rounded bg-sky-700 px-4 py-2 font-bold text-white"
        >
          Add Subscription
        </button>
      </div>
      <div>
        <MaterialReactTable table={table} />
      </div>
    </div>
  );
};

export default SubscriptionManage;
