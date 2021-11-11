const express = require("express");
const fs = require("fs");
const app = express();
const mongoose = require("mongoose");

const favicon = require("serve-favicon");
const path = require("path");
const PORT = 3000;
const staticDir = "build";

/* mongoDB / mongoose */
mongoose.connect('mongodb://localhost/first')

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
/* end */

app.set("view engine", "jade");
app.set("views", "./src/view");

/* Middleware */
app.use(express.static(staticDir));
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

// app.get("/style.css", function (req, res) {
// 	res.sendFile(__dirname + "/" + "style.css");
// });

app.get("/all.js", function (req, res) {
	res.sendFile(__dirname + "/js/" + "all.js");
});

/* Handlers */
function handleUsers(req, res) {
	fs.readFile("./users.json", "utf-8", (err, data) => {
		if (err) {
			throw err;
		}
		// console.log(data);
		// let path = req.url.split("/");
		let users = JSON.parse(data);
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
	res.render("index", { title: "Hey,", message: "Hi on the wire!" });
});

/* Routes */
// app.get("/", function (req, res) {
// 	res.send("Hello World");
// });

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
	// next();
});

/* Server */
app.listen(PORT, () => {
	console.log(`server listen on ${PORT}`);
});
