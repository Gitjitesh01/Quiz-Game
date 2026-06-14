import React from "react";
import swal from "sweetalert";

("react");
import { homeCarousel } from "../constants";

export const FeaturesPage = () => {
  return (
    <div className="mx-auto max-w-screen-xl px-4 py-8 lg:px-6 lg:py-16">
      <div className="my-12 flex w-full flex-col items-center gap-8">
        <div className="my-6 flex w-5/6 flex-col items-center gap-8 bg-white shadow md:flex-row  ">
          <div className="flex w-full flex-col">
            <img
              className="h-96 w-full rounded-t-lg object-cover md:h-auto md:w-48 md:rounded-none md:rounded-l-lg"
              src={homeCarousel[8].img}
              alt=""
            />
            <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900   ">
              Create questions to assess descriptive answers
            </h5>
          </div>
          <div className="flex flex-col justify-between p-4 leading-normal">
            <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900   ">
              Short answers :
            </h5>
            <p className="mb-3 font-normal text-gray-700  ">
              This feature auto evaluated the descriptive answers at a fraction
              of second within a single click. You can just enter keywords of
              the answers that are related questions. Using the keyword, it
              automatically evaluates the answers with 100 percent accuracy.
            </p>
            <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900   ">
              Benefits :
            </h5>
            <ul className="list-disc">
              <li>Avoids delay in assessing descriptive answers</li>
              <li>
                Get accurate and faster results with the help of Keywords and AI
              </li>
              <li>Save cost of physical evaluation</li>
            </ul>
          </div>
        </div>
        <div className="my-6 flex w-5/6 flex-col items-center gap-8 rounded-lg bg-white shadow md:flex-row  ">
          <div className="flex w-full flex-col">
            <img
              className="h-96 w-full rounded-t-lg object-cover md:h-auto md:w-48 md:rounded-none md:rounded-l-lg"
              src={homeCarousel[2].img}
              alt=""
            />
            <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900   ">
              Create a word Cloud and get response in real time
            </h5>
          </div>
          <div className="flex flex-col justify-between p-4 leading-normal">
            <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900   ">
              WORD CLOUD :
            </h5>
            <p className="mb-3 font-normal text-gray-700  ">
              Word clouds are great for visualizing unstructured text data and
              getting insights on trends and patterns. When using the Letsquiz
              word cloud, the words that are added most frequently by the
              audience, the word font size will increase dynamically. This helps
              the presenter to collect the data from the their audience easily.
            </p>
            <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900   ">
              Benefits :
            </h5>
            <ul className="list-disc">
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
        <div className="my-6 flex w-5/6 flex-col items-center gap-8 bg-white shadow md:flex-row  ">
          <div className="flex w-full flex-col">
            <img
              className="h-96 w-full rounded-t-lg object-cover md:h-auto md:w-48 md:rounded-none md:rounded-l-lg"
              src={homeCarousel[6].img}
              alt=""
            />
            <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900   ">
              Create a matching puzzle easily
            </h5>
          </div>
          <div className="flex flex-col justify-between p-4 leading-normal">
            <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900   ">
              Matching :
            </h5>
            <p className="mb-3 font-normal text-gray-700  ">
              Matching questions are made up of two lists of related items that
              students must pair up by deciding which item in the first list
              corresponds to an item in the second list. They are appealing to
              the students. It also helps the teachers to test a great deal of
              information in a short amount of time.
            </p>
            <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900   ">
              Benefits :
            </h5>
            <ul className="list-disc">
              <li>Can be used for a wide range of subject matter.</li>
              <li>Effective when assessing definitions and relationships.</li>
              <li>
                Space saving, objective, compact method to assess learning
                targets.
              </li>
            </ul>
          </div>
        </div>
        <div className="my-6 flex w-5/6 flex-col items-center gap-8 bg-white shadow md:flex-row  ">
          <div className="flex w-full flex-col">
            <img
              className="h-96 w-full rounded-t-lg object-cover md:h-auto md:w-48 md:rounded-none md:rounded-l-lg"
              src={homeCarousel[1].img}
              alt=""
            />
            <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900   ">
              Get Poll result in Realtime
            </h5>
          </div>
          <div className="flex flex-col justify-between p-4 leading-normal">
            <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900   ">
              POLL :
            </h5>
            <p className="mb-3 font-normal text-gray-700  ">
              Polling is an active learning technique that can be used to engage
              students in thinking about course content as well as assess their
              opinions, knowledge, and/or skills in real time and with low or no
              stakes. It can also be used in any type of corporate meetings.
            </p>
            <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900   ">
              Benefits :
            </h5>
            <ul className="list-disc">
              <li>easily you can gather information.</li>
              <li>You can decide with realtime vote by the audience</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};
