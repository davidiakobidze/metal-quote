import React, {useEffect} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import RFQItem from './RFQItem';
import classes from './styles/RFQ.module.css';
import {RootState} from "../store/store";
import {fetchQuotesAsync} from "../store/actions/quoteActions";
import {Dispatch} from "@reduxjs/toolkit";
import {Quote} from "../models/Quote";


const RFQ: React.FC = () => {
    const quotes: Quote[] = useSelector((state: RootState) => state.quote.quotes);
    const dispatch: Dispatch<any> = useDispatch();

    useEffect(() => {
        dispatch(fetchQuotesAsync())
    }, [dispatch])

    return (
        <ul className={classes.quotes}>
            {quotes.map((quote: any) => (
                <RFQItem
                    key={quote.quote.id}
                    quote={quote}
                />
            ))}
        </ul>
    );
};

export default RFQ;
