import axios from "axios";
import Image from "next/image";
import { useSession, signIn, signOut } from "next-auth/react";
import { useMediaQuery } from "react-responsive";

import Header from "../components/header/Header";
import Category from "../components/home/category/Category";
import FlashDeals from "../components/home/flashDeals/FlashDeals";
import Main from "../components/home/main/Main";
import ProductsSwiper from "../components/productsSwiper/ProductsSwiper";
import {
	gamingSwiper,
	homeImprovSwiper,
	women_accessories,
	women_dresses,
	women_shoes,
	women_swiper,
} from "../data/home";
import Product from "../models/Product";
import styles from "../styles/Home.module.scss";
import db from "../utils/db";
import Footer from "../components/footer/Footer";
import ProductCardFixTest from "../components/productCard/ProductCardFixTest";

export default function HomePage({ country, products }) {
	console.log("products", products);
	const { data: session } = useSession();
	const isMedium = useMediaQuery({ query: "(max-width:850px)" });
	const isMobile = useMediaQuery({ query: "(max-width:550px)" });
	return (
		<>
			<Header country={country} />
			<div className={styles.home}>
				<div className={styles.container}>
					<Main />
					<FlashDeals />
					<div className={styles.home__category}>
						<Category
							header="Dresses"
							products={women_dresses}
							background="#5a31f4"
						/>
						{!isMedium && (
							<Category
								header="Shoes"
								products={women_shoes}
								background="#3c811f"
							/>
						)}
						{isMobile && (
							<Category
								header="Shoes"
								products={women_shoes}
								background="#3c811f"
							/>
						)}
						<Category
							header="Accessories"
							products={women_accessories}
							background="#000"
						/>
					</div>
					<ProductsSwiper products={women_swiper} />
					<div className={styles.products}>
						{products.map((product) => (
							<ProductCardFixTest product={product} key={product._id} />
						))}
					</div>
				</div>
			</div>
			<Footer country={country} />
		</>
	);
}

export async function getServerSideProps() {
	db.connectDb();
	let products = await Product.find().sort({ createdAt: -1 }).lean();
	// let data = await axios
	//   .get("https://api.ipregistry.co/?key=r208izz0q0icseks")
	//   .then((res) => {
	//     return res.data.location.country;
	//   })
	//   .catch((err) => {
	//     console.log(err);
	//   });
	return {
		props: {
			products: JSON.parse(JSON.stringify(products)),
			//country: { name: data.name, flag: data.flag.emojitwo },
			country: {
				name: "Morocco",
				flag: "https://cdn-icons-png.flaticon.com/512/197/197551.png?w=360",
			},
		},
	};
}

/*
            <ProductsSwiper
            products={gamingSwiper}
            header="For Gamers"
            bg="#2f82ff"
          />
          <ProductsSwiper
            products={homeImprovSwiper}
            header="House Improvements"
            bg="#5a31f4"
          />
            */
