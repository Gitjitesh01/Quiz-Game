import React from "react";
import swal from "sweetalert";

("react");
import Card from "../../../../component/card";
import { useEffect } from "react";
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";
import axios from "axios";

import { QUIZ, USER, baseUrl } from "../../../../constants/apiUrl";

const getData = async () => {
  await axios.post(baseUrl + QUIZ.getCategoryWiseQuiz).then((response) => {
    // Handle success response if needed
    console.log("Response:", response.data);
  });
};
const areaChartData = [
  { name: "Quizzes", GradeA: 100, GradeB: 120, GradeC: 80 },
  { name: "Survey", GradeA: 80, GradeB: 90, GradeC: 110 },
  { name: "Poll", GradeA: 70, GradeB: 100, GradeC: 95 },
  // Add more categories and grades as needed
];

const PieChartCard1 = () => {
  useEffect(() => {
    getData();
  }, []);
  return (
    <Card extra="rounded-[20px] p-3">
      <div className="flex flex-row justify-between px-3 pt-3">
        <div>
          <h4 className="text-lg font-bold text-navy-700 dark:text-white">
            Total Quiz Type
          </h4>
        </div>
        <div className="mb-3 flex items-center justify-center">
          {/* Time filter dropdown (monthly, yearly, weekly) */}
        </div>
      </div>

      <div className="mb-auto flex h-full w-full items-center justify-center">
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart
            width={500}
            height={400}
            data={areaChartData}
            margin={{
              top: 10,
              right: 30,
              left: 0,
              bottom: 0,
            }}
          >
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="name" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Area
              type="monotone"
              dataKey="GradeA"
              stackId="1"
              stroke="#8884d8"
              fill="#8884d8"
            />
            <Area
              type="monotone"
              dataKey="GradeB"
              stackId="1"
              stroke="#82ca9d"
              fill="#82ca9d"
            />
            <Area
              type="monotone"
              dataKey="GradeC"
              stackId="1"
              stroke="#ffc658"
              fill="#ffc658"
            />
          </AreaChart>
        </ResponsiveContainer>
      </div>
    </Card>
  );
};

export default PieChartCard1;
