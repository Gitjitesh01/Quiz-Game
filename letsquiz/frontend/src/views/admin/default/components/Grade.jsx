import React from "react";
import swal from "sweetalert";

("react");
import Card from "../../../../component/card";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";

const data = [
  { name: "Math", GradeA: 400, GradeB: 300, GradeC: 200 },
  { name: "Science", GradeA: 350, GradeB: 400, GradeC: 250 },
  { name: "History", GradeA: 200, GradeB: 300, GradeC: 450 },
  // Add more categories and grades as needed
];

const StackedBarChart = () => (
  <Card extra="rounded-[20px] p-3">
    <div className="flex flex-row justify-between px-3 pt-2">
      <div>
        <h4 className="text-lg font-bold text-navy-700 dark:text-white">
          Total Questions Type - Category Wise - Grade Wise
        </h4>
      </div>
      <div className="mb-6 flex items-center justify-center">
        {/* Time filter dropdown (monthly, yearly, weekly) */}
      </div>
    </div>
    <div className="mb-auto flex h-[220px] w-full items-center justify-center">
      <ResponsiveContainer width="100%" height="100%">
        <BarChart
          data={data}
          margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
        >
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="name" />
          <YAxis />
          <Tooltip />
          <Legend />
          <Bar dataKey="GradeA" stackId="a" fill="#8884d8" name="Grade A" />
          <Bar dataKey="GradeB" stackId="a" fill="#82ca9d" name="Grade B" />
          <Bar dataKey="GradeC" stackId="a" fill="#ffc658" name="Grade C" />
        </BarChart>
      </ResponsiveContainer>
    </div>
  </Card>
);

export default StackedBarChart;
