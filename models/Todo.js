const db = require("../database/db.js").db;

class Todo {
	constructor(obj) {
		for (const property in obj) {
			this[property] = obj[property];
		}
	}

	static all({ sort = "due_at", order = "desc" }) {
		return db
			.select()
			.table("todos")
			.whereNull("deleted_at")
			.orderBy(sort, order);
	}

	static get(id) {
		return db.where({ id }).select().table("todos");
	}

	static delete(id, cb) {
		const sql = `UPDATE todos SET deleted_at = datetime('now') WHERE id = :id;`;

		db.run(sql, id, cb);
	}

	save(cb) {
		const sql = `INSERT INTO todos (
			title, due_at, created_at
		) VALUES (
			:title, :due_at, datetime('now')
		);`;

		db.run(sql, this.title, this.due_at, cb);
	}

	update(id, cb) {
		const sql = `UPDATE todos
			SET title = :title, due_at = :due_at, completed = :completed, updated_at = datetime('now')
			WHERE id = :id
		;`;

		db.run(sql, this.title, this.due_at, this.completed, id, cb);
	}
}

module.exports = Todo;
