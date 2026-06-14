import React, { useEffect, useState } from "react";
import { baseUrl, subscription , QUIZ } from "../constants/apiUrl";
import { useParams } from "react-router";
import axios from "axios";
import amaricanexpress from "../assets/icon/americanexpress.png";
import discover from "../assets/icon/discover.png";
import phonepay from "../assets/icon/phonepay.png";
import gpay from "../assets/icon/gpay.png";
import arrow from "../assets/arrrow.svg";
import upi from "../assets/icon/upi.png";
import paytm from "../assets/icon/paytm.png";
import "../assets/css/susbscriptionpanel.css";
import Quiz_Invoce from "../component/utility/Quiz_Invoce.jsx";

const Quizpayout_Panel = () => {
  const { id } = useParams();
  const [process, setprocess] = useState(2);
  const [currentquiz, setCurrentquiz] = useState();
  const [showFeature, setShowFeature] = useState(false);


 
  useEffect(() => {
    // Fetch subscription details from the server
    fetchSubscription();
  }, [id]);

  const fetchSubscription = async () => {
    try {
      const response = await axios.get(baseUrl + QUIZ.getQuiz + `${id}`); 
      setCurrentquiz(response.data.quiz);
      console.log(response.data.quiz);
    } catch (error) {
      console.error("Error fetching subscription:", error);
    }
  };

  const getFeature = () => {
    setShowFeature(!showFeature);
  };

  

  return (
<Quiz_Invoce currentquiz={currentquiz} quiz_id={id}/>
  );
};

export default Quizpayout_Panel;


