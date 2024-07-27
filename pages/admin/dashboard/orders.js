import Layout from "../../../components/admin/layout/Layout";
import CollapsibleTable from "../../../components/admin/orders/table/CollapsibleTable";
import Order from "../../../models/Order";
import User from "../../../models/User";
import db from "../../../utils/db";

export default function OrdersPageAdmin({ orders }) {
	return (
		<Layout>
			<CollapsibleTable rows={orders} />
		</Layout>
	);
}

export async function getServerSideProps(ctx) {
	await db.connectDb();
	const orders = await Order.find({})
		.populate({ path: "user", model: User, select: "name email image" })
		.sort({ createdAt: -1 })
		.lean();
	return {
		props: {
			orders: JSON.parse(JSON.stringify(orders)),
		},
	};
}
