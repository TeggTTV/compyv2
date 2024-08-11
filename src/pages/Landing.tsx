import Hero from '@/components/Hero';
import Navbar from '@/components/Navbar';
import Pricing from '@/components/Pricing';

function Landing() {
	const theme: string = 'dark';

	return (
		<>
			<Navbar />
			<Hero theme={theme} />
			<Pricing />
		</>
	);
}

export default Landing;
