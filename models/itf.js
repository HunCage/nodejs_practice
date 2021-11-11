// const mongoose = require("mongoose");
// mongoose.connect("mongodb://localhost/test");
// const itf = require("../models/itf");


let db, Itf;


function setConnection(mongodb) {
    db = mongodb;
	// db = mongoose.connection;
	// db.on("error", console.error.bind(console, "connection error:"));
	// db.once("open", function () {
    //     console.log("Connected to mongoDB");
	// });
	setModel();
}
// itf.setConnection(mongoose);
// itf.read({}, function (data) {
//     console.log(data);
// });

function setModel() {
	Itf = db.model('itf',
		{
			name: String,
			email: String,
			order: {
				date: Date,
				amount: Number,
				status: String,
				product: String,
			},
		}, 'itf'
	);
}

function read(where, callback) {
	Itf.find(where, function (err, data) {
		if (err) {
			console.error("Error in query: ", where);
		} else {
			callback(data);
		}
	});
}

module.exports = {
	setConnection: setConnection,
	read: read,
};
