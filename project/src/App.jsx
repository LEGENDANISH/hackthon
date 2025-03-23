import React, { Suspense } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Provider } from 'react-redux';
import store from './store';
import ErrorBoundary from './components/ErrorBoundary';
import Dashboard from './components/Dashboard';
import CropDetails from './components/CropDetails';
import AlertDetails from './components/AlertDetails';

function App() {
    return (
        <Provider store={store}>
            <ErrorBoundary>
                <Router>
                    <Routes>
                        <Route path="/" element={<Dashboard />} />
                        <Route path="/crops/:id" element={<CropDetails />} />
                        <Route path="/alerts/:id" element={<AlertDetails />} />
                    </Routes>
                </Router>
            </ErrorBoundary>
        </Provider>
    );
}

export default App; 