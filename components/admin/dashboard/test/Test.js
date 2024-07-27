import Link from 'next/link';
import React, { useRef, useState } from 'react';
import { AiFillMessage } from 'react-icons/ai';
import { BsPatchPlus } from 'react-icons/bs';
import { FaRegUserCircle, FaThList } from 'react-icons/fa';
import { FcSalesPerformance } from 'react-icons/fc';
import { ImUsers } from 'react-icons/im';
import { IoListCircleSharp, IoNotificationsSharp } from 'react-icons/io5';
import { MdSpaceDashboard, MdOutlineCategory } from 'react-icons/md';
import { RiCoupon3Fill, RiSettingsLine } from 'react-icons/ri';
import { VscHome } from 'react-icons/vsc';

import styles from './styles.module.scss';

const Test = ({ userImage }) => {
	const [show, setShow] = useState(false);

	return (
		<div
			className={styles.dropdown}
			onMouseOver={() => setShow(true)}
			onMouseOut={() => setShow(false)}
		>
			<div className={styles.dropdown__toggle}>
				<img src={userImage} alt="" />
			</div>
			<div
				className={`${styles.dropdown__content} ${show ? styles.active : ''}`}
			>
				<div className={styles.dropdown__content_icons}>
					<div className={styles.dropdown__content_icons_icon}>
						<Link href="/admin/dashboard">
							<MdSpaceDashboard />
						</Link>
					</div>
					<div className={styles.dropdown__content_icons_icon}>
						<Link href="/admin/dashboard/sales">
							<FcSalesPerformance />
						</Link>
					</div>
					<div className={styles.dropdown__content_icons_icon}>
						<Link href="/admin/dashboard/orders">
							<IoListCircleSharp />
						</Link>
					</div>
					<div className={styles.dropdown__content_icons_icon}>
						<Link href="/admin/dashboard/users">
							<ImUsers />
						</Link>
					</div>
					<div className={styles.dropdown__content_icons_icon}>
						<Link href="/admin/dashboard/messages">
							<AiFillMessage />
						</Link>
					</div>
					<div className={styles.dropdown__content_icons_icon}>
						<Link href="/admin/dashboard/product/all">
							<FaThList />
						</Link>
					</div>
					<div className={styles.dropdown__content_icons_icon}>
						<Link href="/admin/dashboard/product/create">
							<BsPatchPlus />
						</Link>
					</div>
					<div className={styles.dropdown__content_icons_icon}>
						<Link href="/admin/dashboard/categories">
							<MdOutlineCategory />
						</Link>
					</div>
					<div
						className={styles.dropdown__content_icons_icon}
						style={{ transform: 'rotate(180deg)' }}
					>
						<Link href="/admin/dashboard/subCategories">
							<MdOutlineCategory />
						</Link>
					</div>
					<div className={styles.dropdown__content_icons_icon}>
						<Link href="/admin/dashboard/coupons">
							<RiCoupon3Fill />
						</Link>
					</div>
				</div>
				<div className={styles.dropdown__content__items}>
					<div className={styles.dropdown__content__items_item}>
						<Link href="/">
							<VscHome />
						</Link>
					</div>
					<div className={styles.dropdown__content__items_item}>
						<Link href="/">
							<FaRegUserCircle />
						</Link>
					</div>
					<div className={styles.dropdown__content__items_item}>
						<IoNotificationsSharp />
					</div>
					<div className={styles.dropdown__content__items_item}>
						<Link href="/">
							<RiSettingsLine />
						</Link>
					</div>
				</div>
				<div className={styles.dropdown__logout}>
					<button>Logout</button>
				</div>
			</div>
		</div>
	);
};

export default index;
