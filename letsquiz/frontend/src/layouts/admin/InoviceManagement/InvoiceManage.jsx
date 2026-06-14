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
import { Padding } from "@mui/icons-material";
import { useUser } from "../../../context/userContext";

const columnHelper = createMRTColumnHelper();

const csvConfig = mkConfig({
  fieldSeparator: ",",
  decimalSeparator: ".",
  useKeysAsHeaders: true,
});

const InoviceManagement = () => {
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

  // const GeneratePDF = (amount, id, discountedamount, totaltaxdata) => {
  //   const doc = new jsPDF();

  //   // Item description table
  //   doc.autoTable({
  //     startY: 80,
  //     head: [
  //       [
  //         "S.No",
  //         "DESCRIPTION",
  //         "HSN CODE",
  //         "QTY",
  //         "Price / Unit",
  //         {
  //           content: `AMOUNT`,
  //           styles: {
  //             halign: "center",
  //             cellWidth: 56,
  //             textColor: [0, 0, 0],
  //             fillColor: [255, 255, 255],
  //           },
  //         },
  //       ],
  //     ],
  //     body: [
  //       [
  //         {
  //           content: `1`,
  //           styles: {
  //             halign: "right",
  //             textColor: [0, 0, 0],
  //             fillColor: [255, 255, 255],
  //           },
  //         },
  //         {
  //           content: `LETS QUIZ SUBSCRIPTION`,
  //           styles: {
  //             halign: "right",
  //             textColor: [0, 0, 0],
  //             fillColor: [255, 255, 255],
  //           },
  //         },
  //         {
  //           content: `9992`,
  //           styles: {
  //             halign: "right",
  //             textColor: [0, 0, 0],
  //             fillColor: [255, 255, 255],
  //           },
  //         },
  //         {
  //           content: `1`,
  //           styles: {
  //             halign: "right",
  //             textColor: [0, 0, 0],
  //             fillColor: [255, 255, 255],
  //           },
  //         },
  //         {
  //           content: `${currentquiz?.amount || "N/A"}`,
  //           styles: {
  //             halign: "right",
  //             textColor: [0, 0, 0],
  //             fillColor: [255, 255, 255],
  //           },
  //         },
  //         {
  //           content: `+ ${amountbeforetax || "N/A"}`,
  //           styles: {
  //             halign: "right",
  //             cellWidth: 56,
  //             textColor: [0, 0, 0],
  //             fillColor: [255, 255, 255],
  //           },
  //         },
  //       ],
  //     ],
  //     styles: {
  //       lineWidth: 0.1,
  //       fillColor: [255, 255, 255],
  //       textColor: [0, 0, 0],
  //     },
  //     didDrawCell: (data) => {
  //       const { column, cell, doc, table } = data;
  //       if (column.index === 5) {
  //         doc.line(cell.x + 42, cell.y, cell.x + 42, cell.y + cell.height);
  //       }
  //       console.log(table, "table");

  //       doc.line(14, 80, 14, 134);
  //       doc.line(14, 134, 184, 133);
  //     },
  //   });

  //   // Tax details table
  //   if (totaltaxdata?.length > 0) {
  //     doc.autoTable({
  //       startY: doc.lastAutoTable.finalY,
  //       body: totaltaxdata.map((tax) => [
  //         {
  //           content: `ADD ${tax.taxname} @ ${tax.taxpersantage}%`,
  //           styles: { textColor: [0, 0, 0], fillColor: [255, 255, 255] },
  //         },
  //         {
  //           content: `+ ${tax.taxamount || 0}`,
  //           styles: {
  //             halign: "right",
  //             cellWidth: 14,
  //             fillColor: [255, 255, 255],
  //             textColor: [0, 0, 0],
  //           },
  //         },
  //       ]),
  //       margin: { left: 140 },
  //       styles: {
  //         lineWidth: 0.1,

  //         fillColor: [255, 255, 255],
  //         textColor: [0, 0, 0],
  //       },
  //     });
  //   }

  //   const totalTaxAmount = totaltaxdata.reduce(
  //     (acc, tax) => acc + tax.taxamount,
  //     0
  //   );

  //   // Total and discounted amounts
  //   if (discountedamount > 0) {
  //     doc.autoTable({
  //       startY: doc.lastAutoTable.finalY,
  //       body: [
  //         [
  //           {
  //             content: `Discounted Amount`,
  //             styles: { fillColor: [255, 255, 255], textColor: [0, 0, 0] },
  //           },
  //           {
  //             content: `- ${discountedamount || "N/A"}`,
  //             styles: {
  //               halign: "right",
  //               cellWidth: 14,
  //               fillColor: [255, 255, 255],
  //               textColor: [0, 0, 0],
  //             },
  //           },
  //         ],
  //       ],
  //       margin: { left: 140 },
  //       styles: {
  //         lineWidth: 0.1,
  //         fillColor: [255, 255, 255],
  //         textColor: [0, 0, 0],
  //       },
  //     });
  //   }

  //   doc.autoTable({
  //     startY: doc.lastAutoTable.finalY,
  //     body: [
  //       [
  //         {
  //           content: `Round Off`,
  //           styles: { fillColor: [255, 255, 255], textColor: [0, 0, 0] },
  //         },
  //         {
  //           content: `00`,
  //           styles: {
  //             halign: "right",
  //             cellWidth: 14,
  //             fillColor: [255, 255, 255],
  //             textColor: [0, 0, 0],
  //           },
  //         },
  //       ],
  //     ],
  //     margin: { left: 140 },
  //     styles: {
  //       lineWidth: 0.1,
  //       fillColor: [255, 255, 255],
  //       textColor: [0, 0, 0],
  //     },
  //   });

  //   // Final total amount
  //   doc.autoTable({
  //     startY: doc.lastAutoTable.finalY,
  //     body: [
  //       [
  //         {
  //           content: `Total Amount`,
  //           styles: { fillColor: [255, 255, 255], textColor: [0, 0, 0] },
  //         },
  //         {
  //           content: `${totalAmount || "N/A"}`,
  //           styles: {
  //             halign: "right",
  //             cellWidth: 14,
  //             fillColor: [255, 255, 255],
  //             textColor: [0, 0, 0],
  //           },
  //         },
  //       ],
  //     ],
  //     margin: { left: 140 },
  //     styles: {
  //       lineWidth: 0.1,
  //       fillColor: [255, 255, 255],
  //       textColor: [0, 0, 0],
  //     },
  //   });

  //   // Signature and footer
  //   // const signatureImage = "https://example.com/path/to/valid/signature.png"; // Replace with a valid image URL
  //   const pageHeight = doc.internal.pageSize.height;

  //   doc.text(
  //     "TAX PAYABLE ON REVERSE CHARGE - NO",
  //     14,
  //     doc.lastAutoTable.finalY + 10
  //   );

  //   doc.addImage(fake_sinature, "PNG", 140, pageHeight - 50, 50, 15);
  //   doc.setFontSize(12);
  //   doc.setFont("helvetica", "bold");
  //   doc.text("Authorized Signatory", 150, pageHeight - 20);

  //   // Convert amount to words
  //   const amountInWords = (num) =>
  //     numberToWords.toWords(num).toUpperCase() + " ONLY";

  //   doc.text(
  //     `AMOUNT CHARGEABLE: ${amountInWords(totalAmount)}`,
  //     14,
  //     doc.lastAutoTable.finalY + 20
  //   );

  //   // Save the PDF
  //   doc.save("invoice.pdf");
  // };
  const GeneratePDF = (data) => {
    const doc = new jsPDF();

    console.log(data , 'this is taxes come form data');
    __v: 0;
    // ​​
    // _id: "6741f0f47890cd8f7f82915c"
    // ​​
    // account: "credit"
    // ​​
    // amount: "1280"
    // ​​
    // persentepaidtoowner: "10"
    // ​​
    // quizId: "6741ebe87890cd8f7f822fd1"
    // ​​
    // status: "success"
    // ​​
    // tax: Array(3) [ {…}, {…}, {…} ]
    // ​​
    // transactionId: "000001"
    // ​​
    // type: "quiz"
    // ​​
    // userId: "f5f8b3073c8896f4e5c7802f"
    // ​​
    // useremail: "kanishk2@gmail.com"
    // ​​
    // username: "kanishk soni"
    // Title - Company Name
    doc.setFontSize(18);
    doc.text("LETS QUIZ", 14, 22);

    // Company address and details
    doc.setFontSize(10);
    doc.text("BILL ADDRESS:", 14, 30);
    doc.text("54, NEDUNCHEZHIAN SALIGRAMAM CHENNAI-600012, TAMIL NADU", 14, 36);
    doc.text("GSTIN: 34CTFPP3354N1Z9", 14, 42);
    doc.text("OFFICE ADDRESS:", 14, 48);
    doc.text(
      "No: 282, First Floor, Villianur Road, Kombakkam, Puducherry 605110",
      14,
      54
    );
    doc.text("Email: letsquizpdy@gmail.com", 14, 60);

    // Recipient details
    doc.text(`To: Name: ${data.username}`, 14, 68);
    doc.text(`${data.useremail}`, 20, 72);
    // doc.text(
    //   `Name: ${currentuserdata.firstname + " " + currentuserdata.lastname}`,
    //   14,
    //   76
    // );

    // Invoice title and details
    doc.setFontSize(14);
    doc.text("TAX INVOICE", 150, 22);

    const invoiceDate = new Date().toLocaleDateString();

//     taxamount: 90
// ​​​​
// taxname: "SGST"
// ​​​​
// taxpersantage: 9
// ​​​​
// taxtype: "GST"

    const total_tax_persentage = data?.tax?.reduce((acc, item) => acc + item.taxpersantage, 0);
    // 1280 

    
    const amount_before_tax = data?.amount / (1 + (total_tax_persentage /100))
    console.log(amount_before_tax);


    doc.setFontSize(10);
    doc.text(`DATE: ${invoiceDate}`, 150, 30);
    doc.text(`INVOICE NUMBER: INV${data.transactionId}`, 150, 36);
    doc.autoTable({
      startY: 80,
      head: [["", ""]],
      styes: { fillColor: [255, 255, 255], cellHeight: 300 },
    });

    // Table for Items
    doc.autoTable({
      startY: 80,
      head: [
        [
          "S.No",
          "DESCRIPTION",
          "HSN CODE",
          "QTY",
          "Price / Unit",
          {
            content: `AMOUNT`,
            styles: {
              halign: "center",
              cellWidth: 56,
              textColor: [0, 0, 0],
              fillColor: [255, 255, 255],
            },
          },
        ],
      ],
      body: [
        [
          {
            content: `1`,
            styles: {
              halign: "right",
              textColor: [0, 0, 0],
              fillColor: [255, 255, 255],
            },
          },
          {
            content: `${data.type == 'quiz' ? "LETQUIZ QUIZ PAYMENT" : "LETS QUIZ SUBSCRIPTION"}`,
            styles: {
              halign: "right",
              textColor: [0, 0, 0],
              fillColor: [255, 255, 255],
            },
          },
          {
            content: `9992`,
            styles: {
              halign: "right",
              textColor: [0, 0, 0],
              fillColor: [255, 255, 255],
            },
          },
          {
            content: `1`,
            styles: {
              halign: "right",
              textColor: [0, 0, 0],
              fillColor: [255, 255, 255],
            },
          },
          {
            content: `${amount_before_tax || "N/A"}`,
            styles: {
              halign: "right",
              textColor: [0, 0, 0],
              fillColor: [255, 255, 255],
            },
          },
          {
            content: `+ ${amount_before_tax || "N/A"}`,
            styles: {
              halign: "right",
              cellWidth: 56,
              textColor: [0, 0, 0],
              fillColor: [255, 255, 255],
            },
          },
        ],
      ],
      styles: {
        lineWidth: 0.1,
        fillColor: [255, 255, 255],
        textColor: [0, 0, 0],
      },
      didDrawCell: (data) => {
        const { column, cell, doc, table } = data;
        if (column.index === 5) {
          doc.line(cell.x + 42, cell.y, cell.x + 42, cell.y + cell.height);
        }
        console.log(table, "table");

        doc.line(14, 80, 14, 134);
        doc.line(14, 134, 184, 133);
      },
    });

    // Tax details table
    if (data.tax?.length > 0) {
      doc.autoTable({
        startY: doc.lastAutoTable.finalY,
        body: data.tax.map((tax) => [
          {
            content: `ADD ${tax.taxname} @ ${tax.taxpersantage}%`,
            styles: { textColor: [0, 0, 0], fillColor: [255, 255, 255] },
          },
          {
            content: `+ ${tax.taxamount || 0}`,
            styles: {
              halign: "right",
              cellWidth: 14,
              fillColor: [255, 255, 255],
              textColor: [0, 0, 0],
            },
          },
        ]),
        margin: { left: 140 },
        styles: {
          lineWidth: 0.1,

          fillColor: [255, 255, 255],
          textColor: [0, 0, 0],
        },
      });
    }

    // const totalTaxAmount = totaltaxdata.reduce(
    //   (acc, tax) => acc + tax.taxamount,
    //   0
    // );

    // Total and discounted amounts
    // if (discountedamount > 0) {
    //   doc.autoTable({
    //     startY: doc.lastAutoTable.finalY,
    //     body: [
    //       [
    //         {
    //           content: `Discounted Amount`,
    //           styles: { fillColor: [255, 255, 255], textColor: [0, 0, 0] },
    //         },
    //         {
    //           content: `- ${discountedamount || "N/A"}`,
    //           styles: {
    //             halign: "right",
    //             cellWidth: 14,
    //             fillColor: [255, 255, 255],
    //             textColor: [0, 0, 0],
    //           },
    //         },
    //       ],
    //     ],
    //     margin: { left: 140 },
    //     styles: {
    //       lineWidth: 0.1,
    //       fillColor: [255, 255, 255],
    //       textColor: [0, 0, 0],
    //     },
    //   });
    // }

    doc.autoTable({
      startY: doc.lastAutoTable.finalY,
      body: [
        [
          {
            content: `Round Off`,
            styles: { fillColor: [255, 255, 255], textColor: [0, 0, 0] },
          },
          {
            content: `00`,
            styles: {
              halign: "right",
              cellWidth: 14,
              fillColor: [255, 255, 255],
              textColor: [0, 0, 0],
            },
          },
        ],
      ],
      margin: { left: 140 },
      styles: {
        lineWidth: 0.1,
        fillColor: [255, 255, 255],
        textColor: [0, 0, 0],
      },
    });

    // Final total amount
    doc.autoTable({
      startY: doc.lastAutoTable.finalY,
      body: [
        [
          {
            content: `Total Amount`,
            styles: { fillColor: [255, 255, 255], textColor: [0, 0, 0] },
          },
          {
            content: `${data?.amount || "N/A"}`,
            styles: {
              halign: "right",
              cellWidth: 14,
              fillColor: [255, 255, 255],
              textColor: [0, 0, 0],
            },
          },
        ],
      ],
      margin: { left: 140 },
      styles: {
        lineWidth: 0.1,
        fillColor: [255, 255, 255],
        textColor: [0, 0, 0],
      },
    });

    // Additional Charges & Total
    // const subtotal = data.subtotal || 2000;
    // const taxAmount = data.taxAmount || 270;
    // const totalAmount = data.totalAmount || 2540;

    // doc.autoTable({
    //   startY: doc.lastAutoTable.finalY + 10,
    //   body: [
    //     ["SUB TOTAL", `₹ ${subtotal}`],
    //     ["ADD GST @ 9%", `₹ ${taxAmount / 2}`],
    //     ["ADD SGST @ 9%", `₹ ${taxAmount / 2}`],
    //     ["TOTAL AMOUNT", `₹ ${totalAmount}`],
    //   ],
    //   margin: { left: 140 },
    // });

    // Convert amount to words
    const amountInWords = (num) => {
      return numberToWords.toWords(num).toUpperCase() + " ONLY";
    };

    // Add amount in words
    doc.text(
      `AMOUNT CHARGEABLE (IN WORDS): ${amountInWords(data?.amount)}`,
      14,
      doc.lastAutoTable.finalY + 20
    );

    // Terms and Conditions
    doc.setFontSize(10);
    doc.text("TERMS AND CONDITIONS:", 14, doc.lastAutoTable.finalY + 30);
    doc.text(
      "1. Goods once sold will not be returned after 15 days.",
      14,
      doc.lastAutoTable.finalY + 36
    );
    doc.text(
      "2. Cheques are subject to clearance.",
      14,
      doc.lastAutoTable.finalY + 42
    );

    // Footer: Bank Details and Signatures
    doc.text("BANK DETAILS:", 14, doc.lastAutoTable.finalY + 60);
    doc.text("BANK: AXIS BANK", 14, doc.lastAutoTable.finalY + 66);
    doc.text("ACCOUNT NUMBER: 502991493", 14, doc.lastAutoTable.finalY + 72);
    doc.text("IFSC CODE: UTIB0001393", 14, doc.lastAutoTable.finalY + 78);

    doc.text("Authorized Signatory", 150, doc.lastAutoTable.finalY + 90);

    // Download the PDF
    doc.save("invoice.pdf");
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

  console.log(data);
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
        });
      }

      let userData = userMap.get(d.userId);
      userData.payment += parseFloat(d.amount);
      userData.persentepaidtoowner += parseFloat(d.persentepaidtoowner);
      userData.count += 1;

      const transactionType = d.type || "Unknown"; // Default to 'Unknown' if transactionType is undefined
      if (transactionType === "quiz") {
        userData.quiz += parseFloat(d.amount);
      } else if (transactionType === "subscription") {
        userData.subscription += parseFloat(d.amount);
      }

      userMap.set(d.userId, userData);
    });

    userMap.forEach((userData) => {
      userData.persentepaidtoowner /= userData.count;
      userData.income = userData.payment * (userData.persentepaidtoowner / 100);
      delete userData.count; // Remove the count property as it's no longer needed
    });

    return Array.from(userMap.values());
  };

  useMemo(() => {
    const sortedData = arrangeData(data);
    setfilterdata(sortedData);
  }, [data]);

  // Define columns inside the component to access handleExportRows
  const columns = [
    columnHelper.accessor("transactionId", {
      header: "Order Id",
      size: 80,
    }),
    columnHelper.accessor("type", {
      header: "Service Type",
      size: 80,
    }),
    columnHelper.accessor("account", {
      header: "DR/CR",
      size: 80,
    }),
    columnHelper.accessor("amount", {
      header: "Amount",
      size: 40,
    }),
    columnHelper.accessor("status", {
      header: "Status",
      size: 40,
    }),
    columnHelper.display({
      id: "actions",
      header: "Actions",
      size: 40,
      Cell: ({ row }) => (
        <Button
          variant="contained"
          color="primary"
          onClick={() => handleExportRows([row])}
        >
          Download Invoice
        </Button>
      ),
    }),
  ];

  const table = useMaterialReactTable({
    columns,
    data: data, // Make sure to use filtered data here
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

export default InoviceManagement;
