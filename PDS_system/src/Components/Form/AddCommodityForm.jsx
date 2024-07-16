import React from "react";



// FORM for adding Commodity 
const AddCommodityForm = () => {
  return (
    <div className="w-full min-h-screen bg-gray-100 ">
      <div className="bg-white p-[20px] rounded-lg shadow-md w-full">
        <h2 className="text-2xl font-semibold text-gray-700 text-center mb-4">
          Add Commodity
        </h2>
        <form className="space-y-4">
          <div>
            <label
              htmlFor="commodity-dropdown"
              className="block text-sm font-medium text-gray-600"
            >
              Commodity
            </label>
            <select
              id="commodity-dropdown"
              className="form-select mt-1 block w-full border rounded-md border-gray-300 focus:border-blue-500 focus:ring focus:ring-blue-200"
              required
            >
              <option value="">Choose Commodity</option>
              {/* Add commodity options here */}
            </select>
          </div>
          <div>
            <label
              htmlFor="commodity-quantity"
              className="block text-sm font-medium text-gray-600"
            >
              Commodity Quantity
            </label>
            <input
              type="number"
              id="commodity-quantity"
              className="form-input mt-1 block w-full border rounded-md border-gray-300 focus:border-blue-500 focus:ring focus:ring-blue-200"
              required
            />
          </div>
          <div>
            <label
              htmlFor="location"
              className="block text-sm font-medium text-gray-600"
            >
              Location
            </label>
            <input
              type="text"
              id="location"
              className="form-input mt-1 block w-full border rounded-md border-gray-300 focus:border-blue-500 focus:ring focus:ring-blue-200"
              required
            />
          </div>
          <div>
            <label
              htmlFor="state"
              className="block text-sm font-medium text-gray-600"
            >
              State
            </label>
            <input
              type="text"
              id="state"
              className="form-input mt-1 block w-full border rounded-md border-gray-300 focus:border-blue-500 focus:ring focus:ring-blue-200"
              required
            />
          </div>
          <div>
            <label
              htmlFor="district"
              className="block text-sm font-medium text-gray-600"
            >
              District
            </label>
            <input
              type="text"
              id="district"
              className="form-input mt-1 block w-full border rounded-md border-gray-300 focus:border-blue-500 focus:ring focus:ring-blue-200"
              required
            />
          </div>
          <div>
            <label
              htmlFor="contact-no"
              className="block text-sm font-medium text-gray-600"
            >
              Contact Number
            </label>
            <input
              type="text"
              id="contact-no"
              className="form-input mt-1 block w-full border rounded-md border-gray-300 focus:border-blue-500 focus:ring focus:ring-blue-200"
              required
            />
          </div>
          <div>
            <label
              htmlFor="apmc-dropdown"
              className="block text-sm font-medium text-gray-600"
            >
              APMC
            </label>
            <select
              id="apmc-dropdown"
              className="form-select mt-1 block w-full border rounded-md border-gray-300 focus:border-blue-500 focus:ring focus:ring-blue-200"
              required
            >
              <option value="">Select APMC</option>
              {/* Add APMC options here */}
            </select>
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
export default AddCommodityForm;
