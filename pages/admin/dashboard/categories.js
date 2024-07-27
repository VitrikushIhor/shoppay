import { useState } from "react";

import Create from "../../../components/admin/categories/Create";
import List from "../../../components/admin/categories/List";
import Layout from "../../../components/admin/layout/Layout";
import Category from "../../../models/Category";
import db from "../../../utils/db";

export default function CategoriesPageAdmin({ categories }) {
	const [data, setData] = useState(categories);

	console.log(data);

	return (
		<Layout>
			<div>
				<Create setCategories={setData} />
				<List categories={data} setCategories={setData} />
			</div>
		</Layout>
	);
}

export async function getServerSideProps(context) {
	db.connectDb();
	const categories = await Category.find({}).sort({ updatedAt: -1 }).lean();
	return {
		props: {
			categories: JSON.parse(JSON.stringify(categories)),
		},
	};
}
