import React from 'react'
import ReactDOM from 'react-dom'
import { Provider } from 'react-redux'
import './index.css'
import ControlPanel from './views/ControlPanel'
window.tt = {
    value: 'a3',
    getState: function() {
      return { aaa: 23 }
    }
  }
ReactDOM.render(
  <Provider
    store={window.tt}
  >
    <div className="tt">
      <ControlPanel />
    </div>
  </Provider>,
  document.getElementById('root')
)
// registerServiceWorker();
