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

module.exports = router;
