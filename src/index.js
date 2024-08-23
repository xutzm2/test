import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './app/App'
import { withProviders } from './app/providers/withProviders';

const Root = withProviders(App);

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(<Root />);
