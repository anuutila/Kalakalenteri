import React from 'react';
import App from './App'
import { createRoot } from 'react-dom/client';

import './index.css'
import './index-mobile.css'
import { register as registerServiceWorker } from './register-sw';


const container = document.getElementById('root');
const root = createRoot(container); // createRoot(container!) if you use TypeScript
root.render(<App/>);

registerServiceWorker();