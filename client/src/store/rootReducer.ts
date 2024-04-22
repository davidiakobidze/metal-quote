import { combineReducers } from 'redux';
import quoteReducer from './reducer/quoteReducer';

const rootReducer = combineReducers({
    quote: quoteReducer,
});

export default rootReducer;