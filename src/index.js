import React from "react";
import ReactDOM from "react-dom/client";
import { Provider } from "react-redux";

import "./index.css";
import App from "./App";
import store from "./store";
// import { createCustomer } from "./features/customers/customerSlice";
// import {
// 	deposit,
// 	withdraw,
// 	requestLoan,
// 	payLoan,
// } from "./features/accounts/accountSlice";

// // For Account Reducer
// store.dispatch(deposit(500));
// console.log("deposit action:", store.getState());

// store.dispatch(withdraw(150));
// console.log("withdraw action:", store.getState());

// store.dispatch(requestLoan(1500, "Pay for rental"));
// console.log("loan request action:", store.getState());

// store.dispatch(payLoan());
// console.log("pay loan action:", store.getState());

// // For Customer Reducer
// store.dispatch(createCustomer("Ikelugo Slyvester", "83920393GK"));
// console.log("create customer:", store.getState());

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
	<React.StrictMode>
		<Provider store={store}>
			<App />
		</Provider>
	</React.StrictMode>,
);
