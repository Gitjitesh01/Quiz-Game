import React from 'react';

const CheckoutForm = () => {
  return (
    <div className="flex flex-col md:flex-row justify-between p-6 bg-white rounded-md shadow-md">
      {/* Contact Details */}
      <div className="w-full md:w-1/2 mb-6 md:mb-0">
        <h2 className="text-lg font-semibold mb-4">Contact Details</h2>
        <div className="space-y-2">
          <div className="flex justify-between">
            <span className="font-medium">Full Name</span>
            <span>John</span>
          </div>
          <div className="flex justify-between">
            <span className="font-medium">Email</span>
            <span>John@gmail.com</span>
          </div>
          <div className="flex justify-between">
            <span className="font-medium">Mobile</span>
            <span>9876543210</span>
          </div>
          <div className="mt-2">
            <a href="#" className="text-sm text-blue-500">Not John? Change Account</a>
          </div>
        </div>
      </div>

      {/* Order Summary */}
      <div className="w-full md:w-1/2 mb-6 md:mb-0">
        <h2 className="text-lg font-semibold mb-4">Order Summary</h2>
        <div className="space-y-2">
          <div className="flex justify-between">
            <span>Order Detail</span>
          </div>
          <div className="flex justify-between">
            <span>Standard Plan</span>
            <span>₹150</span>
          </div>
          <div className="flex justify-between">
            <span>Tax</span>
            <span>₹50</span>
          </div>
          <div className="flex items-center mt-4">
            <input
              type="text"
              placeholder="coupon code"
              className="border rounded-l-md px-3 py-1 focus:outline-none"
            />
            <button className="bg-gray-300 text-gray-700 px-3 py-1 rounded-r-md">Apply</button>
          </div>
          <div className="flex justify-between mt-4">
            <span className="font-medium">Total</span>
            <span className="font-medium">₹200</span>
          </div>
          <div className="text-gray-500 text-sm">Inclusive of all taxes</div>
        </div>
      </div>

      {/* Payment Section */}
      <div className="w-full md:w-1/2">
        <h2 className="text-lg font-semibold mb-4">Payment</h2>
        <div className="mb-4">
          <span className="mr-4">Pay With:</span>
          <label className="mr-4">
            <input type="radio" name="paymentMethod" className="mr-1" /> Card
          </label>
          <label className="mr-4">
            <input type="radio" name="paymentMethod" className="mr-1" checked /> Bank Transfer
          </label>
          <label>
            <input type="radio" name="paymentMethod" className="mr-1" /> UPI
          </label>
        </div>
        <div className="mb-4">
          <select className="w-full border rounded-md px-3 py-2 focus:outline-none">
            <option>Choose your Bank</option>
          </select>
        </div>
        <button className="w-full bg-green-500 text-white py-2 rounded-md">
          Pay ₹200
        </button>
        <p className="text-gray-500 text-sm mt-4">
          Your personal data will be used to process your order, support your experience throughout this website, and for other purposes described in our privacy policy.
        </p>
      </div>
    </div>
  );
};

export default CheckoutForm;
