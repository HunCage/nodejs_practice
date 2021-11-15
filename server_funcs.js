/* Save User Order */
// Users.first({ name: new RegExp("jani", "gi") }, function (user) {
// 	if (user !== null) {
// 		/* 		let order = new Users.getModel("Orders");
// 		order._creator = user._id;
// 		order.insDate = new Date();
// 		order.description = "Gratulation";
// 		order.product = "Keyboard";
// 		order.amount = 49.99;
// 		order.deadline = new Date("2021-12-21");
// 		order.save(); */
// 		console.info("User: ", user);
// 	} else {
// 		console.info("No match found!");
// 	}
// });

/* Create */
Users.create(
	{
		name: "Jason Statham",
		email: "statham@gmail.com",
		phone: "+3614563214",
		address: "1122 Budapest, Kiss u. 10.",
		role: 3,
		meta: {
			birthsday: new Date("1994-07-04"),
			hobby: "golf",
		},
	},
	function (saved) {
		console.info("Saved model: ", saved);
	}
);

// Dokumentum törlés.
Users.getModel().remove(
	{
		name: new RegExp("jack", "i"),
	},
	function (err, rem) {
		if (err) console.error(err);
		else {
			console.log(rem.result);
		}
	}
);

// Dokumentum frissítése.
Users.getModel().update(
	{
		name: new RegExp("jason", "i"),
	},
	{
		girlFriend: "Mariann",
	},
	function (err, user) {
		if (err) console.error(err);
	}
);

// Első találat a feltételek alapján.
Users.first(
	{
		name: new RegExp("jason", "i"),
	},
	function (user) {
		if (user !== null) {
			console.info("User: ", user);
		} else {
			console.info("No user!");
		}
	}
);

// Adminok visszaadása.
Users.getModel().isAdmin(2, function (err, data) {
	console.log(err);
	console.log(data);
});
