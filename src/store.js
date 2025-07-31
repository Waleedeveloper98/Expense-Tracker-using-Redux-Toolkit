import { configureStore } from "@reduxjs/toolkit";
import transactionReducer from "./app/features/transactionSlice"
import { loadState, saveState } from "./app/features/localStorage";

const preloadedState = loadState()

export const store = configureStore({
    reducer: {
        transaction: transactionReducer
    },
    preloadedState,
})

store.subscribe(() => {
    saveState({
        transaction: store.getState().transaction,
    })
})