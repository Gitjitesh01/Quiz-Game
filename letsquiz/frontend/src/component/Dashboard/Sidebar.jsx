import React from "react";
import swal from "sweetalert";

("react");
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import "../Dashboard/css/sidebar.css";
import { useUser } from "../../context/userContext";
import Cookies from "js-cookie";

const Book = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 24 24"
    width="24"
    height="24"
    fill="currentColor"
  >
    <path d="M4 3C3.44772 3 3 3.44772 3 4V20C3 20.5523 3.44772 21 4 21H14C14.5523 21 15 20.5523 15 20V10.6973L17.0215 20.2076C17.1363 20.7479 17.6673 21.0927 18.2075 20.9779L21.142 20.3541C21.6822 20.2393 22.027 19.7083 21.9122 19.1681L19.0015 5.47402C18.8866 4.9338 18.3556 4.58896 17.8154 4.70378L15 5.30221V5C15 4.44772 14.5523 4 14 4H9C9 3.44772 8.55228 3 8 3H4ZM9 6H13V14H9V6ZM13 16V19H9V16H13ZM7 17V19H5V17H7ZM18.7699 18.8137L18.3541 16.8577L19.3323 16.6498L19.748 18.6058L18.7699 18.8137Z"></path>
  </svg>
);

const ExploreIcon = () => (
  <svg
    width="20"
    height="20"
    viewBox="0 0 30 30"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      d="M6.75 23.25L18 18L23.25 6.75L12 12L6.75 23.25ZM15 16.5C14.575 16.5 14.219 16.356 13.932 16.068C13.645 15.78 13.501 15.424 13.5 15C13.499 14.576 13.643 14.22 13.932 13.932C14.221 13.644 14.577 13.5 15 13.5C15.423 13.5 15.7795 13.644 16.0695 13.932C16.3595 14.22 16.503 14.576 16.5 15C16.497 15.424 16.353 15.7805 16.068 16.0695C15.783 16.3585 15.427 16.502 15 16.5ZM15 30C12.925 30 10.975 29.606 9.15 28.818C7.325 28.03 5.7375 26.9615 4.3875 25.6125C3.0375 24.2635 1.969 22.676 1.182 20.85C0.395002 19.024 0.0010019 17.074 1.89873e-06 15C-0.000998101 12.926 0.393002 10.976 1.182 9.15C1.971 7.324 3.0395 5.7365 4.3875 4.3875C5.7355 3.0385 7.323 1.97 9.15 1.182C10.977 0.394 12.927 0 15 0C17.073 0 19.023 0.394 20.85 1.182C22.677 1.97 24.2645 3.0385 25.6125 4.3875C26.9605 5.7365 28.0295 7.324 28.8195 9.15C29.6095 10.976 30.003 12.926 30 15C29.997 17.074 29.603 19.024 28.818 20.85C28.033 22.676 26.9645 24.2635 25.6125 25.6125C24.2605 26.9615 22.673 28.0305 20.85 28.8195C19.027 29.6085 17.077 30.002 15 30ZM15 27C18.35 27 21.1875 25.8375 23.5125 23.5125C25.8375 21.1875 27 18.35 27 15C27 11.65 25.8375 8.8125 23.5125 6.4875C21.1875 4.1625 18.35 3 15 3C11.65 3 8.8125 4.1625 6.4875 6.4875C4.1625 8.8125 3 11.65 3 15C3 18.35 4.1625 21.1875 6.4875 23.5125C8.8125 25.8375 11.65 27 15 27Z"
      fill="#0067B3"
    />
  </svg>
);

// const libraryIcon = () => (
// );

const My_reports = () => (
  <svg
    width="20"
    height="20"
    viewBox="0 0 30 31"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      d="M26.6665 0.5H24.9998C23.1589 0.5 21.6665 1.99238 21.6665 3.83333V27.1667C21.6665 29.0076 23.1589 30.5 24.9998 30.5H26.6665C28.5075 30.5 29.9998 29.0076 29.9998 27.1667V3.83333C29.9998 1.99238 28.5075 0.5 26.6665 0.5Z"
      fill="#0067B3"
    />
    <path
      d="M15.8335 10.5H14.1668C12.3259 10.5 10.8335 11.9924 10.8335 13.8333V27.1667C10.8335 29.0076 12.3259 30.5 14.1668 30.5H15.8335C17.6744 30.5 19.1668 29.0076 19.1668 27.1667V13.8333C19.1668 11.9924 17.6744 10.5 15.8335 10.5Z"
      fill="#0067B3"
    />
    <path
      d="M5 22.1666H3.33333C1.49238 22.1666 0 23.659 0 25.5V27.1666C0 29.0076 1.49238 30.5 3.33333 30.5H5C6.84095 30.5 8.33333 29.0076 8.33333 27.1666V25.5C8.33333 23.659 6.84095 22.1666 5 22.1666Z"
      fill="#0067B3"
    />
  </svg>
);

const SettingsIcons = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 24 24"
    width="24"
    height="24"
    fill="currentColor"
  >
    <path d="M5.33409 4.54491C6.3494 3.63637 7.55145 2.9322 8.87555 2.49707C9.60856 3.4128 10.7358 3.99928 12 3.99928C13.2642 3.99928 14.3914 3.4128 15.1245 2.49707C16.4486 2.9322 17.6506 3.63637 18.6659 4.54491C18.2405 5.637 18.2966 6.90531 18.9282 7.99928C19.5602 9.09388 20.6314 9.77679 21.7906 9.95392C21.9279 10.6142 22 11.2983 22 11.9993C22 12.7002 21.9279 13.3844 21.7906 14.0446C20.6314 14.2218 19.5602 14.9047 18.9282 15.9993C18.2966 17.0932 18.2405 18.3616 18.6659 19.4536C17.6506 20.3622 16.4486 21.0664 15.1245 21.5015C14.3914 20.5858 13.2642 19.9993 12 19.9993C10.7358 19.9993 9.60856 20.5858 8.87555 21.5015C7.55145 21.0664 6.3494 20.3622 5.33409 19.4536C5.75952 18.3616 5.7034 17.0932 5.0718 15.9993C4.43983 14.9047 3.36862 14.2218 2.20935 14.0446C2.07212 13.3844 2 12.7002 2 11.9993C2 11.2983 2.07212 10.6142 2.20935 9.95392C3.36862 9.77679 4.43983 9.09388 5.0718 7.99928C5.7034 6.90531 5.75952 5.637 5.33409 4.54491ZM13.5 14.5974C14.9349 13.7689 15.4265 11.9342 14.5981 10.4993C13.7696 9.0644 11.9349 8.57277 10.5 9.4012C9.06512 10.2296 8.5735 12.0644 9.40192 13.4993C10.2304 14.9342 12.0651 15.4258 13.5 14.5974Z"></path>
  </svg>
);

const Classicon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 24 24"
    width="24"
    height="24"
    fill="currentColor"
  >
    <path d="M4 5V16H20V5H4ZM2 4.00748C2 3.45107 2.45531 3 2.9918 3H21.0082C21.556 3 22 3.44892 22 4.00748V18H2V4.00748ZM1 19H23V21H1V19Z"></path>
  </svg>
);

const QuizIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="24"
    height="24"
    viewBox="0 0 281.232 281.232"
    fill="none"
  >
    <g fill="currentColor">
      <path d="M231.634,79.976v-0.751C231.634,30.181,192.772,0,137.32,0c-31.987,0-57.415,9.018-77.784,22.98c-11.841,8.115-12.907,25.906-4.232,37.355l6.326,8.349c8.675,11.444,24.209,12.532,36.784,5.586c11.46-6.331,23.083-9.758,34-9.758c18.107,0,28.294,7.919,28.294,20.75v0.375c0,16.225-15.469,39.411-59.231,43.181l-1.507,1.697c-0.832,0.936,0.218,13.212,2.339,27.413l1.741,11.58c2.121,14.201,14.065,25.71,26.668,25.71s23.839-5.406,25.08-12.069c1.256-6.668,2.268-12.075,2.268-12.075C199.935,160.882,231.634,127.513,231.634,79.976z" />
      <path d="M118.42,217.095c-14.359,0-25.993,11.64-25.993,25.999v12.14c0,14.359,11.64,25.999,25.993,25.999h22.322c14.359,0,25.999-11.64,25.999-25.999v-12.14c0-14.359-11.645-25.999-25.999-25.999H118.42z" />
    </g>
  </svg>
);

const Dolloricon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 24 24"
    width="24"
    height="24"
    fill="currentColor"
  >
    <path d="M12.0049 22.0027C6.48204 22.0027 2.00488 17.5256 2.00488 12.0027C2.00488 6.4799 6.48204 2.00275 12.0049 2.00275C17.5277 2.00275 22.0049 6.4799 22.0049 12.0027C22.0049 17.5256 17.5277 22.0027 12.0049 22.0027ZM8.50488 14.0027V16.0027H11.0049V18.0027H13.0049V16.0027H14.0049C15.3856 16.0027 16.5049 14.8835 16.5049 13.5027C16.5049 12.122 15.3856 11.0027 14.0049 11.0027H10.0049C9.72874 11.0027 9.50488 10.7789 9.50488 10.5027C9.50488 10.2266 9.72874 10.0027 10.0049 10.0027H15.5049V8.00275H13.0049V6.00275H11.0049V8.00275H10.0049C8.62417 8.00275 7.50488 9.12203 7.50488 10.5027C7.50488 11.8835 8.62417 13.0027 10.0049 13.0027H14.0049C14.281 13.0027 14.5049 13.2266 14.5049 13.5027C14.5049 13.7789 14.281 14.0027 14.0049 14.0027H8.50488Z"></path>
  </svg>
);

const Suppport =()=>(
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24" fill="currentColor"><path d="M22 17.0022C21.999 19.8731 19.9816 22.2726 17.2872 22.8616L16.6492 20.9476C17.8532 20.7511 18.8765 20.0171 19.4649 19H17C15.8954 19 15 18.1046 15 17V13C15 11.8954 15.8954 11 17 11H19.9381C19.446 7.05369 16.0796 4 12 4C7.92038 4 4.55399 7.05369 4.06189 11H7C8.10457 11 9 11.8954 9 13V17C9 18.1046 8.10457 19 7 19H4C2.89543 19 2 18.1046 2 17V12C2 6.47715 6.47715 2 12 2C17.5228 2 22 6.47715 22 12V12.9987V13V17V17.0013V17.0022Z"></path></svg>
) 

const sidebarLinksTeacher = [
  {
    img: <ExploreIcon />,
    title: "Explore",
    url: "explore",
  },
  {
    img: <Book />,
    title: "My Library",
    url: "library",
  },
  {
    img: <QuizIcon />,
    title: "Quiz attended",
    url: "quizattended",
  },
  {
    img: <My_reports />,
    title: "My Reports",
    url: "myreports",
  },
  {
    img: <Classicon />,
    title: "Classes",
    url: "classes",
  },
  {
    img: <Dolloricon />,
    title: "Payments",
    url: "payments",
  },
  {
    img : <Suppport />,
    title : "Support",
    url : "support"
  },
  {
    img: <SettingsIcons />,
    title: "Settings",
    url: "settings",
  },
];

const Sidebar = (props) => {
  const { setCurrentUserData } = useUser();
  const [activeLink, setActiveLink] = useState("/");
  const handleMenuItemClick = (url) => {
    setActiveLink(url);
  };

  const sidebarLinksStudent = [
    {
      title: "Explore",
      url: "explore",
    },
    {
      title: "Quiz attended",
      url: "quizattended",
    },
    {
      title: "My Reports",
      url: "myreports",
    },
    {
      title: "Classes",
      url: "classes",
    },
    {
      title: "Settings",
      url: "settings",
    },
    {
      title: "Support",
      url: "cancelsubscription",
    },
  ];
  const sidebarLinksAdmin = [
    {
      title: "Dashboard",
      url: "",
    },
    {
      title: "Teachers",
      url: "quizattended",
    },
    {
      title: "Students",
      url: "quizattended",
    },
    {
      title: "quizattended",
      url: "quizattended",
    },
  ];

  console.log(props.userType);
  const sidebarLinks =
    props.userType === "teacher"
      ? sidebarLinksTeacher
      : props.userType === "admin"
      ? sidebarLinksAdmin
      : sidebarLinksStudent;
  const navigate = useNavigate();
  const handleLogout = async () => {
    Cookies.remove("XgdRTKJvdjhFGFDGD");
    // window.location.reload();
    setCurrentUserData("");
    // window.location.reload();
    navigate("/");
  };
  return (
    // This is used to make the sidebard hide in small devide with a transition will think about it
    // -translate-x-full sm:translate-x-0

    <aside
      id="default-sidebar"
      className=" fixed z-40 mt-20 h-screen w-32 transition-transform "
      aria-label="Sidenav"
    >
      <div className=" ">
        <ul className="mx-1 mt-3">
          <Link to={"/dashboard"}>
            <div className="flex h-12  cursor-pointer items-center justify-center rounded-xl bg-[#1D4ED8] text-white duration-200 hover:bg-white hover:text-[#1D4ED8]">
              <button className=" text-md flex  justify-center gap-1  font-bold">
                Create
                {/* <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  width="24"
                  height="24"
                  fill="currentColor"
                >
                  <path d="M12 22C6.47715 22 2 17.5228 2 12C2 6.47715 6.47715 2 12 2C17.5228 2 22 6.47715 22 12C22 17.5228 17.5228 22 12 22ZM11 11H7V13H11V17H13V13H17V11H13V7H11V11Z"></path>
                </svg> */}
              </button>
            </div>
          </Link>
        </ul>
        <hr className="mt-3" />
        <ul className="mt-4 ">
          {sidebarLinks.map((link) => (
            <li
              key={link.url}
              className={` flex w-[180px]  cursor-pointer items-center -ml-2 text-base font-normal text-black  duration-200 hover:bg-blue-100/50  ${
                activeLink === link.url
                  ? "rounded-md rounded-l-md border-l-8 0  py-2 "
                  : "p-2"
              }`}
            >
              {activeLink === link.url && (
                <svg
                  width="10"
                  height="30"
                  viewBox="0 0 10 50"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path d="M0 0L10 7V43L0 50V0Z" fill="#0067B3" />
                </svg>
              )}
              <Link
                to={link.url}
                className={`flex items-center justify-center rounded-lg pt-1 text-base font-normal  text-gray-900 ${
                  activeLink === link.url
                    ? "bg-opacity-75 backdrop-filter "
                    : ""
                }`}
                onClick={() => handleMenuItemClick(link.url)}
              >
                <span className="text-md ml-3 flex w-[140px] cursor-pointer font-bold text-[#1D4ED8]">
                  {console.log(link.img, "link.img")}
                  {link.img && <div className="mr-2 mt-1">{link.img}</div>}
                  <p className="text-[#1D4ED8]">{link.title}</p>
                </span>
              </Link>
            </li>
          ))}

          <li>
            <hr className="mt-3" />

            <div
              onClick={() => handleLogout()}
              className="text-whiterounded-lg flex cursor-pointer items-center p-2 font-normal text-black hover:bg-gray-100"
            >
              <span className="text-md  font-bold text-[#1D4ED8] flex">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  width="22"
                  height="22"
                  className="mr-2"
                  fill="currentColor"
                >
                  <path d="M12 22C6.47715 22 2 17.5228 2 12C2 6.47715 6.47715 2 12 2C15.2713 2 18.1757 3.57078 20.0002 5.99923L17.2909 5.99931C15.8807 4.75499 14.0285 4 12 4C7.58172 4 4 7.58172 4 12C4 16.4183 7.58172 20 12 20C14.029 20 15.8816 19.2446 17.2919 17.9998L20.0009 17.9998C18.1765 20.4288 15.2717 22 12 22ZM19 16V13H11V11H19V8L24 12L19 16Z"></path>
                </svg>
                Logout
              </span>
            </div>
          </li>
        </ul>
      </div>
    </aside>
  );
};

export default Sidebar;
