const db = require("../database/db.js").connect();

class Todo {
	constructor(obj) {
		for (const property in obj) {
			this[property] = obj[property];
		}
	}

	static all({ sort = "due_at", order = "desc" }, cb) {
		const sql = `SELECT * FROM todos ORDER BY ${sort} ${order}`;

		db.all(sql, cb);
	}

	save(cb) {
		const sql = `INSERT INTO todos (
			title, due_at, created_at
		) VALUES (
			:title, :due_at, datetime('now')
		)`;

		db.run(sql, this.title, this.due_at, cb);
	}
}

module.exports = Todo;
