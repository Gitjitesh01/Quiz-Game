import React from "react";
import swal from "sweetalert";

("react");

const CheckoutPage = ({
  handleViewMore,
  amount,
  subscriptionType,
  itemName,
  imageUrl,
}) => {
  const capitalizeFirstLetter = (string) => {
    return string?.charAt(0).toUpperCase() + string?.slice(1);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    // Handle form submission
    handleViewMore();
  };

  return (
    <div className="container mt-5">
      <h2 className="mb-2 text-center text-3xl font-bold">
        {capitalizeFirstLetter(itemName)}
      </h2>
      <div className="sm:column flex justify-between">
        <div className="w-1/3">
          <div
            className="relative overflow-hidden rounded p-4 shadow-lg hover:shadow-xl"
            style={{ maxWidth: "20rem" }}
          >
            <img
              className="w-full"
              src={imageUrl || "https://via.placeholder.com/150"} // Sample image URL
              alt={itemName}
            />
            <div className="px-2 py-4">
              <div className="mb-2 text-xl font-bold"></div>
              <p className="mb-2 text-base text-gray-700">
                Subscription Type: {subscriptionType}
              </p>
              <p className="mb-2 text-base text-gray-700">Amount: {amount}</p>
            </div>
          </div>
        </div>
        <div className="w-2/4">
          <section className="flex w-full justify-center gap-8 rounded-xl bg-white p-5">
            <div className="lg:w-3/4">
              <form onSubmit={handleSubmit} className="space-y-8">
                <h1 className="text-center text-3xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl">
                  Enter Details
                </h1>
                <div>
                  <label className="mb-2 block text-sm font-medium text-gray-900">
                    Name on Card
                  </label>
                  <input
                    type="text"
                    className="block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 shadow-sm focus:border-primary-500 focus:ring-primary-500"
                    placeholder="Name on Card"
                    required
                  />
                </div>
                <div>
                  <label className="mb-2 block text-sm font-medium text-gray-900">
                    First Name
                  </label>
                  <input
                    type="text"
                    className="block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 shadow-sm focus:border-primary-500 focus:ring-primary-500"
                    placeholder="First Name"
                    required
                  />
                </div>
                <div>
                  <label className="mb-2 block text-sm font-medium text-gray-900">
                    Last Name
                  </label>
                  <input
                    type="text"
                    className="block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 shadow-sm focus:border-primary-500 focus:ring-primary-500"
                    placeholder="Last Name"
                    required
                  />
                </div>
                <div>
                  <label className="mb-2 block text-sm font-medium text-gray-900">
                    Contact Number
                  </label>
                  <input
                    type="number"
                    pattern="\d{10}"
                    maxLength="10"
                    className="block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 shadow-sm focus:border-primary-500 focus:ring-primary-500"
                    placeholder="Contact Number"
                    required
                  />
                </div>
                <div>
                  <label className="mb-2 block text-sm font-medium text-gray-900">
                    Card Number
                  </label>
                  <input
                    type="number"
                    pattern="\d{10}"
                    maxLength="12"
                    className="block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 shadow-sm focus:border-primary-500 focus:ring-primary-500"
                    placeholder="Card Number"
                    required
                  />
                </div>
                <div>
                  <label className="mb-2 block text-sm font-medium text-gray-900">
                    CVV
                  </label>
                  <input
                    type="number"
                    pattern="\d{10}"
                    maxLength="3"
                    className="block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 shadow-sm focus:border-primary-500 focus:ring-primary-500"
                    placeholder="CVV"
                    required
                  />
                </div>
                <div>
                  <label className="mb-2 block text-sm font-medium text-gray-900">
                    Email
                  </label>
                  <input
                    type="email"
                    className="block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 shadow-sm focus:border-primary-500 focus:ring-primary-500"
                    placeholder="Email"
                    required
                  />
                </div>
                <button
                  type="submit"
                  className="w-full justify-center rounded-lg bg-sky-700 py-3 text-center font-medium text-white"
                >
                  Submit
                </button>
              </form>
              <form onSubmit={handleSubmit}>
                <button>Skip</button>
              </form>
            </div>
          </section>
        </div>
      </div>
    </div>
  );
};

export default CheckoutPage;
