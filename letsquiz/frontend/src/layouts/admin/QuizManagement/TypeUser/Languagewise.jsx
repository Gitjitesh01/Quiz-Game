import React, { useEffect, useState } from "react";
import swal from "sweetalert";
import { baseUrl, QUIZ } from "../../../../constants/apiUrl";
import {
  MaterialReactTable,
  createMRTColumnHelper,
  useMaterialReactTable,
} from "material-react-table";
import { Box, Button } from "@mui/material";
import FileDownloadIcon from "@mui/icons-material/FileDownload";
import DeleteIcon from "@mui/icons-material/Delete";
import { mkConfig, generateCsv } from "export-to-csv";
import axios from 'axios';

const columnHelper = createMRTColumnHelper();
const tableType = "quizTable";

const csvConfig = mkConfig({
  fieldSeparator: ",",
  decimalSeparator: ".",
  useKeysAsHeaders: true,
});

const handleDeleteQuiz = (quizId, data, setData) => {
  const deleteUrl = `${baseUrl}${QUIZ.getQuiz}${quizId}`;
  console.log(`Deleting quiz with ID: ${quizId}`);
  console.log(`Delete URL: ${deleteUrl}`);

  axios.delete(deleteUrl)
    .then((response) => {
      if (response.data.success) {
        console.log(response.data.message);
        const newData = data.filter((row) => row._id !== quizId);
        setData(newData);
      } else {
        console.error(response.data.message);
      }
    })
    .catch((error) => {
      console.error("Error deleting quiz data:", error);
      console.error("Error response data:", error.response?.data);
    });
};

const handleDeleteButtonClick = (quizId, data, setData) => {
  swal({
    title: "Are you sure?",
    text: "Once deleted, you will not be able to recover this quiz!",
    icon: "warning",
    buttons: true,
    dangerMode: true,
  }).then((willDelete) => {
    if (willDelete) {
      handleDeleteQuiz(quizId, data, setData);
    }
  });
};

const QuizTable = () => {
  const [data, setData] = useState([]);
  const [selectedRow, setSelectedRow] = useState(null);
  const [dialogOpen, setDialogOpen] = useState(false);

  useEffect(() => {
    axios.get(baseUrl + QUIZ.getAllQuiz)
    .then((response) => {
      console.log(response.data.allQuiz);
      if (response.data.success) {
        setData(response.data.allQuiz);
      } else {
        console.error(response.data.message);
      }
    }
    )
  }, []);
  if(data){
    console.log(data);
  }

  const handleOpen = (rowData) => {
    setSelectedRow(rowData);
    setDialogOpen(true);
  };

  const handleDialogClose = () => {
    setDialogOpen(false);
    setSelectedRow(null);
  };

  const columns = [
    columnHelper.accessor("_id", {
      header: "ID",
      size: 80,
    }),
    columnHelper.accessor("quizTitle", {
      header: "Quiz Title",
      size: 200,
    }),
    columnHelper.accessor("quizDescription", {
      header: "Description",
      size: 300,
    }),
    columnHelper.accessor("isActive", {
      header: "Active",
      size: 80,
      Cell: ({ cell }) => (cell.getValue() ? "Yes" : "No"),
    }),
    columnHelper.accessor("quizType", {
      header: "Type",
      size: 80,
    }),
    columnHelper.accessor("createdAt", {
      header: "Created At",
      size: 200,
      Cell: ({ cell }) => new Date(cell.getValue()).toLocaleString(),
    }),
    columnHelper.accessor("startdate", {
      header: "Start Date",
      size: 200,
      Cell: ({ cell }) => new Date(cell.getValue()).toLocaleString(),
    }),
    columnHelper.accessor("enddate", {
      header: "End Date",
      size: 200,
      Cell: ({ cell }) => new Date(cell.getValue()).toLocaleString(),
    }),
    columnHelper.accessor("deleteButton", {
      header: "Delete",
      size: 80,
      Cell: ({ cell }) => (
        <Button
          variant="contained"
          color="secondary"
          onClick={() => handleDeleteButtonClick(cell.row.original._id, data, setData)}
          startIcon={<DeleteIcon />}
        >
          Delete
        </Button>
      ),
    }),
  ];

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

export default QuizTable;
