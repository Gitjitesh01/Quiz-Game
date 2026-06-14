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

// import { QUIZ, USER, baseUrl } from "../../../../constants/apiUrl";
import { QUIZ, USER, baseUrl } from "../../../../constants/apiUrl";
import { useState, useEffect } from "react";

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

    case "innerQuizTable":
      return selectedValue.map((value) => ({
        type: "innerQuizTable",
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

    case "innerPollTable":
      return selectedValue.map((value) => ({
        type: "innerPollTable",
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
    case "innerSurveyTable":
      return selectedValue.map((value) => ({
        type: "innerSurveyTable",
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

export function InnerDialog({ onClose, value, open, type }) {
  const [tableValues, setTableData] = React.useState({});
  const [tableType, setTableType] = React.useState(type);
  const [selectedValue, setselectedValue] = React.useState(value);

  //   const [selectedRow, setSelectedRow] = useState(null);
  //   const [dialogOpen, setDialogOpen] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      const type = tableType === "pollTable" ? "POLL" : "QUIZ";
      const tmpdata = await getQuizDetailsbyuserId(selectedValue?.userId, type);

      if (tableType === "userTable") {
        setTableData(getTableDetails(selectedValue, tableType));
      } else {
        setTableData(getTableDetails(tmpdata.allQuiz, tableType));
      }
    };

    fetchData();
  }, []);

  const handleClose = () => {
    onClose();
  };

  const renderContent = () => {
    if (!selectedValue) return null;

    return (
      <>
        {tableType === "userTable" && (
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
                  {tableValues?.values?.map((detail) => (
                    <TableCell align="left" key={detail.label}>
                      {/* {detail.label == "Quizzes" && (
                          <Typography
                            variant="body1"
                            onClick={() => handleOpen("quizTable")}
                          >
                            {Array.isArray(detail.value)
                              ? detail.value.join(", ")
                              : detail.value}
                          </Typography>
                        )}
                        {detail.label == "Polls" && (
                          <Typography
                            variant="body1"
                            onClick={() => handleOpen("pollTable")}
                          >
                            {Array.isArray(detail.value)
                              ? detail.value.join(", ")
                              : detail.value}
                          </Typography>
                        )}
                        {detail.label == "Surveys" && (
                          <Typography
                            variant="body1"
                            onClick={() => handleOpen("surveyTable")}
                          >
                            {Array.isArray(detail.value)
                              ? detail.value.join(", ")
                              : detail.value}
                          </Typography>
                        )} */}
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

        {tableType !== "userTable" && (
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
                  {tableValues[0]?.values.map((detail) => (
                    <TableCell align="left">
                      <Typography variant="body1">{detail?.value}</Typography>
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
