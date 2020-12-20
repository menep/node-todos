const db = require("./db");
const faker = require("faker");
const datetime = require("../utils/datetime.js");
const dbConnection = db.connect();

const seedRow = () => {
	const title = faker.lorem.words(5);
	const due_at = datetime.formatDateYYYYMMDD(faker.date.future(0));
	const completed = faker.random.boolean();
	const created_at = datetime.formatDateYYYYMMDD(faker.date.past(0));

	var stmt = dbConnection.prepare(`INSERT INTO todos (title, due_at, completed, created_at, updated_at, deleted_at) VALUES 
		(?, ?, ?, ?, NULL, NULL)
	;`);
	stmt.run(title, due_at, completed, created_at);
	stmt.finalize();
};

for (let index = 0; index < 10; index++) {
	seedRow();
}
