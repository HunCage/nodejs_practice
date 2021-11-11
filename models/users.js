// let Model = function () {

// }

// const mongoose = require("mongoose");
// mongoose.connect("mongodb://localhost/test");
// const itf = require("../models/itf");

let db, Users;

function setConnection(mongodb) {
	db = mongodb;
	console.log("Connected to mongoDB");
	setModel();
}

function setModel() {
	Users = db.model(
		"Users",
		{
			name: String,
			email: String,
			phone: String,
			address: String,
			role: Number,
			meta: {
				birthsday: Date,
				hobby: String,
			},
		},
		"Users"
	);
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
};
