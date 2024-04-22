import React, {useRef, useState} from 'react';
import classes from './styles/NewRFQ.module.css';
import {useDispatch} from 'react-redux';
import {addQuote, AddQuoteAction} from '../store/actions/quoteActions';
import {Dispatch} from "@reduxjs/toolkit";
import quoteAPI from "../api/quote/quote";

const NewRFQ: React.FC = () => {

    const dispatch: Dispatch<AddQuoteAction> = useDispatch();
    const [errorMessage, setErrorMessage] = useState<string | null>(null);

    const emailInputRef = useRef<HTMLInputElement>(null);
    const textInputRef = useRef<HTMLTextAreaElement>(null);

    const submitHandler = async (event: React.FormEvent) => {
        event.preventDefault();

        const email: string = emailInputRef.current!.value;
        const text: any = textInputRef.current!.value;
        const quote: any = await quoteAPI.createRFQ({email, text})
        if (!quote) {
            setErrorMessage('User does not exist');
        } else {
            dispatch(addQuote(quote));
            setErrorMessage(null);
        }

    };

    return (
        <>
            <form onSubmit={submitHandler} className={classes.form}>
                {errorMessage && <p className={classes.errorMessage}>{errorMessage}</p>}
                <input type='email' placeholder='Email' id='email' ref={emailInputRef}/>
                <textarea className={classes.textArea} ref={textInputRef} placeholder='Request For Quote' id='text'/>
                <button>Send Quote</button>
            </form>
        </>

    );
};

export default NewRFQ;
