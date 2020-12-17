const deleteBtn = document.querySelector("#delete");
const id = deleteBtn.dataset.id;

deleteBtn.addEventListener("click", function (e) {
	fetch(`/${id}`, { method: "DELETE" })
		.then(() => (location.href = "/"))
		.catch((err) => console.log(err));
});
