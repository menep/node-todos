const faker = require("faker");
const datetime = require("../../utils/datetime.js");

const seedRow = (amount) => {
	const seedData = [];

	for (let index = 0; index < amount; index++) {
		const title = faker.lorem.words(5);
		const due_at = datetime.formatDateYYYYMMDD(faker.date.future(0));
		const completed = faker.random.boolean();
		const created_at = datetime.formatDateYYYYMMDD(faker.date.past(0));
		const updated_at = null;
		const deleted_at = null;

		seedData.push({
			title,
			due_at,
			completed,
			created_at,
			updated_at,
			deleted_at,
		});
	}

	return seedData;
};

exports.seed = function (knex) {
	// Deletes ALL existing entries
	return knex("todos")
		.del()
		.then(function () {
			// Inserts seed entries
			return knex("todos").insert(seedRow(10));
		});
};
