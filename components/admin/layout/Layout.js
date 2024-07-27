import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import Sidebar from './sidebar/Sidebar';
import styles from './styles.module.scss';
import { hideDialog } from '../../../store/DialogSlice';
import DialogModal from '../../dialogModal/DialogModal';

export default function Layout({ children }) {
	const { expandSidebar } = useSelector((state) => ({ ...state }));
	const showSidebar = expandSidebar.expandSidebar;
	const dispatch = useDispatch();
	useEffect(() => {
		dispatch(hideDialog());
	}, []);

	return (
		<div className={styles.layout}>
			<DialogModal />
			<Sidebar />
			<div
				style={{ marginLeft: `${showSidebar ? '280px' : '80px'}` }}
				className={styles.layout__main}
			>
				{children}
			</div>
		</div>
	);
}
