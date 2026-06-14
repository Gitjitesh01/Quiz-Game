import * as React from "react";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import { Button, CardActions } from "@mui/material";
import axios from "axios";
import { QUIZ, baseUrl, baseUrl1 } from "../../constants/apiUrl";
import Box from "@mui/material/Box";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import AttempPanel from "./AttempPanel.jsx";
import Select from "@mui/material/Select";
import { Link } from "react-router-dom";

export default function English() {
  const module = [
    "All",
    "Kindergarten",
    "Elementary",
    "High School",
    "Secondary",
    "College",
    "Phd",
    "Others",
  ];

  const [filteredData, setFilteredData] = React.useState(null);
  const [finalData, setFinalData] = React.useState(null);
  const previewPlaceholderSrc = "/imageAvatar.jpg";

  function getEnglishWords(str) {
    const parts = str.split("/");

    if (parts.length < 2) {
      return "";
    }

    return parts[2];
  }

  React.useEffect(() => {
    const subject = getEnglishWords(location.pathname);
    async function fetchData() {
      try {
        const { data } = await axios.post(baseUrl + "quiz/allQuizes", {
          subject: subject,
        });
        setFinalData(data);
        console.log(data);
        setFilteredData(data);
      } catch (error) {
        console.log(error);
      }
    }
    fetchData();
  }, []);

  function filterByQuizGrade(dataArray, searchString) {
    return dataArray.filter((obj) => {
      return obj.quizGrades.some(
        (grade) => grade.toLowerCase() === searchString.toLowerCase()
      );
    });
  }

  function filterByPaymentType(dataArray, searchString) {
    return dataArray.filter((obj) => {
      return (
        obj.paymentType.toLowerCase() === searchString.toLowerCase() ||
        (!obj.paymentType && searchString.toLowerCase() === "free")
      );
    });
  }

  function sortDataByPrice(dataArray, sortOrder) {
    return [...dataArray].sort((a, b) => {
      const priceA = a.totalCredit ? a.totalCredit : 0;
      const priceB = b.totalCredit ? b.totalCredit : 0;
      return sortOrder === "lowToHigh" ? priceA - priceB : priceB - priceA;
    });
  }

  const [paymentType, setPaymentType] = React.useState("");
  const [grade, setGrade] = React.useState("");
  const [price, setPrice] = React.useState("");

  const handleChange = (event) => {
    const value = event.target.value;
    if (["paid", "free", "all"].includes(value)) {
      setPaymentType(value);
      if (value === "all") {
        setFilteredData(finalData);
      } else {
        setFilteredData(filterByPaymentType(finalData, value));
      }
    } else if (module.includes(value)) {
      setGrade(value);
      if (value.toLowerCase() !== "all") {
        setFilteredData(filterByQuizGrade(finalData, value));
      } else {
        setFilteredData(finalData);
      }
    } else if (["lowToHigh", "highToLow"].includes(value)) {
      setPrice(value);
      setFilteredData(sortDataByPrice(filteredData, value));
    }
  };

  const [attemp_quiz_data, setAttemp_quiz_data] = React.useState(null);
  const [show_update_panel, setshow_update_panel] = React.useState(false);

  return (
    <div>
      {attemp_quiz_data != null && show_update_panel && (
        <AttempPanel
          item={attemp_quiz_data}
          setshow_update_panel={setshow_update_panel}
        />
      )}
      <div className="flex h-20 w-full gap-5 p-5">
        <Box sx={{ minWidth: 120 }} className="w-full">
          <div className="-mt-10 flex w-[60%] gap-5">
            <div className="w-[33%]">
              <FormControl fullWidth>
                <InputLabel id="paymentType">Type</InputLabel>
                <Select
                  labelId="paymentType"
                  id="paymentType"
                  value={paymentType}
                  label="Type"
                  className="w-full"
                  onChange={handleChange}
                >
                  <MenuItem value={"all"}>All</MenuItem>
                  <MenuItem value={"paid"}>Paid</MenuItem>
                  <MenuItem value={"free"}>Free</MenuItem>
                </Select>
              </FormControl>
            </div>
            <div className="w-[33%]">
              <FormControl fullWidth>
                <InputLabel id="grade">Grade</InputLabel>
                <Select
                  labelId="grade"
                  id="grade"
                  value={grade}
                  label="Grade"
                  className="w-full"
                  onChange={handleChange}
                >
                  {module.map((mod) => {
                    return (
                      <MenuItem key={mod} value={mod}>
                        {mod}
                      </MenuItem>
                    );
                  })}
                </Select>
              </FormControl>
            </div>
            <div className="w-[33%]">
              <FormControl fullWidth>
                <InputLabel id="price">Price</InputLabel>
                <Select
                  labelId="price"
                  id="price"
                  value={price}
                  label="Price"
                  className="w-full"
                  onChange={handleChange}
                >
                  <MenuItem value={"lowToHigh"}>Low to High</MenuItem>
                  <MenuItem value={"highToLow"}>High to Low</MenuItem>
                </Select>
              </FormControl>
            </div>
          </div>
        </Box>
      </div>
      <div className="flex flex-wrap justify-center gap-6 p-4">
        {filteredData &&
          filteredData.map((item, index) => (
            <div
              key={index}
              className="w-full max-w-xs transform overflow-hidden rounded-lg bg-white shadow-md transition-transform hover:shadow-lg"
            >
              <div className="relative h-48">
                <img
                  src={
                    baseUrl1 + `/uploads/coverimage/` + item.coverImage &&
                    previewPlaceholderSrc
                  }
                />
              </div>
              <div className="p-4">
                <h5 className="truncate text-lg font-bold text-blue-600">
                  {item.quizTitle}
                </h5>
                <p className="mt-1 text-sm text-gray-500">
                  <span className="font-medium">Language:</span> {item.language}
                </p>
                <p className="mt-1 text-sm text-gray-500">
                  {item.amount ? `₹${item.amount}` : "Free"}
                </p>
                <p className="mt-2 line-clamp-2 text-sm text-gray-600">
                  {item.quizDescription.slice(0, 100)}...
                </p>
                <div className="mt-4 flex items-center justify-between">
                 { item.amount ? <button
                    onClick={() => {
                      setAttemp_quiz_data(item);
                      setshow_update_panel(true);
                    }}
                    className="rounded-md bg-blue-500 px-4 py-2 text-white transition hover:bg-blue-600"
                  >
                    Buy Now
                  </button >
                  :
                  <Link to={`https://letsquiz.org/attendquiz/${item?._id}`}>
                  <button
                    className="rounded-md bg-blue-500 px-4 py-2 text-white transition hover:bg-blue-600"
                  >
                    Attempt
                  </button >
                  </Link>
                }
                  <Link
                    to={`/dashboard/explorequiz/${item._id}`}
                    className="rounded-md bg-gray-100 px-4 py-2 text-blue-500 transition hover:bg-gray-200"
                  >
                    View Details
                  </Link>
                </div>
              </div>
            </div>
          ))}
      </div>
    </div>
  );
}
