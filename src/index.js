import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import CanvasComponent from './CanvasComponent';
import registerServiceWorker from './registerServiceWorker';

ReactDOM.render(<CanvasComponent />, document.getElementById('root'));
registerServiceWorker();
