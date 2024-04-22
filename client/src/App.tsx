import NewRFQ from "./components/NewRFQ";
import RFQ from './components/RFQ';
import {Provider} from 'react-redux';
import store from './store/store';

function App() {
    return (
        <Provider store={store}>
            <NewRFQ/>
            <RFQ/>
        </Provider>
    );
}

export default App;
