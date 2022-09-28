const expensesReducerDefaultState = [];

export default (state = expensesReducerDefaultState, action) => {
    switch (action.type) {
        case 'ADD_CART':
            console.log("action.expense:", action.expense)
            return [
                ...state,
                action.expense
            ];
        case 'REMOVE_CART':
            return state.filter(({ product_id }) => product_id !== action.id);
        case 'EDIT_CART':
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