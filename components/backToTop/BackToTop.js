import { useEffect, useState } from 'react';
import { IoIosArrowUp } from 'react-icons/io';

import styles from './back.module.scss';
export default function BackToTop() {
	const [scrollHeight, setScrollHeight] = useState(0);
	useEffect(() => {
		window.addEventListener('scroll', getScroll, { passive: true });
		return () => {
			window.addEventListener('scroll', getScroll, { passive: true });
		};
	}, [scrollHeight]);

	const getScroll = () => {
		setScrollHeight(window.pageYOffset);
		console.log(scrollHeight);
	};
	return (
		<>
			{scrollHeight > 300 && (
				<div className={styles.backToTop}>
					<IoIosArrowUp />
				</div>
			)}
		</>
	);
}
