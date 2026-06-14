import React from "react";
import swal from "sweetalert";

("react");

function StatsCard(props) {
  return (
    <div
      className={`flex items-center p-3 px-5 shadow-md drop-shadow-md ${
        props.bg ? "bg-" + props.bg : "bg-white"
      }`}
    >
      {props.img ? (
        <div className="flex items-center gap-5 !text-gray-700">
          <img
            src={props.img}
            alt=""
            className="h-12 min-h-[48px] w-12 min-w-[48px]"
          />
          <div className="flex h-full flex-col items-start justify-between">
            <h1 className="text-lg font-bold uppercase">{props.title}</h1>
            <p className="font-medium text-gray-500">{props.number}</p>
          </div>
        </div>
      ) : (
        <div
          className={`flex w-full items-start justify-between gap-5 bg-${props.bg}`}
        >
          <span className="text-lg uppercase">{props.title}</span>
          <span className="text-xl font-semibold">{props.number}</span>
        </div>
      )}
    </div>
  );
}

export default StatsCard;
