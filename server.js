const express = require("express");
const fs = require("fs");
const app = express();
const favicon = require("serve-favicon");
const path = require("path");
const PORT = 3000;
const staticDir ='build';

/* Middleware */
app.use(express.static(path.join(__dirname, staticDir)));
// app.use(express.static(__dirname + "build"));
app.use(favicon(path.join(__dirname, staticDir + "/img/", "favicon.ico")));

app.get("/style.css", function (req, res) {
	res.sendFile(__dirname + "/" + "style.css");
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
	console.log(req.url);
	fs.readFile("./" + staticDir + "/index.html", "utf-8", (err, data) => {
		res.send(data);
	});
});

/* Routes */
app.get("/", function (req, res) {
	res.send("Hello World");
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
