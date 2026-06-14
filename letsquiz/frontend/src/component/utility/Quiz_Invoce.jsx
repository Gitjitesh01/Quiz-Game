import React, { useContext, useEffect, useMemo, useState } from "react";
import { Link } from "react-router-dom";
import "../../../src/assets/css/susbscriptionpanel.css";
import americanexpress from "../../assets/icon/americanexpress.png";
import discover from "../../assets/icon/gpay.png";
import mastercard from "../../assets/icon/mastercard.svg";
import visa from "../../assets/icon/visa.svg";
import phonepay from "../../assets/icon/phonepay.png";
import gpay from "../../assets/icon/gpay.png";
import arrow from "../../assets/arrrow.svg";
import upi from "../../assets/icon/upi.png";
import paytm from "../../assets/icon/paytm.png";
import { baseUrl, tax, discount } from "../../constants/apiUrl";
import { toWords } from "number-to-words";
import numberToWords from "number-to-words";
import fake_sinature from "../../assets/fakesignature.png";

import axios from "axios";
import jsPDF from "jspdf";
import "jspdf-autotable";
import { useUser } from "../../context/userContext";

const Quiz_Invoce = ({ currentquiz, quiz_id }) => {
  const [discountamount, setdiscountamount] = useState(0);
  const [promocode, setpromocode] = useState("");
  const [paymentMethod, setpaymentMethod] = useState(0);
  const [cardNumber, setCardNumber] = useState(["", "", "", ""]);
  const [expiryMonth, setExpiryMonth] = useState("");
  const [expiryYear, setExpiryYear] = useState("");
  const [cvv, setCvv] = useState("");
  const [taxes, settaxes] = useState([]);
  const [totaltaxdata, settotaltaxdata] = useState([]);
  const [totaltaxespersentage, settotaltaxespersentage] = useState(0);
  const [phonenumnerforloginpaytm, setphonenumnerforloginpaytm] = useState();
  const [Discount, setDiscount] = useState([]);
  const [apllyalldiscount, setapllyalldiscount] = useState(0);
  const { currentuserdata } = useUser();

  console.log(currentuserdata)

  useEffect(() => {
    getalltaxes();
    alldiscount();
  }, []);

  const measurealldiscount = () => {
    if (Discount.find((d) => d.applyTo === "all")) {
      setapllyalldiscount(Discount.find((d) => d.applyTo === "all").value);
      console.log(Discount.find((d) => d.applyTo === "all").value);
    }
  };

  // console.log(Discount);

  useMemo(() => {
    measurealldiscount();
  }, [Discount]);

  const handleTaxData = (taxData) => {
    console.log(taxData);
    settotaltaxdata((prev) => [...prev, taxData]);
  };

  useEffect(() => {
    if (currentquiz) {
      taxes.forEach((tax) => {
        handleTaxData({
          taxname: tax.taxName,
          taxamount: (tax.taxPercentage * currentquiz?.amount) / 100,
          taxpersantage: tax.taxPercentage,
          taxtype: tax.taxType,
        });
      });
    }
  }, [taxes, currentquiz]);

  console.log(totaltaxdata);

  const handleChange = (index, value) => {
    if (value.length > 4) return; // prevent entering more than 4 digits

    const newCardNumber = [...cardNumber];
    newCardNumber[index] = value;
    setCardNumber(newCardNumber);

    if (value.length === 4 && index < 3) {
      const nextInput = document.getElementById(`card-input-${index + 1}`);
      if (nextInput) {
        nextInput.focus();
      }
    }
  };

  const amountbeforetax = currentquiz?.amount;

  console.log(amountbeforetax);

  const rate = useMemo(() => {
    return (
      currentquiz?.amount + (totaltaxespersentage * currentquiz?.amount) / 100
    );
  }, [totaltaxespersentage, currentquiz]);

  useEffect(() => {
    console.log(rate);
  }, [rate]);

  const GeneratePDF = (amount, id, discountedamount, totaltaxdata) => {
    const doc = new jsPDF();

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
    doc.text(
      `To: Name: ${currentuserdata.firstname + " " + currentuserdata.lastname}`,
      14,
      68
    );
    doc.text(`${currentuserdata.email}`, 20, 72);
    // doc.text(
    //   `Name: ${currentuserdata.firstname + " " + currentuserdata.lastname}`,
    //   14,
    //   76
    // );

    // Invoice title and details
    doc.setFontSize(14);
    doc.text("TAX INVOICE", 150, 22);

    const invoiceDate = new Date().toLocaleDateString();
    const transactionId = id || "UNKNOWN";

    doc.setFontSize(10);
    doc.text(`DATE: ${invoiceDate}`, 150, 30);
    doc.text(`INVOICE NUMBER: INV${transactionId}`, 150, 36);
    doc.autoTable({
      startY: 80,
      head: [["", ""]],
      styes: { fillColor: [255, 255, 255], cellHeight: 300 },
    });

    // Item description table
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
            content: `LETS QUIZ SUBSCRIPTION`,
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
            content: `${currentquiz?.amount || "N/A"}`,
            styles: {
              halign: "right",
              textColor: [0, 0, 0],
              fillColor: [255, 255, 255],
            },
          },
          {
            content: `+ ${amountbeforetax || "N/A"}`,
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
    if (totaltaxdata?.length > 0) {
      doc.autoTable({
        startY: doc.lastAutoTable.finalY,
        body: totaltaxdata.map((tax) => [
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

    const totalTaxAmount = totaltaxdata.reduce(
      (acc, tax) => acc + tax.taxamount,
      0
    );

    // Total and discounted amounts
    if (discountedamount > 0) {
      doc.autoTable({
        startY: doc.lastAutoTable.finalY,
        body: [
          [
            {
              content: `Discounted Amount`,
              styles: { fillColor: [255, 255, 255], textColor: [0, 0, 0] },
            },
            {
              content: `- ${discountedamount || "N/A"}`,
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
    }

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
            content: `${totalAmount || "N/A"}`,
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

    // Signature and footer
    // const signatureImage = "https://example.com/path/to/valid/signature.png"; // Replace with a valid image URL
    const pageHeight = doc.internal.pageSize.height;

    doc.text(
      "TAX PAYABLE ON REVERSE CHARGE - NO",
      14,
      doc.lastAutoTable.finalY + 10
    );

    doc.addImage(fake_sinature, "PNG", 140, pageHeight - 50, 50, 15);
    doc.setFontSize(12);
    doc.setFont("helvetica", "bold");
    doc.text("Authorized Signatory", 150, pageHeight - 20);

    // Convert amount to words
    const amountInWords = (num) =>
      numberToWords.toWords(num).toUpperCase() + " ONLY";

    doc.text(
      `AMOUNT CHARGEABLE: ${amountInWords(totalAmount)}`,
      14,
      doc.lastAutoTable.finalY + 20
    );

    // Save the PDF
    doc.save("invoice.pdf");
  };

  const handleKeyDown = (index, e) => {
    const newCardNumber = [...cardNumber];

    if (e.key === "Backspace" && newCardNumber[index] === "" && index > 0) {
      const prevInput = document.getElementById(`card-input-${index - 1}`);
      if (prevInput) {
        prevInput.focus();
      }
    }
  };

  const getalltaxes = () => {
    axios
      .get(baseUrl + tax.getAllTax)
      .then((res) => {
        // console.log(res.data);
        const gstTaxes = res.data;
        console.log(gstTaxes);
        settaxes(gstTaxes);
        console.log(gstTaxes);
        const percentages = gstTaxes.map((item) => +item.taxPercentage);
        const totalPercentage = percentages.reduce(
          (acc, curr) => acc + curr,
          0
        );
        settotaltaxespersentage(totalPercentage);
        console.log(totalPercentage);
      })
      .catch((err) => {
        console.error("Error fetching taxes:", err);
      });
  };

  const alldiscount = () => {
    axios.get(baseUrl + discount.getAllDiscount).then((res) => {
      setDiscount(res.data);
    });
  };

  const handlePaste = (e) => {
    const pastedData = e.clipboardData.getData("Text").replace(/\D/g, "");
    if (pastedData.length !== 16) return;

    const newCardNumber = [];
    for (let i = 0; i < 16; i += 4) {
      newCardNumber.push(pastedData.substring(i, i + 4));
    }
    setCardNumber(newCardNumber);

    const lastInput = document.getElementById("card-input-3");
    if (lastInput) {
      lastInput.focus();
    }
  };

  const handleApplyPromo = () => {
    const applicableDiscount = Discount.find((d) => d.code === promocode);
    if (applicableDiscount) {
      setdiscountamount(applicableDiscount.value);
    } else {
      setdiscountamount(0);
    }
  };

  console.log(totaltaxdata);
  const totalAmount =
    currentquiz?.amount -
    apllyalldiscount -
    discountamount +
    (totaltaxespersentage * currentquiz?.amount) / 100;

  const gstTaxes = totaltaxdata
  console.log(gstTaxes);

  const getcard = () => {
    setpaymentMethod(0);
  };
  const getbank = () => {
    setpaymentMethod(1);
  };
  const getupi = () => {
    setpaymentMethod(2);
  };

  const [calculate_service_fee , setcalculate_service_fee] = useState(0)

  
  useMemo(() => {
    taxes.filter((tax) => tax.taxType === "service").map(item => 
        setcalculate_service_fee((prev)=> prev + item.taxPercentage)
      )
    }, [taxes])
  console.log(calculate_service_fee)

  
  const createTransaction = () => {

    axios
      .get(`${baseUrl}transactionbyuserid/` + currentuserdata?.id)
      .then((res) => {
        axios
          .post(`${baseUrl}transaction/`, {
            type: "quiz",
            account: "credit",
            userId: currentuserdata?.id,
            amount: Number(totalAmount),
            quizId: quiz_id,
            paymentMethod: paymentMethod,
            status: "success",
            persentepaidtoowner: calculate_service_fee,
            username:
              currentuserdata?.firstname + " " + currentuserdata?.lastname,
            useremail: currentuserdata?.email,
            tax: totaltaxdata,
          })
          .then((res) => {
            alert("Transaction Successful");
            console.log(res.data.transactionId);
            GeneratePDF(
              Number(totalAmount),
              res.data.transactionId,
              apllyalldiscount,
              totaltaxdata
            );
            window.location.assign(`/attendquiz/${quiz_id}`);
          })
          .catch((err) => {
            console.error("Error creating transaction:", err);
          });
      })
      .catch((err) => {
        console.error("Error fetching transactions:", err);
      });
  };

  console
  return (
    <div className="flex h-fit w-screen flex-wrap justify-start rounded-md bg-white p-6 shadow-md">
      <div
        className={`flex  flex-col items-start justify-start px-4 ${
          currentquiz?.amount > 0 ? "w-1/2" : "w-full"
        }`}
      >
        {/* Contact Details */}
        <div className="mb-0 w-full md:mb-0 md:w-full">
          <div className="h-fit w-full border-b-2 border-zinc-300 px-2">
            <h2 className="mb-4 text-xl font-semibold">Contact Details</h2>
          </div>
          <div className="mt-8 space-y-2 px-2">
            <div className="flex justify-between">
              <span className="w-full font-medium">Name</span>
              <span className="bg-red/50 flex w-full items-center justify-start">
                {currentuserdata?.firstname + " " + currentuserdata?.lastname}
              </span>
            </div>
            <div className="flex justify-between">
              <span className="font-medium">Email</span>
              <span className="bg-red/50 flex w-1/2 items-center justify-start">
                {currentuserdata?.email}
              </span>
            </div>
            <div className="flex justify-between">
              <span className="font-medium">Mobile</span>
              <span className="bg-red/50 flex w-1/2 items-center justify-start">
                {currentuserdata?.phoneNumber}
              </span>
            </div>
            <div className="mt-2">
              <Link to="#" className="text-sm text-zinc-400">
                Not {currentuserdata?.firstname}? Change Account
              </Link>
            </div>
          </div>
        </div>

        {/* Order Summary */}
        <div className="mb-6 mt-8 w-full md:mb-0 md:w-full">
          <h2 className="mb-4 border-b-2 border-zinc-300 pb-6 text-lg font-semibold">
            Order Summary
          </h2>
          <div className="space-y-2">
            <div className="flex justify-between">
              <span>Order Detail</span>
            </div>
            <div className="flex justify-between">
              <span>Standard Plan</span>
              <span>₹{currentquiz?.amount}</span>
            </div>
            <div className="flex  items-start justify-between">
              <div className="flex flex-col justify-between gap-1">
                {taxes.map((item, index) => (
                  <div key={index} className="flex w-full justify-between">
                    <span>{item.taxName}</span>
                  </div>
                ))}
              </div>
              <div className="flex flex-col justify-start gap-1">
                {taxes.map((item, index) => (
                  <div key={index} className="flex w-full justify-between">
                    <span>
                      + ₹{(item.taxPercentage * currentquiz?.amount) / 100}
                    </span>
                  </div>
                ))}
              </div>
            </div>
            <div className="flex justify-between  border-zinc-300">
              <span>Discount</span>
              <span>
                ₹{discountamount == 0 ? "00" : <> - {discountamount}</>}
              </span>
            </div>
            {currentquiz?.amount > 0 && apllyalldiscount && (
              <div className="flex justify-between border-b-2 border-zinc-300">
                <span>Discount by platform</span>
                <span>-₹{apllyalldiscount}</span>
              </div>
            )}
            {currentquiz?.amount > 0 && (
              <div className="mt-4 flex w-full items-center justify-between gap-4 border-b-2 border-zinc-300 pb-7">
                <input
                  type="text"
                  placeholder="coupon code"
                  value={promocode}
                  onChange={(e) => setpromocode(e.target.value)}
                  className="w-3/4 rounded-md border border-zinc-300 px-3 py-1 focus:outline-none"
                />
                <button
                  onClick={handleApplyPromo}
                  className="w-1/4 rounded-md bg-gray-300 px-3 py-1 text-xl font-extrabold text-white"
                >
                  Apply
                </button>
              </div>
            )}

            <div className="mt-4 flex justify-between">
              <span className="font-medium">Total</span>
              <span className="font-medium">₹{totalAmount}</span>
            </div>
            <div className="text-sm text-gray-500">Inclusive of all taxes</div>
          </div>
        </div>
        {currentquiz?.amount <= 0 && (
          <button className="mx-5 mt-4 w-full rounded-md bg-green-500 py-2 text-white">
            Pay ₹{totalAmount}
          </button>
        )}
      </div>

      {currentquiz?.amount > 0 && (
        <>
          {/* Payment Section */}
          <div className="flex w-1/2 flex-shrink-0 flex-col items-start justify-between border-l-2 border-zinc-300 px-3 pl-8">
            <div>
              <h2 className="mb-4 text-lg font-semibold">Payment</h2>
              <div className="mb-4">
                <span className="mr-4">Pay With:</span>
                <label className="mr-4">
                  <input
                    type="radio"
                    onClick={getcard}
                    defaultChecked
                    name="paymentMethod"
                    className="mr-1"
                  />{" "}
                  Card
                </label>
                <label className="mr-4">
                  <input
                    type="radio"
                    onClick={getbank}
                    name="paymentMethod"
                    className="mr-1"
                  />{" "}
                  Bank Transfer
                </label>
                <label>
                  <input
                    type="radio"
                    onClick={getupi}
                    name="paymentMethod"
                    className="mr-1"
                  />{" "}
                  UPI
                </label>
                {paymentMethod === 0 ? (
                  <div>
                    <div className="mt-3 flex h-[5vh] w-full gap-4 rounded-md">
                      <div className="font-semi flex h-full items-center justify-center text-center text-3xl">
                        <img
                          src={mastercard}
                          className="h-[100%] w-full object-cover bg-blend-color"
                          alt=""
                        />
                      </div>
                      <div className="font-semi flex h-full items-center justify-center text-center text-3xl">
                        <img
                          src={visa}
                          className="h-[100%] w-full object-cover"
                          alt=""
                        />
                      </div>
                    </div>
                    <div className="mt-7">
                      <h2 className="text-lg font-extrabold text-zinc-500">
                        Card Number
                      </h2>
                      <div className="flex h-fit w-full items-center justify-start gap-2 rounded-xl border-2 border-zinc-300 px-5 py-1">
                        {cardNumber.map((num, index) => (
                          <input
                            key={index}
                            id={`card-input-${index}`}
                            type="text"
                            maxLength="4"
                            placeholder="1234"
                            value={num}
                            onChange={(e) =>
                              handleChange(index, e.target.value)
                            }
                            onKeyDown={(e) => handleKeyDown(index, e)}
                            className="input-field input-card h-fit w-[20%]"
                          />
                        ))}
                        <img src={visa} className="h-fit w-[15%]" alt="" />
                      </div>
                      <div className="mt-4 flex w-full items-start justify-start gap-5">
                        <div className="w-1/2">
                          <h2 className="text-xl font-extrabold text-zinc-400">
                            Expiry Date
                          </h2>
                          <div className="flex h-fit w-full items-start justify-start gap-10 rounded-xl border-2 border-zinc-200 px-5 py-3">
                            <div className="flex">
                              <input
                                type="number"
                                maxLength="2"
                                placeholder="MM"
                                value={expiryMonth}
                                onChange={(e) => setExpiryMonth(e.target.value)}
                                className="input-field input-expiry h-fit w-[15%] p-0 text-end"
                              />
                              <p className="text-2xl text-zinc-300">/</p>
                              <input
                                type="number"
                                maxLength="2"
                                placeholder="YY"
                                value={expiryYear}
                                onChange={(e) => setExpiryYear(e.target.value)}
                                className="input-field input-expiry h-fit w-[15%] p-0"
                              />
                            </div>
                          </div>
                        </div>
                        <div className="w-1/2">
                          <h2 className="text-xl font-extrabold text-zinc-400">
                            CVV
                          </h2>
                          <div className="flex h-fit w-full items-start justify-start gap-10 rounded-xl border-2 border-zinc-200 px-5 py-3">
                            <input
                              type="text"
                              maxLength="3"
                              placeholder="CVV"
                              value={cvv}
                              onChange={(e) => setCvv(e.target.value)}
                              className="input-field input-expiry h-fit w-full border-2 border-zinc-300 p-0 text-start outline-none"
                            />
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="mt-7">
                      <button
                        onClick={() => createTransaction()}
                        className="w-full rounded-md bg-green-500 py-2 text-white"
                      >
                        Pay ₹{totalAmount}
                      </button>
                      <p className="mt-4 text-sm text-gray-500">
                        Your personal data will be used to process your order,
                        support your experience throughout this website, and for
                        other purposes described in our privacy policy.
                      </p>
                    </div>
                  </div>
                ) : (
                  <div className="mt-6 flex h-[70vh] w-full flex-col items-center justify-between">
                    <div className="mb-4 w-full px-5">
                      <select className="w-full rounded-md border bg-white px-3 py-2 text-zinc-400 focus:outline-none">
                        <option>Choose your Bank</option>
                      </select>
                    </div>
                    <button className="mx-5 w-full rounded-md bg-green-500 py-2 text-white">
                      Pay ₹{totalAmount}
                    </button>
                    <p className="mt-4 text-sm text-gray-500">
                      Your personal data will be used to process your order,
                      support your experience throughout this website, and for
                      other purposes described in our privacy policy.
                    </p>
                  </div>
                )}
              </div>
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default Quiz_Invoce;
