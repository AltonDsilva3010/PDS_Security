import React from "react";
const ApmcOfficerRegistrationForm = () => {
  return (
    <div className="w-full flex items-center justify-center bg-gray-100 ">
      <div className="bg-white p-[20px] rounded-lg shadow-md w-full">
        <h2 className="text-2xl font-semibold text-gray-700 text-center mb-4">
          Register as APMC Officer
          
        </h2>
        <form className="space-y-4">
          <div>
            <label
              htmlFor="aadhar-no"
              className="block text-sm font-medium text-gray-600"
            >
              Aadhar Number
            </label>
            <input
              type="text"
              id="aadhar-no"
              className="form-input mt-1 block w-full border rounded-md border-gray-300 focus:border-blue-500 focus:ring focus:ring-blue-200"
              required
            />
          </div>
          <div>
            <label
              htmlFor="name"
              className="block text-sm font-medium text-gray-600"
            >
              Name
            </label>
            <input
              type="text"
              id="name"
              className="form-input mt-1 block w-full border rounded-md border-gray-300 focus:border-blue-500 focus:ring focus:ring-blue-200"
              required
            />
          </div>
          <div>
            <label
              htmlFor="contract-address"
              className="block text-sm font-medium text-gray-600"
            >
              Contract Address
            </label>
            <input
              type="text"
              id="contract-address"
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
              htmlFor="contract-number"
              className="block text-sm font-medium text-gray-600"
            >
              Contact Number
            </label>
            <input
              type="text"
              id="contract-number"
              className="form-input mt-1 block w-full border rounded-md border-gray-300 focus:border-blue-500 focus:ring focus:ring-blue-200"
              required
            />
          </div>
          <div className="text-center">
            <button
              type="submit"
              className="bg-blue-500 text-white px-4 py-2 rounded-full hover:bg-blue-600 focus:outline-none focus:ring focus:ring-blue-200"
            >
              Register as APMC Officer
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
export default ApmcOfficerRegistrationForm;