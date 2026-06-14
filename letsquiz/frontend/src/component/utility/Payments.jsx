import React from 'react'

const Payments = () => {

    const transactionData = {
        type: "quiz",
        account: "debit",
        transactionId: "000002",
        amount: "918",
        status: "success",
        username: "kanishksoni",
        useremail: "kanishk2@gmail.com",
      };
    //   style={{ width: 'calc(100% - 150px)' }}
return (
  <div className="min-h-screen  flex items-start justify-center p-4">
  <div className="  w-full max-w-6xl">
    <h1 className="text-2xl font-bold text-gray-800 mb-6 text-center">
    Transaction Details
    </h1>
    <table  className="table-auto w-full border-collapse  overflow-x-auto">
    <thead>
      <tr className="bg-[#1D4ED8] text-white">
      {Object.keys(transactionData).map((field, index) => (
        <th key={index} className="px-4 rounded-t-xl overflow-hidden py-2 text-left">
        {field.charAt(0).toUpperCase() + field.slice(1)}
        </th>
      ))}
      </tr>
    </thead>
    <tbody>
      <tr>
      {Object.keys(transactionData).map((field, index) => (
        <td key={index} className="px-4 py-2">
        {Array.isArray(transactionData[field]) ? (
          <ul className="list-disc list-inside">
          {transactionData[field].map((item, idx) => (
            <li key={idx}>{item}</li>
          ))}
          </ul>
        ) : (
          <span
          className={
            field === "status" && transactionData[field] === "success"
            ? "text-green-600 font-semibold"
            : field === "status"
            ? "text-red-600 font-semibold"
            : ""
          }
          >
          {field === "account"
            ? transactionData[field] === "debit"
            ? "credit"
            : "debit"
            : transactionData[field]}
          </span>
        )}
        </td>
      ))}
      </tr>
    </tbody>
    </table>
  </div>
  </div>
)
}

export default Payments