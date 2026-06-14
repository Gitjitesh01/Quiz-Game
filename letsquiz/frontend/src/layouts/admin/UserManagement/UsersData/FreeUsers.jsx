import React, { useEffect, useState } from "react";
import swal from "sweetalert";
import { baseUrl, USER } from "../../../../constants/apiUrl";
import { Link } from "react-router-dom";
import {
  MaterialReactTable,
  createMRTColumnHelper,
  useMaterialReactTable,
} from "material-react-table";
import { Box, Button } from "@mui/material";
import FileDownloadIcon from "@mui/icons-material/FileDownload";
import DeleteIcon from "@mui/icons-material/Delete";
import { mkConfig, generateCsv } from "export-to-csv";
import { userDataService } from "../../../../constants/makeData";
import { SimpleDialog } from "../../../../views/admin/default/components/simpleBar";
import axios from 'axios';

const columnHelper = createMRTColumnHelper();
const tableType = "userTable";

const csvConfig = mkConfig({
  fieldSeparator: ",",
  decimalSeparator: ".",
  useKeysAsHeaders: true,
});

const handleDeleteUser = (userId, data, setData) => {
  axios.delete(`${baseUrl}${USER.deleteUser}/${userId}`)
    .then((response) => {
      console.log(response);
      const newData = data.filter((row) => row.userId !== userId);
      setData(newData);
    })
    .catch((error) => {
      console.error("Error deleting user data:", error);
    });
};


const handleDeleteButtonClick = (userId, data, setData) => {
  swal({
    title: "Are you sure?",
    text: "Once deleted, you will not be able to recover this user!",
    icon: "warning",
    buttons: true,
    dangerMode: true,
  }).then((willDelete) => {
    if (willDelete) {
      handleDeleteUser(userId, data, setData);
    }
  });
};

const Languagewise = () => {
  const [data, setData] = useState([]);
  const [selectedRow, setSelectedRow] = useState(null);
  const [dialogOpen, setDialogOpen] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      const tmpdata = await userDataService();
      setData(tmpdata);
    };
    fetchData();
  }, []);

  const handleOpen = (rowData) => {
    setSelectedRow(rowData);
    setDialogOpen(true);
  };

  const handleDialogClose = () => {
    setDialogOpen(false);
    setSelectedRow(null);
  };

  const columns = [
    columnHelper.accessor("sno", {
      header: "S.No",
      size: 80,
    }),
    columnHelper.accessor("userId", {
      header: "User ID",
      size: 80,
      Cell: ({ cell }) => (
        <div>
          {selectedRow && (
            <SimpleDialog
              open={dialogOpen}
              onClose={handleDialogClose}
              value={selectedRow}
              type={tableType}
              showInnerTable={true}
            />
          )}
          <Button onClick={() => handleOpen(cell.row.original)}>
            {cell.getValue()}
          </Button>
        </div>
      ),
    }),
    columnHelper.accessor("userType", {
      header: "User Type",
      size: 80,
    }),
    columnHelper.accessor("status", {
      header: "Status",
      size: 80,
    }),
    columnHelper.accessor("quizesCreated", {
      header: "Quizzes Created",
      size: 80,
    }),
    columnHelper.accessor("quizzesAttendedfree", {
      header: "Quizzes Attended (Free)",
      size: 250,
    }),
    columnHelper.accessor("quizzesAttendedPaid", {
      header: "Quizzes Attended (Paid)",
      size: 250,
    }),
    columnHelper.accessor("amountSpentPaid", {
      header: "Amount Spent by User on Paid",
      size: 340,
    }),
    columnHelper.accessor("quiz", {
      header: "Quiz",
      size: 80,
    }),
    columnHelper.accessor("totalCertificatesEarnedFree", {
      header: "Total Certificates (Free)",
      size: 250,
    }),
    columnHelper.accessor("totalCertificatesEarnedPaid", {
      header: "Total Certificates (Paid)",
      size: 250,
    }),
    columnHelper.accessor("revenueToPremiumUsersCurrent", {
      header: "Payment to Users (Current)",
      size: 300,
    }),
    columnHelper.accessor("revenueToPremiumUsersGross", {
      header: "Payment to Users (Gross Total)",
      size: 350,
    }),
    columnHelper.accessor("revenueToAdminCurrent", {
      header: "Revenue to Admin (Current)",
      size: 350,
    }),
    columnHelper.accessor("revenueToAdminGross", {
      header: "Revenue to Admin (Gross Total)",
      size: 350,
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

export default Languagewise;
