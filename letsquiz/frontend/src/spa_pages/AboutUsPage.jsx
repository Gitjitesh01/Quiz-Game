import React from "react";
import swal from "sweetalert";

("react");
import { homeCarousel } from "../constants";

const AboutUsPage = () => {
  return (
    <div className="mx-auto max-w-screen-xl px-4 py-8 lg:px-6 lg:py-16">
      <div className="flex w-full flex-col items-center gap-8">
        <div className="my-6 flex w-5/6 flex-col items-center gap-8 bg-white md:flex-row  ">
          <div className="flex flex-col justify-between p-4 leading-normal">
            <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900   ">
              Vision :{" "}
            </h5>
            <ul className="mx-5 list-disc">
              <li>
                Understand what your audience/employees feel about a
                topic/situation.
              </li>
              <li>Your audience can summarize their view of a topic.</li>
              <li>
                Allows you to measure change when used at the start and end of
                an intervention/workshop.
              </li>
              <li>You can measure audience understanding of a topic.</li>
            </ul>
          </div>
        </div>
        <div className="my-6 flex w-5/6 flex-col items-center gap-8 bg-white  md:flex-row  ">
          <div className="flex flex-col justify-between p-4 leading-normal">
            <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900   ">
              Mission :
            </h5>
            <p className="mb-3 font-normal text-gray-700  ">
              To make learning interesting! At Letsquiz !, we are all about
              lifelong learning. We acquire new abilities in life through play
              and curiosity. No matter the subject, age, or ability, we can
              unleash our hidden potentials through Letsquiz . we may all
              realise our innate capacity for learning in Letsquiz . We are on a
              mission to make learning interesting because we want to unleash
              this potential in every student. We achieve this by giving our
              users meaningful and engaging experiences, and by pursuing our
              ambition of developing the top learning platform on the planet
            </p>
          </div>
        </div>
        <div className="my-6 flex w-5/6 flex-col items-center gap-8 bg-white  md:flex-row  ">
          <div className="flex flex-col justify-between p-4 leading-normal">
            <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900   ">
              About us :
            </h5>
            <p className="mb-3 font-normal text-gray-700  ">
              Who we are ? It is a team of teachers from various part of India
              conceived the Letsquiz during the Covid. Under the guidance of
              Acciliamarie who is a retired primary school teacher from Southern
              Part of India. Children at school feel fear and stress because of
              exams. So, the team wanted to make the assessment process stress
              free for the children by making assessment easy and funny.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AboutUsPage;
