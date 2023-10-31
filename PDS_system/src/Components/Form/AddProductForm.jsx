import React from "react";
const AddProductForm = () => {
  return (
    <div className=" w-full bg-gray-100 ">
      <div className="bg-white p-[20px] w-full rounded-lg shadow-md ">
        <h2 className="text-2xl font-semibold text-gray-700 text-center mb-4">
          Add Product
        </h2>
        <form className="space-y-4">
          <div>
            <label
              htmlFor="product-id"
              className="block text-sm font-medium text-gray-600"
            >
              Product ID
            </label>
            <input
              type="text"
              id="product-id"
              className="form-input mt-1 block w-full border rounded-md border-gray-300 focus:border-blue-500 focus:ring focus:ring-blue-200"
              required
            />
          </div>
          <div>
            <label
              htmlFor="quantity-required"
              className="block text-sm font-medium text-gray-600"
            >
              Quantity Required
            </label>
            <input
              type="number"
              id="quantity-required"
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
              htmlFor="product-name"
              className="block text-sm font-medium text-gray-600"
            >
              Product Name
            </label>
            <input
              type="text"
              id="product-name"
              className="form-input mt-1 block w-full border rounded-md border-gray-300 focus:border-blue-500 focus:ring focus:ring-blue-200"
              required
            />
          </div>
          <div className="text-center">
            <button
              type="submit"
              className="bg-blue-500 text-white px-4 py-2 rounded-full hover:bg-blue-600 focus:outline-none focus:ring focus:ring-blue-200"
            >
              Add Product
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
export default AddProductForm;