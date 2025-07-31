import { DollarSign, TrendingDown, TrendingUp, Wallet } from "lucide-react";
import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { formatCurrency } from "../format";
import { getCurrency } from "../app/features/transactionSlice";

const Header = () => {
  const { totalIncome, totalExpense, balance, currency } = useSelector(
    (state) => state.transaction
  );
  const dispatch = useDispatch();

  const curChange = (e) => {
    const selectedCurrency = e.target.value;
    dispatch(getCurrency(selectedCurrency));
  };
  const exchangeRate = currency === "pkr" ? 278 : 1;
  const symbol = currency === "pkr" ? "Rs" : "$";

  return (
    <div className="w-full p-6 rounded-lg bg-white shadow-lg min-h-44 flex flex-col gap-6 items-center justify-center">
      {/* title */}
      <div className="flex items-center gap-2">
        <Wallet className="w-8 h-8 text-[#2563EB]" />
        <h1 className="text-3xl font-bold">Expense Tracker</h1>
      </div>
      {/* currency switcher */}
      <div className="w-full flex justify-end">
        <select
          value={currency}
          onChange={curChange}
          className="mt-4 px-4 py-1 font-bold border rounded-md"
        >
          <option disabled value="">Currency</option>
          <option value="usd">$</option>
          <option value="pkr">Rs</option>
        </select>
      </div>
      {/* cards */}
      <div className="w-full flex flex-col sm:flex-row items-center justify-between gap-4">
        {/* total balance */}
        <div className="flex items-center w-4/5 sm:w-1/3 rounded-lg p-4 justify-between bg-gradient-to-r from-blue-500 to-blue-600 text-white">
          <div>
            <h4 className="text-sm text-blue-100">Total Balance</h4>
            <h2 className="font-bold text-2xl">
              {symbol}
              {formatCurrency(balance * exchangeRate)}
            </h2>
          </div>
          <DollarSign className="w-8 h-8 text-blue-200" />
        </div>

        {/* total income */}
        <div className="flex items-center w-4/5 sm:w-1/3 rounded-lg p-4 justify-between bg-gradient-to-r from-green-500 to-green-600 text-white">
          <div>
            <h4 className="text-sm text-green-100">Total Income</h4>
            <h2 className="font-bold text-2xl">
              {symbol}
              {formatCurrency(totalIncome * exchangeRate)}
            </h2>
          </div>
          <TrendingUp className="w-8 h-8 text-green-200" />
        </div>

        {/* total expenses */}
        <div className="flex items-center w-4/5 sm:w-1/3 rounded-lg p-4 justify-between bg-gradient-to-r from-red-500 to-red-600 text-white">
          <div>
            <h4 className="text-sm text-red-100">Total Expense</h4>
            <h2 className="font-bold text-2xl">
              {symbol}
              {formatCurrency(totalExpense * exchangeRate)}
            </h2>
          </div>
          <TrendingDown className="w-8 h-8 text-red-200" />
        </div>
      </div>
    </div>
  );
};

export default Header;
