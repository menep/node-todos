module.exports = {
	client: "sqlite3",
	connection: {
		filename: "./todos.sqlite",
	},
	useNullAsDefault: true,
	debug: true,
	seeds: {
		directory: "./seeds",
	},
};
