import { StrictMode } from 'react';
import * as ReactDOM from 'react-dom';
import { Provider } from 'react-redux';

import App from './app/app';
import { GlobalStore } from './app/_store/store';

ReactDOM.render(
    <StrictMode>
        <Provider store={GlobalStore}>
            <App />
        </Provider>
    </StrictMode>,
    document.getElementById('root')
);
