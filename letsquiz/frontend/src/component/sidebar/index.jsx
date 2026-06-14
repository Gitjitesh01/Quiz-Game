import { HiX } from "react-icons/hi";
import Links from "./components/Links";
import SidebarCard from "./componentsrtl/SidebarCard";
import routes from "../../routes";
import logo from "../../assets/img/Lets Quiz Black.png";

const Sidebar = ({ open, onClose }) => {

  const Adminlogout = () => {
    localStorage.removeItem('Admin');
    window.location.reload();
  }
  return (
    <div
      className={`dark:bg-navy-800 fixed inset-y-0 left-0 z-50 flex flex-col bg-white shadow-xl transition-transform duration-300 ease-linear ${
        open ? "translate-x-0" : "-translate-x-full sm:-translate-x-96"
      }`}
    >
      {/* Close Button */}
      <button className="p-4 xl:hidden" onClick={onClose}>
        <HiX />
      </button>

      {/* Sidebar Header */}
      <div className="mx-14 mt-12 flex flex-col gap-3 items-center">
        <h1 className="text-navy-1000 text-4xl  font-bold dark:text-white">
          Lets Quiz
          {/* <img src={logo} alt="logo"  w-33px h-10px/> */}
        </h1>
        <button
        onClick={Adminlogout} 
         className="bg-blue-500 text-white font-bold px-3 py-1 text-xl rounded-xl">Logout</button>
      </div>

      {/* Divider */}
      <div className="my-6 border-t border-gray-300 dark:border-white/30" />

      {/* Navigation Links */}
      <ul className="flex-1 overflow-y-auto">
        <Links routes={routes} />
      </ul>

      {/* Sidebar Card */}
      <div className="p-4">
        <SidebarCard />
      </div>
    </div>
  );
};

export default Sidebar;
