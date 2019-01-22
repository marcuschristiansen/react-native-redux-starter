import { ADD_EXAMPLE, DELETE_EXAMPLE, SELECT_EXAMPLE } from '../actions/actionTypes';

const initialState = {
    examples: [],
    selectedExample: 'Test String'
};

const reducer = (state = initialState, action) => {
    switch (action.type) {
        case ADD_EXAMPLE:
            return {
                ...state,
                examples: state.examples.concat({
                    key: Math.random(),
                    value: action.value
                })
            };
        case DELETE_EXAMPLE:
            return {
                ...state,
                examples: state.examples.filter(example => {
                    return example.key !== state.selectedExample.key;
                }),
                selectedExample: null
            };
        case SELECT_EXAMPLE:
            return {
                ...state,
                selectedExample: state.examples.find(example => {
                    return example.key === action.key
                })
            }
        default:
            return state;
    }
}; 

export default reducer;