import React from "react";
import swal from "sweetalert";

("react");
import { Link } from "react-router-dom";
import {
  MaterialReactTable,
  createMRTColumnHelper,
  useMaterialReactTable,
} from "material-react-table";
import {baseUrl , USER ,Cancelation} from "../../../constants/apiUrl";
import { Box, Button } from "@mui/material";
import FileDownloadIcon from "@mui/icons-material/FileDownload";
import { mkConfig, generateCsv } from "export-to-csv"; 
// import { SimpleDialog } from "../../../../views/admin/default/components/tableModal.jsx";
// import { SimpleDialog } from "views/admin/default/component/tableModal.jsx";

import { useEffect, useState } from "react";
import axios from "axios";

const columnHelper = createMRTColumnHelper();

const tableType = "userTable";

const csvConfig = mkConfig({
  fieldSeparator: ",",
  decimalSeparator: ".",
  useKeysAsHeaders: true,
});

const Languagewise = () => {
  const [data, setData] = useState([]);

  const [selectedRow, setSelectedRow] = useState(null);
  const [dialogOpen, setDialogOpen] = useState(false);


  
  useEffect(() => {
    const getalldata =()=>{
      axios.get(baseUrl + Cancelation.getAllCancelation).then((res)=>{
        console.log(res.data)
        setData(res.data)
      })
    }


    getalldata();
  }, []); // Empty dependency array ensures this runs once when the component mounts
  

  const [modalData, setModalData] = useState(null);
  const [isOpen, setOpen] = useState(false);
  const handleOpen = (rowData) => {
    console.log(rowData);
    setSelectedRow(rowData);
    setDialogOpen(true);
  };

  const handleDialogClose = () => {
    setDialogOpen(false);
    setSelectedRow(null);
  };

  const columns = [
    
    columnHelper.accessor("email", {
      header: "Email",
      size: 80,
    }),
   
    columnHelper.accessor("subscriptionType", {
      header: "subscriptionType",
      size: 50,
    }),
    columnHelper.accessor("reason", {
      header: "reason",
      size: 350,
    }),
    // columnHelper.accessor("revenueToAdminGross", {
    //   header: "Revenue to Admin (Gross Total)",
    //   size: 350,
    // }),
    columnHelper.accessor("deleteButton", {
      header: "Delete",
      size: 80,
      Cell: ({ cell }) => (
        <Button
          variant="contained"
          color="secondary"
          // onClick={() => handleDeleteButtonClick(cell.row.original._id, data, setData)}
          // startIcon={<DeleteIcon />}
        >
          Delete
        </Button>
      ),
    }),
    // columnHelper.accessor('userEnableDisableDelete', {
    //   header: 'User ',
    //   size: 300,
    // })
  ];
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
