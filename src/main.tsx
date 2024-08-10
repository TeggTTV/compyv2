import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import './globals.css';
import './assets/fonts/inter4.0/web/inter.css';

import Navbar from './Navbar';
import { Toaster } from '@/components/ui/toaster';
import Hero from './Hero';

const theme: string = 'dark';


createRoot(document.getElementById('root')!).render(
	<StrictMode>
		<Navbar />
		<Hero theme={theme} />
		<section className='w-full h-[400px] bg-black'>

		</section>
		<Toaster />
	</StrictMode>
);
