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
import { baseUrl ,QUIZ } from "../../../constants/apiUrl.js";
import { useEffect, useState } from "react";
import axios from "axios";
import { IconButton } from "@mui/material";
import { Edit as EditIcon, Delete as DeleteIcon } from "@mui/icons-material";

import { GradeModal } from "../../../views/admin/default/components/gradeModal.jsx";
// import { GradeModal } from "views/admin/default/components/gradeModal.jsx";
const columnHelper = createMRTColumnHelper();

const csvConfig = mkConfig({
  fieldSeparator: ",",
  decimalSeparator: ".",
  useKeysAsHeaders: true,
});

const GradeManage = () => {
  const [data, setData] = useState([]);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [selectedRow, setSelectedRow] = useState(null);

  const getallgrade =()=>{
    axios.get(baseUrl + QUIZ.getAllGrades).then((res) => {
      console.log(res.data.data);
      setData(res.data.data);
    });
  }


  useEffect(() => {
   getallgrade()
  }, []); // Empty dependency array ensures this runs once when the component mounts

  

  const handleDialogClose = () => {
    setDialogOpen(false);
    setSelectedRow(null); // Reset the selected row after closing the dialog
    getallgrade();
  };

  const handleCouponAdd = () => {
    setDialogOpen(true);
    getallgrade();
  };

  const handleEdit = (row) => {
    console.log("Edit clicked for row:", row);
    setSelectedRow(row.original); // Save the selected row data
    setDialogOpen(true); // Open the dialog
  };

  console.log(baseUrl + QUIZ.getAllGrades);

  const handleDelete = async (row) => {
    console.log("Delete clicked for row:", row);
    const response = await axios.post(
     ` ${baseUrl}${QUIZ.getGradeByIdAndDelete}/${row.original._id}`
    );
    console.log(response.data);
    getallgrade();
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
    columnHelper.accessor("_id", {
      header: "S.No",
      size: 20,
    }),
    columnHelper.accessor("name", {
      header: "Grade Name",
      size: 80,
    }),
    columnHelper.accessor("isActive", {
      header: "Status",
      size: 40,
      Cell: value => (value ? "Active" : "Inactive"),
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
        <GradeModal
          open={dialogOpen}
          onClose={handleDialogClose}
          inputData={selectedRow}
        />
      </div>
      <div className="flex">
        <h2 className="mb-4 text-2xl font-bold tracking-tight text-gray-900">
          Add new Grade
        </h2>
        <button
          onClick={handleCouponAdd}
          style={{ backgroundColor: "skyblue" }}
          className="mx-5 mb-4 rounded bg-sky-700 bg-sky-700 px-4 py-2 font-bold text-white  "
        >
          Add Grade
        </button>
      </div>
      <div>
        <MaterialReactTable table={table} />
      </div>
    </div>
  );
};

export default GradeManage;
