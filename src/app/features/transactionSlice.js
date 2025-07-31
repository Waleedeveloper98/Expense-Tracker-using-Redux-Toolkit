import { createSlice } from "@reduxjs/toolkit";



const transactionSlice = createSlice({
    name: "transaction",
    initialState: {
        transactions: [],   // Array of all income/expense items
        totalIncome: 0,     // Sum of all positive amounts
        totalExpense: 0,    // Sum of all negative amounts
        balance: 0,       // totalIncome - totalExpense
        currency: "usd"
    },
    reducers: {
        addTransaction: (state, action) => {
            const newTransaction = {
                ...action.payload,
                id: Date.now(),
                amount: Number(action.payload.amount)
            }
            state.transactions.push(newTransaction)
            calculateTotals(state)


        },
        removeTransaction: (state, action) => {
            state.transactions = state.transactions.filter((item) => item.id !== action.payload)
            calculateTotals(state)
        },
        clearAll: (state) => {
            state.transactions = [];
            state.totalExpense = 0;
            state.totalIncome = 0;
            state.balance = 0;
        },
        getCurrency: (state, action) => {
            state.currency = action.payload
        }
    }

})

const calculateTotals = (state) => {
    const amounts = state.transactions.map((t) => t.amount)

    state.totalIncome = amounts
        .filter((amount) => amount > 0)
        .reduce((acc, val) => acc + val, 0)

    state.totalExpense = amounts
        .filter((amount) => amount < 0)
        .reduce((acc, val) => acc + val, 0)

    state.balance = state.totalIncome + state.totalExpense
}


export const { addTransaction, removeTransaction, clearAll, getCurrency } = transactionSlice.actions
export default transactionSlice.reducer

