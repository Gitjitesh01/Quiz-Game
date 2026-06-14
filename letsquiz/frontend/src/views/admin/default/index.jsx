// import MiniCalendar from "../../../component/calendar/MiniCalendar";
// import WeeklyRevenue from "./components/WeeklyRevenue";
import TotalSpent from "./components/TotalSpent";
// import PieChartCard from "./components/PieChartCard";
// import { IoMdHome } from "react-icons/io";
import { IoDocuments } from "react-icons/io5";
import { MdBarChart} from "react-icons/md";

import axios from "axios";

import { QUIZ, USER, baseUrl } from "../../../constants/apiUrl";

import { useEffect, useState } from "react";

import Widget from "../../../component/widget/Widget";
import Piechart1 from "./components/Piechart1";
import StackedBarChart from "./components/Grade";
import RevenueChartCard from "./components/RevenueChart";
import UsersChartCard from "./components/UserChart";
import SimpleBarChart from "./components/simpleBar";

const Dashboard = () => {
  const [userData, setUserData] = useState([]);
  const [barUserData, setBarUserData] = useState([]);
  const [barQuizData, setBarQuizData] = useState([]);

  useEffect(() => {
    const getData = async () => {
      try {
        const response = await axios.post(baseUrl + USER.getCategoryWiseUsers, {
          category: "subscriptionType",
        });

        // const formattedUserData = response.data.data.map(({ category, subcategoryCounts }) => ({
        //   country: category,
        //   Students: subcategoryCounts.student || 0,
        //   Teachers: subcategoryCounts.teacher || 0,
        //   Corporate: subcategoryCounts.business || 0
        // }));
        let tmpArr = response.data.data.map((itm) => itm[1]);
        setUserData(tmpArr);
      } catch (error) {
        console.error("Error:", error);
      }
    };

    getData();
  }, []);

  useEffect(() => {
    const getData = async () => {
      try {
        const response = await axios.post(
          baseUrl + USER.getSubCategoryWiseUsers,
          { category: "countryName", subcategory: "userType" }
        );

        const formattedUserData = response.data.data.map(
          ({ category, subcategoryCounts }) => ({
            country: category,
            Students: subcategoryCounts.student || 0,
            Teachers: subcategoryCounts.teacher || 0,
            Business: subcategoryCounts.business || 0,
          })
        );
        setBarUserData(formattedUserData);
      } catch (error) {
        console.error("Error:", error);
      }
    };

    getData();
  }, []);

  useEffect(() => {
    const getData = async () => {
      try {
        const response = await axios.post(baseUrl + QUIZ.getCategoryWiseQuiz);

        let formattedUserData = [];

        formattedUserData.push({
          dataKey: "Quizes",
          val: response.data.data["quiz"].length,
        });
        formattedUserData.push({
          dataKey: "Polls",
          val: response.data.data["poll"].length,
        });
        formattedUserData.push({
          dataKey: "Surveys",
          val: response.data.data["survey"].length,
        });

        setBarQuizData(formattedUserData);
      } catch (error) {
        console.error("Error:", error);
      }
    };

    getData();
  }, []);

  useEffect(() => {
    const getCommonData = async () => {
      try {
        const response = await axios.get(baseUrl + QUIZ.getAllGrades);
        localStorage.setItem("allGrades", JSON.stringify(response.data?.data));
      } catch (error) {
        console.error("Error:", error);
      }
    };

    getCommonData();
  }, []);
  useEffect(() => {
    const getCommonData = async () => {
      try {
        const response = await axios.get(baseUrl + QUIZ.getAllSubjects);
        localStorage.setItem(
          "allSubjects",
          JSON.stringify(response.data?.data)
        );
      } catch (error) {
        console.error("Error:", error);
      }
    };

    getCommonData();
  }, []);
  useEffect(() => {
    const getCommonData = async () => {
      try {
        const response = await axios.get(baseUrl + QUIZ.getAllQuestions);
        console.log(response);
        localStorage.setItem(
          "allQuestions",
          JSON.stringify(response.data?.data)
        );
      } catch (error) {
        console.error("Error:", error);
      }
    };

    getCommonData();
  }, []);
  return (
    <>
      {
        <div>
          {/* Card widget */}

          <div className="3xl:grid-cols-6 mt-3 grid grid-cols-1 gap-5 md:grid-cols-2 lg:grid-cols-3 2xl:grid-cols-3">
            <Widget
              icon={<MdBarChart className="h-7 w-7" />}
              title={"Total Users (Free)"}
              subtitle={userData[0]}
            />

            <Widget
              icon={<MdBarChart className="h-7 w-7" />}
              title={"Total Users (Standard)"}
              subtitle={userData[1] || 0}
            />

            <Widget
              icon={<MdBarChart className="h-7 w-7" />}
              title={"Total Users (Premium)"}
              subtitle={userData[2] || 0}
            />
            <Widget
              icon={<IoDocuments className="h-6 w-6" />}
              title={"Spend this month"}
              subtitle={"$642.39"}
            />
            <Widget
              icon={<IoDocuments className="h-6 w-6" />}
              title={"Spend this month"}
              subtitle={"$642.39"}
            />
            <Widget
              icon={<MdBarChart className="h-7 w-7" />}
              title={"Monthly user registered users"}
              subtitle={"120"}
            />

            <Widget
              // icon={<MdBarChart className="h-7 w-7" />}
              title={""}
              subtitle={""}
            />

            <Widget
              // icon={<MdBarChart className="h-7 w-7" />}
              title={""}
              subtitle={""}
            />

            <Widget
              // icon={<MdBarChart className="h-7 w-7" />}
              title={""}
              subtitle={""}
            />

            <Widget
              // icon={<MdBarChart className="h-7 w-7" />}
              title={""}
              subtitle={""}
            />

            <Widget
              // icon={<MdBarChart className="h-7 w-7" />}
              title={""}
              subtitle={""}
            />
          </div>

          {/* Charts */}

          <div className="mt-5 grid grid-cols-1 gap-5 md:grid-cols-2">
            <>
              {" "}
              {barUserData.length && <UsersChartCard chartData={barUserData} />}
            </>
            <Piechart1 />
            {/* <PieChartCard1 /> */}

            <>
              {" "}
              {barQuizData.length && <SimpleBarChart chartData={barQuizData} />}
            </>
            <RevenueChartCard />

            <TotalSpent />
            <StackedBarChart />
            {/* <WeeklyRevenue /> */}
          </div>

          {/* Tables & Charts */}

          <div className="mt-5 grid grid-cols-1 gap-5 xl:grid-cols-2">
            {/* Check Table */}
            {/* <div>
          <CheckTable
            columnsData={columnsDataCheck}
            tableData={tableDataCheck}
          />
        </div> */}

            {/* Traffic chart & Pie Chart */}

            {/* <div className="grid grid-cols-1 gap-5 rounded-[20px] md:grid-cols-2">
          <DailyTraffic />
          <PieChartCard />
        </div> */}

            {/* Complex Table , Task & Calendar */}

            {/* <ComplexTable
          columnsData={columnsDataComplex}
          tableData={tableDataComplex}
        /> */}

            {/* Task chart & Calendar */}

            {/* <div className="grid grid-cols-1 gap-5 rounded-[20px] md:grid-cols-2">
          <TaskCard />
          <div className="grid grid-cols-1 rounded-[20px]">
            <MiniCalendar />
          </div>
        </div> */}
          </div>
        </div>
      }
    </>
  );
};

export default Dashboard;
