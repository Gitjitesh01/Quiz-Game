import React from 'react'


// Admin Imports
import Dashboard from "./views/admin/default";
import NFTMarketplace from "./views/admin/marketplace";
import Profile from "./views/admin/profile";
import DataTables from "./views/admin/tables";
import RTLDefault from "./views/rtl/default";
import UserManag from "./layouts/admin/UserManagement/UserManag";
import QuizManag from "./layouts/admin/QuizManagement/QuizManag";
import SurveyManage from "./layouts/admin/SurveyManagement/SurveyManage";
import PollManage from "./layouts/admin/PollManagement/PollManage";
import QuestionTManage from "./layouts/admin/QuestionTypeManagement/QuestionTManage";
import GradeManage from "./layouts/admin/GradeManagement/GradeManage";
import SubjectManage from "./layouts/admin/SubjectManagement/SubjectManage";
import LedgerManage from "./layouts/admin/LedgerManagement/LedgerManage";
import InvoiceManage from "./layouts/admin/InoviceManagement/InvoiceManage";
import PayoutManage from "./layouts/admin/PayoutMangement/PayoutManage";
import SupportManage from "./layouts/admin/SupportManagement/SupportManage";
import Payment from "./layouts/admin/RefundGateway/Payment";
import CancelManage from "./layouts/admin/CancellationMangement/CancelManage";
import BannerManage from "./layouts/admin/BannerManagement/BannerManage";
import DiscountManage from "./layouts/admin/DiscountManagement/DiscountManage";
import TaxManage from "./layouts/admin/Taxmanagement/TaxManage";
import SubscriptionManage from "./layouts/admin/subscriptionManagement/subscriptionManage";

// Auth Imports
import SignIn from "./views/auth/SignIn";

// Icon Imports
import UserManage from "./assets/icons/Use_Management.png";
import QuizM from "./assets/icons/Quiz_Management.png";
import Survey from "./assets/icons/Survey_Management.png";
import Poll from "./assets/icons/Poll_management.png";
import QuestionType from "./assets/icons/Question_Type_Management.png";
import Grade from "./assets/icons/Grade_Management.png";
import Subject from "./assets/icons/Subject_Management.png";
import Ledger from "./assets/icons/Ledger_management.png";
import Invoice from "./assets/icons/Invoice.png";
import Payout from "./assets/icons/Payout_Management.png";
import Support from "./assets/icons/Support_management.png";
import Banner from "./assets/icons/Banner_Management.png";
import Dashboards from "./assets/icons/Dash_Board.png";
import {
  MdHome,
  MdOutlineShoppingCart,
  MdBarChart,
  MdPerson,
  MdLock,
} from "react-icons/md";

const routes = [
  {
    name: "Main Dashboard",
    layout: "/admin",
    path: "default",
    icon: <img src={Dashboards} alt="Dashboard" className="h-6 w-6" />,
    component: <Dashboard />,
  },
  {
    name: "User Management",
    layout: "/admin",
    path: "UserManagement",
    icon: <img src={UserManage} alt="User Management" className="h-6 w-6" />,
    component: <UserManag />,
  },
  {
    name: "Quiz Management",
    layout: "/admin",
    path: "QuizManagement",
    icon: <img src={QuizM} alt="Quiz Management" className="h-6 w-6" />,
    component: <QuizManag />,
  },
  {
    name: "Survey Management",
    layout: "/admin",
    path: "SurveyManagement",
    icon: <img src={Survey} alt="Survey Management" className="h-6 w-6" />,
    component: <SurveyManage/>,
  },
  {
    name: "Poll Management",
    layout: "/admin",
    path: "PollManagement",
    icon: <img src={Poll} alt="Poll Management" className="h-6 w-6" />,
    component: <PollManage/>,
  },
  {
    name: "Grade Management",
    layout: "/admin",
    path: "GradeManagement",
    icon: <img src={Grade} alt="Grade Management" className="h-6 w-6" />,
    component: <GradeManage/>,
  },
  {
    name: "Subject Management",
    layout: "/admin",
    path: "SubjectManagement",
    icon: <img src={Subject} alt="Subject Management" className="h-6 w-6" />,
    component: <SubjectManage/>,
  },
  {
    name: "Subscription Management",
    layout: "/admin",
    path: "SubscriptionManagement",
    icon: <img src={Ledger} alt="Subscription Management" className="h-6 w-6" />,
    component: <SubscriptionManage/>,
  },
  {
    name: "Ledger Management",
    layout: "/admin",
    path: "LedgerManagement",
    icon: <img src={Ledger} alt="Ledger Management" className="h-6 w-6" />,
    component: <LedgerManage/>,
  },
  {
    name: "Order Management",
    layout: "/admin",
    path: "InvoiceManagement",
    icon: <img src={Invoice} alt="Invoice Management" className="h-6 w-6" />,
    component: <InvoiceManage/>,
  },
  {
    name: "Payout Management",
    layout: "/admin",
    path: "PayoutManagement",
    icon: <img src={Payout} alt="Payout Management" className="h-6 w-6" />,
    component: <PayoutManage/>,
  },
  {
    name: "Support Management",
    layout: "/admin",
    path: "SupportManagement",
    icon: <img src={Support} alt="Support Management" className="h-6 w-6" />,
    component: <SupportManage/>,
  },
  {
    name: "Banner Management",
    layout: "/admin",
    path: "BannerManagement",
    icon: <img src={Banner} alt="Banner Management" className="h-6 w-6" />,
    component: <BannerManage/>,
  },
  // {
  //   name: "Refund Gateway",
  //   layout: "/admin",
  //   path: "RefundGateway",
  //   icon: <MdBarChart className="h-6 w-6" />,
  //   component: <Payment/>,
  // },
  // {
  //   name: "Cancellation Management",
  //   layout: "/admin",
  //   path: "CancellationManagement",
  //   icon: <MdBarChart className="h-6 w-6" />,
  //   component: <CancelManage/>,
  // },
  {
    name: "Coupon & Discount",
    layout: "/admin",
    path: "CouponDiscountManagement",
    icon: <MdBarChart className="h-6 w-6" />,
    component: <DiscountManage/>,
  },
  {
    name: "Tax Management",
    layout: "/admin",
    path: "TaxManagement",
    icon: <MdBarChart className="h-6 w-6" />,
    component: <TaxManage/>,
  },
];

export default routes;
