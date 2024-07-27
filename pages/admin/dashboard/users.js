import Layout from "../../../components/admin/layout/Layout";
import EnhancedTable from "../../../components/admin/users/table/EnhancedTable";
import User from "../../../models/User";
import db from "../../../utils/db";

export default function UsersAdminPage({ users }) {
	console.log(users);
	return (
		<Layout>
			<EnhancedTable rows={users} />
		</Layout>
	);
}

export async function getServerSideProps(ctx) {
	await db.connectDb();
	const users = await User.find({}).sort({ createdAt: -1 }).lean();
	return {
		props: {
			users: JSON.parse(JSON.stringify(users)),
		},
	};
}
