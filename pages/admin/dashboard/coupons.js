import { useState } from "react";

import Create from "../../../components/admin/coupons/Create";
import List from "../../../components/admin/coupons/List";
import Layout from "../../../components/admin/layout/Layout";
import Coupon from "../../../models/Coupon";
import db from "../../../utils/db";

export default function CouponsPage({ coupons }) {
	const [data, setData] = useState(coupons);

	return (
		<Layout>
			<div>
				<Create setCoupons={setData} />
				<List coupons={data} setCoupons={setData} />
			</div>
		</Layout>
	);
}

export async function getServerSideProps(context) {
	db.connectDb();
	const coupons = await Coupon.find({}).sort({ updatedAt: -1 }).lean();
	return {
		props: {
			coupons: JSON.parse(JSON.stringify(coupons)),
		},
	};
}
