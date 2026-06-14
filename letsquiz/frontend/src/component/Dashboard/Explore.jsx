import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import CarouselComp from "../../component/utility/CarouselComp";
import swal from "sweetalert";

const Explore = () => {
  const subjectList = JSON.parse(localStorage.getItem("allSubjects")) || [];
  const [search, setSearch] = useState("");
  const [filterdata, setFilterdata] = useState(subjectList);
  const previewPlaceholderSrc = "/imageAvatar.jpg";

  const searchData = () => {
    const filteredData = subjectList.filter((item) =>
      item.name.toLowerCase().includes(search.toLowerCase())
    );
    setFilterdata(filteredData);
  };

  function isValidUrl(url) {
    try {
      new URL(url); // Throws if invalid
      return true;
    } catch (e) {
      return false;
    }
  }

  useEffect(() => {
    if (search) {
      searchData();
    } else {
      setFilterdata(subjectList);
    }
  }, [search, subjectList]);

  return (
    <div className="flex flex-col flex-wrap gap-8 p-4">
      {/* <div className="relative flex h-10 w-full items-center justify-center gap-3 rounded-xl border-4 border-dashed border-blue-500 bg-white  text-lg outline-none sm:text-xl">
        <div className="  px-5 text-2xl   text-zinc-600 sm:text-4xl">
          <pre className="font-sans">Search here</pre>
        </div>
        <div className="h-[80%] w-[2px] rounded-full bg-blue-600"></div>
        <input
          placeholder="Search"
          type="text"
          value={search}
          className=" h-full w-1/2 bg-transparent text-lg outline-none sm:text-xl "
          onChange={(e) => setSearch(e.target.value)}
        />
      </div> */}

      <div className="relative flex">
        <div className="flex flex-col items-center">
          <h2 className="text-2xl font-bold">Select your quiz category</h2>
          <p className="text-gray-500">
            Click to view all available test series in a quiz
          </p>
        </div>
        <div className=""></div>
      </div>
      <div className="flex flex-wrap items-center justify-center gap-8 text-center">
        {filterdata.length > 0 ? (
          filterdata.map((item) => (
            <Link key={item.value} to={`/dashboard/` + item.value}>
              <div className="flex h-60 w-44 flex-col items-center justify-start gap-3 overflow-hidden  bg-gray-200 text-center">
                <img
                  src={isValidUrl(item.url) ? item.url : previewPlaceholderSrc}
                  alt={item.name}
                  className="h-3/4 w-full bg-white object-contain"
                />
                <span className="font-light text-[#1D4ED8]">{item.name}</span>
              </div>
            </Link>
          ))
        ) : (
          <p>No quizzes found.</p>
        )}
      </div>
    </div>
  );
};

export default Explore;
