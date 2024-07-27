import Link from 'next/link';
import { useState } from 'react';
import { BsPlusLg } from 'react-icons/bs';
import { FaMinus } from 'react-icons/fa';

import Card from './card';
import styles from '../filters.module.scss';
export default function CategoryFilter({ categories, subCategories }) {
	const [showFilter, setShowFilter] = useState(true);

	return (
		<div className={styles.filter}>
			<h3 onClick={() => setShowFilter((prev) => !prev)}>
				Category
				<span>{showFilter ? <FaMinus /> : <BsPlusLg />}</span>
			</h3>
			{showFilter && (
				<>
					{categories.map((category, index) => (
						<Card category={category} subCategories={subCategories} />
					))}
				</>
			)}
		</div>
	);
}
/*
   <section>


      </section>
*/
