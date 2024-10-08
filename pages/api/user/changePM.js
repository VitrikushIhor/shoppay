import nc from "next-connect";

import auth from "../../../middleware/auth";
import User from "../../../models/User";
import db from "../../../utils/db";

const handler = nc().use(auth);

handler.put(async (req, res) => {
	try {
		await db.connectDb();

		const { paymentMethod } = req.body;
		const user = await User.findById(req.user);

		await user.updateOne(
			{
				defaultPaymentMethod: paymentMethod,
			},
			{ returnOriginal: false },
		);

		await db.disconnectDb();

		return res.json({ paymentMethod: user.defaultPaymentMethod });
	} catch (error) {
		return res.status(500).json({ message: error.message });
	}
});

export default handler;
