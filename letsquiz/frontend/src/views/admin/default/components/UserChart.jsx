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

// const userData = [
//   { country: 'USA', Students: 2000, Teachers: 1500, Corporate: 1000 },
//   { country: 'UK', Students: 1800, Teachers: 1200, Corporate: 800 },
//   { country: 'Canada', Students: 1600, Teachers: 1100, Corporate: 900 },
//   // Add more countries and user data as needed
// ];
// const getData=async ()=>{
//   await axios.post(baseUrl+USER.getSubCategoryWiseUsers,{category:'countryName',subcategory:'userType'}).then((response) => {
//     // Handle success response if needed
//     console.log('Response:', response.data);
//     const userData = response.data.data.map(({ category, subcategoryCounts }) => ({
//       country: category,
//       Students: subcategoryCounts.student || 0,
//       Teachers: subcategoryCounts.teacher || 0,
//       Corporate: subcategoryCounts.business || 0
//     }));

//   });

//   }
const UsersChartCard = (props) => {
  return (
    <Card extra="rounded-[20px] p-3">
      <div className="flex flex-row justify-between px-3 pt-2">
        <div>
          <h4 className="text-lg font-bold text-navy-700 dark:text-white">
            Total Users - Country Wise
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
            <XAxis dataKey="country" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Bar dataKey="Students" stackId="a" fill="#8884d8" />
            <Bar dataKey="Teachers" stackId="a" fill="#82ca9d" />
            <Bar dataKey="Business" stackId="a" fill="#ffc658" />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </Card>
  );
};

export default UsersChartCard;
