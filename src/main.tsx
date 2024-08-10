import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import './globals.css';
import './assets/fonts/inter4.0/web/inter.css';

import Navbar from './Navbar';
import { Toaster } from '@/components/ui/toaster';
import Hero from './Hero';
import Services from './Services';
import Pricing from './Pricing';

const theme: string = 'dark';


createRoot(document.getElementById('root')!).render(
	<StrictMode>
		<Navbar />
		<Hero theme={theme} />
		<Pricing />
		{/* <Services /> */}
		<Toaster />
	</StrictMode>
);
