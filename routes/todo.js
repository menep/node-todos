const express = require("express");
const router = express.Router();

router.get("/", (req, res, next) => {
	res.render("add-todo");
});

module.exports = router;
