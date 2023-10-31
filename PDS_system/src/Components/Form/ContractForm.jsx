import React from "react";
const ContractForm = () => {
  return (
    <div className="w-full flex items-center justify-center bg-gray-100 ">
      <div className="bg-white p-[20px] rounded-lg shadow-md w-full">
        <h2 className="text-2xl font-semibold text-gray-700 text-center mb-4">
          Contract Form
        </h2>
        <form className="space-y-4">
          <div>
            <label
              htmlFor="farmer-contract-address"
              className="block text-sm font-medium text-gray-600"
            >
              Farmer Contract Address
            </label>
            <input
              type="text"
              id="farmer-contract-address"
              className="form-input mt-1 block w-full border rounded-md border-gray-300 focus:border-blue-500 focus:ring focus:ring-blue-200"
              required
            />
          </div>
          <div>
            <label
              htmlFor="apmc-officer-contract-address"
              className="block text-sm font-medium text-gray-600"
            >
              APMC Officer Contract Address
            </label>
            <input
              type="text"
              id="apmc-officer-contract-address"
              className="form-input mt-1 block w-full border rounded-md border-gray-300 focus:border-blue-500 focus:ring focus:ring-blue-200"
              required
            />
          </div>
          <div>
            <label
              htmlFor="commodity"
              className="block text-sm font-medium text-gray-600"
            >
              Commodity
            </label>
            <input
              type="text"
              id="commodity"
              className="form-input mt-1 block w-full border rounded-md border-gray-300 focus:border-blue-500 focus:ring focus:ring-blue-200"
              required
            />
          </div>
          <div>
            <label
              htmlFor="quantity"
              className="block text-sm font-medium text-gray-600"
            >
              Quantity
            </label>
            <input
              type="number"
              id="quantity"
              className="form-input mt-1 block w-full border rounded-md border-gray-300 focus:border-blue-500 focus:ring focus:ring-blue-200"
              required
            />
          </div>
          <div>
            <label
              htmlFor="msp-price"
              className="block text-sm font-medium text-gray-600"
            >
              MSP Price
            </label>
            <input
              type="text"
              id="msp-price"
              className="form-input mt-1 block w-full border rounded-md border-gray-300 focus:border-blue-500 focus:ring focus:ring-blue-200"
              required
            />
          </div>
          <div>
            <label
              htmlFor="payment"
              className="block text-sm font-medium text-gray-600"
            >
              Payment (done, remaining)
            </label>
            <input
              type="text"
              id="payment"
              className="form-input mt-1 block w-full border rounded-md border-gray-300 focus:border-blue-500 focus:ring focus:ring-blue-200"
              required
            />
          </div>
          <div>
            <label
              htmlFor="payment-amount"
              className="block text-sm font-medium text-gray-600"
            >
              Payment Amount
            </label>
            <input
              type="text"
              id="payment-amount"
              className="form-input mt-1 block w-full border rounded-md border-gray-300 focus:border-blue-500 focus:ring focus:ring-blue-200"
              required
            />
          </div>
          <div className="text-center">
            <button
              type="submit"
              className="bg-blue-500 text-white px-4 py-2 rounded-full hover:bg-blue-600 focus:outline-none focus:ring focus:ring-blue-200"
            >
              Submit
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
export default ContractForm;
