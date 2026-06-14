import React, { useState, useEffect } from "react";
import { useTimer } from "react-timer-hook";

export default function Timer({
  timer,
  whenSubmitted,
  setTimer,
  setCurrentQuestionIndex,
  currentQuestionIndex,
  updateAnswerAtIndex,
  questions,
  setProgress,
  setLeftTime,
}) {
  const [answers, setAnswers] = useState({});
  const getCurrentQuestion = () => questions[currentQuestionIndex];

  // Select the correct answer based on question type
  const selectAnswerToAdd = () => {
    const question = getCurrentQuestion();
    const { type } = question || {};
    switch (type?.toLowerCase()) {
      case "mcq":
        return answers.mcq;
      case "truefalse":
        return answers.trueFalse;
      case "shortanswer":
        return answers.shortAnswer || "";
      case "fillups":
        return answers.fillUp || "";
      case "date":
        return answers.date || "";
      case "checkbox":
        return answers.checkBox || [];
      case "dropdown":
        return answers.dropdown || "";
      case "matching":
        return answers.matching || null;
      case "wordcloud":
        return answers.wordcloud || null;
      default:
        return null;
    }
  };

  const addAnswer = () => {
    const selectedAnswer = selectAnswerToAdd();
    if (selectedAnswer !== undefined) {
      updateAnswerAtIndex(currentQuestionIndex, selectedAnswer);
    }
  };

  // {currentQuestionIndex + 1 < questions.length ? (
  //   <button
  //     className="ml-auto rounded bg-blue-500 px-4 py-2 text-white hover:bg-blue-600"
  //     onClick={handleNextQuestion}
  //     disabled={currentQuestionIndex === questions.length - 1}
  //   >
  //     Next
  //   </button>
  // ) : (
  //   <button
  //     onClick={handleSubmit}
  //     type="button"
  //     className="text-md relative  mb-2 mr-2 h-[50px] w-[115px] rounded-lg bg-gradient-to-br from-purple-600 to-blue-500 px-4 py-2 text-center font-medium text-white hover:bg-gradient-to-bl focus:outline-none focus:ring-4 focus:ring-blue-300 dark:focus:ring-blue-800"
  //   >
  //     Submit
  //   </button>
  // )}

  const handleNextQuestion = () => {
    // Save the current answer
    addAnswer();

    // Move to the next question
    if (currentQuestionIndex < questions.length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
      setProgress(((currentQuestionIndex + 2) / questions.length) * 100);
      setTimer(questions[currentQuestionIndex + 1]?.timer || 0);
    } else {
      // Quiz submission logic
      whenSubmitted(answers);
    }
  };

  const handleTimerExpire = () => {
    addAnswer();
    handleNextQuestion();
  };

  const expiryTimestamp = new Date(Date.now() + (questions[currentQuestionIndex]?.timer || 0));

  const { seconds, minutes, restart, isRunning } = useTimer({
    expiryTimestamp,
    onExpire: handleTimerExpire,
  });

  useEffect(() => {
    const currentTimer = questions[currentQuestionIndex]?.timer || 0;
    const newExpiryTimestamp = new Date(Date.now() + currentTimer);
    restart(newExpiryTimestamp);
  }, [currentQuestionIndex]);

  return (
    <div>
      <div className="timer">
        Time Remaining: {minutes}:{seconds.toString().padStart(2, "0")}
      </div>
      {!isRunning && <div 
      className=""
      // onLoad={handleNextQuestion}
       >Timer Over</div>}
      
    </div>
  );
}
