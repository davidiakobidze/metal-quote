import {Quote} from "../../models/Quote";
import {Dispatch} from "@reduxjs/toolkit";
import quoteAPI from "../../api/quote/quote";

export enum ActionTypes {
    ADD_QUOTE = 'ADD_QUOTE',
    FETCH_QUOTES = 'FETCH_QUOTES'
}

export interface AddQuoteAction {
    type: ActionTypes.ADD_QUOTE;
    payload: Quote;
}

export const addQuote = (quote: Quote): AddQuoteAction => ({
    type: ActionTypes.ADD_QUOTE,
    payload: quote,
});

export const fetchQuotesRequest = (quotes: Quote[]) => ({
    type: ActionTypes.FETCH_QUOTES,
    payload: quotes
});

export const fetchQuotesAsync = () => {
    return async (dispatch: Dispatch): Promise<void> => {
        const quotes: Quote[] = await quoteAPI.fetch();
        dispatch(fetchQuotesRequest(quotes));
    };
};
