const mongoose = require("mongoose");
// mongoose.connect("mongodb://localhost/test");
// const itf = require("../models/itf");

let db,
	Users,
	Orders,
	models = {};

function setConnection(mongodb) {
	db = mongodb;
	console.log("Connected to mongoDB");
	setModel();
}

function setModel() {
	const Schema = mongoose.Schema;

	/* Users Schema */
	const userSchema = new Schema({
		name: String,
		email: String,
		phone: String,
		address: String,
		role: Number,
		meta: {
			birthsday: Date,
			hobby: String,
		},
		orders: [{ type: Schema.Types.ObjectId, ref: "Orders" }],
	});

	userSchema.statics.isAdmin = function (param, callBack) {
		return this.find({ role: { $lte: 2 } }, callBack);
	};

	Users = db.model("Users", userSchema, "Users");

	/* Order Schema */
	const orderSchema = new Schema({
		_id: Schema.Types.ObjectId,
		_creator: { type: Schema.Types.ObjectId, ref: "Users" },
		insDate: Date,
		description: String,
		product: String,
		amount: Number,
		deadline: Date,
	});

	Orders = db.model("Orders", orderSchema, "Orders");

	models["Users"] = Users;
	models["Orders"] = Orders;
}

function getModel(modelName) {
	if (!modelName) {
		return Users;
	} else {
		return models[modelName];
	}
}

function read(where, callBack) {
	if (!where) {
		where = {};
	}
	Users.find(where, function (err, data) {
		if (err) {
			console.error("Error in query: ", where);
			data = [];
		}
		if (callBack) {
			callBack(data);
		}
	});
}

function first(where, callBack) {
	read(where, function (data) {
		if (data.length > 0) {
			callBack(data[0]);
		} else {
			callBack(null);
		}
	});
}

function create(document, callBack) {
	const user = new Users(document);
	user.save(
		function (error) {
			if (error) {
				console.error("Save error: ", error);
				callBack({});
			} else {
				callBack(user);
			}
		},
		function (saved) {
			console.log(saved);
		}
	);
}

module.exports = {
	setConnection: setConnection,
	read: read,
	create: create,
	first: first,
	// model: Users,
	getModel: getModel,
};
