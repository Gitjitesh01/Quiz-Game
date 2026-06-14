import React, { useEffect, useState } from "react";
import { DataGrid } from "@mui/x-data-grid";
import { Switch, Button } from "@mui/material";
import axios from "axios";
import { baseUrl1, baseUrl, QUIZ } from "../../../constants/apiUrl";
import { useUser } from ".././../../context/userContext";
// import { createClient } from "@supabase/supabase-js";
import * as XLSX from "xlsx";

import { saveAs } from "file-saver";

const ScoreData = ({
  exportToExcel,
  handleQuizSelect,
  selectedQuiz,
  quizReport,
}) => {
  const [quizData, setQuizData] = useState([]);
  const [Status, setStatus] = useState(quizData?.isActive);
  const { currentuserdata } = useUser();

  useEffect(() => {
    const localId = currentuserdata;

    axios
      .post(baseUrl + QUIZ.getQuizbyUser, { userid: localId.id })
      .then((response) => {
        setQuizData(response.data.allQuiz);
      })
      .catch((error) => {
        console.error("Error fetching quiz data:", error);
      });
  }, [Status]);

  const handleStatusChange = (id, isActive) => {
    axios
      .put(`${baseUrl1}/toggleActivityStatus/${id}`)
      .then((response) => {
        setStatus(response.data.quiz);
      })
      .catch((error) => {
        console.error("Error toggling status:", error);
      });
  };

  const handleScheduleChange = (id, timeline) => {
    axios
      .put(`${baseUrl1}/toggleschedule/${id}`)
      .then((response) => {
        setStatus(response.data.quiz);
      })
      .catch((error) => {
        console.error("Error toggling schedule:", error);
      });
  };

  const handleExportToExcel = () => {
    const worksheet = XLSX.utils.json_to_sheet(quizData);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, "Sheet1");
    const excelFile = XLSX.write(workbook, { bookType: "xlsx", type: "array" });
    const blob = new Blob([excelFile], { type: "application/octet-stream" });
    saveAs(blob, "my_excel_file.xlsx");
  };

  const columns = [
    { field: "quizTitle", headerName: "Quiz Title", flex: 1 },
    { field: "language", headerName: "Language", flex: 1 },
    { field: "quizType", headerName: "Quiz Type", flex: 1 },
    {
      field: "quizDescription",
      headerName: "Description",
      flex: 2,
      renderCell: (params) => (
        <span>
          {params.value.length > 17
            ? `${params.value.slice(0, 17)}...`
            : params.value}
        </span>
      ),
    },
    {
      field: "isActive",
      headerName: "Status",
      flex: 1,
      renderCell: (params) => (
        <Switch
          checked={params.value}
          onChange={() => handleStatusChange(params.row._id, params.value)}
          color="primary"
        />
      ),
    },
    {
      field: "timeline",
      headerName: "Schedule",
      flex: 1,
      renderCell: (params) => (
        <Switch
          checked={params.value}
          onChange={() => handleScheduleChange(params.row._id, params.value)}
          color="primary"
        />
      ),
    },
  ];

  return (
    <div className="relative mt-10 flex flex-col items-center">
      <div className="flex w-full justify-end pb-4">
        <Button
          onClick={() => handleExportToExcel()}
          variant="contained"
          sx={{ backgroundColor: "#1D4ED8", color: "white" }}
        >
          Download Excel
        </Button>
      </div>
      <div style={{ height: 400, width: "100%" }}>
        <DataGrid
          rows={quizData}
          columns={columns}
          getRowId={(row) => row._id}
          disableSelectionOnClick
          sx={{
            "& .MuiDataGrid-columnHeaders": {
              backgroundColor: "#1D4ED8", // Custom header color
              color: "#1D4ED8",
              fontSize: 16,
            },
            "& .MuiDataGrid-columnHeaderTitle": {
              fontWeight: "bold", // Make header text bold
            },
          }}
        />
      </div>
    </div>
  );
};

export default ScoreData;
