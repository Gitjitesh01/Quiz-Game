import React from "react";
import swal from "sweetalert";

("react");
import { useState } from "react";
import { navLinks } from "../../constants";
import { Link, NavLink } from "react-router-dom";
import { useUser } from "../../context/userContext";

const Navbar = () => {
  const { currentuserdata } = useUser();
  const [menuState, setMenuState] = useState(true);

  const profilepic = localStorage.getItem("userpic");

  return (
    <nav className="fixed  left-0 top-0 z-20 w-full border-b border-gray-200 bg-white">
      <div className="mx-auto flex max-w-screen-xl flex-wrap items-center justify-between p-4">
        <Link to="/" className="flex items-center">
          <span className="self-center whitespace-nowrap text-3xl font-bold ">
            Lets Quiz
          </span>
        </Link>
        <div className="flex gap-4 md:order-2 ">
          {currentuserdata ? (
            <div>
              <Link
                to={`/dashboard/profile`}
                className="text-bold flex h-10 w-10 items-center justify-center overflow-hidden rounded-full bg-[#1D4ED8] text-center text-3xl text-white"
              >
                {profilepic ? (
                  <img
                    src={profilepic}
                    className="h-full w-full object-cover"
                    alt=""
                  />
                ) : (
                  currentuserdata.firstname[0]
                )}
              </Link>
            </div>
          ) : (
            <div className="flex gap-3">
              <Link to={`/login`}>
                <button
                  type="button"
                  className="text-bold mr-3  rounded-lg border-2 border-[#1D4ED8] px-4 py-1  text-center text-lg font-bold text-[#1D4ED8] duration-200   hover:bg-[#1D4ED8] hover:text-white md:mr-0 "
                >
                  Login
                </button>
              </Link>
              <Link to={"/signup"}>
                <button
                  type="button"
                  className="text-bold mr-3  rounded-lg border-2 border-[#1D4ED8] px-4 py-1  text-center text-lg font-bold text-[#1D4ED8] duration-200   hover:bg-[#1D4ED8] hover:text-white md:mr-0 "
                >
                  SignUp
                </button>
              </Link>
            </div>
          )}

          <button
            onClick={() => {
              setMenuState(!menuState);
            }}
            data-collapse-toggle="navbar-sticky"
            type="button"
            className="inline-flex items-center rounded-lg p-2 text-sm text-gray-500 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 md:hidden "
            aria-controls="navbar-sticky"
            aria-expanded="false"
          >
            <span className="sr-only">Open main menu</span>
            <svg
              className="h-6 w-6"
              aria-hidden="true"
              fill="currentColor"
              viewBox="0 0 20 20"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                fillRule="evenodd"
                d="M3 5a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 10a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 15a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z"
                clipRule="evenodd"
              ></path>
            </svg>
          </button>
        </div>
        <div
          className={`items-center justify-between ${
            menuState ? "hidden" : ""
          } w-full md:order-1 md:flex md:w-auto`}
          id="navbar-sticky"
        >
          <ul className="mt-4 flex flex-col rounded-lg border border-gray-100 bg-gray-50 p-4 font-medium md:mt-0 md:flex-row md:space-x-8 md:border-0 md:bg-white md:p-0 ">
            {navLinks.map((link) => {
              return (
                <li key={link.id}>
                  <NavLink
                    to={link.url}
                    onClick={() => {
                      setMenuState("hidden");
                    }}
                    className={({ isActive }) =>
                      `block rounded py-2 pl-3 pr-4 text-xl hover:bg-gray-100 md:p-0 md:hover:bg-transparent ${
                        isActive
                          ? "text-[#1D4ED8] underline decoration-blue-300 decoration-2 underline-offset-8"
                          : "text-[#1D4ED8]"
                      }`
                    }
                  >
                    {link.title}
                  </NavLink>
                </li>
              );
            })}
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
