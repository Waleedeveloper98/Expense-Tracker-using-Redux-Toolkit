import { Plus, Save } from "lucide-react";
import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { addTransaction } from "../app/features/transactionSlice";

const AddTransactionForm = () => {

  const dispatch = useDispatch();
  const [formData, setFormData] = useState({
    title: "",
    amount: "",
    category: "",
    date: new Date().toISOString().split("T")[0],
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (formData.title.trim() === "" || formData.amount.trim() === "") return;
    dispatch(addTransaction(formData));
  };

  return (
    <div className="w-full px-4 py-6 rounded-lg bg-white shadow-lg min-h-44 flex flex-col gap-6">
      {/* top */}
      <div className="flex gap-1 items-center pointer-events-none">
        <Plus className="text-blue-600" />
        <h2 className="text-xl font-medium">Add New Transaction</h2>
      </div>
      {/* Form */}
      <form
        onSubmit={handleSubmit}
        className="flex flex-wrap w-full justify-between"
      >
        <div className="flex flex-col gap-1 w-full sm:w-1/2 mb-4">
          <label htmlFor="title" className="font-medium text-sm">
            Title *
          </label>
          <input
            className="border w-[95%] rounded-md px-3 py-2 border-zinc-400 outline-none focus:ring-2 focus:ring-blue-500 "
            type="text"
            placeholder="Enter transaction title"
            name="title"
            value={formData.title}
            onChange={handleChange}
          />
        </div>
        <div className="flex flex-col gap-1 w-full sm:w-1/2 mb-4">
          <label htmlFor="amount" className="font-medium text-sm">
            Amount * (+ for income, - for expense)
          </label>
          <input
            className="border w-[95%] rounded-md px-3 py-2 border-zinc-400 outline-none focus:ring-2 focus:ring-blue-500 "
            type="number"
            placeholder="100 or -50"
            name="amount"
            value={formData.amount}
            onChange={handleChange}
          />
        </div>
        <div className="flex flex-col gap-1 w-full sm:w-1/2">
          <label htmlFor="category" className="font-medium text-sm">
            Category
          </label>
          <input
            className="border w-[95%] rounded-md px-3 py-2 border-zinc-400 outline-none focus:ring-2 focus:ring-blue-500 "
            type="text"
            placeholder="Food,Transportation, Salary, etc."
            name="category"
            value={formData.category}
            onChange={handleChange}
          />
        </div>
        <div className="flex flex-col gap-1 w-full sm:w-1/2">
          <label htmlFor="date" className="font-medium text-sm">
            Date
          </label>
          <input
            className="border w-[95%] rounded-md px-3 py-2 border-zinc-400 outline-none focus:ring-2 focus:ring-blue-500 "
            type="date"
            value={formData.date}
            name="date"
            placeholder="Food,Transportation, Salary, etc."
            onChange={handleChange}
          />
        </div>
        <button
          className="flex gap-1 items-center justify-center mt-6 text-sm font-medium cursor-pointer w-full bg-blue-500 text-white rounded-md py-2 "
          type="submit"
        >
          {" "}
          <Save className="w-5 h-5" /> Add Transaction
        </button>
      </form>
    </div>
  );
};

export default AddTransactionForm;
