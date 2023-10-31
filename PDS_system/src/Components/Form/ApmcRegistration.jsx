import React from 'react';

const ApmcRegistration = () => {
  return (
    <div className="w-full flex items-center justify-center bg-gray-100 ">
      <div className="bg-white p-[20px] rounded-lg shadow-md w-full">
        <h2 className="text-2xl font-semibold text-gray-700 text-center mb-4">APMC Registration</h2>
        <form className="space-y-4">
          <div>
            <label htmlFor="apmc-id" className="block text-sm font-medium text-gray-600">
              APMC ID
            </label>
            <input
              type="text"
              id="apmc-id"
              className="form-input mt-1 block w-full border rounded-md border-gray-300 focus:border-blue-500 focus:ring focus:ring-blue-200"
              required
            />
          </div>
          <div>
            <label htmlFor="apmc-capacity" className="block text-sm font-medium text-gray-600">
              APMC Storage Capacity
            </label>
            <input
              type="number"
              id="apmc-capacity"
              className="form-input mt-1 block w-full border rounded-md border-gray-300 focus:border-blue-500 focus:ring focus:ring-blue-200"
              required
            />
          </div>
          <div>
            <label htmlFor="apmc-address" className="block text-sm font-medium text-gray-600">
              Address
            </label>
            <input
              type="text"
              id="apmc-address"
              className="form-input mt-1 block w-full border rounded-md border-gray-300 focus:border-blue-500 focus:ring focus:ring-blue-200"
              required
            />
          </div>
          <div>
            <label htmlFor="apmc-state" className="block text-sm font-medium text-gray-600">
              State
            </label>
            <input
              type="text"
              id="apmc-state"
              className="form-input mt-1 block w-full border rounded-md border-gray-300 focus:border-blue-500 focus:ring focus:ring-blue-200"
              required
            />
          </div>
          <div>
            <label htmlFor="apmc-district" className="block text-sm font-medium text-gray-600">
              District
            </label>
            <input
              type="text"
              id="apmc-district"
              className="form-input mt-1 block w-full border rounded-md border-gray-300 focus:border-blue-500 focus:ring focus:ring-blue-200"
              required
            />
          </div>
          <div className="text-center">
            <button
              type="submit"
              className="bg-blue-500 text-white px-4 py-2 rounded-full hover:bg-blue-600 focus:outline-none focus:ring focus:ring-blue-200"
            >
              Register APMC
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ApmcRegistration;
