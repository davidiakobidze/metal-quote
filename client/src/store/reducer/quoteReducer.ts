import {ActionTypes} from '../actions/quoteActions';
import {Quote} from "../../models/Quote";

interface QuoteState {
    quotes: Quote[];
}

const initialState: QuoteState = {
    quotes: [],
};

const quoteReducer = (state = initialState, action: any): QuoteState => {
    switch (action.type) {
        case ActionTypes.ADD_QUOTE:
            return {
                ...state,
                quotes: [
                    action.payload,
                    ...state.quotes,
                ],
            };
        case ActionTypes.FETCH_QUOTES:
            return {
                ...state,
                quotes: action.payload
            };
        default:
            return state;
    }
};

export default quoteReducer;