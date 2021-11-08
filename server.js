const express = require("express");
const fs = require("fs");
const app = express();
const PORT = 3000;

app.get("/", function (req, res) {
	res.send("Hello World");
});

/* */
function handleUsers(req, res) {
	fs.readFile("./users.json", "utf-8", (err, data) => {
		if (err) {
			throw err;
		}

		// console.log(data);
		// let path = req.url.split("/");
		let users = JSON.parse(data);
		let _user = {};

		for (let k in users) {
			// if (path[2] == users[k].id) {
			if (req.params.id == users[k].id) {
				_user = users[k];
			}
		}

		res.send(JSON.stringify(_user));
	});
}

/* Get users */
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
