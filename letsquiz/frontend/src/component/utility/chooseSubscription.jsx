import React, { useEffect, useMemo, useState } from "react";
import "./css/modalCss.css";
import axios from "axios";
import { subscription, baseUrl, discount } from "../../constants/apiUrl";
import CheckoutPage from "../../component/utility/checkoutComp";
import { clsx } from "clsx";
import { twMerge } from "tailwind-merge";
import { Link } from "react-router-dom";
import { useUser } from "../../context/userContext";

export function cn(...inputs) {
  return twMerge(clsx(inputs));
}

const Modal = ({ title, features, onClose }) => (
  <div className="modal-overlay" onClick={onClose}>
    <div className="modal" onClick={(e) => e.stopPropagation()}>
      <div className="modal-header">
        <h2>{title}</h2>
        <button className="close-button" onClick={onClose}>
          &times;
        </button>
      </div>
      <div className="modal-content">
        {features.map((feature, index) => (
          <p key={index}>{feature}</p>
        ))}
      </div>
    </div>
  </div>
);

const capitalizeFirstLetter = (string) => {
  return string?.charAt(0).toUpperCase() + string?.slice(1);
};

const ChooseSubscription = ({
  setSubscription,
  setPageNum,
  handleViewMore,
}) => {
  const currentUser = useUser();
  console.log(currentUser);
  const [choice, setChoice] = useState(currentUser.subscriptionType || "");
  const [amount, setAmount] = useState(0);
  const [viewPayment, setViewPayment] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [subscriptionList, setSubscriptionList] = useState([]);
  const [showFeature, setShowFeature] = useState(false);
  const [Discount, setDiscount] = useState(0);
  const [updatedsubcriptionplan, setupdatedsubcriptionplan] = useState([]);

  const showPayment = () => {
    setViewPayment(true);
  };

  const getFeature = () => {
    setShowFeature(!showFeature);
  };

  const alldiscount = () => {
    axios.get(baseUrl + discount.getAllDiscount).then((res) => {
      setDiscount(res.data.filter((item) => item.promoType === "discount"));
      // console.log(res.data.filter((item) => item.promoType === "discount"));
      // console.log(res.data.filter((item) => item.promoType === "discount")[0].applyTo === 'all');
    });
    applyDiscounts();
  };



  const getAllSubscriptionTypes = async () => {
    try {
      const res = await axios.get(baseUrl + subscription.getAllSubscription);
      setSubscriptionList(res.data.data);
    } catch (error) {
      console.log(error);
    }
    applyDiscounts();
  };



  const applyDiscounts = () => {
    // Update each subscription's amount based on applicable discounts

  const updatedSubscriptions = subscriptionList
  .filter(item => item.amount !== 0)
  .map((subscription) => {
    // Find discounts that apply to the current subscription
    const applicableDiscounts = Discount[0].applyTo === 'all'
      ? Discount
      : Discount.filter((discount) =>
          discount.applyTo.toLowerCase() === subscription.subscriptionName.toLowerCase()
        );

    // Apply each applicable discount to the subscription amount
    const discountedAmount = applicableDiscounts.reduce(
      (amount, discount) => amount - (discount.value || 0),
      subscription.amount
    );

    // Return the updated subscription with the new amount
    return {
      ...subscription,
      amount: Math.max(discountedAmount, 0), // Ensure amount doesn't go below 0
    };
  });
  setupdatedsubcriptionplan(updatedSubscriptions);
  // console.log(updatedSubscriptions);  
  };
  

  useEffect(() => {
    getAllSubscriptionTypes();
    alldiscount();
  }, []);

  useMemo(() => {
    applyDiscounts();
  }, [subscriptionList]);

  const handleOptionClick = (name, amount) => {
    setChoice(name);
    setPageNum(3);
    setAmount(amount);
    setSubscription(name);
  };

  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  const backgroundColors = [
    "border-blue-500",
    "border-indigo-500",
    "border-yellow-500",
  ];
  const fontColor = ["text-blue-500", "text-indigo-500", "text-yellow-500"];

  return (
    <>
      <div>
        {viewPayment && (
          <CheckoutPage
            handleViewMore={handleViewMore}
            amount={amount}
            subscriptionType={choice}
            itemName={"Buy Subscription"}
          />
        )}
      </div>
      <div>
        {!viewPayment && (
          <div className="p-3 -mt-22">
            <h1 className="my-10 text-center text-2xl text-rose-600">
              Choose your plan
            </h1>
            <div className="flex flex-col items-center gap-0 lg:flex-row lg:justify-center scale-75 -mt-24">
              {subscriptionList
                .sort((a, b) => a.amount - b.amount)
                .map((option, index) => (
                  <div
                    className={`relative h-fit min-h-[480px] w-1/2 rounded-3xl border bg-white p-5 shadow-lg transition-all  duration-200 hover:shadow-xl lg:w-1/3 xl:w-1/4 ${
                      index > 0 && index < subscriptionList.length - 1
                        ? "z-10 scale-105 border-slate-300"
                        : ""
                    }`}
                    onClick={() =>
                      handleOptionClick(option.subscriptionName, option.amount)
                    }
                    key={option.subscriptionName}
                  >
                    <div className="flex flex-col items-center gap-10">
                      <div className="mb-6 mt-20 flex w-full items-center justify-center p-2 text-slate-700">
                        <h2
                          className={`absolute top-4 z-10 text-left text-3xl font-semibold ${
                            fontColor[index % fontColor.length]
                          }`}
                        >
                          {capitalizeFirstLetter(option.subscriptionName)}
                        </h2>
                        <div
                          className={cn(
                            "flex flex-col items-center justify-center"
                          )}
                        >
                          <div
                            className={cn("flex items-baseline justify-center")}
                          >
                            <p className="font-sans text-5xl font-bold">
                              {" "}
                              {option.amount !== 0 && "₹"}
                            </p>
                            <p className="text-6xl font-bold">
                              {
                              option.amount !== 0 ? subscriptionList && Discount  ?
                              (updatedsubcriptionplan
                               .filter(
                                 (item) =>
                                   item.subscriptionName ===
                                   option.subscriptionName
                               )
                               .map((item) =>
                                 item.amount !== 0 && item.amount !== option.amount ? (
                                   <div
                                     key={index}
                                     className="flex flex-col items-center justify-center gap-2"
                                   >
                                     <p className="line-through">
                                       {option.amount}
                                     </p>
                                     <p>{item.amount}</p>
                                   </div>
                                 ) :( option.amount === 0 ? (
                                   "free"
                                 ) : (
                                   option.amount
                                 )
                               )
                             )
                           ) : ( option.amount === 0 ? (
                               "free"
                             ) : (
                               option.amount
                             )
                           ): "free"
                                }
                            </p>
                          </div>
                          <p className="font-semibold text-slate-400">
                            per month
                          </p>
                        </div>
                      </div>
                      <div className="flex w-full flex-col items-center gap-2 p-1">
                        <button
                          onClick={getFeature}
                          className="rounded-lg bg-blue-500 p-2 text-white"
                        >
                          check feature
                        </button>
                        {showFeature && (
                          <div className="mt-4">
                            {option &&
                              Object.keys(option).map(
                                (key) =>
                                  key !== "_id" &&
                                  key !== "description" &&
                                  key !== "subscriptionName" &&
                                  key !== "amount" &&
                                  key !== "__v" && (
                                    <div
                                      key={key}
                                      className="text-lg text-gray-600"
                                    >
                                      <strong>
                                        {option[key] && <li>{key}</li>}
                                      </strong>
                                    </div>
                                  )
                              )}
                          </div>
                        )}
                      </div>
                      <Link
                        to={`/dashboard/subscription/${option._id}`}
                        className={cn(
                          `opacity-65 w-4/5 rounded-xl border-2 py-3 text-center font-semibold transition-all hover:opacity-90 hover:bg-blend-darken hover:shadow-lg`,
                          backgroundColors[index % backgroundColors.length],
                          fontColor[index % fontColor.length]
                        )}
                        onClick={openModal}
                      >
                        {option.amount === 0 ? "Start" : "Buy"}
                      </Link>
                    </div>
                  </div>
                ))}
            </div>
            <button
              className="bg-dark text-foreground opacity-65 mx-auto my-[40px] flex w-1/4 justify-center rounded-xl bg-blue-400 py-3 font-semibold text-white transition-all hover:opacity-90 hover:bg-blend-darken hover:shadow-lg"
              onClick={showPayment}
            >
              Continue
            </button>
          </div>
        )}
        {isModalOpen && (
          <Modal
            title={
              subscriptionList.find(
                (option) => option.subscriptionName === choice
              )?.subscriptionName || ""
            }
            features={
              subscriptionList.find(
                (option) => option.subscriptionName === choice
              )?.features || []
            }
            onClose={closeModal}
          />
        )}
      </div>
    </>
  );
};

export default ChooseSubscription;
