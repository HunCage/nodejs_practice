const express = require("express");
const fs = require("fs");
const mongoose = require("mongoose");
const app = express();
// const favicon = require("serve-favicon");
// const path = require("path");

/* Globals */
const PORT = 3000;
const staticDir = "build";

/* mongoDB / mongoose */
mongoose.connect("mongodb://localhost/superhero");
let models = {};
models.users = require("./models/users");
models.users.setConnection(mongoose);

/* Module practice */
/* const mad = require("./my_modules/mad_module");

let str = "Hi on the wire!";
mad.tu(str, function (error, newStr) {
	if (error) {
		console.error(err);
	} else {
		console.log(newStr);
	}
});*/

/* Middleware */
app.use(express.static(staticDir));
app.set("view engine", "jade");
app.set("views", "./src/view");
// app.use(express.static(path.join(__dirname, staticDir)));
// app.use('/static',express.static(__dirname + "build/"));
// app.use(favicon(path.join(__dirname, staticDir + "/img/", "favicon.ico")));

app.use("/:model/:id*?", function (req, res, next) {
	if (req.headers["x-requested-with"] == "XMLHttpRequest") {
		switch (req.method.toLowerCase()) {
			// READ
			case "get":
				models[req.params.model]
					.getModel()
					.find({}, function (err, data) {
						res.send(JSON.stringify(data));
					});
				break;
			// UPDATE
			case "post":
				var requestBody = "";
				req.on("data", function (package) {
					requestBody += package;
				});
				req.on("end", function () {
					requestBody = JSON.parse(requestBody);
					var newData = {};
					for (var k in requestBody) {
						if (k == "_id") {
							continue;
						}
						newData[k] = requestBody[k];
					}
					models[req.params.model].getModel().update(
						{
							_id: requestBody._id,
						},
						newData,
						function (err, user) {
							res.send('{"success": true}');
						}
					);
				});
				break;
			// CREATE
			case "put":
				var requestBody = "";
				req.on("data", function (package) {
					requestBody += package;
				});
				req.on("end", function () {
					requestBody = JSON.parse(requestBody);
					var row = {};
					for (var k in requestBody) {
						if (k == "_id") {
							continue;
						}
						row[k] = requestBody[k];
					}
					models[req.params.model].create(row, function (data) {
						res.send(JSON.stringify(data));
					});
				});
				break;
			// DELETE
			case "delete":
				if (req.params.id) {
					let where = { _id: req.params.id };
					models[req.params.model]
						.getModel()
						.remove(where, function (err, rem) {
							if (err) console.error(err);
							res.send(JSON.stringify(rem));
						});
				} else {
					res.send('{"error": "no id"}');
				}
				break;
			default:
				res.send('{"error": "unsupported method"}');
		}
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
	console.log(req.url);
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

/* app.get("/users/:id", function (req, res) {
	console.log(req.url);
	handleUsers(req, res);
}); */

/* Server */
app.listen(PORT, () => {
	console.log(`server listen on ${PORT}`);
});
