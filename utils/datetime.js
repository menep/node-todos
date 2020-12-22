module.exports.formatDateYYYYMMDD = (tsMs) =>
	new Date(tsMs).toISOString().split("T")[0];
