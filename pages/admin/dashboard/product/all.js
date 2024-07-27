import Layout from "../../../../components/admin/layout/Layout";
import ProductCard from "../../../../components/admin/products/productCard/ProductCard";
import Category from "../../../../models/Category";
import Product from "../../../../models/Product";
import styles from "../../../../styles/products.module.scss";
import db from "../../../../utils/db";

export default function AllAdminPage({ products }) {
	console.log(products);

	return (
		<Layout>
			<div className={styles.header}>All Products</div>
			{products.map((product) => (
				<ProductCard product={product} key={product._id} />
			))}
		</Layout>
	);
}

export async function getServerSideProps(ctx) {
	await db.connectDb();
	const products = await Product.find({})
		.populate({ path: "category", model: Category })
		.sort({ createdAt: -1 })
		.lean();
	await db.disconnectDb();
	return {
		props: {
			products: JSON.parse(JSON.stringify(products)),
		},
	};
}
