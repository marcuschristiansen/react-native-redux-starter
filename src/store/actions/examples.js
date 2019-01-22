
import { ADD_EXAMPLE, DELETE_EXAMPLE, SELECT_EXAMPLE } from './actionTypes';

export const addExample = (val) => {
    return {
        type: ADD_EXAMPLE, // type is REQUIRED
        value: val
    }
}

export const deleteExample = () => {
    return {
        type: DELETE_EXAMPLE,
    }
}

export const selectExample = (key) => {
    return {
        type: SELECT_EXAMPLE,
        key: key
    }
}