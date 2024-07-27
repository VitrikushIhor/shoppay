import Link from 'next/link';
import React, { useState } from 'react';
import { BsPlusLg } from 'react-icons/bs';
import { FaMinus } from 'react-icons/fa';

import styles from '../filters.module.scss';

export default function Materials({ materials }) {
	const [show, setShow] = useState(true);
	return (
		<div className={styles.filter}>
			<h3 onClick={() => setShow((prev) => !prev)}>
				Material
				<span>{show ? <FaMinus /> : <BsPlusLg />}</span>
			</h3>
			{show && (
				<div>
					{materials.map((p, index) => (
						<div className={styles.filter__sizes_wrap_size}>
							<input type="checkbox" name="pattern" id={p} />
							<label htmlFor={p}>{p}</label>
						</div>
					))}
				</div>
			)}
		</div>
	);
}
