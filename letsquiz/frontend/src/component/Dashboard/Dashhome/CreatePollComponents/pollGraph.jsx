import React, { useEffect, useState } from "react";
import BarChart from "./graphComponents/BarChart";
import axios from "axios";
import "./graphComponents/BarChart.css";
import { Link } from "react-router-dom";




const PollGraph = () => {
  const [pollData, setPollData] = useState(null);
  const searchParams = new URLSearchParams(window.location.search);
  const id = searchParams.get("data");
  const FetchPollData = async () => {
    try {
      const res = await axios.get(`https://letsquiz.org/api/quiz/quiz/${id}`);
      setPollData(res.data.quiz);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    FetchPollData();
  }, []);
  console.log(pollData);

  console.log(id);
  const chartData = {
    question: pollData?.questions.flatMap((el) => el.title),
    labels: pollData?.questions.flatMap((el) =>
      el.options.map((ele) => ele.text)
    ),
    values: pollData?.questions.flatMap((el) =>
      el.options.map((ele) => ele.vote)
    ), // Replace with your actual data
  };

  return (
    <div className="bar-container">
      <h1
        dangerouslySetInnerHTML={{
          __html: pollData?.questions.flatMap((el) => `Q. ${el.title}`),
        }}
      ></h1>
      <BarChart data={chartData} />

      <Link
      
      >
      Go back
      </Link>
    </div>
  );
};

export default PollGraph;
