import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import './globals.css';
import './assets/fonts/inter4.0/web/inter.css';

// import Landing from './pages/Landing';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Landing from './pages/Landing';
import Dashboard from './pages/Dashboard';

createRoot(document.getElementById('root')!).render(
	<StrictMode>
		<BrowserRouter>
			<Routes>
				<Route path="/">
					<Route path="/" element={<Landing />} />
					<Route path="dashboard" element={<Dashboard />} /> 
				</Route>
			</Routes>
		</BrowserRouter>
	</StrictMode>
);
