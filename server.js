const { info } = require("console");
const express = require("express");
const fs = require("fs");
const mongoose = require("mongoose");
const app = express();
// const favicon = require("serve-favicon");
// const path = require("path");
const PORT = 3000;
const staticDir = "build";

/* mongoDB / mongoose */
mongoose.connect("mongodb://localhost/superhero");

let Users = require("./models/users");
Users.setConnection(mongoose);

/* Save User Order */
Users.first({ name: new RegExp("jani", "gi") }, function (user) {
	if (user !== null) {
		/* 		let order = new Users.getModel("Orders");
		order._creator = user._id;
		order.insDate = new Date();
		order.description = "Gratulation";
		order.product = "Keyboard";
		order.amount = 49.99;
		order.deadline = new Date("2021-12-21");
		order.save(); */
		console.info("User: ", user);
	} else {
		console.info("No match found!");
	}
});

/* Create */
/* Users.create(
	{
		name: "Krumpli Jani",
		email: "jani@email.com",
		phone: "+4155667788",
		address: "3000, bern, Neumarkt 11",
		role: 3,
		meta: {
			birthsday: new Date("12.11.1989"),
			hobby: "programming",
		},
	},
	function (saved) {
		console.info("Model saved: ", saved);
	}
);
 */
/* MongoDB queries */
/* Users.read({'role': 1}, function (users) {
	console.info("Users: ", users);
}); */

/* Find */
/* Users.first({ role: { $lte: 5, $gte: 3 } }, function (user) {
	if (user !== null) {
		console.info("User name: ", user.name);
	} else {
		console.info("No match found!");
	}
});
 */

/* Update */
Users.getModel().update(
	{ name: new RegExp("guppy", "gi") },
	{ name: "Jack Black" },
	function (error, user) {
		// user.name = "Jack Black";
		// user.save();
		if (error) {
			console.error(error);
		} else {
			console.log(user);
		}
	}
);

/* Delete */
/* Users.getModel().remove(
	{ name: new RegExp("jani", "gi") },
	function (error, removed) {
		if (error) {
			console.error(error);
		} else {
			console.log(removed);
		}
	}
); */

/* Read */
/* Users.first({ name: new RegExp("guppy", "gi") }, function (user) {
	if (user !== null) {
		console.info("User name: ", user.name);
	} else {
		console.info("No match found!");
	}
}); */

/* Users.getModel().isAdmin(2, function (error, data) {
	console.log(error);
	console.log(data);
}); */

// Users.read({ name: "madcage" }, function (data) {
// 	console.log(data);
// });

/* Module practice */
const mad = require("./my_modules/mad_module");

let str = "Hi on the wire!";
mad.tu(str, function (error, newStr) {
	if (error) {
		console.error(err);
	} else {
		console.log(newStr);
	}
});
/* Middleware */
app.use(express.static(staticDir));
app.set('view engine', 'jade');
app.set('views', './src/view');
// app.use(express.static(path.join(__dirname, staticDir)));
// app.use('/static',express.static(__dirname + "build/"));
// app.use(favicon(path.join(__dirname, staticDir + "/img/", "favicon.ico")));

app.use(function (req, res, next) {
	if (req.headers["x-requested-with"] == "XMLHttpRequest") {
		res.send(JSON.stringify({ "Hi, ": "on the wire!" }));
		console.log("AJAX request in progress");
	} else {
		next();
	}
});

app.get("/all.js", function (req, res) {
	res.sendFile(__dirname + "/js/" + "all.js");
});

/* Handlers */
function handleUsers(req, res, next, callback) {
	fs.readFile("./users.json", "utf-8", (err, data) => {
		if (err) {
			throw err;
		}
		// console.log(data);
		// let path = req.url.split("/");
		let users = JSON.parse(data);

		if (callback) {
			callback(users);
			return;
		}

		let _user = {};

		if (!req.params.id) {
			_user = users;
		} else {
			for (let k in users) {
				// if (path[2] == users[k].id) {
				if (req.params.id == users[k].id) {
					_user = users[k];
				}
			}
		}

		res.send(JSON.stringify(_user));
	});
}

app.get("/", function (req, res) {
	// console.log(req.url);
	handleUsers(req, res, false, function (allUsers) {
		res.render("index", {
			title: "Hey,",
			message: "Hi on the wire!",
			users: allUsers,
		});
	});
});

app.get("/users", function (req, res) {
	console.log(req.url);
	fs.readFile("./users.json", "utf-8", (err, data) => {
		if (err) {
			throw err;
		}

		res.send(data);
	});
});

app.get("/users/:id", function (req, res) {
	console.log(req.url);
	handleUsers(req, res);
});

/* Server */
app.listen(PORT, () => {
	console.log(`server listen on ${PORT}`);
});
