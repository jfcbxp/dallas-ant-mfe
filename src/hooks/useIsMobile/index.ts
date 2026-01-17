import { useState, useEffect } from 'react';

const useIsMobile = (breakpoint = 1024) => {
	const [isMobile, setIsMobile] = useState(false);

	useEffect(() => {
		const isClient = typeof window !== 'undefined';

		if (isClient) {
			setIsMobile(window.innerWidth <= breakpoint);

			const handleResize = () => {
				setIsMobile(window.innerWidth <= breakpoint);
			};

			window.addEventListener('resize', handleResize);

			return () => {
				window.removeEventListener('resize', handleResize);
			};
		}
	}, [breakpoint]);

	return isMobile;
};

export default useIsMobile;
