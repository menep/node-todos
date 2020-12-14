const express = require("express");
const router = express.Router();
const Todo = require("../models/Todo");

/* GET home page. */
router.get("/", function (req, res, next) {
	Todo.all(req.query, (err, rows) => {
		const todos = rows.map((el) => {
			el.completed = !!el.completed;

			return el;
		});

		res.render("index", { title: "Express", todos });
	});
});

router.get("/new", (req, res, next) => {
	res.render("new");
});

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

router.get("/:id", (req, res, next) => {
	Todo.get(req.params.id, (err, row) => {
		if (err) {
			console.log(err);
		}
		res.render("show", { todo: row });
	});
});

module.exports = router;
