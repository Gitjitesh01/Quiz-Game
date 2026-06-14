import React, { useState, useEffect } from "react";
import swal from "sweetalert";

import Matching from "./Matching";
import parse, { domToReact } from "html-react-parser";

const customParser = (domNode) => {
  if (domNode.type === "tag") {
    const { name, attribs, children } = domNode;

    switch (name) {
      case "strong":
        return (
          <strong className="font-bold">
            {domToReact(children, customParser)}
          </strong>
        );
      case "em":
        return <em className="italic">{domToReact(children, customParser)}</em>;
      case "u":
        return (
          <u className="underline">{domToReact(children, customParser)}</u>
        );
      case "blockquote":
        return (
          <blockquote className="border-l-4 border-gray-400 pl-4 italic">
            {domToReact(children, customParser)}
          </blockquote>
        );
      case "li":
        return (
          <li className="ml-4 list-disc">
            {domToReact(children, customParser)}
          </li>
        );
      case "ol":
        return (
          <ol className="ml-4 list-decimal">
            {domToReact(children, customParser)}
          </ol>
        );
      case "ul":
        return (
          <ul className="ml-4 list-disc">
            {domToReact(children, customParser)}
          </ul>
        );
      case "h1":
        return (
          <h1 className="text-4xl font-bold">
            {domToReact(children, customParser)}
          </h1>
        );
      case "h2":
        return (
          <h2 className="text-3xl font-bold">
            {domToReact(children, customParser)}
          </h2>
        );
      case "h3":
        return (
          <h3 className="text-2xl font-bold">
            {domToReact(children, customParser)}
          </h3>
        );
      case "h4":
        return (
          <h4 className="text-xl font-bold">
            {domToReact(children, customParser)}
          </h4>
        );
      case "h5":
        return (
          <h5 className="text-lg font-bold">
            {domToReact(children, customParser)}
          </h5>
        );
      case "h6":
        return (
          <h6 className="text-base font-bold">
            {domToReact(children, customParser)}
          </h6>
        );
      case "p":
        return <p className="mb-4">{domToReact(children, customParser)}</p>;
      // Add more cases as needed for other HTML tags
      default:
        return domToReact(domNode, customParser);
    }
  }
};

const QuizComponent = ({
  currentQuestionIndex,
  setCurrentQuestionIndex,
  questions,
  updateAnswerAtIndex,
  setProgress,
  setTimer,
  whenSubmitted,
  answers,
}) => {
  const [selectedOptions, setSelectedOptions] = useState({});
  const [mcqAnswer, setMcqAnswer] = useState();
  const [trueOrFalse, setTrueOrFalse] = useState();
  const [checkboxAnswer, setCheckboxAnswer] = useState();
  const [shortAnswer, setShortAnswer] = useState("");
  const [fillUp, setFillUp] = useState("");
  const [emailInput, setEmailInput] = useState("");
  const [dateInput, setDateInput] = useState("");
  const [dropdownAnswer, setDropdownAnswer] = useState("");
  const [matchingAnswer, setMatchingAnswer] = useState(null);
  const [wordcloudAnswer, setWordcloudAnswer] = useState(null);

  // Add this useEffect hook to populate local state when navigating
  useEffect(() => {
    const savedAnswer = answers[currentQuestionIndex];
    if (savedAnswer !== undefined || savedAnswer !== null) {
      const currentQuestion = getCurrentQuestion();
      switch (currentQuestion.type.toUpperCase()) {
        case "MULTIPLE CHOICE":
        case "MCQ":
          setMcqAnswer(savedAnswer);
          setSelectedOptions((prevState) => ({
            ...prevState,
            [currentQuestion.id]: savedAnswer,
          }));
          break;
        case "TRUE OR FALSE":
        case "TRUEFALSE":
          setTrueOrFalse(savedAnswer);
          setSelectedOptions((prevState) => ({
            ...prevState,
            [currentQuestion.id]: savedAnswer ? "true" : "false",
          }));
          break;
        case "SHORT ANSWER":
        case "SHORTANSWER":
          setShortAnswer(savedAnswer);
          break;
        case "FILL UPS":
        case "FILLUPS":
          setFillUp(savedAnswer);
          break;
        case "EMAIL":
          setEmailInput(savedAnswer);
          break;
        case "DATE":
          setDateInput(savedAnswer);
          break;
        case "MATCHING":
          setMatchingAnswer(savedAnswer);
          break;
        case "CHECK BOX":
        case "checkbox":
          setCheckboxAnswer(savedAnswer);
          setSelectedOptions((prevState) => ({
            ...prevState,
            [currentQuestion.id]: savedAnswer,
          }));
          break;

        case "DROP DOWN":
        case "DROPDOWN":
          setDropdownAnswer(savedAnswer);
          break;
        case "WORDCLOUD":
          setWordcloudAnswer(savedAnswer);
          break;
      }
    }
  }, [currentQuestionIndex, answers]);

  console.log(currentQuestionIndex);
  const selectAnswerToAdd = () => {
    if (
      getCurrentQuestion().type === "MULTIPLE CHOICE" ||
      getCurrentQuestion().type === "mcq"
    ) {
      console.log(mcqAnswer);
      return mcqAnswer;
    } else if (
      getCurrentQuestion().type === "TRUE OR FALSE" ||
      getCurrentQuestion().type === "truefalse"
    ) {
      return trueOrFalse;
    } else if (
      getCurrentQuestion().type === "SHORT ANSWER" ||
      getCurrentQuestion().type === "shortanswer"
    ) {
      return shortAnswer;
    } else if (
      getCurrentQuestion().type === "FILL UPS" ||
      getCurrentQuestion().type === "fillups"
    ) {
      return fillUp;
    } else if (
      getCurrentQuestion().type === "DATE" ||
      getCurrentQuestion().type === "date"
    ) {
      return dateInput;
    } else if (
      getCurrentQuestion().type === "MATCHING" ||
      getCurrentQuestion().type === "matching"
    ) {
      return matchingAnswer;
    } else if (
      getCurrentQuestion().type === "CHECK BOX" ||
      getCurrentQuestion().type === "checkbox"
    ) {
      return checkboxAnswer;
    } else if (
      getCurrentQuestion().type === "DROP DOWN" ||
      getCurrentQuestion().type === "dropdown"
    ) {
      return dropdownAnswer;
    } else if (
      getCurrentQuestion().type === "WORDCLOUD" ||
      getCurrentQuestion().type === "wordcloud"
    ) {
      return wordcloudAnswer;
    } else {
      return null;
    }
  };

  const addAnswer = () => {
    return updateAnswerAtIndex(currentQuestionIndex, selectAnswerToAdd());
  };

  const handleSubmit = async () => {
    if (getCurrentQuestion().cumpolsory === true) {
      // check if the answer is empty
      console.log("Current ques ans", selectAnswerToAdd());
      if (
        selectAnswerToAdd() === null ||
        selectAnswerToAdd() === "" ||
        selectAnswerToAdd() === undefined
      ) {
        alert("Please answer the question");
        return;
      }
      const answers = addAnswer();
      whenSubmitted(answers);
    }
  };

  const handleOptionChange = (questionId, optionId) => {
    console.log("Answers", selectedOptions, optionId);
    setSelectedOptions((prevSelectedOptions) => ({
      ...prevSelectedOptions,
      [questionId]: optionId,
    }));
  };

  const handleNextQuestion = async () => {
    console.log("Responses", selectedOptions);
    console.log("Questsions", getCurrentQuestion());
    // check if question's required field is true
    if (getCurrentQuestion().cumpolsory === true) {
      // check if the answer is empty
      console.log("Current ques ans", selectAnswerToAdd());
      if (
        selectAnswerToAdd() === null ||
        selectAnswerToAdd() === "" ||
        selectAnswerToAdd() === undefined
      ) {
        alert("Please answer the question");
        return;
      } else {
        await setCurrentQuestionIndex((prevIndex) =>
          Math.min(prevIndex + 1, questions.length - 1)
        );
        setProgress(((currentQuestionIndex + 2) / questions.length) * 100);
        await addAnswer();
        setTimer(questions[currentQuestionIndex + 1].timer);
      }
    }
    // setShortAnswer('');
    // setEmailInput('');
    // setDateInput('');
    // setMcqAnswer('');
    // setTrueOrFalse('');
    // setFillUp('');
    // setCheckboxAnswer('');
  };

  const handlePreviousQuestion = () => {
    setCurrentQuestionIndex((prevIndex) => Math.max(prevIndex - 1, 0));
    setProgress((currentQuestionIndex / questions.length) * 100);
    setTimer(questions[currentQuestionIndex - 1].timer);
  };

  const getCurrentQuestion = () => questions[currentQuestionIndex];

  const handleCheckboxChange = (questionId, optionId) => {
    setSelectedOptions((prevSelectedOptions) => {
      console.log("PREV", prevSelectedOptions);
      const selectedOptionsForQuestion = prevSelectedOptions[questionId] || [];

      // Check if the option is already selected
      const isOptionSelected = selectedOptionsForQuestion.includes(optionId);

      // Create a new array of selected options
      const updatedOptions = isOptionSelected
        ? selectedOptionsForQuestion.filter((id) => id !== optionId)
        : [...selectedOptionsForQuestion, optionId];

      setCheckboxAnswer(updatedOptions);

      // Update the state with the new selected options array
      return {
        ...prevSelectedOptions,
        [questionId]: updatedOptions,
      };
    });
    console.log("Answers", selectedOptions);
  };

  return (
    <div className=" w-full space-y-10  ">
      {/* Show the current youTube Video */}

      {/* Show the current question */}
      {getCurrentQuestion() && (
        <div key={getCurrentQuestion().id}>
          <div className="m-5 flex justify-center">
            {!getCurrentQuestion()?.youtube ||
            getCurrentQuestion()?.youtube === "" ||
            getCurrentQuestion()?.youtube === null ? (
              <></>
            ) : (
              <iframe
                width="500"
                height="315"
                src={getCurrentQuestion().youtube}
              ></iframe>
            )}

            {!getCurrentQuestion()?.audio ||
            getCurrentQuestion()?.audio === "" ||
            getCurrentQuestion()?.audio === null ? (
              <></>
            ) : (
              <figure>
                <audio
                  controls
                  src={`https://letsquiz.org/uploads/audios/${
                    getCurrentQuestion().audio
                  }`}
                ></audio>
              </figure>
            )}

            {!getCurrentQuestion()?.image ||
            getCurrentQuestion()?.image === "" ||
            getCurrentQuestion()?.image === null ? (
              <></>
            ) : (
              <img
                className="max-h-[200px] w-[300px]  object-contain"
                src={`https://letsquiz.org/uploads/images/${
                  getCurrentQuestion().image
                }`}
                alt=""
              />
            )}
          </div>

          <h3 className="mb-5 text-xl font-semibold">
            {parse(getCurrentQuestion().title, { replace: customParser })}
          </h3>

          {(getCurrentQuestion().type === "MULTIPLE CHOICE" ||
            getCurrentQuestion().type === "mcq") && (
            <div className="w-1/2 space-y-4">
              {getCurrentQuestion().options.map((option) => (
                <div key={option.id} className="group">
                  <label className="flex min-w-[100px] cursor-pointer items-center rounded-lg border border-gray-300 bg-white p-4 text-black shadow-sm transition-transform  hover:shadow-lg">
                    <input
                      type="radio"
                      name={`question_${getCurrentQuestion().id}`}
                      value={option.id}
                      checked={
                        selectedOptions[getCurrentQuestion().id] === option.id
                      }
                      onChange={() => {
                        questions[currentQuestionIndex].timer === 1000
                          ? console.log("Timed out")
                          : handleOptionChange(
                              getCurrentQuestion().id,
                              option.id
                            );
                        questions[currentQuestionIndex].timer === 1000
                          ? console.log("Timed out")
                          : setMcqAnswer(option.id);
                      }}
                      className="mr-4 cursor-pointer"
                    />
                    <span className="text-base font-medium">{option.text}</span>
                  </label>
                </div>
              ))}
            </div>
          )}

          {(getCurrentQuestion().type === "TRUE OR FALSE" ||
            getCurrentQuestion().type === "truefalse") && (
            <div className="w-1/2 flex flex-col space-y-4">
              {/* True Option */}
              <div
                className={`flex cursor-pointer items-center gap-2 rounded-lg border border-gray-300 p-4 shadow-md`}
                onClick={() => {
                  if (questions[currentQuestionIndex].timer !== 1000) {
                    handleOptionChange(getCurrentQuestion().id, "true");
                    setTrueOrFalse(true);
                  } else {
                    console.log("Timed out");
                  }
                }}
              >
                <input
                  type="radio"
                  name={`question_${getCurrentQuestion().id}`}
                  value="true"
                  checked={selectedOptions[getCurrentQuestion().id] === "true"}
                  onChange={() => {}}
                  disabled={questions[currentQuestionIndex + 1]?.timer === 1000}
                  className=""
                />
                <span className="font-medium">True</span>
              </div>

              {/* False Option */}
              <div
                className={`flex cursor-pointer items-center gap-2 rounded-lg border border-gray-300 p-4 shadow-md transition-transform`}
                onClick={() => {
                  if (questions[currentQuestionIndex].timer !== 1000) {
                    handleOptionChange(getCurrentQuestion().id, "false");
                    setTrueOrFalse(false);
                  } else {
                    console.log("Timed out");
                  }
                }}
              >
                <input
                  type="radio"
                  name={`question_${getCurrentQuestion().id}`}
                  value="false"
                  checked={selectedOptions[getCurrentQuestion().id] === "false"}
                  onChange={() => {}}
                  disabled={questions[currentQuestionIndex]?.timer === 1000}
                  className=""
                />
                <span className="font-medium">False</span>
              </div>
            </div>
          )}

          {(getCurrentQuestion().type === "SHORT ANSWER" ||
            getCurrentQuestion().type === "shortanswer") && (
            <div>
              <textarea
                className="w-full border p-2"
                placeholder="Your short answer..."
                value={shortAnswer}
                onChange={(e) =>
                  questions[currentQuestionIndex].timer == 1000
                    ? console.log("Timed out")
                    : setShortAnswer(e.target.value)
                }
              />
            </div>
          )}

          {(getCurrentQuestion().type === "FILL UPS" ||
            getCurrentQuestion().type === "fillups") && (
            <div>
              <input
                type="text"
                className="w-full border p-2"
                placeholder="Your answer..."
                value={fillUp}
                onChange={(e) => {
                  questions[currentQuestionIndex].timer == 1000
                    ? console.log("Timed out")
                    : setFillUp(e.target.value);
                  console.log(questions[currentQuestionIndex].timer);
                }}
              />
            </div>
          )}

          {(getCurrentQuestion().type === "EMAIL" ||
            getCurrentQuestion().type === "email") && (
            <div>
              <input
                type="email"
                className="w-full border p-2"
                placeholder="Your email..."
                value={emailInput}
                onChange={(e) =>
                  questions[currentQuestionIndex].timer == 1000
                    ? console.log("Timed out")
                    : setEmailInput(e.target.value)
                }
              />
            </div>
          )}

          {(getCurrentQuestion().type === "DATE" ||
            getCurrentQuestion().type === "date") && (
            <div>
              <input
                type="date"
                className="w-full border p-2"
                value={dateInput}
                onChange={(e) =>
                  questions[currentQuestionIndex].timer == 1000
                    ? console.log("Timed out")
                    : setDateInput(e.target.value)
                }
              />
            </div>
          )}

          {(getCurrentQuestion().type === "MATCHING" ||
            getCurrentQuestion().type === "matching") && (
            <div className="">
              <Matching
                questions={questions}
                getCurrentQuestion={getCurrentQuestion}
                setMatchingAnswer={
                  questions[currentQuestionIndex + 1] == 1000
                    ? () => {
                        return;
                      }
                    : setMatchingAnswer
                }
                selectedOptions={selectedOptions}
              />
            </div>
          )}

          {(getCurrentQuestion().type === "CHECK BOX" ||
            getCurrentQuestion().type === "checkbox") && (
            <div>
              {getCurrentQuestion().options.map((option) => (
                <div key={option.id} className="mb-2">
                  <label className="flex cursor-pointer items-center">
                    <input
                      type="checkbox"
                      name={`question_${getCurrentQuestion().id}`}
                      value={option.id}
                      checked={
                        selectedOptions[getCurrentQuestion().id]?.includes(
                          option.id
                        ) || false
                      }
                      onChange={() =>
                        questions[currentQuestionIndex].timer == 1000
                          ? console.log("Timed out")
                          : handleCheckboxChange(
                              getCurrentQuestion().id,
                              option.id
                            )
                      }
                    />
                    <span className="ml-2">{option.text}</span>
                  </label>
                </div>
              ))}
            </div>
          )}

          {(getCurrentQuestion().type === "DROP DOWN" ||
            getCurrentQuestion().type === "dropdown") && (
            <div>
              <select
                id="countries"
                onChange={(e) => {
                  setDropdownAnswer(e.target.value);
                }}
                className="block w-full  rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-lg text-gray-900 focus:border-blue-500 focus:ring-blue-500  "
              >
                <option className="text-lg" defaultValue>
                  Select Answers
                </option>

                {getCurrentQuestion().options.map((option, index2) => (
                  <option
                    key={index2}
                    className="text-lg"
                    onClick={() => {
                      questions[currentQuestionIndex].timer == 1000
                        ? console.log("Timed out")
                        : setDropdownAnswer(option.text);
                      console.log(0);
                    }}
                    value={option.id}
                  >
                    {option.text}
                  </option>
                ))}
              </select>
            </div>
          )}

          {(getCurrentQuestion().type === "wordcloud" ||
            getCurrentQuestion().type === "WORDCLOUD") && (
            <div>
              <input className="w-full border p-2" type="text"></input>
            </div>
          )}
        </div>
      )}

      <div className="ml-auto flex w-full items-baseline justify-end space-x-3 border-t border-black p-4">
        {currentQuestionIndex !== 0 ? (
          <button
            className={`ml-auto rounded bg-black px-4 py-2 text-white shadow-md transition-transform duration-200 hover:scale-105 hover:bg-gray-800 ${
              questions[currentQuestionIndex - 1].timer === 1000 &&
              "cursor-not-allowed opacity-50"
            }`}
            onClick={handlePreviousQuestion}
            disabled={
              currentQuestionIndex === 0 ||
              questions[currentQuestionIndex - 1].timer === 1000
            }
          >
            Previous
          </button>
        ) : (
          <div></div>
        )}
        {currentQuestionIndex + 1 < questions.length ? (
          <button
            className="ml-auto rounded bg-black px-4 py-2 text-white shadow-md transition-transform duration-200 hover:scale-105 hover:bg-gray-800"
            onClick={handleNextQuestion}
            disabled={currentQuestionIndex === questions.length - 1}
          >
            Next
          </button>
        ) : (
          <button
            onClick={handleSubmit}
            type="button"
            className="ml-auto rounded bg-black px-4 py-2 text-white shadow-md transition-transform duration-200 hover:scale-105 hover:bg-gray-800"
          >
            Submit
          </button>
        )}
      </div>
    </div>
  );
};

export default QuizComponent;
