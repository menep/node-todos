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

	static delete(id) {
		return db("todos").where({ id }).update({ deleted_at: db.fn.now() });
	}

	save() {
		return db("todos").insert({
			title: this.title,
			due_at: this.due_at,
			created_at: db.fn.now(),
		});
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
