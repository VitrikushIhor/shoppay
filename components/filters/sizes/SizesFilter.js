import Link from 'next/link';
import { useState } from 'react';
import { BsPlusLg } from 'react-icons/bs';
import { FaMinus } from 'react-icons/fa';

import Size from './Size';
import styles from '../filters.module.scss';
export default function SizesFilter({ sizes }) {
	const [show, setShow] = useState(true);

	return (
		<div className={styles.filter}>
			<h3 onClick={() => setShow((prev) => !prev)}>
				Sizes
				<span>{show ? <FaMinus /> : <BsPlusLg />}</span>
			</h3>
			{show && (
				<div className={styles.filter__sizes_wrap}>
					{sizes.map((size, index) => (
						<Size size={size} />
					))}
				</div>
			)}
		</div>
	);
}
