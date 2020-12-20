const db = require("./db");
const faker = require("faker");
const dbConnection = db.connect();

const getUnixTs = (tsMs) => Math.floor(tsMs / 1000);

const seedRow = () => {
	const title = faker.lorem.words(5);
	const due_at = getUnixTs(faker.date.future(0).getTime());
	const completed = faker.random.boolean();
	const created_at = getUnixTs(faker.date.past(0).getTime());

	var stmt = dbConnection.prepare(`INSERT INTO todos (title, due_at, completed, created_at, updated_at, deleted_at) VALUES 
		(?, ?, ?, ?, NULL, NULL)
	;`);
	stmt.run(title, due_at, completed, created_at);
	stmt.finalize();
};

for (let index = 0; index < 10; index++) {
	seedRow();
}
