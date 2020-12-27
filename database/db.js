const db = require("knex")({
	client: "sqlite3",
	connection: {
		filename: "./todos.sqlite",
	},
	useNullAsDefault: true,
	debug: true,
});

const init = () => {
	db.schema.hasTable("todos").then((exists) => {
		if (!exists) {
			return db.schema.createTable("todos", (t) => {
				t.increments("id");
				t.text("title");
				t.date("due_at");
				t.boolean("completed");
				t.dateTime("created_at");
				t.dateTime("updated_at");
				t.dateTime("deleted_at");
			});
		}
	});
};

module.exports = { db, init };
