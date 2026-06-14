import axios from "axios";
import { baseUrl } from "../../constants/apiUrl";
import { useEffect, useState } from "react";
import { useParams } from "react-router";
import { Link } from "react-router-dom";

const ExploreQuiz = () => {
  const [quizDetails, setquizDetails] = useState({});
  const previewPlaceholderSrc = "/imageAvatar.jpg";

  const { id } = useParams();
  const getQuizDetails = async (quizId) => {
    try {
      const response = await axios.get(baseUrl + "quiz/quiz/" + `${quizId}`);
      console.log(response.data.quiz);
      setquizDetails(response.data.quiz);
    } catch (error) {
      console.error(error);
    }
  };

  //   <img
  //   src={
  //     baseUrl +`/uploads/coverimage/`  + quizDetails.coverImage && previewPlaceholderSrc
  //   } // Replace with appropriate image source
  //   alt={"NO IMAGE"}
  //   className="h-full w-full object-contain"
  // />

  useEffect(() => {
    getQuizDetails(id); // Replace with actual quiz id when integrating with backend API
  }, []);

  return (
    <div className="bg-gray-50 py-10">
      {quizDetails && (
        <div className="relative mx-auto h-fit max-w-7xl px-4 font-sans tracking-wide">
          <div className="grid grid-cols-1 gap-8 rounded-lg bg-white p-6 shadow-lg md:min-h-[450px] md:grid-cols-2 md:p-8">
            {/* Image Section */}
            <div className="relative flex items-center justify-center">
              <img
                src={
                  baseUrl + `/uploads/coverimage/` + quizDetails.coverImage &&
                  previewPlaceholderSrc
                }
                alt="Quiz Cover"
                className="h-full w-full rounded-xl object-cover shadow-md lg:w-4/5"
              />
            </div>

            {/* Details Section */}
            <div className="flex flex-col justify-between">
              {/* Quiz Title and Details */}
              <div>
                <h2 className="text-3xl font-semibold uppercase text-blue-700">
                  {quizDetails.quizTitle}
                </h2>
                <p className="mt-2 text-sm text-gray-600">
                  <strong>Subject:</strong>{" "}
                  {quizDetails?.subject?.map((subject, index) => (
                    <span key={index}>
                      {subject}
                      {index !== quizDetails.subject.length - 1 && ", "}
                    </span>
                  ))}
                </p>
                <p className="mt-2 text-sm text-gray-600">
                  <strong>Language:</strong> {quizDetails.language}
                </p>
              </div>

              {/* Price and Rating */}
              <div className="mt-8 flex items-center justify-between">
                <h3 className="text-4xl font-bold text-green-600">
                  {quizDetails.amount === 0 ? "Free" : `₹${quizDetails.amount}`}
                </h3>
                <div className="flex">
                  {[1, 2, 3, 4].map((star) => (
                    <svg
                      key={star}
                      className="h-6 w-6 fill-[#facc15]"
                      viewBox="0 0 14 13"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path d="M7 0L9.4687 3.60213L13.6574 4.83688L10.9944 8.29787L11.1145 12.6631L7 11.2L2.8855 12.6631L3.00556 8.29787L0.342604 4.83688L4.5313 3.60213L7 0Z" />
                    </svg>
                  ))}
                  <svg
                    className="h-6 w-6 fill-gray-300"
                    viewBox="0 0 14 13"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path d="M7 0L9.4687 3.60213L13.6574 4.83688L10.9944 8.29787L11.1145 12.6631L7 11.2L2.8855 12.6631L3.00556 8.29787L0.342604 4.83688L4.5313 3.60213L7 0Z" />
                  </svg>
                </div>
              </div>

              {/* Description */}
              <div className="mt-8">
                <ul className="flex justify-center gap-4 border-b">
                  <li className="cursor-pointer border-b-2 border-blue-700 px-4 pb-2 text-lg text-blue-700">
                    Description
                  </li>
                </ul>
                <p className="mt-4 text-sm text-gray-600">
                  {quizDetails.quizDescription}
                </p>
              </div>

              {/* Action Buttons */}
              <div className="mt-8 flex flex-wrap gap-4">
                {quizDetails.amount !== 0 ? (
                  <button
                    type="button"
                    className="min-w-[200px] rounded-lg bg-blue-600 px-6 py-3 text-white shadow-md transition hover:bg-blue-700"
                  >
                    Buy Now
                  </button>
                ) : (
                  <Link
                    to={`https://letsquiz.org/attendquiz/${quizDetails?._id}`}
                  >
                    <button className="min-w-[200px] rounded-lg bg-green-600 px-6 py-3 text-white shadow-md transition hover:bg-green-700">
                      Attempt
                    </button>
                  </Link>
                )}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ExploreQuiz;
