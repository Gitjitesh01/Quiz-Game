import React, { useEffect, useState } from "react";
import swal from "sweetalert";
import axios from "axios";
import { baseUrl, tax } from "../../../constants/apiUrl";
import jsPDF from "jspdf";
import "jspdf-autotable";
import numberToWords from "number-to-words";
import { useUser } from "../../../context/userContext";

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
// import { data } from "./PayoutData.js";

const columnHelper = createMRTColumnHelper();

const PayoutManage = () => {
  const [alltrationrealatedtoquizonly, setalltrationrealatedtoquizonly] =
    useState([]);
  const [serviceTax, setServiceTax] = useState([]);
  const [gst, setGst] = useState([]);

  const { currentuserdata } = useUser();
  const handleExportRows = (rows) => {
    const rowData = rows.map((row) => row.original);
    const csv = generateCsv(csvConfig)(rowData);
    downloadCsv(csv, "export.csv"); // Use the downloadCsv function
  };

  const fetch_data = async () => {
    const response = await axios.get(baseUrl + "/payouts/type/quiz");
    console.log(response.data, "data");
    //   "userid""tpayment",
    //  "payout" "payoutSlab" , "status"

    const data = response.data.map((item, index) => {
      return {
        id: index + 1,
        _id: item._id,
        creatorid: item.creatorId,
        userid: item.paymentMakerId,
        tpayment: item.totalPayment,
        payout: item.payoutType,
        payoutSlab: item.paidToCreator,
        status: item.status,
      };
    });

    setalltrationrealatedtoquizonly(data);
  };

  // console.log(baseUrl , "tbase url")

  useEffect(() => {
    fetch_data();
  }, []);

  console.log(`${baseUrl}${tax.getTaxbytype}/service`);
  const get_service_tax = async () => {
    try {
      const response = await axios.get(`${baseUrl}${tax.getTaxbytype}/service`);
      if (response.status === 200) {
        console.log(response.data, "service tax");
        setServiceTax(response.data.tax);
      } else {
        swal(
          "Error!",
          "An error occurred while fetching the service tax.",
          "error"
        );
      }
    } catch (error) {
      swal("Error!", error.response?.data?.message || error.message, "error");
    }
  };

  const get_gst = async () => {
    try {
      const response = await axios.get(`${baseUrl}${tax.getTaxbytype}/GST`);
      if (response.status === 200) {
        console.log(response.data, "gst");
        setGst(response.data.tax);
      } else {
        swal("Error!", "An error occurred while fetching the GST.", "error");
      }
    } catch (error) {
      swal("Error!", error.response?.data?.message || error.message, "error");
    }
  };

  const updatePayoutById = async (id, status) => {
    try {
      const response = await axios.patch(`${baseUrl}payouts/status/${id}`, {
        status,
      });
      if (response.status === 200) {
        swal(
          "Status Updated!",
          "Status has been updated successfully.",
          "success"
        );
        
      } else {
        swal("Error!", "An error occurred while updating the status.", "error");
      }
    } catch (error) {
      swal("Error!", error.response?.data?.message || error.message, "error");
    }
  };

  let update_status;

  useEffect(() => {
    get_service_tax();
    get_gst();
    console.log("Service Tax:", serviceTax);
    console.log("GST:", gst);
  }, []);

  const columns = [
    columnHelper.accessor("id", {
      header: "S.No",
      size: 20,
    }),
    columnHelper.accessor("creatorid", {
      header: "Creator ID",
      size: 30,
      Cell: ({ cell }) => {
        const [showFullId, setShowFullId] = useState(false);
        const userId = cell.getValue();
        const displayId = showFullId ? userId : `${userId.slice(0, 4)}...`;

        return (
          <span
            onClick={() => {
              setShowFullId(!showFullId);
              if (!showFullId) {
                navigator.clipboard.writeText(userId);
                swal(
                  "Copied!",
                  "User ID has been copied to clipboard.",
                  "success"
                );
              }
            }}
            className="cursor-pointer underline"
          >
            {displayId}
          </span>
        );
      },
    }),
    columnHelper.accessor("userid", {
      header: "User ID",
      size: 30,
      Cell: ({ cell }) => {
        const [showFullId, setShowFullId] = useState(false);
        const userId = cell.getValue();
        const displayId = showFullId ? userId : `${userId.slice(0, 4)}...`;

        return (
          <span
            onClick={() => {
              setShowFullId(!showFullId);
              if (!showFullId) {
                navigator.clipboard.writeText(userId);
                swal(
                  "Copied!",
                  "User ID has been copied to clipboard.",
                  "success"
                );
              }
            }}
            className="cursor-pointer underline"
          >
            {displayId}
          </span>
        );
      },
    }),
    columnHelper.accessor("tpayment", {
      header: "Total Payment",
      size: 30,
    }),
    columnHelper.accessor("payout", {
      header: "Payout Type",
      size: 40,
    }),
    columnHelper.accessor("payoutSlab", {
      header: "Payout Slab",
      size: 40,
    }),
    columnHelper.accessor("status", {
      header: "Status",
      size: 40,
    }),
    columnHelper.accessor("action", {
      header: "Action",
      Cell: ({ row }) => {
        const [isOpen, setIsOpen] = useState(false);

        const handleOptionClick = (option) => {
          setIsOpen(false); // Close the dropdown
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
                <option value="completed">Completed</option>
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
                  updatePayoutById(row.original._id, update_status);
                } else {
                  swal.close();
                }
              });
              break;
            case "pay":
              const pay = async () => {
                try {
                  const response = await axios.get(
                    `${baseUrl}bankdetails/${row.original.creatorid}`
                  );
                  console.log(row.original.payoutSlab);
                  if (response.status === 200) {
                    swal(
                      "Payment Successful!",
                      "Payment has been successfully processed.",
                      "success"
                    );
                    console.log(
                      "Payment successful for row:",
                      response.data[0]
                    );

                    const bankDetails = response.data[0];

                    swal({
                      title: "Bank Details",
                      content: {
                        element: "div",
                        attributes: {
                          innerHTML: `
                        <p><strong>Account Holder Name:</strong> ${bankDetails.accountHolderName}</p>
                        <p><strong>Account Number:</strong> ${bankDetails.accountNumber}</p>
                        <p><strong>Account Type:</strong> ${bankDetails.accountType}</p>
                        <p><strong>Bank Name:</strong> ${bankDetails.bankName}</p>
                        <p><strong>Branch Name:</strong> ${bankDetails.branchName}</p>
                        <p><strong>Contact Number:</strong> ${bankDetails.contactNumber}</p>
                        <p><strong>IFSC Code:</strong> ${bankDetails.ifscCode}</p>
                        `,
                        },
                      },
                      icon: "info",
                      buttons: {
                        cancel: "Close",
                        checkPayment: {
                          text: "Check Total Payment",
                          value: "checkPayment",
                        },
                      },
                    }).then((value) => {
                      if (value === "checkPayment") {
                        try {
                          // Calculate total payment
                          const totalPayment = row.original.payoutSlab;

                          // Static Service Charge (e.g., 5% of totalPayment)
                          const serviceChargeRate = serviceTax.reduce(
                            (acc, item) => acc + item.taxPercentage,
                            0
                          );
                          console.log(
                            "Service Charge Rate:",
                            serviceChargeRate
                          );
                          const serviceCharge =
                            (totalPayment * serviceChargeRate) / 100;

                          // Dynamic Taxes on Service Charge (e.g., 18% GST on service charge)
                          const taxRate = gst.reduce(
                            (acc, item) => acc + item.taxPercentage,
                            0
                          );
                          const taxesOnServiceCharge =
                            (serviceCharge * taxRate) / 100;

                          // Final Payment Calculation
                          const finalAmount =
                            totalPayment -
                            (serviceCharge + taxesOnServiceCharge);

                          // Show the payment details
                          swal({
                            title: "Payment Details",
                            content: {
                              element: "div",
                              attributes: {
                                innerHTML: `
                              <p><strong>Total Payment Given to Creator:</strong> ${totalPayment.toFixed(
                                2
                              )}</p>
                              <p><strong>Service Charge (${serviceChargeRate}%):</strong> ${serviceCharge.toFixed(
                                  2
                                )}</p>
                              <p><strong>Taxes on Service Charge (${taxRate}% GST):</strong> ${taxesOnServiceCharge.toFixed(
                                  2
                                )}</p>
                              <p><strong>Final Amount Payable:</strong> ${finalAmount.toFixed(
                                2
                              )}</p>
                              `,
                              },
                            },
                            icon: "info",
                          });
                        } catch (error) {
                          swal(
                            "Error!",
                            "An error occurred while processing the payment.",
                            "error"
                          );
                        }
                      }
                    });
                  }
                } catch (error) {
                  console.log(error);
                  swal(
                    "Error!",
                    error.response?.data?.message || error.message,
                    "error"
                  );
                }
              };
              pay();
              // console.log("Pay clicked for row:", row.original);
              break;
            case "getInvoice":
              swal("A Invoice is sending to you");
              const getpayoutdata = async () => {
                console.log('it run');
                try {
                  const response = await axios.get(
                    `${baseUrl}/payouts/${row.original._id}`
                  );
                  if (response.status === 200) {
                    GeneratePDF(response.data);
                    swal("Bank Details", "Fetching bank details.", "info");
                    const amount_before_tax = response.data.paidToCreator;
                    const serviceTax =
                      response.data?.reciveamounttranstionId?.tax?.filter(
                        (item) => item.taxtype === "service"
                      );
                    const gst =
                      response.data?.reciveamounttranstionId?.tax?.filter(
                        (item) => item.taxtype === "GST"
                      );
                    const servicefee_per = serviceTax.reduce(
                      (acc, item) => acc + item.taxpersantage,
                      0
                    );
                    const totalservicefee =
                      amount_before_tax * (servicefee_per / 100);
              
                    console.log(serviceTax, "service tax");
                    console.log(gst, "gst");
                    console.log(servicefee_per, "service fee percentage");
                    console.log(totalservicefee, "total service fee");
              
                    console.log(
                      gst.map(
                        (tax) => totalservicefee * (tax.taxpersantage / 100)
                      ),
                      "total tax amount"
                    );
              
                    const totalamounthastopay =
                      amount_before_tax -
                      totalservicefee +
                      gst.reduce(
                        (acc, item) =>
                          acc + totalservicefee * (item.taxpersantage / 100),
                        0
                      );
              
                   if(!response.data.giveamounttranstionId){
                    const create_bill = async () => {
                      try {
                        const response2 = await axios.post(
                          `${baseUrl}/transaction`,
                          {
                            type: "quiz",
                            account: "debit",
                            userId: currentuserdata.id,
                            amount: totalamounthastopay,
                            quizId: response.data.reciveamounttranstionId.quizId,
                            paymentMethod: "bank",
                            status: "success",
                            tax: response.data.reciveamounttranstionId.tax,
                            username:
                              currentuserdata.firstname +
                              currentuserdata.lastname,
                            useremail: currentuserdata.email,
                          }
                        );
                        if (response2.status === 201) {
                          swal(
                            "Payment Successful!",
                            "Payment has been successfully processed.",
                            "success"
                          );
                          
                          console.log(
                            "Payment successful for row:",
                            response2.data
                          );
                          console.log("Generated MongoDB ID:", response2.data._id);
                          if(response2.data._id){

                            const giveamounttranstionId = response2.data._id;
                          const updatePayoutById = async () => {
                            try {
                              const updatedPayout = await axios.patch(`${baseUrl}payouts/${row.original._id}`, {giveamounttranstionId :giveamounttranstionId});
                              if (updatedPayout.status === 200) {
                                console.log(updatedPayout.data, "updated payout");
                                swal("Status Updated!", "Status has been updated successfully.", "success");
                                fetch_data();
                              } else {
                                swal("Error!", "An error occurred while updating the status.", "error");
                              }
                            } catch (error) {
                              swal("Error!", error.response?.data?.message || error.message, "error");
                            }
                          };
                          updatePayoutById()
                          }
                        }
                      } catch (error) {
                        console.log(error);
                        swal(
                          "Error!",
                          error.response?.data?.message || error.message,
                          "error"
                        );
                      }
                    };
                    console.log("Bank details for row:", response.data);
                    create_bill();
                   }
                   else{
                    fetch_data();
                   }


                    
                  }
                } catch (error) {
                  console.log(error);
                  swal(
                    "Error!",
                    error.response?.data?.message || error.message,
                    "error"
                  );
                }
              };

              getpayoutdata();
              // swal("Get Bank Details", "Fetching bank details.", "info");

              break;
            default:
              break;
          }
        };

        return (
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
                      onClick={() => handleOptionClick("pay")}
                      className="block w-full px-4 py-2 text-left hover:bg-gray-100"
                    >
                      Pay
                    </button>
                  </li>
                  <li>
                    <button
                      onClick={() => handleOptionClick("getInvoice")}
                      className="block w-full px-4 py-2 text-left hover:bg-gray-100"
                    >
                      Get Invoice
                    </button>
                  </li>
                </ul>
              </div>
            )}
          </div>
        );
      },
      size: 40,
    }),
  ];

  const csvConfig = mkConfig({
    fieldSeparator: ",",
    decimalSeparator: ".",
    useKeysAsHeaders: true,
  });

  const GeneratePDF = (data) => {
    const doc = new jsPDF();

    console.log(data, "this is taxes come form data");
    // ___v: 0
    // ​
    // _id: "674207007890cd8f7f8406ca"
    // ​
    // createdAt: "2024-11-23T16:46:56.744Z"
    // ​
    // creatorId: Object { _id: "f5f8b3073c8896f4e5c7802f", email: "kanishk2@gmail.com", firstname: "kanishk", … }
    // ​​
    // _id: "f5f8b3073c8896f4e5c7802f"
    // ​​
    // email: "kanishk2@gmail.com"
    // ​​
    // firstname: "kanishk"
    // ​​
    // lastname: "soni"
    // ​​
    // <prototype>: Object { … }
    // ​
    // paidToCreator: 1000
    // ​
    // paymentMakerId: Object { _id: "f5f8b3073c8896f4e5c7802f", email: "kanishk2@gmail.com" }
    // ​​
    // _id: "f5f8b3073c8896f4e5c7802f"
    // ​​
    // email: "kanishk2@gmail.com"
    // ​​
    // <prototype>: Object { … }
    // ​
    // payoutType: "quiz"
    // ​
    // payoutcode: 1
    // ​
    // reciveamounttranstionId: Object { _id: "674207007890cd8f7f8406c8", type: "quiz", account: "credit", … }
    // ​​
    // __v: 0
    // ​​
    // _id: "674207007890cd8f7f8406c8"
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
    // ​​​
    // 0: Object { taxname: "SGST", taxamount: 90, taxpersantage: 9, … }
    // ​​​
    // 1: Object { taxname: "CGST", taxamount: 90, taxpersantage: 9, … }
    // ​​​
    // 2: Object { taxname: "Service fee", taxamount: 100, taxpersantage: 10, … }
    // ​​​
    // length: 3
    // ​​​
    // <prototype>: Array []
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
    // ​​
    // <prototype>: Object { … }
    // ​
    // status: "pending"
    // ​
    // totalPayment: 1280
    // ​
    // updatedAt: "2024-11-23T16:46:56.744Z"

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
    doc.text(
      `To: Name: ${data.creatorId.firstname + data.creatorId.lastname}`,
      14,
      68
    );
    doc.text(`${data.creatorId.email}`, 20, 72);
    // doc.text(
    //   `Name: ${currentuserdata.firstname + " " + currentuserdata.lastname}`,
    //   14,
    //   76
    // );

    // Invoice title and details
    doc.setFontSize(14);
    doc.text("TAX INVOICE", 150, 22);

    const invoiceDate = new Date().toLocaleDateString();

    const total_tax_persentage = data?.reciveamounttranstionId?.tax?.reduce(
      (acc, item) => acc + item.taxpersantage,
      0
    );
    // 1280

    const amount_before_tax = data?.paidToCreator;
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
            content: `LETQUIZ PAYOUT`,
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

    const serviceTax = data?.reciveamounttranstionId?.tax?.filter(
      (item) => item.taxtype === "service"
    );
    const gst = data?.reciveamounttranstionId?.tax?.filter(
      (item) => item.taxtype === "GST"
    );
    const servicefee_per = serviceTax.reduce(
      (acc, item) => acc + item.taxpersantage,
      0
    );
    const totalservicefee = amount_before_tax * (servicefee_per / 100);

    console.log(serviceTax, "service tax");
    console.log(gst, "gst");
    console.log(servicefee_per, "service fee percentage");
    console.log(totalservicefee, "total service fee");

    console.log(
      gst.map((tax) => totalservicefee * (tax.taxpersantage / 100)),
      "total tax amount"
    );

    const totalamounthastopay =
      amount_before_tax -
      totalservicefee +
      gst.reduce(
        (acc, item) => acc + totalservicefee * (item.taxpersantage / 100),
        0
      );
    // Tax details table

    doc.autoTable({
      startY: doc.lastAutoTable.finalY,
      body: [
        [
          `ADD SERVICE @ ${servicefee_per}%`,
          {
            content: `- ${totalservicefee}`,
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

    if (gst.length > 0) {
      doc.autoTable({
        startY: doc.lastAutoTable.finalY,
        body: gst?.map((tax) => [
          {
            content: `ADD ${tax.taxname} @ ${tax.taxpersantage}%`,
            styles: { textColor: [0, 0, 0], fillColor: [255, 255, 255] },
          },
          {
            content: `- ${totalservicefee * (tax.taxpersantage / 100)}`,
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
            content: `${totalamounthastopay || "N/A"}`,
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

    // doc.text(
    //   `ALL TAXES ARE APPLYED ON SERVICR CHARGE`,
    // );

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
      `AMOUNT CHARGEABLE (IN WORDS): ${amountInWords(totalamounthastopay)}`,
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
    data: alltrationrealatedtoquizonly,
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

export default PayoutManage;
