const express = require("express");
const router = express.Router();
const Todo = require("../models/Todo");
const createError = require("http-errors");

router.param("id", (req, res, next, id) => {
	Todo.get(id).then((rows) => {
		if (!rows.length) {
			next(createError(404));
		}
		req.todo = rows[0];
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

/* GET render new todo form page */
router.get("/new", (req, res, next) => {
	res.render("new");
});

/* POST persist new todo */
router.post("/", (req, res, next) => {
	const title = req.body.title;
	const due_at = req.body.due_at;
	const todo = new Todo({ title, due_at });

	todo.save().then(() => res.redirect("/"));
});

router.get("/:id", (req, res, next) => {
	if (req.todo) {
		res.render("show", { todo: req.todo });
	}
});

router.get("/:id/edit", (req, res, next) => {
	if (req.todo) {
		res.render("edit", { todo: req.todo });
	}
});

/* POST persist update to Todo */
router.post("/:id", (req, res, next) => {
	const title = req.body.title;
	const due_at = req.body.due_at;
	const completed = !!req.body.completed;

	const todo = new Todo({ title, due_at, completed });

	todo.update(req.params.id).then(() => res.redirect("/"));
});

router.delete("/:id", (req, res, next) => {
	Todo.delete(req.params.id).then(() => {
		res.sendStatus(200);
	});
});

module.exports = router;
