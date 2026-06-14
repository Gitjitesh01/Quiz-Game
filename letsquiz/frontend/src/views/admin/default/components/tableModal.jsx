import * as React from "react";
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import DialogActions from "@mui/material/DialogActions";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { TableHead } from "@mui/material";
import axios from "axios";

import { QUIZ, USER, baseUrl } from "../../../../constants/apiUrl";
// import { QUIZ, USER, baseUrl } from "../../../../constants/apiUrl";
import { useState, useEffect } from "react";
import { InnerDialog } from "./innerModal";

// const getAllQuiz =async ()=>{
//   try {
//     const response = await axios.get(baseUrl + USER.GETALLUSERS);

//     if (response.data) {
//       transformedData = response.data.data.map((user, index) => transformUserData(user, index));
//       console.log(transformedData)
//     }
//   } catch (error) {
//     console.error("Error fetching user data:", error);
//     // Handle error if needed
//   }
// }

const getTableDetails = (selectedValue, tableType) => {
  switch (tableType) {
    case "userTable":
      return {
        values: [
          { label: "User ID", value: selectedValue.userId },
          {
            label: "Name",
            value: `${selectedValue.firstname} ${selectedValue.lastname}`,
          },
          { label: "Email", value: selectedValue.email },
          { label: "Country", value: selectedValue.countryName },
          { label: "Contact Number", value: selectedValue.phoneNumber },
          { label: "Registered Date", value: selectedValue.registeredDate },
          {
            label: "Quizzes",
            value:
              selectedValue.freeQuizzesCreated +
              selectedValue.paidQuizzesCreated,
          },
          {
            label: "Polls",
            value:
              selectedValue.freePollsCreated + selectedValue.paidPollsCreated,
          },
          {
            label: "Surveys",
            value:
              selectedValue.freeSurveysCreated +
              selectedValue.paidSurveysCreated,
          },
          { label: "Actions", value: ["Edit", "Delete", "Disable"] },
        ],
      };

    case "quizTable":
      return selectedValue.map((value) => ({
        type: "quizTable",
        values: [
          { label: "Topic of Quiz", value: value.quizTitle },
          { label: "Grade", value: `${value.quizGrades}` },
          { label: "Date Created", value: value.createdAt },
          { label: "Language", value: value.language },
          { label: "Quiz Type", value: value.quizType },
          { label: "No. of Users Attended", value: value.numofAttempts },
          { label: "Ratings", value: value.ratings },
          { label: "Revenue to the Quiz", value: value.totalrevenue },
          { label: "Actions", value: ["Edit", "Delete", "Disable"] },
        ],
      }));

    case "pollTable":
      return selectedValue.map((value) => ({
        type: "pollTable",
        values: [
          { label: "Topic of Poll", value: value.quizTitle },
          { label: "Grade", value: `${value.quizGrades}` },
          { label: "Date Created", value: value.createdAt },
          { label: "Language", value: value.language },
          { label: "Quiz Type", value: value.quizType },
          { label: "No. of Users Attended", value: value.numofAttempts },
          { label: "Ratings", value: value.ratings },
          { label: "Revenue to the Poll", value: value.totalrevenue },
          { label: "Actions", value: ["Edit", "Delete", "Disable"] },
        ],
      }));
    case "surveyTable":
      return selectedValue.map((value) => ({
        type: "surveyTable",
        values: [
          { label: "Topic of Survey", value: value.quizTitle },
          { label: "Grade", value: `${value.quizGrades}` },
          { label: "Date Created", value: value.createdAt },
          { label: "Language", value: value.language },
          { label: "Quiz Type", value: value.quizType },
          { label: "No. of Users Attended", value: value.numofAttempts },
          { label: "Ratings", value: value.ratings },
          { label: "Revenue to the Survey", value: value.totalrevenue },
          { label: "Actions", value: ["Edit", "Delete", "Disable"] },
        ],
      }));
    default:
      return [];
  }
};

async function getQuizDetailsbyuserId(userid, type) {
  const response = await axios.post(baseUrl + QUIZ.getquizbyuserid, {
    userid: userid,
    type: type,
  });
  console.log(response.data);
  return response.data;
}

export function SimpleDialog({ onClose, value, open, type, showInnerTable }) {
  const [tableValues, setTableData] = React.useState({});
  const [tableType, setTableType] = React.useState(type);
  const [secondTable, setSecondTable] = React.useState(type);
  const [selectedValue, setselectedValue] = React.useState(value);

  const [showSecondTable, setShowSecondTable] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      const type =
        tableType === "pollTable"
          ? "POLL"
          : tableType === "surveyTable"
          ? "SURVEY"
          : "QUIZ";
      const tmpdata = await getQuizDetailsbyuserId(selectedValue?.userId, type);

      if (tableType === "userTable") {
        setTableData(getTableDetails(selectedValue, tableType));
      } else {
        setTableData(getTableDetails(tmpdata.allQuiz, tableType));
      }
    };

    fetchData();
  }, []);

  // if (tableType != "userTable") {

  // }
  // if (tableType == "userTable") {

  //   setTableData(getTableDetails(selectedValue, tableType));

  // }
  const handleDialogClose = () => {
    setShowSecondTable(false);
    setSecondTable(null);
  };

  const handleSecondTable = (tableType) => {
    setSecondTable(tableType);
    setShowSecondTable(true);
  };
  const handleClose = () => {
    onClose();
  };

  const renderContent = () => {
    if (!selectedValue) return null;

    return (
      <>
        {showSecondTable && (
          <InnerDialog
            open={showSecondTable}
            onClose={handleDialogClose}
            value={selectedValue}
            type={secondTable}
          />
        )}
        {!showSecondTable && tableType === "userTable" && (
          <TableContainer component={Paper}>
            <Table>
              <TableHead>
                <TableRow>
                  {tableValues?.values?.map((detail) => (
                    <TableCell align="left" key={detail.label}>
                      <Typography variant="body1">{detail.label}</Typography>
                    </TableCell>
                  ))}
                </TableRow>
              </TableHead>
              <TableBody>
                <TableRow>
                  {showInnerTable &&
                    tableValues?.values?.map((detail) => (
                      <TableCell align="left" key={detail.label}>
                        {detail.label == "Quizzes" && (
                          <Typography
                            variant="body1"
                            onClick={() => handleSecondTable("quizTable")}
                          >
                            {Array.isArray(detail.value)
                              ? detail.value.join(", ")
                              : detail.value}
                          </Typography>
                        )}
                        {detail.label == "Polls" && (
                          <Typography
                            variant="body1"
                            onClick={() => handleSecondTable("pollTable")}
                          >
                            {Array.isArray(detail.value)
                              ? detail.value.join(", ")
                              : detail.value}
                          </Typography>
                        )}
                        {detail.label == "Surveys" && (
                          <Typography
                            variant="body1"
                            onClick={() => handleSecondTable("surveyTable")}
                          >
                            {Array.isArray(detail.value)
                              ? detail.value.join(", ")
                              : detail.value}
                          </Typography>
                        )}
                        {(detail.label != "Quizzes" ||
                          detail.label != "Surveys" ||
                          detail.label != "Polls") && (
                          <Typography variant="body1">
                            {Array.isArray(detail.value)
                              ? detail.value.join(", ")
                              : detail.value}
                          </Typography>
                        )}
                      </TableCell>
                    ))}
                </TableRow>
              </TableBody>
            </Table>
          </TableContainer>
        )}

        {!showSecondTable && tableType !== "userTable" && (
          <TableContainer component={Paper}>
            <Table>
              <TableHead>
                <TableRow>
                  {tableValues[0]?.values.map((detail) => (
                    <TableCell align="left" key={detail.label}>
                      <Typography variant="body1">{detail.label}</Typography>
                    </TableCell>
                  ))}
                </TableRow>
              </TableHead>
              <TableBody>
                <TableRow>
                  {showInnerTable &&
                    tableValues[0]?.values.map((detail) => (
                      <TableCell align="left" key={detail?.label}>
                        <Typography
                          variant="body1"
                          onClick={() => setTableType("survey")}
                        >
                          {detail?.value}
                        </Typography>
                      </TableCell>
                    ))}
                </TableRow>
              </TableBody>
            </Table>
          </TableContainer>
        )}
      </>
    );
  };

  return (
    <Dialog onClose={handleClose} open={open} maxWidth="md" fullWidth>
      <DialogTitle>User Details</DialogTitle>
      <DialogContent dividers>{renderContent()}</DialogContent>
      <DialogActions>
        <Button onClick={handleClose} color="primary">
          Close
        </Button>
      </DialogActions>
    </Dialog>
  );
}
