/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import React, { useState } from "react";
import swal from "sweetalert";

import FlashMessage from "react-flash-message";
import Matching from "./Matching";
import axios from "axios";
import { QUIZ, USER, baseUrl } from "../../constants/apiUrl";
import { useUser } from "../../context/userContext";
const PollQuestions = ({
  id,
  currentQuestionIndex,
  setCurrentQuestionIndex,
  questions,
  updateAnswerAtIndex,
  setProgress,
  setTimer,
  quizData,
  whenSubmitted,
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
  const [wordcloudAnswer, setWordcloudAnswer] = useState([]);
  const [wordcloudAnswers, setWordcloudAnswers] = useState({});

  const userData = useUser();
  //console.log(currentQuestionIndex)
  const selectAnswerToAdd = () => {
    if (
      getCurrentQuestion().type === "MULTIPLE CHOICE" ||
      getCurrentQuestion().type === "mcq"
    ) {
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
      getCurrentQuestion().type === "checkebox"
    ) {
      return checkboxAnswer;
    } else if (
      getCurrentQuestion().type === "DROP DOWN" ||
      getCurrentQuestion().type === "dropdown"
    ) {
      return dropdownAnswer;
    } else if (
      getCurrentQuestion().type === "wordcloud" ||
      getCurrentQuestion().type === "WORDCLOUD"
    ) {
      return wordcloudAnswer;
    } else {
      return null;
    }
  };

  const addAnswer = () => {
    console.table(questions);
    return updateAnswerAtIndex(currentQuestionIndex, selectAnswerToAdd());
  };

  const handleSubmit = async () => {
    if (getCurrentQuestion().type == "wordcloud") {
      try {
        await axios.post(`https://letsquiz.org/api/wordcloud/${id}`, {
          data: addAnswer(),
        });
        <FlashMessage duration={5000}>
          <strong>Submited</strong>
        </FlashMessage>;
      } catch (error) {
        console.error(error);
      }
      return;
    }
    axios
      .post(baseUrl + QUIZ.updatePollVote, { vote: selectedOptions, id: id })
      .then((res) => {
        console.log(res);
        const data = {
          userid: userData.currentUser._id,
          quizid: id,
          amount: quizData.amount,
        };
        axios
          .post(baseUrl + QUIZ.postPollResponse, {
            userid: userData.currentUser._id,
            quizAttend: res.data.quiz,
            quizid: id,
          })
          .then((response) => {
            axios
              .post(baseUrl + QUIZ.addQuizTransaction, data)
              .then((response) => {
                swal("submitted successfully");
                window.location.href = "/dashboard"; 
              })
              .catch((error) => {
                navigate("/");
                swal("Something went Wrong");
                console.error("Error:", error);
              });
          })
          .catch((err) => {
            navigate("/");
            swal("Something went Wrong");
            console.error("Error:", err);
          });
      })
      .catch((error) => {
        // Handle errors, such as network issues or server errors
        console.error("Error:", error);
      });
  };

  const handleOptionChange = (questionId, optionId) => {
    console.log("Answers", selectedOptions);
    setSelectedOptions((prevSelectedOptions) => ({
      ...prevSelectedOptions,
      [questionId]: optionId,
    }));
  };

  const handleNextQuestion = async () => {
    console.table(selectedOptions);
    // setSelectedOptions({...selectedOptions})
    console.log("Responses", selectedOptions ?? wordcloudAnswer);
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
        swal("Please answer the question");
        return;
      } else {
        await setCurrentQuestionIndex((prevIndex) =>
          Math.min(prevIndex + 1, questions.length - 1)
        );
        setProgress(((currentQuestionIndex + 2) / questions.length) * 100);
        await addAnswer();
        console.log("Newindedx", currentQuestionIndex + 1);
        console.log(
          "Setting time to",
          questions[currentQuestionIndex + 1].timer
        );
        setTimer(questions[currentQuestionIndex + 1].timer);
        setShortAnswer("");
        setEmailInput("");
        setDateInput("");
        setMcqAnswer("");
        setTrueOrFalse("");
        setFillUp("");
        setCheckboxAnswer("");
        setDropdownAnswer("");
        setMatchingAnswer(null);
        setWordcloudAnswer([]);
        // setSelectedOptions({});
        setFillUp("");
      }
    } else {
      await setCurrentQuestionIndex((prevIndex) =>
        Math.min(prevIndex + 1, questions.length - 1)
      );
      setProgress(((currentQuestionIndex + 2) / questions.length) * 100);
      console.log("Newindedx", currentQuestionIndex + 1);
      addAnswer();
      console.log("Setting time to", questions[currentQuestionIndex + 1].timer);
      setTimer(questions[currentQuestionIndex + 1].timer);
      setShortAnswer("");
      setEmailInput("");
      setDateInput("");
      setMcqAnswer("");
      setTrueOrFalse("");
      setFillUp("");
      setCheckboxAnswer("");
      setDropdownAnswer("");
      setMatchingAnswer([]);
      setWordcloudAnswer([]);
      // setSelectedOptions({});
      setFillUp("");
    }
    // setShortAnswer('');
    // setEmailInput('');
    // setDateInput('');
    setMcqAnswer(null);
    // setTrueOrFalse('');
    // setFillUp('');
    // setCheckboxAnswer('');
  };

  const handlePreviousQuestion = () => {
    setCurrentQuestionIndex((prevIndex) => Math.max(prevIndex - 1, 0));
    setProgress((currentQuestionIndex / questions.length) * 100);
    setTimer(questions[currentQuestionIndex - 1].timer);
    // setShortAnswer('');
    // setEmailInput('');
    // setDateInput('');
    // setMcqAnswer('');
    // setTrueOrFalse('');
    // setFillUp('');
    // setCheckboxAnswer('');
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
    <div className=" w-full space-y-10 ">
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
                className="max-h-[700px] w-[500px] object-contain"
                src={`https://letsquiz.org/uploads/images/${
                  getCurrentQuestion().image
                }`}
                alt=""
              />
            )}
          </div>

          <h3
            className="mb-5 text-xl font-semibold"
            dangerouslySetInnerHTML={{ __html: getCurrentQuestion().title }}
          />
          {/* Render different UI elements based on the question type */}
          {(getCurrentQuestion().type === "MULTIPLE CHOICE" ||
            getCurrentQuestion().type === "mcq") && (
            <div>
              {getCurrentQuestion().options.map((option, index) => (
                <div key={option.id} className="mb-2">
                  <label className="flex cursor-pointer items-center">
                    <input
                      id={`option_${index}`}
                      type="radio"
                      name={`question_${getCurrentQuestion().id}`}
                      // value={option}
                      // checked={selectedOptions[getCurrentQuestion().id] === option.id}
                      checked={selectedOptions[currentQuestionIndex] == index}
                      onChange={(e) => {
                        setMcqAnswer(id);
                        const newStateData = { [currentQuestionIndex]: index };
                        const newState = {
                          ...selectedOptions,
                          ...newStateData,
                        };
                        setSelectedOptions(newState);
                        console.log(newState);
                        // setSelectedOptions((old) => ({...old, [getCurrentQuestion().id]: index}));
                        console.log(index, id);
                      }}
                    />
                    <span className="ml-2">{option.text}</span>
                  </label>
                </div>
              ))}
            </div>
          )}

          {(getCurrentQuestion().type === "TRUE OR FALSE" ||
            getCurrentQuestion().type === "truefalse") && (
            <div>
              <label className="flex cursor-pointer items-center">
                <input
                  type="radio"
                  name={`question_${getCurrentQuestion().id}`}
                  value="true"
                  checked={selectedOptions[getCurrentQuestion().id] === "true"}
                  onChange={() => {
                    questions[currentQuestionIndex].timer == 1000
                      ? console.log("Timed out")
                      : handleOptionChange(getCurrentQuestion().id, "true");
                    questions[currentQuestionIndex].timer == 1000
                      ? console.log("Timed out")
                      : setTrueOrFalse(true);
                  }}
                  disabled={questions[currentQuestionIndex + 1] == 1000}
                />
                <span className="ml-2">True</span>
              </label>
              <label className="flex cursor-pointer items-center">
                <input
                  type="radio"
                  name={`question_${getCurrentQuestion().id}`}
                  value="false"
                  checked={selectedOptions[getCurrentQuestion().id] === "false"}
                  onChange={() => {
                    questions[currentQuestionIndex].timer == 1000
                      ? console.log("Timed out")
                      : handleOptionChange(getCurrentQuestion().id, "false");
                    questions[currentQuestionIndex].timer == 1000
                      ? console.log("Timed out")
                      : setTrueOrFalse(false);
                  }}
                  disabled={questions[currentQuestionIndex] == 1000}
                />
                <span className="ml-2">False</span>
              </label>
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
            <div>
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
            getCurrentQuestion().type === "checkebox") && (
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
                  Select Quiz
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
              {getCurrentQuestion().options.map((option, index) => (
                <div key={index} className="mb-2">
                  <input
                    id={`option_${index}`}
                    type="text"
                    className="w-full border"
                    name={`question_${getCurrentQuestion().id}`}
                    value={wordcloudAnswer[index]}
                    onChange={(e) => {
                      console.table(wordcloudAnswer);
                      const updatedAnswers = [...wordcloudAnswer];
                      updatedAnswers[index] = e.target.value;
                      setWordcloudAnswer(updatedAnswers);
                    }}
                  />
                </div>
              ))}
            </div>
          )}
        </div>
      )}

      <div className="ml-auto flex w-full items-baseline justify-end space-x-3">
        {currentQuestionIndex !== 0 ? (
          <button
            className="ml-auto rounded bg-blue-500 px-4 py-2 text-white hover:bg-blue-600 "
            onClick={handlePreviousQuestion}
            disabled={currentQuestionIndex === 0}
          >
            Previous
          </button>
        ) : (
          <div></div>
        )}

        {currentQuestionIndex + 1 < questions.length ? (
          <button
            className="ml-auto rounded bg-blue-500 px-4 py-2 text-white hover:bg-blue-600"
            onClick={handleNextQuestion}
            disabled={currentQuestionIndex === questions.length - 1}
          >
            Next
          </button>
        ) : (
          <button
            onClick={handleSubmit}
            type="button"
            className="text-md relative  mb-2 mr-2 h-[50px] w-[115px] rounded-lg bg-gradient-to-br from-purple-600 to-blue-500 px-4 py-2 text-center font-medium text-white hover:bg-gradient-to-bl focus:outline-none focus:ring-4 focus:ring-blue-300 dark:focus:ring-blue-800"
          >
            Submit
          </button>
        )}
      </div>
    </div>
  );
};

export default PollQuestions;
