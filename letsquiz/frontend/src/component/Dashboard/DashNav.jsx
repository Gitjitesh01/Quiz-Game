import React from "react";
import swal from "sweetalert";

("react");
import { Link } from "react-router-dom";

const DashNav = ({ userName }) => {
  const words = userName.split(" ");
  const firstLetters = words
    .slice(0, 2)
    .map((word) => word.charAt(0).toUpperCase())
    .join("");

  return (
    <nav className="border-gray-200 bg-white px-4 py-2.5 shadow-sm lg:px-6 ">
      <div className="flex flex-wrap items-center justify-end">
        <button
          type="button"
          className="mx-3 flex rounded-full bg-gray-800 text-sm focus:ring-4 focus:ring-gray-300 md:mr-0 "
          id="user-menu-button"
          aria-expanded="false"
          data-dropdown-toggle="dropdown"
        >
          <span className="sr-only">Open user menu</span>
          <Link to="/dashboard/profile">
            <div className="flex h-[50px] w-[50px] items-center justify-center rounded-full bg-primary-800">
              <span className="text-[18px] font-bold text-white">
                {firstLetters}
              </span>
            </div>
          </Link>
        </button>
      </div>
    </nav>
  );
};

export default DashNav;
