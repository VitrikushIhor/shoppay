import Link from 'next/link';
import { useRouter } from 'next/router';
import { useState } from 'react';
import { FaOpencart } from 'react-icons/fa';
import { RiSearch2Line } from 'react-icons/ri';
import { useSelector } from 'react-redux';

import styles from './styles.module.scss';

export default function Main({ searchHandler }) {
	const router = useRouter();

	const [query, setQuery] = useState(router.query.search || '');

	const cart = useSelector((state) => state.cart.cartItems);

	const handleSearch = (e) => {
		e.preventDefault();
		if (router.pathname !== '/browse') {
			if (query.length > 1) {
				router.push(`/browse?search=${query}`);
			}
		} else {
			searchHandler(query);
		}
	};
	return (
		<div className={styles.main}>
			<div className={styles.main__container}>
				<Link className={styles.logo} href="/">
					<img src="../../../logo.png" alt="" />
				</Link>
				<form onSubmit={(e) => handleSearch(e)} className={styles.search}>
					<input
						type="text"
						placeholder="Search..."
						value={query}
						onChange={(e) => setQuery(e.target.value)}
					/>
					<button type="submit" className={styles.search__icon}>
						<RiSearch2Line />
					</button>
				</form>
				<Link className={styles.cart} href="/cart">
					<FaOpencart />
					<span>{cart && cart.length ? cart.length : 0}</span>
				</Link>
			</div>
		</div>
	);
}
