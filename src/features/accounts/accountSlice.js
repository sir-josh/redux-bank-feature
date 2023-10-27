const initialStateAccount = {
	balance: 0,
	loan: 0,
	loanPurpose: "",
	isLoading: false,
};

export default function accountReducer(state = initialStateAccount, action) {
	switch (action.type) {
		case "account/deposit":
			return {
				...state,
				balance: state.balance + action.payload,
				isLoading: false,
			};
		case "account/withdraw":
			return { ...state, balance: state.balance - action.payload };
		case "account/requestLoan":
			if (state.loan > 0) return state;
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
		case "account/convertingCurrency":
			return { ...state, isLoading: true };

		default:
			return state;
	}
}

//Action Creators
export function deposit(amount, currency) {
	if (currency === "NGN") return { type: "account/deposit", payload: amount };

	return async function (dispatch, getState) {
		dispatch({ type: "account/convertingCurrency" });
		const res = await fetch(
			`https://v6.exchangerate-api.com/v6/4c6c3ee2ec80a7ed1be74437/pair/${currency}/NGN/${amount}`,
		);

		const data = await res.json();
		const converted = data.conversion_result;
		// console.log(converted);

		dispatch({ type: "account/deposit", payload: converted });
	};
}

export function withdraw(amount) {
	return { type: "account/withdraw", payload: amount };
}

export function requestLoan(amount, purpose) {
	return {
		type: "account/requestLoan",
		payload: { amount, purpose },
	};
}

export function payLoan() {
	return { type: "account/payLoan" };
}
