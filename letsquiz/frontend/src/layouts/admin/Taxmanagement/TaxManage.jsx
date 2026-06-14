import React, { useState, useEffect } from "react";
import Box from "@mui/material/Box";
import Tab from "@mui/material/Tab";
import Tabs from "@mui/material/Tabs";
import Typography from "@mui/material/Typography";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import axios from "axios";
import { baseUrl, tax } from "../../../constants/apiUrl";
import {
  MaterialReactTable,
  createMRTColumnHelper,
  useMaterialReactTable,
} from "material-react-table";
import { Edit as EditIcon, Delete as DeleteIcon } from "@mui/icons-material";
import { IconButton } from "@mui/material";
import { TaxModal } from "./TaxModal.jsx"; // Import the TaxModal component

const columnHelper = createMRTColumnHelper();

function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box sx={{ p: 3 }}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
}

function a11yProps(index) {
  return {
    id: `simple-tab-${index}`,
    "aria-controls": `simple-tabpanel-${index}`,
  };
}

export default function TaxManag() {
  const [value, setValue] = useState(0);
  const [taxes, setTaxes] = useState([]);
  const [selectedrow, setSelectedrow] = useState(null);
  const [openModal, setOpenModal] = useState(false); // Manage modal open state
  const [modalInputData, setModalInputData] = useState(null); // Manage modal data


  useEffect(() => {
    fetchTaxes();
  }, []);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const fetchTaxes = async () => {
    try {
      const res = await axios.get(`${baseUrl}${tax.getAllTax}`);
      setTaxes(res.data);
    } catch (error) {
      console.error("Failed to fetch taxes:", error);
    }
  };

  const handleCreateTax = () => {
    setModalInputData(null);
    setOpenModal(true);
    fetchTaxes();
  };

  const handleUpdateTax = (row) => {
    setModalInputData(row?.original);
    console.log(row?.original);
    setOpenModal(true);
    fetchTaxes();
  };

  const handleDelete = async (id) => {
    try {
      await axios.post(`${baseUrl}${tax.deleteTaxbyid}/${id}`);
      fetchTaxes();
    } catch (error) {
      console.error("Failed to delete tax:", error);
    }

  };

  const columns = [
    columnHelper.accessor("_id", {
      header: "S.No",
      size: 20,
    }),
    columnHelper.accessor("taxName", {
      header: "Tax Name",
      size: 80,
    }),
    columnHelper.accessor("isActive", {
      header: "Status",
      size: 40,
      Cell: ({ value }) => (value ? "Active" : "Inactive"),
    }),
    columnHelper.accessor("taxPercentage", {
      header: "taxPercentage",
      size: 40,
      Cell: ({ value }) => (value && `${value}%`),
    }),
    columnHelper.accessor("taxType", {
      header: "Type",
      size: 40,
    }),
    columnHelper.accessor("taxDescription", {
      header: "Description",
      size: 40,
    }),
    columnHelper.accessor("action", {
      header: "Action",
      size: 40,
      Cell: ({ row }) => (
        <div>
          <IconButton onClick={() => handleUpdateTax(row)}>
            <EditIcon />
          </IconButton>
          <IconButton onClick={() => handleDelete(row.original._id)}>
            <DeleteIcon />
          </IconButton>
        </div>
      ),
    }),
  ];

  const table = useMaterialReactTable({
    columns,
    data: taxes,
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
        <Button onClick={handleCreateTax} startIcon={<EditIcon />}>
          Create New Tax
        </Button>
        {/* Commented-out export functionality */}
        {/* <Button
          disabled={table.getPrePaginationRowModel().rows.length === 0}
          onClick={() =>
            handleExportRows(table.getPrePaginationRowModel().rows)
          }
          startIcon={<FileDownloadIcon />}
        >
          Export All Rows
        </Button> */}
      </Box>
    ),
  });

  return (
    <Box sx={{ width: "100%" }}>
      <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
        <Tabs
          value={value}
          onChange={handleChange}
          aria-label="basic tabs example"
        >
          <Tab label="Tax List" {...a11yProps(0)} />
        </Tabs>
      </Box>
      <TabPanel value={value} index={0}>
        <div>
          <MaterialReactTable table={table} />
        </div>
      </TabPanel>
      <TaxModal
        open={openModal}
        onClose={() => setOpenModal(false)}
        inputData={modalInputData}
      />
    </Box>
  );
}
