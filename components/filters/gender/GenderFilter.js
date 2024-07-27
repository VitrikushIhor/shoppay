import Link from 'next/link';
import { useState } from 'react';
import { BsPlusLg } from 'react-icons/bs';
import { FaMinus } from 'react-icons/fa';

import Size from './Size';
import styless from '../filters.module.scss';

export default function GenderFilter() {
	const [show, setShow] = useState(true);
	const genders = ['Men', 'women', 'Unisex'];

	return (
		<div className={styless.filter}>
			<h3 onClick={() => setShow((prev) => !prev)}>
				Gender
				<span>{show ? <FaMinus /> : <BsPlusLg />}</span>
			</h3>
			{show && (
				<div>
					{genders.map((gender, index) => (
						<div className={styless.filter__sizes_wrap_size}>
							<input type="checkbox" name="style" id={gender} />
							<label htmlFor={gender}>{gender}</label>
						</div>
					))}
				</div>
			)}
		</div>
	);
}
