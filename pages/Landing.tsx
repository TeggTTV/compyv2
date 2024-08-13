import Hero from '@/src/app/components/Hero';
import Navbar from '@/src/app/components/Navbar';
import Pricing from '@/src/app/components/Pricing';

function Landing() {
	const theme: string = 'dark';

	return (
		<>
			<Hero theme={theme} />
			<Pricing />
		</>
	);
}

export default Landing;
