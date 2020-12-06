const sqlite = require("sqlite3").verbose();

module.exports.init = () => {
	const db = new sqlite.Database("test.sql");
	db.serialize(() => {
		const sql = `CREATE TABLE IF NOT EXISTS todos (id INTEGER PRIMARY KEY, title VARCHAR(140))`;
		db.run(sql);
	});
};
