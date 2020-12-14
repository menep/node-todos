const express = require("express");
const router = express.Router();
const Todo = require("../models/Todo");

router.post("/", (req, res, next) => {
	const title = req.body.title;
	const due_at = req.body.due_at;
	const todo = new Todo({ title, due_at });

	todo.save((err) => {
		if (err) {
			console.log(err);
		}
		res.redirect("/");
	});
});

module.exports = router;
