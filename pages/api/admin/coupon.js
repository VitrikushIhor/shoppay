import nc from "next-connect";
import slugify from "slugify";

import admin from "../../../middleware/admin";
import auth from "../../../middleware/auth";
import Coupon from "../../../models/Coupon";
import db from "../../../utils/db";

const handler = nc().use(auth).use(admin);

handler.post(async (req, res) => {
	try {
		const { coupon, discount, startDate, endDate } = req.body;
		await db.connectDb();
		const test = await Coupon.findOne({ coupon });

		if (test) {
			return res
				.status(400)
				.json({ message: "Coupon already exist, Try a different coupon" });
		}

		await new Coupon({ coupon, discount, startDate, endDate }).save();

		await db.disconnectDb();
		res.json({
			message: `Coupon ${coupon} has been created successfully.`,
			coupons: await Coupon.find({}).sort({ updatedAt: -1 }),
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

		await Coupon.findByIdAndRemove(id);
		await db.disconnectDb();

		return res.json({
			message: "Coupon has been deleted successfuly",
			coupons: await Coupon.find({}).sort({ updatedAt: -1 }),
		});

	} catch (error) {
		res.status(500).json({ message: error.message });
	}
});

handler.put(async (req, res) => {
	try {
		const { id, coupon, discount, startDate, endDate } = req.body;
		await db.connectDb();
		await Coupon.findByIdAndUpdate(id, {
			coupon,
			discount,
			startDate,
			endDate,
		});

		await db.disconnectDb();

		return res.json({
			message: "Coupon has been updated successfuly",
			coupons: await Coupon.find({}).sort({ createdAt: -1 }),
		});

	} catch (error) {
		res.status(500).json({ message: error.message });
	}
});

export default handler;
