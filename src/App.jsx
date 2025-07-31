import React from "react";
import Header from "./components/Header";
import AddTransactionForm from "./components/AddTransactionForm";
import TransactionList from "./components/TransactionList";

const App = () => {
  return (
    <div className="max-w-3xl pb-8 flex flex-col gap-8 pt-8 min-h-screen mx-auto">
      <Header />
      <AddTransactionForm />
      <TransactionList />
    </div>
  );
};

export default App;
