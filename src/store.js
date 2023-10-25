import { act } from "react-dom/test-utils";
import { createStore } from "redux";

const initialState = {
	balance: 0,
	loan: 0,
	loanPurpose: "",
};

function reducer(state = initialState, action) {
	switch (action.type) {
		case "account/deposit":
			return { ...state, balance: state.balance + action.payload };
		case "account/withdraw":
			return { ...state, balance: state.balance - action.payload };
		case "account/requestLoan":
			if (state.loan > 0) return state;
			//LATER
			return {
				...state,
				loan: state.loan + action.payload.amount,
				loanPurpose: action.payload.purpose,
				balance: state.balance + action.payload.amount,
			};
		case "account/payLoan":
			return {
				...state,
				loan: 0,
				loanPurpose: "",
				balance: state.balance - state.loan,
			};

		default:
			return state;
	}
}

const store = createStore(reducer);

store.dispatch({ type: "account/deposit", payload: 500 });

console.log("store dispatched", store.getState());
store.dispatch({
	type: "account/requestLoan",
	payload: { amount: 500, purpose: "Start side business" },
});
console.log(store.getState());
