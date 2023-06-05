const express = require("express");
const bodyParser = require("body-parser");
const date = require(__dirname + "/date.js");

let items = ["Buy Food", "Cook Food", "Eat Food"];
let workItems = [];
const app = express();

app.set("view engine", "ejs");
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static("Public"));
app.get("/", (req, res) => {
	let day = date.getDate();
	// let day = date.getDay();
	console.log(day);
	res.render("list", {
		listTitle: day,
		newListItems: items,
	});
});

app.post("/", (req, res) => {
	let item = req.body.newItem;
	if (req.body.list === "Work") {
		workItems.push(item);
		res.redirect("/work");
		console.log(req.body);
		console.log(req.body.list);
	} else {
		items.push(item);
		res.redirect("/");
	}
});
// app.js : ToDoList Version - 1\app.js
// about.ejs : views\about.ejs
app.get("/work", (req, res) => {
	res.render("list", { listTitle: "Work List", newListItems: workItems });
});
app.get("/about", (req, res) => {
	res.render("about");
});
app.post("/work", (req, res) => {
	let item = req.body.newItem;
	workItems.push(item);
	res.redirect("/work");
});
app.listen(3000, () => {
	console.log("server started on port 3000");
});
