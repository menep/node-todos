const db = require("./db").connect();

const sql = `
	INSERT INTO todos (title, due_at, completed, created_at, updated_at, deleted_at) VALUES 
	('test1', date('2021-01-01'), false, datetime('now'), NULL, NULL),
	('test2', date('2021-01-02'), true, datetime('now'), datetime('now'), NULL),
	('test3', date('2021-01-03'), false, datetime('now'), NULL, datetime('now')),
	('test4', date('2021-01-04'), true, datetime('now'), NULL, NULL),
	('test5', date('2021-01-05'), false, datetime('now'), datetime('now'), datetime('now')),
	('test6', date('2021-01-06'), true, datetime('now'), NULL, datetime('now'))
`;

db.run(sql);
