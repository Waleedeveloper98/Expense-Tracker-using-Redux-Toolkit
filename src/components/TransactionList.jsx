import {
  Calendar,
  CircleAlert,
  CircleArrowDown,
  CircleArrowUp,
  Tag,
  Trash2,
} from "lucide-react";
import { useDispatch, useSelector } from "react-redux";
import { clearAll, removeTransaction } from "../app/features/transactionSlice";
import { formatCurrency } from "../format";

const TransactionList = () => {
  const transactions = useSelector((state) => state.transaction.transactions);
  const dispatch = useDispatch();
  const { currency } = useSelector((state) => state.transaction);

  const exchangeRate = currency === "pkr" ? 278 : 1;
  const symbol = currency === "pkr" ? "Rs" : "$";

  return (
    <div className="w-full px-4 py-6 rounded-lg bg-white shadow-lg min-h-44 flex flex-col gap-6">
      {/* top bar */}
      <div className="flex items-center justify-between">
        <h3 className="text-xl font-medium">Transaction History</h3>
        <button
          onClick={() => dispatch(clearAll())}
          className="text-red-500 cursor-pointer text-sm font-medium"
        >
          Clear All
        </button>
      </div>
      {/* card */}
      {transactions && transactions.length > 0 ? (
        transactions?.map((transaction) => {
          const { title, category, date, amount } = transaction;
          return (
            <div
              key={transaction.id}
              className={`rounded-lg h-24 px-4 ${
                amount > 0 ? "bg-green-100" : "bg-red-100"
              } flex justify-between items-center`}
            >
              {/* left */}
              <div className="flex flex-col gap-3">
                <div className="flex items-center gap-2">
                  {amount > 0 ? <CircleArrowUp /> : <CircleArrowDown />}
                  <h4 className="font-medium text-lg">{title}</h4>
                </div>
                <div className="flex items-center gap-4">
                  {category && (
                    <div className="flex items-center gap-2 text-sm">
                      <Tag className="w-4 h-4" /> {category}
                    </div>
                  )}
                  <div className="flex items-center gap-2 text-sm">
                    <Calendar className="w-4 h-4" />
                    {new Date(date).toLocaleDateString("en-US", {
                      year: "numeric",
                      month: "long",
                      day: "numeric",
                    })}
                  </div>
                </div>
              </div>
              {/* right */}
              <div className="flex items-center gap-6">
                <h5 className="text-xl font-bold">
                  {/* {amount < 0 ? "-" : "+"}${Math.abs(amount).toLocaleString()} */}
                  {symbol}
                  {formatCurrency(amount * exchangeRate)}
                </h5>
                <div
                  onClick={() => dispatch(removeTransaction(transaction.id))}
                >
                  <Trash2 className="w-4 h-4 cursor-pointer text-red-500" />
                </div>
              </div>
            </div>
          );
        })
      ) : (
        <div className="flex flex-col items-center justify-center gap-2 py-4">
          <CircleAlert className="w-11 h-11 text-zinc-400" />
          <p className="font-medium text-sm text-center sm:text-base text-zinc-500">
            Looks like you haven’t made any transactions yet!
          </p>
        </div>
      )}
    </div>
  );
};

export default TransactionList;
