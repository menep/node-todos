const db = require("../database/db.js").connect();

class Todo {
	static all(cb) {
		const sql = "SELECT * FROM todos";
		db.all(sql, cb);
	}
}

module.exports = Todo;
