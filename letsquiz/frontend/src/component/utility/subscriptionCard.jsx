import React from "react";
import swal from "sweetalert";

("react");
import { Link } from "react-router-dom";
const capitalizeFirstLetter = (string) => {
  return string?.charAt(0).toUpperCase() + string?.slice(1);
};
const SubscriptionCard = ({ imageUrl, title, onViewMore }) => {
  return (
    <div
      className=" m-4 overflow-hidden rounded shadow-lg"
      style={{ maxWidth: "15rem" }}
    >
      <img className="w-full" src={imageUrl} alt={title} />
      <div className="px-6 py-4">
        <div className="mb-2 text-xl font-bold">
          {capitalizeFirstLetter(title)}
        </div>
        <button
          onClick={onViewMore}
          className="rounded bg-blue-500 px-4 py-2 font-bold text-white hover:bg-blue-700"
          // to="/dashboard/chooseSubscription"
        >
          View More
        </button>
      </div>
    </div>
  );
};

export default SubscriptionCard;
