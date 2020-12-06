const sqlite = require("sqlite3").verbose();

module.exports.init = () => {
	const db = new sqlite.Database("./database/todos.sql");

	db.serialize(() => {
		const sql = `
			CREATE TABLE IF NOT EXISTS todos 
			(id INTEGER PRIMARY KEY, title VARCHAR(140), description TEXT, due DATE, completed BOOLEAN, created DATETIME, updated DATETIME, deleted DATETIME)
		`;
		db.run(sql);
	});
};
