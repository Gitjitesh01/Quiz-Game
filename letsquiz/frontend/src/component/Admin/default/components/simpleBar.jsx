import React from "react";
import swal from "sweetalert";

("react");
import axios from "axios";

import { QUIZ, USER, baseUrl } from "../../../../constants/apiUrl";

import { useEffect, useState } from "react";
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

const SimpleBarChart = (props) => {
  return (
    <Card extra="rounded-[20px] p-3">
      <div className="flex flex-row justify-between px-3 pt-2">
        <div>
          <h4 className="text-lg font-bold text-navy-700 dark:text-white">
            {props.header}
          </h4>
        </div>
        {/* Additional control component can be added here if needed */}
      </div>
      <div className="flex h-[300px] w-full items-center justify-center">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart
            width={500}
            height={300}
            data={props.chartData || []}
            margin={{
              top: 5,
              right: 30,
              left: 20,
              bottom: 5,
            }}
          >
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="dataKey" />

            <YAxis />
            <Tooltip />
            <Legend />
            <Bar dataKey="val" stackId="a" fill="#8884d8" />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </Card>
  );
};

export default SimpleBarChart;
