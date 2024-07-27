import Link from 'next/link';
import {
	BsInstagram,
	BsTwitter,
	BsYoutube,
	BsPinterest,
	BsSnapchat,
} from 'react-icons/bs';
import { FaFacebookF, FaTiktok } from 'react-icons/fa';

import styles from './styles.module.scss';

export default function Socials() {
	return (
		<div className={styles.footer__socials}>
			<section>
				<h3>STAY CONNECTED</h3>
				<ul>
					<li>
						<Link href="/" target="_blank">
							<FaFacebookF />
						</Link>
					</li>
					<li>
						<Link href="/" target="_blank">
							<BsInstagram />
						</Link>
					</li>
					<li>
						<Link href="/" target="_blank">
							<BsTwitter />
						</Link>
					</li>
					<li>
						<Link href="/" target="_blank">
							<BsYoutube />
						</Link>
					</li>
					<li>
						<Link href="/" target="_blank">
							<BsPinterest />
						</Link>
					</li>
					<li>
						<Link href="/" target="_blank">
							<BsSnapchat />
						</Link>
					</li>
					<li>
						<Link href="/" target="_blank">
							<FaTiktok />
						</Link>
					</li>
				</ul>
			</section>
		</div>
	);
}
