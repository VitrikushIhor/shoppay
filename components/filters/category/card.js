import Link from 'next/link';
import { useRouter } from 'next/router';
import React, { useState } from 'react';
import { BsPlusLg } from 'react-icons/bs';
import { FaMinus } from 'react-icons/fa';

export default function Card({ category, subCategories }) {
	const router = useRouter();
	const path = router.asPath;
	console.log('router', router);
	const [showsubFilter, setShowsubFilter] = useState(false);

	return (
		<>
			<section>
				<li>
					<input
						type="radio"
						name="filter"
						id={category._id}
						checked={router.query.ctg == category._id}
					/>
					<label
						htmlFor={category._id}
						onClick={() => {
							router.push({
								pathname: path,
								query: {
									ctg: category._id,
								},
							});
						}}
					>
						<Link href={''}>{category.name}</Link>
					</label>
					<span>{showsubFilter ? <FaMinus /> : <BsPlusLg />}</span>
				</li>
				<ul>
					{subCategories.length &&
						subCategories[0].parent._id == category._id &&
						subCategories.map((s) => (
							<li
								onClick={() => {
									router.push({
										pathname: path,
										query: {
											s: s._id,
										},
									});
								}}
							>
								<input type="radio" name="filter" />
								<Link href="">{s.name}</Link>
							</li>
						))}
				</ul>
			</section>
		</>
	);
}
