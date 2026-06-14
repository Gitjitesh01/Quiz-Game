import React from "react";
import swal from "sweetalert";

("react");
import Card from "../../../../component/card";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";

const revenueData = [
  { month: "Jan", Subscription: 4000, Quizzes: 2400 },
  { month: "Feb", Subscription: 3000, Quizzes: 1398 },
  { month: "Mar", Subscription: 2000, Quizzes: 9800 },
  { month: "Apr", Subscription: 2780, Quizzes: 3908 },
  { month: "May", Subscription: 1890, Quizzes: 4800 },
  { month: "Jun", Subscription: 2390, Quizzes: 3800 },
  { month: "Jul", Subscription: 3490, Quizzes: 4300 },
  // Add more data as needed
];

const RevenueChartCard = () => (
  <Card extra="rounded-[20px] p-3">
    <div className="flex flex-row justify-between px-3 pt-2">
      <div>
        <h4 className="text-lg font-bold text-navy-700 dark:text-white">
          Total Revenue - Monthly
        </h4>
      </div>
      {/* Additional control component can be added here if needed */}
    </div>
    <div className="flex h-[300px] w-full items-center justify-center">
      <ResponsiveContainer width="100%" height="100%">
        <LineChart
          width={500}
          height={300}
          data={revenueData}
          margin={{
            top: 5,
            right: 30,
            left: 20,
            bottom: 5,
          }}
        >
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="month" />
          <YAxis />
          <Tooltip />
          <Legend />
          <Line
            type="monotone"
            dataKey="Subscription"
            stroke="#8884d8"
            activeDot={{ r: 8 }}
          />
          <Line type="monotone" dataKey="Quizzes" stroke="#82ca9d" />
        </LineChart>
      </ResponsiveContainer>
    </div>
  </Card>
);

export default RevenueChartCard;
