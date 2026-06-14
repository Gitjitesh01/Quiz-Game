import React, { useEffect, useState } from "react";
import { baseUrl, subscription } from "../constants/apiUrl";
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
import Invoce from "../component/utility/Invoce";

const SubcriptionPanel = () => {
  const { id } = useParams();
  const [process, setprocess] = useState(2);
  const [currentSub, setCurrentSub] = useState();
  const [showFeature, setShowFeature] = useState(false);


 
  useEffect(() => {
    // Fetch subscription details from the server
    fetchSubscription();
  }, [id]);

  const fetchSubscription = async () => {
    try {
      const response = await axios.get(
        `${baseUrl}${subscription.getSubscriptionbyid}/${id}`
      );
      setCurrentSub(response.data.subscription);
      console.log(response.data);
    } catch (error) {
      console.error("Error fetching subscription:", error);
    }
  };

  const getFeature = () => {
    setShowFeature(!showFeature);
  };

  

  return (
<Invoce currentSub={currentSub}/>
  );
};

export default SubcriptionPanel;


