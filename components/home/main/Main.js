import styles from './styles.module.scss';
import MainSwiper from './swiper';

import Link from 'next/link';
import { useSession } from 'next-auth/react';
//-----------------------------
import { useRef, useState } from 'react';
import { AiOutlineMessage } from 'react-icons/ai';
import { BsHeart } from 'react-icons/bs';
import { HiOutlineClipboardList } from 'react-icons/hi';
import { IoSettingsOutline } from 'react-icons/io5';
// Import Swiper React components

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/effect-cards';

// import required modules
import { EffectCards, Navigation } from 'swiper';
import { Swiper, SwiperSlide } from 'swiper/react';

import Header from './Header';
import Menu from './Menu';
import Offers from './offers';
import User from './User';
export default function Main() {
	const { data: session } = useSession();
	return (
		<div className={styles.main}>
			<Header />
			<Menu />
			<MainSwiper />
			<Offers />
			<User />
		</div>
	);
}
