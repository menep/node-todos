const db = require("../database/db.js").db;

class Todo {
	constructor(obj) {
		for (const property in obj) {
			this[property] = obj[property];
		}
	}

	static all({ sort = "due_at", order = "desc" }) {
		return db("todos")
			.select()
			.whereNull("deleted_at")
			.orderBy(sort, order);
	}

	static get(id) {
		return db("todos").where({ id }).select();
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

	update(id) {
		return db("todos").where({ id }).update({
			title: this.title,
			due_at: this.due_at,
			completed: this.completed,
		});
	}
}

module.exports = Todo;
