import PieChart from "../../../../views/admin/default/components/Piechart1";
import { pieChartData, pieChartOptions } from "variables/charts";
import Card from "../../../../component/card";
import axios from "axios";

import { QUIZ, USER, baseUrl } from "../../../../constants/apiUrl";

import { useEffect, useState } from "react";

const PieChartCard1 = () => {
  const [userData, setUserData] = useState([]);
  const [totalSum, setSum] = useState(0);
  const getPercetage = (val, total) => {
    const percentage = (val / total) * 100;

    return Math.round(percentage * 100) / 100; // Round to two decimal places
  };
  useEffect(() => {
    const getData = async () => {
      try {
        const response = await axios.post(baseUrl + USER.getCategoryWiseUsers, {
          category: "userType",
        });

        let tmpArr = response.data.data.map((itm) => itm[1]);
        const sum = tmpArr.reduce((acc, curr) => acc + curr, 0);

        setUserData(tmpArr);
        setSum(sum);
      } catch (error) {
        console.error("Error:", error);
      }
    };

    getData();
  }, []);
  return (
    <Card extra="rounded-[20px] p-3">
      <div className="flex flex-row justify-between px-3 pt-2">
        <div>
          <h4 className="text-navy-700 text-lg font-bold dark:text-white">
            Total User Type
          </h4>
        </div>

        <div className="mb-6 flex items-center justify-center">
          <select className="dark:!bg-navy-800 mb-3 mr-2 flex items-center justify-center text-sm font-bold text-gray-600 hover:cursor-pointer dark:text-white">
            <option value="monthly">Monthly</option>
            <option value="yearly">Yearly</option>
            <option value="weekly">Weekly</option>
          </select>
        </div>
      </div>

      <div className="mb-auto flex h-[220px] w-full items-center justify-center">
        <PieChart options={pieChartOptions} series={userData} />
      </div>
      <div className="shadow-shadow-500 dark:!bg-navy-700 flex flex-row !justify-between rounded-2xl px-6 py-3 shadow-2xl dark:shadow-none">
        <div className="flex flex-col items-center justify-center">
          <div className="flex items-center justify-center">
            <div className="bg-brand-500 h-2 w-2 rounded-full" />
            <p className="ml-1 text-sm font-normal text-gray-600">Student</p>
          </div>
          <p className="text-navy-700 mt-px text-xl font-bold  dark:text-white">
            {getPercetage(userData[0], totalSum)} %
          </p>
        </div>

        <div className="h-11 w-px bg-gray-300 dark:bg-white/10" />
        <div className="flex flex-col items-center justify-center">
          <div className="flex items-center justify-center">
            <div className="h-2 w-2 rounded-full bg-gray-300" />
            <p className="ml-1 text-sm font-normal text-gray-600"> Teacher </p>
          </div>
          <p className="text-navy-700 mt-px text-xl font-bold dark:text-white">
            {getPercetage(userData[1], totalSum)} %
          </p>
        </div>
        <div className="h-11 w-px bg-gray-300 dark:bg-white/10" />

        <div className="flex flex-col items-center justify-center">
          <div className="flex items-center justify-center">
            <div className="h-2 w-2 rounded-full bg-[#6AD2FF]" />
            <p className="ml-1 text-sm font-normal text-gray-600">Business</p>
          </div>
          <p className="text-navy-700 mt-px text-xl font-bold dark:text-white">
            {getPercetage(userData[2], totalSum)} %
          </p>
        </div>
      </div>
    </Card>
  );
};

export default PieChartCard1;
