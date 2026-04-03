const mongoose = require("mongoose");

type ConnectionObject = {
	isConnect?: number
}

const connection: ConnectionObject = {}
async function dbConnect(): Promise<void> {
	if (connection.isConnect) {
		return;
	}
	try {
		if (process.env.MONGO_URL) {
			const db = await mongoose.connect(process.env.MONGO_URL!, {});
			connection.isConnect = db.connections[0].readyState;
		}
		else {
			console.error("envirovariable n malyo ene.");
		}
	}
	catch (err) {
		console.error("Database connection failed", err);
		process.exit(1);
	}
}
export default dbConnect;