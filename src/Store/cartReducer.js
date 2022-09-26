const expensesReducerDefaultState = [];

export default (state = expensesReducerDefaultState, action) => {
    console.log("Expenses" + JSON.stringify(state))
    switch (action.type) {
        case 'ADD_EXPENSE':
            console.log("action.expense:", action.expense)
            return [
                ...state,
                action.expense
            ];
        case 'REMOVE_EXPENSE':
            return state.filter(({ product_id }) => product_id !== action.id);
        case 'EDIT_EXPENSE':
            return state.map((expense) => {
                if (expense.product_id === action.id) {
                    return {
                        ...expense,
                        ...action.updates
                    };
                } else {
                    return expense;
                };
            });
        default:
            return state;
    }
};