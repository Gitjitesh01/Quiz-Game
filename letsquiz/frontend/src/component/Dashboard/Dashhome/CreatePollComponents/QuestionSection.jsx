import React, { useEffect, useState } from "react";
import { AiFillDelete } from "react-icons/ai";
import { TiDelete, TiTick } from "react-icons/ti";
import PropTypes from "prop-types";
function QuestionSection(props) {
  console.log(props.type);
  console.log(props.questions);
  const [selectedOption, setSelectedOption] = useState(null);
  console.log(props);
  const handleTypeSelection = (type) => {
    setQuestionType(type);
  };

  const questionType = {
    mcq: (
      <>
        {props.questions[props.index].options.map((singleMcq, index) => {
          return (
            // <>
            <div id="mcqOption1" className="my-2 flex items-center">
              <div className="relative w-full">
                <input
                  type="text"
                  id="simple-search"
                  className="block w-full rounded-lg border border-gray-300 bg-white p-2.5 pl-10 text-sm text-gray-900 focus:border-blue-500 focus:ring-blue-500   "
                  placeholder="Add an option here"
                  value={singleMcq.text}
                  onChange={(e) => {
                    let temp = [...props.questions];
                    temp[props.index].options[index].text = e.target.value;
                    temp[props.index].options[index].id = index + 1;
                    props.setQuestions(temp);
                  }}
                  required
                />
              </div>
              <button
                type="submit"
                className="ml-2 rounded-lg border border-red-500 bg-red-700 p-2.5 text-sm font-medium text-white hover:bg-red-600 focus:outline-none focus:ring-4 focus:ring-red-300  "
                onClick={() => {
                  let temp = [...props.questions];
                  temp[props.index].options.splice(index, 1);
                  // temp[props.index].answers.splice(index, 1);
                  props.setQuestions(temp);
                }}
              >
                <TiDelete />
                <span className="sr-only">Delete</span>
              </button>
            </div>
          );
        })}
        {props.questions[props.index].options.length < 5 ? (
          <button
            className="block w-full rounded-lg border border-gray-300 bg-primary-600 p-2.5 text-sm text-white focus:border-blue-500 focus:ring-blue-500  "
            onClick={() => {
              let temp = [...props.questions];
              temp[props.index].options.push({
                text: "",
                id: temp[props.index].options.length + 1,
                vote: 0,
              });
              // temp[props.index].answers.push({});
              props.setQuestions(temp);
            }}
          >
            Add Answer Option
          </button>
        ) : (
          ""
        )}
      </>
    ),
    wordcloud: (
      <>
        {props.questions[props.index].options.length == 1 ? (
          <div className="flex flex-col">
            <div>
              <h2 className="text-center text-xl font-bold">
                Choose how many answers you need
              </h2>
            </div>

            <div className="flex items-center justify-center">
              <select
                value={selectedOption}
                onChange={(e) => {
                  setSelectedOption(e.target.value);
                  props.setQuestionType(wordcloud);
                }}
                className="rounded-md border px-2 py-1"
              >
                <option value="">-- Select --</option>
                <option value="1">1</option>
                <option value="2">2</option>
                <option value="3">3</option>
                <option value="4">4</option>
                <option value="5">5</option>
              </select>

              {selectedOption && (
                <div className="ml-4">
                  <button
                    className="block w-full rounded-lg border border-gray-300 bg-primary-600 p-2.5 text-sm text-white focus:border-blue-500 focus:ring-blue-500"
                    onClick={() => {
                      let temp = [...props.questions];
                      temp[props.index].options = Array(
                        Number(selectedOption)
                      ).fill("");
                      props.setQuestions(temp);
                    }}
                  >
                    Done
                  </button>
                </div>
              )}
            </div>
          </div>
        ) : (
          <div className="flex flex-col">
            {/* Render the existing options */}
            {props.questions[props.index].options.map((option, index) => (
              <div key={index} className="my-2 flex items-center">
                <div className="relative w-full">
                  <input
                    type="text"
                    id={`wordcloud-option-${index}`}
                    className="block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 pl-10 text-sm text-gray-900 focus:border-blue-500 focus:ring-blue-500"
                    placeholder={`Option ${index + 1}`}
                    value={option}
                    onChange={(e) => {
                      let temp = [...props.questions];
                      temp[props.index].options[index] = e.target.value;
                      props.setQuestions(temp);
                    }}
                    required
                  />
                </div>
              </div>
            ))}
          </div>
        )}
      </>
    ),

    test: (
      <textarea
        id="message"
        rows="4"
        className="block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 focus:border-blue-500 focus:ring-blue-500  "
        placeholder="Write your thoughts here..."
      ></textarea>
    ),
  };

  return(
    <>
  {props.questions[props.index].options.map((singleMcq, index) => {
    return (
      // <>
      <div id="mcqOption1" className="my-2 flex items-center">
        <div className="relative w-full">
          <input
            type="text"
            id="simple-search"
            className="block w-full rounded-lg border border-gray-300 bg-white p-2.5 pl-10 text-sm text-gray-900 focus:border-blue-500 focus:ring-blue-500   "
            placeholder="Add an option here"
            value={singleMcq.text}
            onChange={(e) => {
              let temp = [...props.questions];
              temp[props.index].options[index].text = e.target.value;
              temp[props.index].options[index].id = index + 1;
              props.setQuestions(temp);
            }}
            required
          />
        </div>
        <button
          type="submit"
          className="ml-2 rounded-lg border border-red-500 bg-red-700 p-2.5 text-sm font-medium text-white hover:bg-red-600 focus:outline-none focus:ring-4 focus:ring-red-300  "
          onClick={() => {
            let temp = [...props.questions];
            temp[props.index].options.splice(index, 1);
            // temp[props.index].answers.splice(index, 1);
            props.setQuestions(temp);
          }}
        >
          <TiDelete />
          <span className="sr-only">Delete</span>
        </button>
      </div>
    );
  })}
  {props.questions[props.index].options.length < 5 ? (
    <button
      className="block w-full rounded-lg border border-gray-300 bg-primary-600 p-2.5 text-sm text-white focus:border-blue-500 focus:ring-blue-500  "
      onClick={() => {
        let temp = [...props.questions];
        temp[props.index].options.push({
          text: "",
          id: temp[props.index].options.length + 1,
          vote: 0,
        });
        // temp[props.index].answers.push({});
        props.setQuestions(temp);
      }}
    >
      Add Answer Option
    </button>
  ) : (
    ""
  )}
</>);
}

QuestionSection.propTypes = {
  type: PropTypes.oneOf(["mcq", "wordcloud"]),
  index: Number,
  setQuestions: Function,
  questions: Array,
};

export default QuestionSection;
