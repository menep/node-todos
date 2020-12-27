const express = require("express");
const router = express.Router();
const Todo = require("../models/Todo");
const createError = require("http-errors");

router.param("id", (req, res, next, id) => {
	// TODO: add row to req object and pass it to route handler
	Todo.get(id, (_, row) => {
		if (!row) {
			next(createError(404));
		}
		next();
	});
});

/* GET home page. */
router.get("/", function (req, res, next) {
	Todo.all({}).then((rows) => {
		const todos = rows.map((el) => {
			el.completed = !!el.completed;

			return el;
		});

		res.render("index", { title: "node-todos", todos });
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

router.get("/:id/edit", (req, res, next) => {
	Todo.get(req.params.id, (err, row) => {
		if (err) {
			console.log(err);
		}
		res.render("edit", { todo: row });
	});
});

router.post("/:id", (req, res, next) => {
	const title = req.body.title;
	const due_at = req.body.due_at;
	const completed = !!req.body.completed;

	const todo = new Todo({ title, due_at, completed });

	todo.update(req.params.id, (err) => {
		if (err) {
			console.log(err);
		}
		res.redirect("/");
	});
});

router.delete("/:id", (req, res, next) => {
	Todo.delete(req.params.id, (err) => {
		if (err) {
			console.log(err);
		}
		res.sendStatus(200);
	});
});

module.exports = router;
