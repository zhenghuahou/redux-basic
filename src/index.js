
import React from 'react';
import ReactDOM from 'react-dom';
import ControlPanel from './views/ControlPanel';
import './index.css';
import registerServiceWorker from './registerServiceWorker';
import store from './Store.js';
import {Provider} from 'react-redux';

ReactDOM.render(
    <Provider store={store}>
        <ControlPanel />
    </Provider>,
    document.getElementById('root')
);
registerServiceWorker();
