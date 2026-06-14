import React, { useEffect, useMemo, useState } from "react";
import swal from "sweetalert";
import { jsPDF } from "jspdf";
import "jspdf-autotable";
import { Link } from "react-router-dom";
import {
  MaterialReactTable,
  createMRTColumnHelper,
  useMaterialReactTable,
} from "material-react-table";
import { Box, Button } from "@mui/material";
import FileDownloadIcon from "@mui/icons-material/FileDownload";
import { mkConfig, generateCsv } from "export-to-csv"; // Removed 'download' import
import { baseUrl } from "../../../constants/apiUrl.js";
import axios from "axios";
import numberToWords from "number-to-words";
import { Padding, SwipeLeft } from "@mui/icons-material";
import { useUser } from "../../../context/userContext";

const columnHelper = createMRTColumnHelper();

const csvConfig = mkConfig({
  fieldSeparator: ",",
  decimalSeparator: ".",
  useKeysAsHeaders: true,
});

const SupportManage = () => {
  const [data, setdata] = useState([]);
  const [filterdata, setfilterdata] = useState([]);

  const { currentuserdata } = useUser();

  // Function to export rows as PDF
  const handleExportPdf = (rows) => {
    const doc = new jsPDF();
    const tableColumn = columns.map((col) => col.header);
    const tableRows = rows.map((row) => Object.values(row.original));

    doc.autoTable({
      head: [tableColumn],
      body: tableRows,
    });

    doc.save("invoice.pdf");
  };

  // Function to export rows as CSV
  const handleExportRows = (rows) => {
    const rowData = rows.map((row) => row.original);
    console.log(rowData);
    // const csv = generateCsv(csvConfig)(rowData);
    GeneratePDF(rowData[0]);
    // downloadCsv(csv, "export.csv");
  };

  const handleExportData = () => {
    const csv = generateCsv(csvConfig)(data);
    downloadCsv(csv, "export.csv");
  };

  const [supportTickets, setSupportTickets] = useState([]);
  const [selectedTicket, setSelectedTicket] = useState(null);
  const [loading, setLoading] = useState(true);
  const [openDialog, setOpenDialog] = useState(false);

  // API URL from .env
  const apiUrl = baseUrl;

  // Fetch all support tickets
  const fetchTickets = async () => {
    try {
      setLoading(true);
      const response = await axios.get(`${apiUrl}/support`);
      setSupportTickets(response.data);
      // swal("Success", "Support tickets fetched successfully", "success");
    } catch (error) {
      console.error("Error fetching support tickets:", error);
    } finally {
      setLoading(false);
    }
  };

  // Delete a ticket by ID
  const deleteTicket = async (id) => {
    try {
      await axios.delete(`${apiUrl}/support/${id}`);
      fetchTickets(); // Refresh the table after deletion
      swal("Success", "Ticket deleted successfully", "success");
    } catch (error) {
      console.error("Error deleting ticket:", error);
    }
  };

  // Update the status of a ticket
  const updateStatus = async (id, status) => {
    try {
      await axios.patch(`${apiUrl}/support-status-update/${id}/${status}`);
      fetchTickets(); // Refresh the table after updating the status
      swal("Success", "Ticket status updated successfully", "success");
    } catch (error) {
      console.error("Error updating ticket status:", error);
    }
  };

  // Open dialog for ticket details
  const handleOpenDialog = (ticket) => {
    setSelectedTicket(ticket);
    setOpenDialog(true);
  };

  const handleCloseDialog = () => {
    setOpenDialog(false);
    setSelectedTicket(null);
  };

  useEffect(() => {
    fetchTickets();
  }, []);

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



  console.log("Support Tickets", supportTickets);

 

//   __v: 0
// ​​
// _id: "67447db3cd1dd61e6b4169ad"
// ​​
// createdAt: "2024-11-25T13:37:55.101Z"
// ​​
// email: "johndoe@example.com"
// ​​
// message: "Hello, I would like to know more about your offerings."
// ​​
// status: "pending"
// ​​
// subject: "Inquiry about Services"
// ​​
// supportcode: "SUP-000000001"
// ​​
// updatedAt: "2024-11-25T13:37:55.101Z"
// ​​
// userPhone: "9876543210"

// Define columns inside the component to access handleExportRows

let update_status;


const columns = [
  columnHelper.accessor("supportcode", {
    header: "Issue Id",
    size: 80,
  }),
  columnHelper.accessor("email", {
    header: "Email",
    size: 80,
  }),
  columnHelper.accessor("subject", {
    header: "Subject",
    size: 40,
  }),
 
    columnHelper.accessor("message", {
      header: "Message",
      size: 80,
      Cell: ({ cell }) => {
        const [showFullMessage, setShowFullMessage] = useState(false);
        const message = cell.getValue();
        return (
          <span className="cursor-pointer" onClick={() => setShowFullMessage(!showFullMessage)}>
            {showFullMessage ? message : `${message.substring(0, 20)}...`}
          </span>
        );
      },
    }),
    columnHelper.accessor("status", {
      header: "Status",
      size: 40,
    }),
    columnHelper.display({
      id: "actions",
      header: "Actions",
      size: 40,
      Cell: ({ row }) => {
        const [isOpen, setIsOpen] = useState(false);
        const handleOptionClick = (option) => {
          switch (option) {
             case "updateStatus":
              console.log("Update Status clicked for row:", row.original);
              setIsOpen(false); // Close the dropdown
              swal({
                title: "Update Status",
                text: "Select the new status:",
                content: {
                  element: "select",
                  attributes: {
                    innerHTML: `
                <option value="pending">Pending</option>
                <option value="resolve">Resolve</option>
                <option value="failed">Failed</option>
                `,
                    style: "padding: 8px;",
                    onchange: (event) => {
                      update_status = event.target.value;
                      // console.log("Status changed to:", event.target.value);
                    },
                  },
                },
                buttons: {
                  cancel: true,
                  confirm: {
                    text: "Update",
                    closeModal: false,
                  },
                },
              }).then((value) => {
                if (value) {
                  // console.log("Value selected:", update_status);
                  // console.log("Row data:", row.original);
                  updateStatus(row.original._id, update_status);
                } else {
                  swal.close();
                }
              });
              break;
            case "delete":
                swal({
                title: "Are you sure?",
                text: "Once deleted, you will not be able to recover this ticket!",
                icon: "warning",
                buttons: true,
                dangerMode: true,
                }).then((willDelete) => {
                if (willDelete) {
                  deleteTicket(row.original._id);
                  swal("Poof! Your ticket has been deleted!", {
                  icon: "success",
                  });
                } else {
                  swal("Your ticket is safe!");
                }
                });
              break;
            case "getInvoice":
              swal("Invoice", "Invoice feature not available yet.", "warning");
              break;
            default:
              break;
          }
        };

        return(
          <div
          className={`relative  ${
            isOpen ? "h-44 w-44" : "h-10 w-10"
          }  duration-200`}
        >
          {/* Action Button */}
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="h-fit rounded bg-blue-500 p-2 text-white focus:outline-none"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="16"
              height="16"
              fill="currentColor"
              className="bi bi-three-dots"
              viewBox="0 0 16 16"
            >
              <path d="M3 9.5a1.5 1.5 0 1 1 0-3 1.5 1.5 0 0 1 0 3m5 0a1.5 1.5 0 1 1 0-3 1.5 1.5 0 0 1 0 3m5 0a1.5 1.5 0 1 1 0-3 1.5 1.5 0 0 1 0 3" />
            </svg>
          </button>

          {/* Dropdown Menu */}
          {isOpen && (
            <div className="absolute right-0 top-10 mt-2 w-48 rounded border border-gray-300 bg-white shadow-lg">
              <ul className=" text-sm text-gray-700">
                <li>
                  <button
                    onClick={() => handleOptionClick("updateStatus")}
                    className="block w-full px-4 py-2 text-left hover:bg-gray-100"
                  >
                    Update Status
                  </button>
                </li>
                <li>
                  <button
                    onClick={() => handleOptionClick("delete")}
                    className="block w-full px-4 py-2 text-left hover:bg-gray-100"
                  >
                    Delete
                  </button>
                </li>
              
              </ul>
            </div>
          )}
        </div>
      )},
    }),
  ];

  const table = useMaterialReactTable({
    columns,
    data: supportTickets.reverse(), // Make sure to use filtered data here
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

export default SupportManage;
