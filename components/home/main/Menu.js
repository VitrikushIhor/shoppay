import Link from 'next/link';
import { AiOutlineSecurityScan } from 'react-icons/ai';
import { BiCameraMovie, BiGift, BiCategory } from 'react-icons/bi';
import { BsPhoneVibrate } from 'react-icons/bs';
import { FaBaby } from 'react-icons/fa';
import {
	GiLargeDress,
	GiClothes,
	Gi3DHammer,
	GiWatch,
	GiBallerinaShoes,
	GiHeadphones,
	GiHealthCapsule,
	GiSportMedal,
	GiBigDiamondRing,
} from 'react-icons/gi';
import { HiOutlineHome } from 'react-icons/hi';
import { MdOutlineSportsEsports, MdOutlineSmartToy } from 'react-icons/md';

import styles from './styles.module.scss';
import { menuArray } from '../../../data/home';

export default function Menu() {
	return (
		<div className={styles.menu}>
			<ul>
				<li>
					<Link href={''} className={styles.menu__header}>
						<BiCategory />
						<b>Categories</b>
					</Link>
				</li>
				<div className={styles.menu__list}>
					{menuArray.map((item, i) => (
						<li>
							<Link href={item.link}>
								{i == 0 ? (
									<GiLargeDress />
								) : i == 1 ? (
									<GiClothes />
								) : i == 2 ? (
									<GiHeadphones />
								) : i == 3 ? (
									<GiWatch />
								) : i == 4 ? (
									<HiOutlineHome />
								) : i == 5 ? (
									<GiHealthCapsule />
								) : i == 6 ? (
									<GiBallerinaShoes />
								) : i == 7 ? (
									<GiBigDiamondRing />
								) : i == 8 ? (
									<GiSportMedal />
								) : i == 9 ? (
									<FaBaby />
								) : i == 10 ? (
									<BiCameraMovie />
								) : i == 11 ? (
									<MdOutlineSportsEsports />
								) : i == 12 ? (
									<BsPhoneVibrate />
								) : i == 13 ? (
									<MdOutlineSmartToy />
								) : i == 14 ? (
									<BiGift />
								) : i == 15 ? (
									<Gi3DHammer />
								) : i == 16 ? (
									<AiOutlineSecurityScan />
								) : (
									''
								)}
								<span>{item.name}</span>
							</Link>
						</li>
					))}
				</div>
			</ul>
		</div>
	);
}
