import nc from "next-connect";

import auth from "../../../middleware/auth";
import Cart from "../../../models/Cart";
import Coupon from "../../../models/Coupon";
import User from "../../../models/User";
import db from "../../../utils/db";

const handler = nc().use(auth);

handler.post(async (req, res) => {
	try {
		await db.connectDb();
		const { coupon } = req.body;

		const user = User.findById(req.user);
		const checkCoupon = await Coupon.findOne({ coupon });

		if (checkCoupon == null) {
			return res.json({ message: "Invalid coupon" });
		}

		const { cartTotal } = await Cart.findOne({ user: req.user });

		let totalAfterDiscount =
			cartTotal - (cartTotal * checkCoupon.discount) / 100;

		await Cart.findOneAndUpdate({ user: user._id }, { totalAfterDiscount });

		res.json({
			totalAfterDiscount: totalAfterDiscount.toFixed(2),
			discount: checkCoupon.discount,
		});

		await db.disconnectDb();
		return res.json({ addresses: user.address });
	} catch (error) {
		return res.status(500).json({ message: error.message });
	}
});

export default handler;
