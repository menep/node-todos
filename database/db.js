const sqlite = require("sqlite3").verbose();

const connect = () => {
	return new sqlite.Database("./database/todos.sql");
};

const init = () => {
	const db = connect();

	db.serialize(() => {
		const sql = `
			CREATE TABLE IF NOT EXISTS todos (
				id INTEGER PRIMARY KEY AUTOINCREMENT, title VARCHAR(140), due_at DATE,
				completed BOOLEAN, created_at DATETIME, updated_at DATETIME, deleted_at DATETIME
			)
		`;
		db.run(sql);
	});
};

module.exports = {
	connect,
	init,
};
