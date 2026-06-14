import React, { useContext, createContext, useEffect, useState } from "react";
import { useUser } from "./userContext";
import axios from "axios"; // Ensure axios is imported

const QuizProvider = createContext();

const QuizContext = ({ children }) => {
  const { currentuserdata } = useUser();
  const [quizData, setQuizData] = useState([]);

  useEffect(() => {
    const localId = currentuserdata;

    axios
      .post(baseUrl + QUIZ.getQuizbyUser, { userid: localId.id }) //https://letsquiz.org/api/quiz/quizbyUserID/
      .then((response) => {
        setQuizData(response.data.allQuiz);
        console.log(response.data.allQuiz);
      })
      .catch((error) => {
        console.error("Error fetching quiz data:", error);
      });
  }, [currentuserdata]);

  return (
    <QuizProvider.Provider value={{ quizData }}>
      {children}
    </QuizProvider.Provider>
  );
};

export const useQuiz = () => useContext(QuizProvider);

export default QuizContext;
