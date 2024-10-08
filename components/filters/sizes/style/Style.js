import Link from 'next/link';
import React, { useState } from 'react';
import { BsPlusLg } from 'react-icons/bs';
import { FaMinus } from 'react-icons/fa';

import styless from '../filters.module.scss';

export default function Style() {
	const [show, setShow] = useState(true);
	const styles = ['Casual', 'Dress', 'Party', 'Sport', 'Work'];

	return (
		<div className={styless.filter}>
			<h3 onClick={() => setShow((prev) => !prev)}>
				Style
				<span>{show ? <FaMinus /> : <BsPlusLg />}</span>
			</h3>
			{show && (
				<div>
					{styles.map((style, index) => (
						<div className={styless.filter__sizes_wrap_size}>
							<input type="checkbox" name="style" id={style} />
							<label htmlFor={style}>{style}</label>
						</div>
					))}
				</div>
			)}
		</div>
	);
}
