import nc from "next-connect";
import slugify from "slugify";

import admin from "../../../middleware/admin";
import auth from "../../../middleware/auth";
import Category from "../../../models/Category";
import SubCategory from "../../../models/SubCategory";
import db from "../../../utils/db";

const handler = nc().use(auth).use(admin);

handler.post(async (req, res) => {
	try {
		const { name, parent } = req.body;
		await db.connectDb();

		const test = await SubCategory.findOne({ name });

		if (test) {
			return res
				.status(400)
				.json({ message: "SubCategory already exist, Try a different name" });
		}

		await new SubCategory({ name, parent, slug: slugify(name) }).save();

		await db.disconnectDb();

		res.json({
			message: `SubCategory ${name} has been created successfully.`,
			subCategories: await SubCategory.find({}).sort({ updatedAt: -1 }),
		});

	} catch (error) {
		await db.disconnectDb();
		res.status(500).json({ message: error.message });
	}
});

handler.delete(async (req, res) => {
	try {
		const { id } = req.body;
		await db.connectDb();

		await SubCategory.findByIdAndRemove(id);
		await db.disconnectDb();

		return res.json({
			message: "SubCategory has been deleted successfuly",
			subCategories: await SubCategory.find({}).sort({ updatedAt: -1 }),
		});

	} catch (error) {
		res.status(500).json({ message: error.message });
	}
});

handler.put(async (req, res) => {
	try {
		const { id, name, parent } = req.body;
		await db.connectDb();

		await SubCategory.findByIdAndUpdate(id, {
			name,
			parent,
			slug: slugify(name),
		});
		await db.disconnectDb();

		return res.json({
			message: "SubCategory has been updated successfuly",
			subCategories: await SubCategory.find({}).sort({ createdAt: -1 }),
		});
	} catch (error) {
		res.status(500).json({ message: error.message });
	}
});

handler.get(async (req, res) => {
	try {
		const { category } = req.query;
		console.log(category);

		if (!category) {
			return res.json([]);
		}

		await db.connectDb();

		const results = await SubCategory.find({ parent: category }).select("name");
		console.log(results);

		await db.disconnectDb();
		return res.json(results);
	} catch (error) {
		res.status(500).json({ message: error.message });
	}
});
export default handler;
